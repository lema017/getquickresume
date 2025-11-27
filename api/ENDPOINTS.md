# API Endpoints List

## Authentication Endpoints
- **POST** `/api/auth/google` - Google OAuth authentication
- **POST** `/api/auth/linkedin` - LinkedIn OAuth authentication  
- **GET** `/api/auth/validate` - Validate JWT token

## User Endpoints
- **GET** `/api/user/tokens` - Get user tokens (requires auth)
- **POST** `/api/user/tokens/reduce` - Reduce user tokens (requires auth)

## Resume Endpoints
- **POST** `/api/resume/generate` - Generate resume with AI (requires auth, consumes 5 tokens)
- **GET** `/api/resumes` - List user resumes (requires auth)
- **GET** `/api/resumes/{id}` - Get specific resume (requires auth)
- **POST** `/api/resumes` - Create resume (requires auth)
- **PUT** `/api/resumes/{id}` - Update resume (requires auth)
- **DELETE** `/api/resumes/{id}` - Delete resume (requires auth)

## Job Interest Endpoints
- **GET** `/api/job-interests` - List job interests (requires auth)
- **GET** `/api/job-interests/{id}` - Get specific job interest (requires auth)
- **POST** `/api/job-interests` - Create job interest (requires auth)
- **PUT** `/api/job-interests/{id}` - Update job interest (requires auth)
- **DELETE** `/api/job-interests/{id}` - Delete job interest (requires auth)
- **POST** `/api/job-interests/{id}/optimize` - Optimize resume for job (requires auth, consumes 5 tokens)

## Suggestions Endpoints
- **GET** `/api/suggestions/{profession}` - Get profession suggestions (requires auth)
- **POST** `/api/achievements/suggestions` - Generate achievement suggestions (requires auth)
- **POST** `/api/summary/suggestions` - Generate summary suggestions (requires auth)
- **POST** `/api/experience-achievements/suggestions` - Get job title achievement suggestions (requires auth)

## Templates Endpoints
- **GET** `/api/templates` - List resume templates (requires auth)
- **POST** `/api/templates` - Create template (public, for local use)

## AI Endpoints
- **POST** `/api/ai/enhance` - Enhance text with AI (requires auth)
- **POST** `/api/ai/improve-section` - Improve resume section with AI (requires auth)

## LinkedIn Import
- **POST** `/api/linkedInData` - Parse LinkedIn data and create resume (requires auth)

## Notes
- All endpoints except `/api/auth/*` and `/api/templates` (POST) require authentication via JWT token in Authorization header
- Token format: `Bearer <JWT_TOKEN>`
- Resume generation and optimization consume 5 tokens each
- Serverless-offline runs on `http://localhost:3001` in dev mode

