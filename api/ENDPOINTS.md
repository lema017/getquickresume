# API Endpoints List

## Authentication Endpoints (Public - No Authorizer)
- **POST** `/api/auth/google` - Google OAuth authentication
- **POST** `/api/auth/linkedin` - LinkedIn OAuth authentication  
- **GET** `/api/auth/validate` - Validate JWT token

## Resume Endpoints (Protected by Authorizer)
- **POST** `/api/resume/generate` - Generate resume with AI (rate limited: 5/min)
- **GET** `/api/resumes` - List user resumes
- **GET** `/api/resumes/{id}` - Get specific resume
- **POST** `/api/resumes` - Create resume
- **PUT** `/api/resumes/{id}` - Update resume
- **DELETE** `/api/resumes/{id}` - Delete resume
- **POST** `/api/resumes/{id}/score` - Score resume with AI
- **GET** `/api/resumes/{id}/score` - Get resume score

## Suggestions Endpoints (Protected by Authorizer)
- **GET** `/api/suggestions/{profession}` - Get profession suggestions
- **POST** `/api/achievements/suggestions` - Generate achievement suggestions
- **POST** `/api/summary/suggestions` - Generate summary suggestions
- **POST** `/api/experience-achievements/suggestions` - Get job title achievement suggestions

## Templates Endpoints
- **GET** `/api/templates` - List resume templates (Protected by Authorizer)
- **POST** `/api/templates` - Create template (Public - No Authorizer, for local use)

## AI Endpoints (Protected by Authorizer)
- **POST** `/api/ai/enhance` - Enhance text with AI
- **POST** `/api/ai/improve-section` - Improve resume section with AI (rate limited: 10/min)
- **POST** `/api/ai/generate-enhancement-questions` - Generate enhancement questions (premium only)
- **POST** `/api/ai/generate-answer-suggestion` - Generate answer suggestion (premium only)

## LinkedIn Import (Protected by Authorizer)
- **POST** `/api/linkedInData` - Parse LinkedIn data and create resume (rate limited: 5/min)

## Authorization Summary

**Protected by Lambda Authorizer (18 endpoints):**
All endpoints listed above as "Protected by Authorizer" use the `authorize` Lambda function which:
- Validates JWT token from `Authorization` header
- Token format: `Bearer <JWT_TOKEN>`
- Authorization results are cached for 5 minutes (`resultTtlInSeconds: 300`)
- Identity source: `method.request.header.Authorization`

**Public Endpoints (4 endpoints - No Authorizer):**
- `POST /api/auth/google`
- `POST /api/auth/linkedin`
- `GET /api/auth/validate`
- `POST /api/templates` (public for local development use)

## Notes
- Serverless-offline runs on `http://localhost:3001` in dev mode
- Rate limits are enforced per user per endpoint
- Premium-only endpoints require `isPremium: true` user flag

## Deprecated/Not Implemented
The following endpoints are documented but not currently implemented in `serverless.yml`:
- **User Token Endpoints**: `/api/user/tokens` (GET, POST) - System now uses free/premium model instead of tokens
- **Job Interest Endpoints**: `/api/job-interests/*` - Not implemented in current serverless configuration

