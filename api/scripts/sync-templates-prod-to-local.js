/**
 * Sync Templates from Production to Local DynamoDB
 * 
 * This script:
 * 1. Reads all template metadata from production DynamoDB
 * 2. Reads template JavaScript code from production S3
 * 3. Copies the code to dev S3 bucket
 * 4. Writes template metadata to local DynamoDB
 * 
 * Usage:
 *   npm run sync-templates
 *   npm run sync-templates -- --overwrite
 *   npm run sync-templates -- --dry-run
 * 
 * Prerequisites:
 *   - AWS credentials configured for production and dev access
 *   - Dev S3 bucket exists: getquickresume-api-templates-dev
 *   - Local DynamoDB running on port 8000
 *   - Local templates table created (via npm run create-tables)
 */

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand, PutCommand, GetCommand } = require('@aws-sdk/lib-dynamodb');
const { S3Client, GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');

// Configuration
const REGION = process.env.REGION || 'us-east-1';
const LOCAL_DYNAMODB_ENDPOINT = process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000';

// Production resources
const PROD_TEMPLATES_TABLE = 'getquickresume-api-templates-prod';
const PROD_S3_BUCKET = 'getquickresume-api-templates-prod';

// Dev resources
const DEV_S3_BUCKET = 'getquickresume-api-templates-dev';
const LOCAL_TEMPLATES_TABLE = process.env.TEMPLATES_TABLE || 'getquickresume-api-templates-dev';

// Parse command line arguments
const args = process.argv.slice(2);
const overwrite = args.includes('--overwrite');
const dryRun = args.includes('--dry-run');

// Initialize AWS clients for production (uses default credentials/profile)
const prodDynamoClient = new DynamoDBClient({ region: REGION });
const prodDdb = DynamoDBDocumentClient.from(prodDynamoClient);

const s3Client = new S3Client({ region: REGION });

// Initialize AWS client for local DynamoDB
const localDynamoClient = new DynamoDBClient({
  region: REGION,
  endpoint: LOCAL_DYNAMODB_ENDPOINT,
  credentials: {
    accessKeyId: 'local',
    secretAccessKey: 'local'
  }
});
const localDdb = DynamoDBDocumentClient.from(localDynamoClient);

/**
 * Convert stream to string
 */
async function streamToString(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
  });
}

/**
 * Fetch all templates from production DynamoDB
 */
async function fetchProdTemplates() {
  console.log(`📥 Fetching templates from ${PROD_TEMPLATES_TABLE}...`);
  
  const result = await prodDdb.send(new ScanCommand({
    TableName: PROD_TEMPLATES_TABLE
  }));
  
  const templates = result.Items || [];
  console.log(`   Found ${templates.length} templates in production`);
  
  return templates;
}

/**
 * Fetch template JavaScript code from production S3
 */
async function fetchTemplateCode(s3Key) {
  const response = await s3Client.send(new GetObjectCommand({
    Bucket: PROD_S3_BUCKET,
    Key: s3Key
  }));
  
  return await streamToString(response.Body);
}

/**
 * Copy template JavaScript code to dev S3
 */
async function copyToDevS3(s3Key, code) {
  await s3Client.send(new PutObjectCommand({
    Bucket: DEV_S3_BUCKET,
    Key: s3Key,
    Body: code,
    ContentType: 'application/javascript'
  }));
}

/**
 * Check if template exists in local DynamoDB
 */
async function templateExistsLocally(templateId) {
  try {
    const result = await localDdb.send(new GetCommand({
      TableName: LOCAL_TEMPLATES_TABLE,
      Key: { id: templateId }
    }));
    return !!result.Item;
  } catch (error) {
    return false;
  }
}

/**
 * Write template to local DynamoDB
 */
async function writeToLocalDynamoDB(template) {
  await localDdb.send(new PutCommand({
    TableName: LOCAL_TEMPLATES_TABLE,
    Item: template
  }));
}

/**
 * Main sync function
 */
async function syncTemplates() {
  console.log('');
  console.log('🔄 Template Sync: Production → Local');
  console.log('=====================================');
  console.log('');
  console.log('Configuration:');
  console.log(`  • Production DynamoDB: ${PROD_TEMPLATES_TABLE}`);
  console.log(`  • Production S3: ${PROD_S3_BUCKET}`);
  console.log(`  • Dev S3: ${DEV_S3_BUCKET}`);
  console.log(`  • Local DynamoDB: ${LOCAL_TEMPLATES_TABLE}`);
  console.log(`  • Local DynamoDB Endpoint: ${LOCAL_DYNAMODB_ENDPOINT}`);
  console.log(`  • Overwrite existing: ${overwrite ? 'Yes' : 'No'}`);
  console.log(`  • Dry run: ${dryRun ? 'Yes' : 'No'}`);
  console.log('');
  
  const stats = {
    synced: 0,
    skipped: 0,
    errors: 0
  };
  
  try {
    // 1. Fetch all templates from production
    const templates = await fetchProdTemplates();
    
    if (templates.length === 0) {
      console.log('⚠️  No templates found in production');
      return;
    }
    
    // 2. Process each template
    console.log('');
    console.log('📦 Processing templates...');
    console.log('');
    
    for (const template of templates) {
      const templateId = template.id;
      const s3Key = template.s3Key;
      
      try {
        // Check if template exists locally
        const exists = await templateExistsLocally(templateId);
        
        if (exists && !overwrite) {
          console.log(`  ⏭️  ${templateId} - Already exists locally (use --overwrite to replace)`);
          stats.skipped++;
          continue;
        }
        
        if (dryRun) {
          console.log(`  🔍 ${templateId} - Would sync (dry run)`);
          stats.synced++;
          continue;
        }
        
        // Fetch template code from production S3
        console.log(`  📥 ${templateId} - Fetching code from prod S3...`);
        const code = await fetchTemplateCode(s3Key);
        
        // Copy to dev S3
        console.log(`  📤 ${templateId} - Copying to dev S3...`);
        await copyToDevS3(s3Key, code);
        
        // Write to local DynamoDB (same s3Key, but will read from dev bucket)
        console.log(`  💾 ${templateId} - Writing to local DynamoDB...`);
        await writeToLocalDynamoDB({
          id: template.id,
          name: template.name,
          description: template.description,
          category: template.category,
          s3Key: template.s3Key,
          tagName: template.tagName,
          hash: template.hash
        });
        
        console.log(`  ✅ ${templateId} - Synced successfully`);
        stats.synced++;
        
      } catch (error) {
        console.error(`  ❌ ${templateId} - Error: ${error.message}`);
        stats.errors++;
      }
    }
    
    // 3. Print summary
    console.log('');
    console.log('=====================================');
    console.log('📊 Summary');
    console.log('=====================================');
    console.log(`  ✅ Synced: ${stats.synced}`);
    console.log(`  ⏭️  Skipped: ${stats.skipped}`);
    console.log(`  ❌ Errors: ${stats.errors}`);
    console.log('');
    
    if (dryRun) {
      console.log('ℹ️  This was a dry run. No changes were made.');
      console.log('   Run without --dry-run to actually sync templates.');
      console.log('');
    }
    
    if (stats.errors > 0) {
      process.exit(1);
    }
    
  } catch (error) {
    console.error('');
    console.error('❌ Fatal error:', error.message);
    console.error('');
    
    if (error.name === 'CredentialsError' || error.message.includes('credentials')) {
      console.error('💡 Tip: Make sure your AWS credentials are configured.');
      console.error('   You can set AWS_PROFILE or configure credentials in ~/.aws/credentials');
    }
    
    if (error.name === 'ResourceNotFoundException') {
      console.error('💡 Tip: Make sure the local DynamoDB table exists.');
      console.error('   Run: npm run create-tables');
    }
    
    if (error.code === 'ECONNREFUSED') {
      console.error('💡 Tip: Make sure local DynamoDB is running.');
      console.error('   Run: docker run -p 8000:8000 amazon/dynamodb-local');
    }
    
    process.exit(1);
  }
}

// Run the sync
syncTemplates();

