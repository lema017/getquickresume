/**
 * Migration script to update all templates with:
 * 1. i18n support for section titles (en/es)
 * 2. Correct section order (Languages at the end)
 * 
 * Usage: npx ts-node scripts/migrate-templates-i18n.ts
 * 
 * Environment variables required:
 * - AWS_REGION or REGION
 * - TEMPLATES_BUCKET (S3 bucket name)
 * - TEMPLATES_TABLE (DynamoDB table name)
 */

import { S3Client, ListObjectsV2Command, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';

const REGION = process.env.AWS_REGION || process.env.REGION || 'us-east-1';
const TEMPLATES_BUCKET = process.env.TEMPLATES_BUCKET || 'getquickresume-api-templates-prod';

const s3 = new S3Client({ region: REGION });

async function streamToString(stream: any): Promise<string> {
  return await new Promise<string>((resolve, reject) => {
    const chunks: any[] = [];
    stream.on('data', (chunk: any) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
  });
}

/**
 * The getSectionTitle helper method to be injected into templates
 */
const GET_SECTION_TITLE_METHOD = `
  getSectionTitle(section) {
    const lang = this.getAttribute('language') || 'en';
    const titles = {
      en: {
        profile: 'Profile',
        skills: 'Skills',
        experience: 'Work Experience',
        projects: 'Projects',
        education: 'Education',
        achievements: 'Achievements',
        certifications: 'Certifications',
        languages: 'Languages'
      },
      es: {
        profile: 'Perfil',
        skills: 'Habilidades',
        experience: 'Experiencia Laboral',
        projects: 'Proyectos',
        education: 'Educación',
        achievements: 'Logros',
        certifications: 'Certificaciones',
        languages: 'Idiomas'
      }
    };
    return (titles[lang] || titles.en)[section] || section;
  }
`;

/**
 * Transform a template's code to add i18n support and fix section order
 */
function transformTemplateCode(code: string): string {
  let transformedCode = code;

  // 1. Check if getSectionTitle already exists
  if (transformedCode.includes('getSectionTitle(')) {
    console.log('  - getSectionTitle already exists, skipping injection');
  } else {
    // Inject getSectionTitle method before the render() method
    // Look for "render()" method and inject before it
    const renderMethodPattern = /(\s+render\s*\(\s*\)\s*\{)/;
    if (renderMethodPattern.test(transformedCode)) {
      transformedCode = transformedCode.replace(
        renderMethodPattern,
        GET_SECTION_TITLE_METHOD + '\n$1'
      );
      console.log('  - Injected getSectionTitle method');
    } else {
      console.log('  - WARNING: Could not find render() method to inject getSectionTitle');
    }
  }

  // 2. Replace hardcoded section titles with getSectionTitle calls
  const titleReplacements: [RegExp, string][] = [
    // Profile variations
    [/<div class="section-title">Profile<\/div>/gi, '<div class="section-title">${this.getSectionTitle(\'profile\')}</div>'],
    [/<div class="section-title">PROFILE<\/div>/gi, '<div class="section-title">${this.getSectionTitle(\'profile\')}</div>'],
    
    // Skills variations
    [/<div class="section-title">Skills<\/div>/gi, '<div class="section-title">${this.getSectionTitle(\'skills\')}</div>'],
    [/<div class="section-title">SKILLS<\/div>/gi, '<div class="section-title">${this.getSectionTitle(\'skills\')}</div>'],
    
    // Experience variations
    [/<div class="section-title">Work Experience<\/div>/gi, '<div class="section-title">${this.getSectionTitle(\'experience\')}</div>'],
    [/<div class="section-title">WORK EXPERIENCE<\/div>/gi, '<div class="section-title">${this.getSectionTitle(\'experience\')}</div>'],
    [/<div class="section-title">Experience<\/div>/gi, '<div class="section-title">${this.getSectionTitle(\'experience\')}</div>'],
    [/<div class="section-title">EXPERIENCE<\/div>/gi, '<div class="section-title">${this.getSectionTitle(\'experience\')}</div>'],
    
    // Projects variations
    [/<div class="section-title">Projects<\/div>/gi, '<div class="section-title">${this.getSectionTitle(\'projects\')}</div>'],
    [/<div class="section-title">PROJECTS<\/div>/gi, '<div class="section-title">${this.getSectionTitle(\'projects\')}</div>'],
    
    // Education variations
    [/<div class="section-title">Education<\/div>/gi, '<div class="section-title">${this.getSectionTitle(\'education\')}</div>'],
    [/<div class="section-title">EDUCATION<\/div>/gi, '<div class="section-title">${this.getSectionTitle(\'education\')}</div>'],
    
    // Achievements variations
    [/<div class="section-title">Achievements<\/div>/gi, '<div class="section-title">${this.getSectionTitle(\'achievements\')}</div>'],
    [/<div class="section-title">ACHIEVEMENTS<\/div>/gi, '<div class="section-title">${this.getSectionTitle(\'achievements\')}</div>'],
    
    // Certifications variations
    [/<div class="section-title">Certifications<\/div>/gi, '<div class="section-title">${this.getSectionTitle(\'certifications\')}</div>'],
    [/<div class="section-title">CERTIFICATIONS<\/div>/gi, '<div class="section-title">${this.getSectionTitle(\'certifications\')}</div>'],
    
    // Languages variations
    [/<div class="section-title">Languages<\/div>/gi, '<div class="section-title">${this.getSectionTitle(\'languages\')}</div>'],
    [/<div class="section-title">LANGUAGES<\/div>/gi, '<div class="section-title">${this.getSectionTitle(\'languages\')}</div>'],
  ];

  for (const [pattern, replacement] of titleReplacements) {
    if (pattern.test(transformedCode)) {
      transformedCode = transformedCode.replace(pattern, replacement);
      console.log(`  - Replaced section title matching: ${pattern.source}`);
    }
  }

  // 3. Fix section order in render() method - move Languages to end
  // Pattern: renderLanguages comes before renderAchievements and/or renderCertifications
  
  // Look for the render method body and reorder sections
  // Current order might be: ...renderLanguages...renderAchievements...renderCertifications
  // Target order: ...renderAchievements...renderCertifications...renderLanguages
  
  // Pattern to match the section rendering order in the render() method
  const sectionOrderPatterns = [
    // Pattern 1: Languages, Achievements, Certifications (most common)
    {
      pattern: /(\$\{this\.renderLanguages\([^)]*\)\})\s*(\$\{this\.renderAchievements\([^)]*\)\})\s*(\$\{this\.renderCertifications\([^)]*\)\})/,
      replacement: '$2\n        $3\n        $1'
    },
    // Pattern 2: Languages, Achievements only (no Certifications)
    {
      pattern: /(\$\{this\.renderLanguages\([^)]*\)\})\s*(\$\{this\.renderAchievements\([^)]*\)\})\s*(<\/div>)/,
      replacement: '$2\n        $1\n      $3'
    },
    // Pattern 3: Education, Languages, Achievements, Certifications
    {
      pattern: /(\$\{this\.renderEducation\([^)]*\)\})\s*(\$\{this\.renderLanguages\([^)]*\)\})\s*(\$\{this\.renderAchievements\([^)]*\)\})\s*(\$\{this\.renderCertifications\([^)]*\)\})/,
      replacement: '$1\n        $3\n        $4\n        $2'
    },
  ];

  for (const { pattern, replacement } of sectionOrderPatterns) {
    if (pattern.test(transformedCode)) {
      transformedCode = transformedCode.replace(pattern, replacement);
      console.log('  - Reordered sections: Languages moved to end');
      break;
    }
  }

  return transformedCode;
}

async function listTemplates(): Promise<string[]> {
  const command = new ListObjectsV2Command({
    Bucket: TEMPLATES_BUCKET,
    Prefix: 'templates/',
  });

  const response = await s3.send(command);
  const keys = (response.Contents || [])
    .map(obj => obj.Key)
    .filter((key): key is string => !!key && key.endsWith('.js'));

  return keys;
}

async function getTemplateCode(s3Key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: TEMPLATES_BUCKET,
    Key: s3Key,
  });

  const response = await s3.send(command);
  // @ts-ignore
  return await streamToString(response.Body);
}

async function updateTemplateCode(s3Key: string, code: string): Promise<void> {
  const command = new PutObjectCommand({
    Bucket: TEMPLATES_BUCKET,
    Key: s3Key,
    Body: code,
    ContentType: 'application/javascript',
  });

  await s3.send(command);
}

async function main() {
  console.log('='.repeat(60));
  console.log('Template i18n Migration Script');
  console.log('='.repeat(60));
  console.log(`Bucket: ${TEMPLATES_BUCKET}`);
  console.log(`Region: ${REGION}`);
  console.log('');

  // List all templates
  console.log('Listing templates...');
  const templateKeys = await listTemplates();
  console.log(`Found ${templateKeys.length} templates\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const s3Key of templateKeys) {
    console.log(`Processing: ${s3Key}`);
    
    try {
      // Get current code
      const originalCode = await getTemplateCode(s3Key);
      
      // Transform the code
      const transformedCode = transformTemplateCode(originalCode);
      
      // Check if any changes were made
      if (originalCode === transformedCode) {
        console.log('  - No changes needed\n');
        successCount++;
        continue;
      }
      
      // Upload updated code
      await updateTemplateCode(s3Key, transformedCode);
      console.log('  - Updated successfully\n');
      successCount++;
    } catch (error) {
      console.error(`  - ERROR: ${error}\n`);
      errorCount++;
    }
  }

  console.log('='.repeat(60));
  console.log('Migration Complete');
  console.log(`Success: ${successCount}, Errors: ${errorCount}`);
  console.log('='.repeat(60));
}

main().catch(console.error);

