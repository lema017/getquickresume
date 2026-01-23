# GetQuickResume - Project Context & Architecture

> **Quick Context README** - Comprehensive overview of the GetQuickResume application for rapid onboarding and development

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [API Endpoints](#api-endpoints)
- [DynamoDB Tables](#dynamodb-tables)
- [AI Integration](#ai-integration)
- [Security & Authentication](#security--authentication)
- [Rate Limiting](#rate-limiting)
- [UI Pages & Flows](#ui-pages--flows)
- [Monetization](#monetization)
- [Deployment](#deployment)

---

## 🎯 Project Overview

**GetQuickResume** is an AI-powered professional resume builder platform that helps users create, optimize, translate, and share resumes. The application features a freemium model with token-based premium features.

### Main Functionality

- **Resume Creation**: 7-step wizard for building professional resumes
- **AI Optimization**: Enhance resume content using GPT-4o and Groq models
- **Multi-language Translation**: Translate resumes to 5 languages (EN, ES, AR, ZH, HI)
- **Cover Letter Generation**: AI-powered cover letter creation
- **Job Tailoring**: Customize resumes for specific job postings
- **Resume Sharing**: Public sharing with analytics and view tracking
- **Resume Scoring**: ATS compatibility scoring
- **Document Upload**: Extract resume data from uploaded documents

### Key Features

- OAuth 2.0 authentication (Google, LinkedIn)
- Freemium model with token-based premium features
- PayPal payment integration
- Real-time AI suggestions and enhancements
- Resume templates system
- Support ticket system
- Download tracking and analytics

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router DOM v6
- **Forms**: React Hook Form + Zod validation
- **i18n**: react-i18next (Spanish & English)
- **UI Components**: Lucide React icons
- **PDF Generation**: jsPDF, html2pdf.js, pdfkit
- **Document Parsing**: mammoth (Word docs), pdfjs-dist

### Backend
- **Runtime**: Node.js 18.x
- **Framework**: AWS Lambda (Serverless Framework)
- **Language**: TypeScript
- **API Gateway**: AWS API Gateway with custom domain
- **Database**: DynamoDB (10 tables)
- **Storage**: S3 (templates bucket)
- **Email**: AWS SES
- **Authentication**: JWT with custom Lambda authorizer

### AI Services
- **Primary AI**: OpenAI GPT-4o, GPT-4o-mini
- **Secondary AI**: Groq (llama-3.3-70b-versatile, llama-3.1-70b-versatile)
- **Use Cases**:
  - Resume generation and optimization
  - Cover letter generation
  - Translation services
  - Job tailoring
  - Content validation
  - Achievement suggestions
  - Resume extraction from documents

### Infrastructure (AWS)
- **Compute**: Lambda Functions (50+ functions)
- **API**: API Gateway with custom authorizer
- **Database**: DynamoDB (PAY_PER_REQUEST billing)
- **Storage**: S3 with versioning
- **CDN**: CloudFront distribution
- **DNS**: Route 53
- **SSL**: ACM certificates
- **Secrets**: SSM Parameter Store
- **Email**: SES

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────┐
│   CloudFront    │ ← HTTPS (getquickresume.com)
└────────┬────────┘
         │
    ┌────▼─────┐
    │   S3     │ ← Frontend (React SPA)
    └──────────┘

┌─────────────────┐
│  API Gateway    │ ← HTTPS (api.getquickresume.com)
└────────┬────────┘
         │
    ┌────▼─────────────┐
    │ Lambda Authorizer│ ← JWT validation
    └────────┬─────────┘
             │
    ┌────────▼────────┐
    │ Lambda Functions│ ← 50+ handlers
    └────┬────────────┘
         │
    ┌────▼─────┐
    │ DynamoDB │ ← 10 tables
    └──────────┘

External Services:
- OpenAI API (GPT-4o)
- Groq API (Llama models)
- PayPal API (payments)
- Google OAuth
- LinkedIn OAuth
```

### Project Structure

```
getquickresume/
├── api/                          # Backend serverless API
│   ├── src/
│   │   ├── handlers/            # Lambda function handlers (50+)
│   │   ├── services/            # Business logic services
│   │   ├── utils/               # Utility functions
│   │   └── types/               # TypeScript types
│   ├── serverless.yml           # API infrastructure config
│   └── package.json
│
├── src/                         # Frontend React application
│   ├── components/              # Reusable UI components
│   ├── pages/                   # Page components (20+)
│   ├── stores/                  # Zustand state stores
│   ├── services/                # API client services
│   ├── hooks/                   # Custom React hooks
│   ├── i18n/                    # Internationalization
│   ├── types/                   # TypeScript types
│   └── utils/                   # Utility functions
│
├── templates/                   # Resume templates (excluded from scan)
├── serverless.yml              # Frontend S3/CloudFront config
└── package.json
```

---

## 🔌 API Endpoints

### Authentication & User Management

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/google` | POST | No | Google OAuth authentication |
| `/api/auth/linkedin` | POST | No | LinkedIn OAuth authentication |
| `/api/auth/validate` | GET | Yes | Validate JWT token |
| `/api/user/me` | GET | Yes | Get current user profile |

### Resume Management

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/resumes` | GET | Yes | List user's resumes |
| `/api/resumes` | POST | Yes | Create new resume |
| `/api/resumes/{id}` | GET | Yes | Get resume by ID |
| `/api/resumes/{id}` | PUT | Yes | Update resume |
| `/api/resumes/{id}` | DELETE | Yes | Delete resume |
| `/api/resume/generate` | POST | Yes | Generate resume with AI |
| `/api/resumes/{id}/translate` | POST | Yes | Translate resume |
| `/api/resumes/{id}/score` | POST | Yes | Score resume (ATS) |
| `/api/resumes/{id}/score` | GET | Yes | Get resume score |
| `/api/resumes/{id}/download/track` | POST | Yes | Track resume download |

### Resume Sharing

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/resumes/{id}/share` | POST | Yes | Enable resume sharing |
| `/api/resumes/{id}/share` | DELETE | Yes | Disable resume sharing |
| `/api/resumes/{id}/share/analytics` | GET | Yes | Get sharing analytics |
| `/api/public/resume/{shareToken}` | GET | No | View public resume |
| `/api/public/resume/{shareToken}/view` | POST | No | Record public view |
| `/api/public/share/{shareToken}/recent-viewers` | GET | No | Get recent viewers |

### Cover Letters

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/cover-letters` | GET | Yes | List cover letters |
| `/api/cover-letters` | POST | Yes | Create cover letter |
| `/api/cover-letters/{id}` | GET | Yes | Get cover letter |
| `/api/cover-letters/{id}` | PUT | Yes | Update cover letter |
| `/api/cover-letters/{id}` | DELETE | Yes | Delete cover letter |
| `/api/cover-letters/generate` | POST | Yes | Generate with AI |
| `/api/cover-letters/{id}/regenerate` | POST | Yes | Regenerate paragraph |
| `/api/cover-letters/suggest-why-company` | POST | Yes | AI company suggestion |
| `/api/cover-letters/enhance-achievement` | POST | Yes | AI achievement enhancement |

### Job Tailoring

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/job-tailoring/validate-url` | POST | Yes | Validate job posting URL |
| `/api/job-tailoring/analyze` | POST | Yes | Analyze job posting |
| `/api/job-tailoring/questions` | POST | Yes | Generate clarification questions |
| `/api/job-tailoring/enhance-answer` | POST | Yes | Enhance answer with AI |
| `/api/job-tailoring/generate` | POST | Yes | Generate tailored resume |
| `/api/job-tailoring/save` | POST | Yes | Save tailored resume |
| `/api/job-tailoring/limits` | GET | Yes | Get usage limits |

### AI Enhancement Features

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/suggestions/{profession}` | GET | Yes | Get profession suggestions |
| `/api/achievements/suggestions` | POST | Yes | Generate achievement suggestions |
| `/api/summary/suggestions` | POST | Yes | Generate summary suggestions |
| `/api/experience-achievements/suggestions` | POST | Yes | Job title achievements |
| `/api/ai/enhance` | POST | Yes | Enhance text with AI |
| `/api/ai/improve-section` | POST | Yes | Improve resume section |
| `/api/ai/generate-enhancement-questions` | POST | Yes | Generate questions (Premium) |
| `/api/ai/generate-answer-suggestion` | POST | Yes | Answer suggestions (Premium) |
| `/api/ai/direct-enhance` | POST | Yes | Direct enhancement (Premium) |

### Document Processing

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/resume-extraction/extract` | POST | Yes | Extract resume from document |
| `/api/resume/validate-section` | POST | Yes | Validate section data |
| `/api/validate-profession` | POST | Yes | Validate profession (LinkedIn) |
| `/api/linkedInData` | POST | Yes | Parse LinkedIn data |

### Templates & Support

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/templates` | GET | Yes | List resume templates |
| `/api/templates` | POST | No | Create template (local dev) |
| `/api/support/tickets` | GET | Yes | List user tickets |
| `/api/support/tickets` | POST | Yes | Create support ticket |
| `/api/support/tickets/{ticketId}` | GET | Yes | Get ticket details |

### Payment (PayPal)

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/paypal/create-order` | POST | Yes | Create PayPal order |
| `/api/paypal/capture-order` | POST | Yes | Capture PayPal payment |

### Scheduled Tasks

| Function | Schedule | Description |
|----------|----------|-------------|
| `expireSubscriptions` | Daily | Expire premium subscriptions |

---

## 🗄️ DynamoDB Tables

### 1. Users Table
**Table**: `getquickresume-api-users-{stage}`

- **Primary Key**: `id` (String)
- **GSI**: `email-index` (email)
- **Attributes**:
  - User profile data (name, email, avatar)
  - Authentication provider (google, linkedin)
  - Premium status and tokens
  - Subscription details
  - Created/updated timestamps

### 2. Resumes Table
**Table**: `getquickresume-api-resumes-{stage}`

- **Primary Key**: `userId` (HASH), `resumeId` (RANGE)
- **GSI**: 
  - `resumeId-index` (resumeId)
  - `shareToken-index` (shareToken)
- **Attributes**:
  - Resume data (personal info, experience, education, skills)
  - Generated resume content
  - Status (draft, generated, optimized)
  - Sharing configuration
  - View count and analytics
  - Translations

### 3. Cover Letters Table
**Table**: `getquickresume-api-cover-letters-{stage}`

- **Primary Key**: `userId` (HASH), `coverLetterId` (RANGE)
- **Attributes**:
  - Cover letter content
  - Associated resume ID
  - Job details
  - Generation metadata

### 4. Resume Views Table
**Table**: `getquickresume-api-resume-views-{stage}`

- **Primary Key**: `shareToken` (HASH), `viewedAt` (RANGE)
- **Attributes**:
  - Viewer information
  - View timestamp
  - Viewer location/metadata

### 5. Profession Suggestions Table
**Table**: `getquickresume-api-profession-suggestions-{stage}`

- **Primary Key**: `profession` (String)
- **Attributes**:
  - Cached AI suggestions for professions
  - Skills, tools, responsibilities

### 6. Validated Professions Table
**Table**: `getquickresume-api-validated-professions-{stage}`

- **Primary Key**: `professionKey` (String)
- **Attributes**:
  - Validated profession data
  - Normalization results

### 7. Job Title Achievements Table
**Table**: `getquickresume-api-job-title-achievements-{stage}`

- **Primary Key**: `jobTitle` (String)
- **Attributes**:
  - Cached achievement suggestions by job title
  - AI-generated examples

### 8. Rate Limits Table
**Table**: `getquickresume-api-rate-limits-{stage}`

- **Primary Key**: `key` (String)
- **TTL**: Enabled on `ttl` attribute
- **Attributes**:
  - Rate limiting counters
  - Expiration timestamps

### 9. Templates Table
**Table**: `getquickresume-api-templates-{stage}`

- **Primary Key**: `id` (String)
- **Attributes**:
  - Template metadata
  - S3 bucket reference
  - Template configuration

### 10. Support Tickets Table
**Table**: `getquickresume-api-support-tickets-{stage}`

- **Primary Key**: `ticketId` (String)
- **GSI**: `userId-index` (userId)
- **Attributes**:
  - Ticket details
  - User messages
  - Status and priority

### 11. AI Usage Logs Table
**Table**: `getquickresume-api-ai-usage-logs-{stage}`

- **Primary Key**: `id` (String)
- **GSI**: 
  - `userId-index` (userId, timestamp)
  - `resumeId-index` (resumeId, timestamp)
- **TTL**: Enabled on `ttl` attribute
- **Attributes**:
  - AI provider and model used
  - Token usage
  - Cost tracking
  - Request/response metadata

---

## 🤖 AI Integration

### AI Providers

#### OpenAI (Primary)
- **Models**: 
  - `gpt-4o` - Main model for premium features
  - `gpt-4o-mini` - Cost-effective for suggestions
- **Use Cases**:
  - Resume generation
  - Cover letter generation
  - Content optimization
  - Translation
  - Achievement suggestions
  - Summary generation

#### Groq (Secondary)
- **Models**:
  - `llama-3.3-70b-versatile` - Fast inference
  - `llama-3.1-70b-versatile` - Alternative model
- **Use Cases**:
  - Job tailoring
  - Resume extraction
  - Content validation
  - Profession validation
  - Cover letter enhancements

### AI Features & Prompts

#### 1. Resume Generation
- **Model**: GPT-4o
- **Prompt Type**: Structured resume enhancement
- **Input**: Raw resume data from wizard
- **Output**: Professional formatted resume with optimized content

#### 2. Resume Translation
- **Model**: GPT-4o
- **Languages**: English, Spanish, Arabic, Chinese, Hindi
- **Prompt Type**: Professional translation maintaining format
- **Input**: Resume in source language
- **Output**: Translated resume preserving structure

#### 3. Cover Letter Generation
- **Model**: GPT-4o / Groq
- **Prompt Type**: Personalized cover letter creation
- **Input**: Resume data + job description
- **Output**: 3-paragraph cover letter

#### 4. Job Tailoring
- **Model**: Groq (Llama 3.3)
- **Prompt Type**: Resume customization for job posting
- **Input**: Resume + job posting URL/description
- **Output**: Tailored resume highlighting relevant experience

#### 5. Resume Scoring
- **Model**: GPT-4o
- **Prompt Type**: ATS compatibility analysis
- **Input**: Resume content
- **Output**: Score (0-100) with improvement suggestions

#### 6. Achievement Suggestions
- **Model**: GPT-4o
- **Prompt Type**: STAR method achievement generation
- **Input**: Job title + responsibilities
- **Output**: Quantifiable achievement examples

#### 7. Resume Extraction
- **Model**: Groq (Llama 3.3)
- **Prompt Type**: Structured data extraction
- **Input**: Plain text from uploaded document
- **Output**: Structured resume data (JSON)

### AI Usage Tracking

All AI requests are logged in the `AI Usage Logs` table with:
- Provider and model
- Token counts (input/output)
- Cost calculation
- User and resume association
- Timestamp and TTL

---

## 🔒 Security & Authentication

### Authentication Flow

1. **OAuth 2.0 Providers**:
   - Google OAuth (OIDC)
   - LinkedIn OAuth (PKCE flow)

2. **JWT Token Generation**:
   - Issued after successful OAuth
   - Stored in `localStorage`
   - Contains user ID and email
   - Secret stored in SSM Parameter Store

3. **Lambda Authorizer**:
   - Custom authorizer validates JWT
   - Attached to all protected endpoints
   - Returns IAM policy for API Gateway
   - No caching (resultTtlInSeconds: 0)

### Security Features

- **CORS Configuration**: Strict origin control
- **HTTPS Only**: TLS 1.2+ enforced
- **Private S3 Buckets**: CloudFront OAC access only
- **API Key Protection**: Secrets in SSM Parameter Store
- **Input Validation**: Zod schemas on frontend, validation on backend
- **Rate Limiting**: DynamoDB-based rate limiting with TTL
- **SQL Injection Prevention**: DynamoDB (NoSQL)
- **XSS Prevention**: React auto-escaping + Content Security Policy

### Secrets Management (SSM)

All secrets stored in AWS Systems Manager Parameter Store:
- `/getquickresume/{stage}/google-client-id`
- `/getquickresume/{stage}/google-client-secret`
- `/getquickresume/{stage}/linkedin-client-id`
- `/getquickresume/{stage}/linkedin-client-secret`
- `/getquickresume/{stage}/jwt-secret`
- `/getquickresume/{stage}/openai-api-key`
- `/getquickresume/{stage}/groq-api-key`
- `/getquickresume/{stage}/paypal-client-id`
- `/getquickresume/{stage}/paypal-client-secret`
- `/getquickresume/{stage}/paypal-environment`
- `/getquickresume/{stage}/premium-ai-provider`

---

## ⏱️ Rate Limiting

### Implementation

- **Storage**: DynamoDB `rate-limits` table with TTL
- **Key Format**: `{userId}:{feature}:{window}`
- **Window**: Configurable per feature (e.g., 1 hour, 1 day)
- **Cleanup**: Automatic via DynamoDB TTL

### Rate Limits by Feature

| Feature | Free Tier | Premium |
|---------|-----------|---------|
| Resume Generation | 3/day | Unlimited |
| AI Enhancements | 5/day | Unlimited |
| Translations | 1/day | Unlimited |
| Cover Letters | 2/day | Unlimited |
| Job Tailoring | 1/day | 10/day |
| Resume Scoring | 3/day | Unlimited |
| Public Resume Views | 100/hour | N/A |

### Rate Limit Responses

```json
{
  "success": false,
  "error": "Rate limit exceeded",
  "message": "You have exceeded the rate limit for this feature. Please try again later.",
  "retryAfter": 3600
}
```

---

## 🎨 UI Pages & Flows

### Public Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | LandingPage | Hero, features, CTAs, pricing |
| `/login` | LoginPage | OAuth login (Google, LinkedIn) |
| `/pricing` | PricingPage | Premium plans and pricing |
| `/contact` | ContactPage | Contact form |
| `/about` | AboutPage | About the platform |
| `/legal/privacy` | PrivacyPage | Privacy policy |
| `/legal/terms` | TermsPage | Terms of service |
| `/legal/refund` | RefundPolicyPage | Refund policy |
| `/blog` | BlogPage | Blog listing |
| `/blog/how-to-make-good-resume` | Article | Resume tips |
| `/blog/what-is-ats-system` | Article | ATS explanation |
| `/share/{shareToken}` | PublicResumePage | Public resume view |
| `/thank-you` | ThankYouPage | Post-payment confirmation |

### Protected Pages (Require Authentication)

| Route | Component | Description |
|-------|-----------|-------------|
| `/dashboard` | DashboardPage | User dashboard, resume list |
| `/wizard/*` | WizardPage | 7-step resume creation wizard |
| `/resume/{id}` | ResumeViewPage | View/edit resume |
| `/resume/{id}/share` | ResumeSharePage | Resume sharing settings |
| `/cover-letter/{id?}` | CoverLetterPage | Cover letter editor |
| `/job-tailoring/{resumeId?}` | JobTailoringPage | Job tailoring wizard |
| `/premium` | PremiumPage | Premium features and token purchase |
| `/account` | AccountPage | User profile and settings |
| `/support` | SupportPage | Support ticket system |

### User Flows

#### 1. Resume Creation Flow
```
Landing → Login (OAuth) → Dashboard → Wizard (7 steps) → Resume View → Download/Share
```

**Wizard Steps**:
1. **Professional Profile**: Name, profession, level, tone
2. **Skills**: Technical and soft skills
3. **Experience**: Work history with achievements
4. **Education**: Academic background (optional)
5. **Projects & Languages**: Portfolio and language proficiency
6. **Summary**: Professional summary
7. **Review**: Preview and download

#### 2. Cover Letter Flow
```
Dashboard → Cover Letter Page → Generate with AI → Edit → Download
```

#### 3. Job Tailoring Flow
```
Dashboard → Job Tailoring → Paste Job URL → AI Analysis → Answer Questions → Generate Tailored Resume
```

#### 4. Premium Purchase Flow
```
Any Page → Premium CTA → Pricing Page → PayPal Checkout → Thank You Page → Dashboard (tokens added)
```

#### 5. Resume Sharing Flow
```
Resume View → Enable Sharing → Copy Link → Share → Analytics Dashboard
```

---

## 💰 Monetization

### Freemium Model

#### Free Tier
- ✅ Unlimited resume creation
- ✅ Basic templates
- ✅ Manual resume building
- ✅ PDF download
- ❌ AI enhancements (limited)
- ❌ Translations (1/day)
- ❌ Job tailoring (1/day)
- ❌ Cover letters (2/day)

#### Premium Tier (Token-based)

**Token Packages**:

| Package | Tokens | Price | Best For |
|---------|--------|-------|----------|
| Starter | 100 | $4.99 | Try premium features |
| Pro | 300 | $9.99 | Regular job seekers |
| Expert | 1000 | $19.99 | Active job hunting |
| Lifetime | ∞ | $49.99 | Unlimited access |

**Token Costs**:
- Resume AI Generation: 5 tokens
- Resume Translation: 3 tokens
- Cover Letter Generation: 4 tokens
- Job Tailoring: 5 tokens
- AI Enhancement: 2 tokens
- Resume Scoring: 2 tokens

### Payment Integration

- **Provider**: PayPal
- **Flow**: 
  1. Create order (`/api/paypal/create-order`)
  2. User approves on PayPal
  3. Capture order (`/api/paypal/capture-order`)
  4. Update user tokens in DynamoDB
  5. Redirect to thank you page

### Revenue Tracking

- User purchases logged in Users table
- Transaction history maintained
- Subscription expiration handling (daily cron)

---

## 🚀 Deployment

### Environments

#### Development
- **Frontend**: `http://localhost:3000`
- **API**: `http://localhost:3001/dev`
- **DynamoDB**: Local (port 8000)

#### Production
- **Frontend**: `https://getquickresume.com`
- **API**: `https://api.getquickresume.com`
- **DynamoDB**: AWS DynamoDB
- **CDN**: CloudFront

### Deployment Commands

```bash
# Frontend
npm run build:prod
npm run deploy:frontend        # Deploys to S3 + CloudFront
npm run invalidate:cloudfront  # Invalidate CDN cache

# API
cd api
npm run deploy:api             # Deploys Lambda functions + API Gateway

# Development
npm run dev                    # Frontend dev server
cd api && npm run offline      # API local development
```

### Infrastructure

#### Frontend (S3 + CloudFront)
- **S3 Bucket**: `getquickresume.com`
- **CloudFront**: HTTPS with ACM certificate
- **Route 53**: DNS for `getquickresume.com`
- **Caching**: Optimized cache policy
- **Error Handling**: SPA routing (403/404 → index.html)

#### API (Lambda + API Gateway)
- **Custom Domain**: `api.getquickresume.com`
- **Certificate**: ACM certificate (us-east-1)
- **CORS**: Configured for frontend origin
- **Authorizer**: Custom Lambda JWT authorizer
- **Timeout**: 30-120s depending on function
- **Memory**: Default Lambda settings

#### Database (DynamoDB)
- **Billing**: PAY_PER_REQUEST (on-demand)
- **Backup**: Point-in-time recovery
- **Encryption**: At rest (AWS managed)

---

## 📊 Key Metrics & Analytics

### Tracked Metrics

1. **Resume Analytics**:
   - Total resumes created
   - Resumes by status (draft, generated, optimized)
   - Download count per resume
   - Sharing enabled count

2. **Public Sharing Analytics**:
   - Total views per shared resume
   - Unique viewers
   - Recent viewers (last 10)
   - View timestamps and locations

3. **AI Usage**:
   - Total AI requests
   - Tokens consumed by user
   - Cost per user
   - Model usage distribution

4. **User Metrics**:
   - Total users
   - Premium vs Free users
   - Token balance distribution
   - Active users (last 30 days)

5. **Support Tickets**:
   - Open tickets
   - Resolved tickets
   - Average resolution time

---

## 🔧 Development Setup

### Prerequisites
- Node.js 18+
- AWS CLI configured
- Serverless Framework
- DynamoDB Local (for API development)

### Environment Variables

**Frontend** (`.env.local`):
```env
VITE_API_URL=http://localhost:3001/dev
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_LINKEDIN_CLIENT_ID=your-linkedin-client-id
VITE_PAYPAL_CLIENT_ID=your-paypal-client-id
```

**API** (`api/.env.local`):
```env
DYNAMODB_ENDPOINT=http://localhost:8000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret
JWT_SECRET=your-jwt-secret
OPENAI_API_KEY=your-openai-key
GROQ_API_KEY=your-groq-key
PAYPAL_CLIENT_ID=your-paypal-client-id
PAYPAL_CLIENT_SECRET=your-paypal-client-secret
```

### Local Development

```bash
# Install dependencies
npm install
cd api && npm install

# Start DynamoDB Local
cd api && npm run dynamodb:start

# Start API (in api directory)
npm run offline

# Start Frontend (in root directory)
npm run dev
```

---

## 📚 Additional Documentation

- **API Specification**: `api/API-SPEC.md`
- **Endpoints Reference**: `api/ENDPOINTS.md`
- **Local Development**: `api/LOCAL_DEVELOPMENT.md`
- **Deployment Guide**: `DEPLOYMENT.md`
- **Features Summary**: `FEATURES_SUMMARY.md`
- **Product Requirements**: `PRODUCT_REQUIREMENT_DOCUMENT.md`
- **Template Logic**: `TEMPLATE_HYDRATION_LOGIC.md`
- **Premium Checkout**: `PREMIUM_CHECKOUT_DESCRIPTION.md`
- **Monetization**: `Monetizacion.md`

---

## 🎯 Quick Reference

### Most Used API Endpoints
1. `/api/auth/google` - User authentication
2. `/api/resumes` - Resume CRUD
3. `/api/resume/generate` - AI resume generation
4. `/api/resumes/{id}/translate` - Translation
5. `/api/cover-letters/generate` - Cover letter AI

### Most Important Tables
1. `users` - User accounts and tokens
2. `resumes` - Resume data and metadata
3. `ai-usage-logs` - AI cost tracking
4. `rate-limits` - Rate limiting

### Critical Environment Variables
- `OPENAI_API_KEY` - Primary AI provider
- `GROQ_API_KEY` - Secondary AI provider
- `JWT_SECRET` - Authentication security
- `PAYPAL_CLIENT_ID/SECRET` - Payment processing

---

**Last Updated**: 2026-01-22
**Version**: 1.0.0
**Maintainer**: GetQuickResume Team
