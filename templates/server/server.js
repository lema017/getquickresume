import express from 'express';
import cors from 'cors';
import multer from 'multer';
import dotenv from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

// Configure CORS
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true
}));

app.use(express.json());

// Configure multer for file uploads (memory storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Initialize Claude client
const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY
});

// Read the template generation prompt and replace tagName placeholder
async function getTemplatePrompt(tagName) {
  try {
    const promptPath = join(__dirname, '..', 'TEMPLATE_GENERATION_PROMPT.md');
    let prompt = await readFile(promptPath, 'utf-8');
    
    // Replace {{TAG_NAME}} placeholder with actual tagName
    // Also replace hardcoded 'resume-component' with the actual tagName
    if (tagName) {
      prompt = prompt.replace(/\{\{TAG_NAME\}\}/g, tagName);
      prompt = prompt.replace(/'resume-component'/g, `'${tagName}'`);
      prompt = prompt.replace(/"resume-component"/g, `"${tagName}"`);
      console.log(`[Server] Replaced tagName in prompt: ${tagName}`);
    }
    
    return prompt;
  } catch (error) {
    console.error('Error reading template prompt:', error);
    throw new Error('Failed to read template generation prompt');
  }
}

// Convert image buffer to base64
function imageToBase64(buffer, mimeType) {
  return `data:${mimeType};base64,${buffer.toString('base64')}`;
}

// Generate sample resume data for preview
// This structure matches what the generated template expects
// Note: The template expects a flat structure, not nested under "header"
function getSampleResumeData() {
  return {
    // Header fields at root level (not nested in "header" object)
    name: 'John Doe',
    title: 'Senior Software Engineer',
    contact: {
      phone: '+1 (555) 123-4567',
      email: 'john.doe@example.com',
      website: 'johndoe.dev',
      location: 'San Francisco, CA'
    },
    profile: 'Experienced software engineer with 8+ years of expertise in full-stack development, cloud architecture, and team leadership. Proven track record of delivering scalable solutions and leading cross-functional teams.',
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB', 'Python', 'Git'],
    experience: [
      {
        position: 'Senior Software Engineer',
        company: 'Tech Corp',
        startDate: '2020',
        endDate: 'Present',
        description: [
          'Improved system performance by 40% through optimization',
          'Led team of 5 developers in agile environment',
          'Architected scalable solutions handling 10M+ requests daily'
        ]
      },
      {
        position: 'Software Engineer',
        company: 'Startup Inc',
        startDate: '2018',
        endDate: '2020',
        description: [
          'Built scalable REST APIs handling 100K+ requests/day',
          'Implemented CI/CD pipelines reducing deployment time by 60%',
          'Collaborated with design team to improve user experience'
        ]
      }
    ],
    projects: [
      {
        name: 'E-commerce Platform',
        description: 'Full-stack e-commerce solution with payment integration, serving 50K+ active users. Implemented real-time inventory management and secure checkout process.'
      },
      {
        name: 'Cloud Migration Project',
        description: 'Led migration of legacy systems to AWS, reducing infrastructure costs by 35% and improving system reliability.'
      }
    ],
    education: [
      {
        institution: 'University of Technology',
        degree: 'Bachelor of Science in Computer Science',
        startDate: '2014',
        endDate: '2018'
      }
    ],
    languages: [
      'English',
      'Spanish',
      'French'
    ],
    achievements: [
      'Best Innovation Award - Tech Corp Annual Awards 2022',
      'Published 3 technical articles on cloud architecture',
      'Open source contributor with 500+ GitHub stars'
    ],
    certifications: [
      'AWS Certified Solutions Architect - 2021',
      'Kubernetes Certified Administrator - 2020',
      'Google Cloud Professional Cloud Architect - 2019'
    ]
  };
}

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 10MB' });
    }
    return res.status(400).json({ error: `Upload error: ${err.message}` });
  }
  if (err) {
    return res.status(400).json({ error: err.message || 'File upload error' });
  }
  next();
};

// POST /api/generate-template
app.post('/api/generate-template', upload.single('image'), handleMulterError, async (req, res) => {
  try {
    console.log('Received template generation request');
    console.log('Request body keys:', Object.keys(req.body));
    console.log('Request file:', req.file ? 'Present' : 'Missing');
    
    if (!req.file) {
      console.error('No file in request');
      return res.status(400).json({ error: 'No image file provided' });
    }

    // Extract metadata from request body
    const templateId = req.body.templateId;
    const templateName = req.body.templateName;
    const tagName = req.body.tagName;
    
    console.log('Template metadata:', { templateId, templateName, tagName });
    
    // Validate tagName format (kebab-case with hyphen)
    if (!tagName || !/^[a-z][a-z0-9]*-[a-z0-9-]+$/.test(tagName)) {
      return res.status(400).json({ 
        error: 'Invalid tagName format. Must be kebab-case with at least one hyphen (e.g., "resume-template-1")' 
      });
    }

    if (!process.env.CLAUDE_API_KEY) {
      console.error('Claude API key not configured');
      return res.status(500).json({ error: 'Claude API key not configured. Please set CLAUDE_API_KEY in .env file' });
    }
    
    console.log('Claude API key is configured');

    // Read the template generation prompt with tagName
    const prompt = await getTemplatePrompt(tagName);

    // Convert image to base64
    const imageBase64 = imageToBase64(req.file.buffer, req.file.mimetype);

    console.log('Sending request to Claude API...');
    console.log('Image size:', req.file.size, 'bytes');
    console.log('Image type:', req.file.mimetype);
    console.log('Prompt length:', prompt.length, 'characters');

    // Call Claude API with image
    let message;
    try {
      message = await anthropic.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 16000,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: req.file.mimetype,
                  data: imageBase64.split(',')[1] // Remove data:image/...;base64, prefix
                }
              },
              {
                type: 'text',
                text: prompt
              }
            ]
          }
        ]
      });
      console.log('Claude API response received successfully');
    } catch (apiError) {
      console.error('Claude API call failed:', apiError);
      if (apiError.status) {
        console.error('API Status:', apiError.status);
      }
      if (apiError.message) {
        console.error('API Error Message:', apiError.message);
      }
      throw apiError;
    }

    // Extract the generated code from Claude's response
    if (!message.content || message.content.length === 0) {
      throw new Error('Empty response from Claude API');
    }
    
    const responseText = message.content[0].text;
    
    if (!responseText || responseText.trim().length === 0) {
      throw new Error('No text content in Claude API response');
    }
    
    // Clean up the response - remove markdown code blocks if present
    let generatedCode = responseText.trim();
    if (generatedCode.startsWith('```javascript')) {
      generatedCode = generatedCode.replace(/^```javascript\n?/, '').replace(/\n?```$/, '');
    } else if (generatedCode.startsWith('```js')) {
      generatedCode = generatedCode.replace(/^```js\n?/, '').replace(/\n?```$/, '');
    } else if (generatedCode.startsWith('```')) {
      generatedCode = generatedCode.replace(/^```\n?/, '').replace(/\n?```$/, '');
    }

    // Return the generated code
    res.json({
      success: true,
      code: generatedCode,
      sampleData: getSampleResumeData()
    });

  } catch (error) {
    console.error('Error generating template:', error);
    console.error('Error stack:', error.stack);
    
    // Provide more detailed error information
    let errorMessage = error.message || 'Unknown error';
    let errorDetails = {};
    
    if (error.response) {
      // API error response
      errorDetails = {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      };
      errorMessage = `Claude API error: ${error.response.status} - ${error.response.statusText}`;
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = 'No response from Claude API';
      errorDetails = { request: 'Made but no response' };
    }
    
    res.status(500).json({
      error: 'Failed to generate template',
      message: errorMessage,
      details: errorDetails
    });
  }
});

// Create modification prompt that instructs Claude to modify existing code
function createModificationPrompt(currentCode, modificationRequest, tagName) {
  return `You are an expert front-end engineer specializing in JavaScript, TypeScript, and Web Components.

**TASK: Modify the existing Web Component code based on the user's request.**

**CRITICAL REQUIREMENTS:**
1. You MUST maintain the same Web Component structure (Custom Elements API with Shadow DOM)
2. You MUST keep the same tagName: "${tagName}" - DO NOT change it
3. You MUST preserve pagination support (pageNumber properties, filtering logic)
4. You MUST maintain the same data structure (flat object with name, title, contact, profile, skills, experience, etc.)
5. You MUST return ONLY the complete, valid JavaScript code - no markdown, no explanations
6. You MUST ensure the code is syntax-correct and ready to use

**USER'S MODIFICATION REQUEST:**
${modificationRequest}

**EXISTING CODE TO MODIFY:**
\`\`\`javascript
${currentCode}
\`\`\`

**INSTRUCTIONS:**
1. Review the existing code carefully
2. Apply ONLY the changes requested by the user
3. Maintain all existing functionality that is not being modified
4. Ensure the modified code follows the same patterns and structure
5. Keep the same class name, methods, and overall architecture
6. Preserve all pagination logic and data handling
7. Return the complete modified code as valid JavaScript

**OUTPUT FORMAT:**
Return ONLY the complete JavaScript code. No markdown code blocks, no explanations, no comments outside the code. Just the pure JavaScript code.`;
}

// POST /api/modify-template
app.post('/api/modify-template', upload.single('image'), handleMulterError, async (req, res) => {
  try {
    console.log('Received template modification request');
    console.log('Request body keys:', Object.keys(req.body));
    
    // Extract required fields
    const currentCode = req.body.currentCode;
    const modificationPrompt = req.body.modificationPrompt;
    const tagName = req.body.tagName;
    
    // Validate required fields
    if (!currentCode || !currentCode.trim()) {
      return res.status(400).json({ error: 'currentCode is required' });
    }
    
    if (!modificationPrompt || !modificationPrompt.trim()) {
      return res.status(400).json({ error: 'modificationPrompt is required' });
    }
    
    if (!tagName || !tagName.trim()) {
      return res.status(400).json({ error: 'tagName is required' });
    }
    
    // Validate tagName format
    if (!/^[a-z][a-z0-9]*-[a-z0-9-]+$/.test(tagName)) {
      return res.status(400).json({ 
        error: 'Invalid tagName format. Must be kebab-case with at least one hyphen' 
      });
    }

    if (!process.env.CLAUDE_API_KEY) {
      console.error('Claude API key not configured');
      return res.status(500).json({ error: 'Claude API key not configured. Please set CLAUDE_API_KEY in .env file' });
    }
    
    console.log('Claude API key is configured');
    console.log('Current code length:', currentCode.length);
    console.log('Modification request length:', modificationPrompt.length);
    console.log('TagName:', tagName);

    // Create modification prompt
    const fullPrompt = createModificationPrompt(currentCode, modificationPrompt, tagName);

    console.log('Sending modification request to Claude API...');
    console.log('Full prompt length:', fullPrompt.length);

    // Prepare content array for Claude
    const content = [
      {
        type: 'text',
        text: fullPrompt
      }
    ];

    // Optionally include original image if provided (for context)
    if (req.file) {
      const imageBase64 = imageToBase64(req.file.buffer, req.file.mimetype);
      content.unshift({
        type: 'image',
        source: {
          type: 'base64',
          media_type: req.file.mimetype,
          data: imageBase64.split(',')[1] // Remove data:image/...;base64, prefix
        }
      });
      console.log('Including original image for context');
    }

    // Call Claude API
    let message;
    try {
      message = await anthropic.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 16000,
        messages: [
          {
            role: 'user',
            content: content
          }
        ]
      });
      console.log('Claude API response received successfully');
    } catch (apiError) {
      console.error('Claude API call failed:', apiError);
      if (apiError.status) {
        console.error('API Status:', apiError.status);
      }
      if (apiError.message) {
        console.error('API Error Message:', apiError.message);
      }
      throw apiError;
    }

    // Extract the modified code from Claude's response
    if (!message.content || message.content.length === 0) {
      throw new Error('Empty response from Claude API');
    }
    
    const responseText = message.content[0].text;
    
    if (!responseText || responseText.trim().length === 0) {
      throw new Error('No text content in Claude API response');
    }
    
    // Clean up the response - remove markdown code blocks if present
    let modifiedCode = responseText.trim();
    if (modifiedCode.startsWith('```javascript')) {
      modifiedCode = modifiedCode.replace(/^```javascript\n?/, '').replace(/\n?```$/, '');
    } else if (modifiedCode.startsWith('```js')) {
      modifiedCode = modifiedCode.replace(/^```js\n?/, '').replace(/\n?```$/, '');
    } else if (modifiedCode.startsWith('```')) {
      modifiedCode = modifiedCode.replace(/^```\n?/, '').replace(/\n?```$/, '');
    }

    // Return the modified code
    res.json({
      success: true,
      code: modifiedCode
    });

  } catch (error) {
    console.error('Error modifying template:', error);
    console.error('Error stack:', error.stack);
    
    // Provide more detailed error information
    let errorMessage = error.message || 'Unknown error';
    let errorDetails = {};
    
    if (error.response) {
      // API error response
      errorDetails = {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data
      };
      errorMessage = `Claude API error: ${error.response.status} - ${error.response.statusText}`;
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = 'No response from Claude API';
      errorDetails = { request: 'Made but no response' };
    }
    
    res.status(500).json({
      error: 'Failed to modify template',
      message: errorMessage,
      details: errorDetails
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Template generator server running on port ${PORT}`);
  console.log(`CORS enabled for: ${CORS_ORIGIN}`);
});

