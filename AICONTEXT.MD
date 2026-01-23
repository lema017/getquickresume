# GetQuickResume - AI Context Document

> This document provides comprehensive context about the GetQuickResume project for AI assistants.

## Project Overview

**Name**: GetQuickResume  
**Purpose**: AI-powered resume builder platform for creating, optimizing, translating, and sharing professional resumes  
**Domain**: `getquickresume.com` (production), `api.getquickresume.com` (API)  
**Model**: Freemium SaaS

---

## Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router DOM v6
- **Forms**: React Hook Form + Zod validation
- **i18n**: react-i18next (Spanish & English)
- **UI**: Lucide React icons, React Hot Toast
- **PDF Generation**: jsPDF, html2pdf.js, pdfkit
- **Document Parsing**: mammoth (Word), pdfjs-dist (PDF)
- **Auth**: Google OAuth, LinkedIn OAuth

### Backend
- **Runtime**: Node.js 18.x
- **Framework**: AWS Lambda (Serverless Framework)
- **Language**: TypeScript
- **API**: AWS API Gateway with custom domain
- **Database**: DynamoDB (10+ tables, PAY_PER_REQUEST)
- **Storage**: S3 (templates bucket)
- **Email**: AWS SES
- **Auth**: JWT with custom Lambda authorizer
- **Secrets**: AWS SSM Parameter Store

### AI Services
- **Primary**: OpenAI GPT-4o, GPT-4o-mini
- **Secondary**: Groq (llama-3.3-70b-versatile, llama-3.1-70b-versatile)
- **Use Cases**: Resume generation, translation, cover letters, job tailoring, content validation, achievement suggestions

---

## Folder Structure

```
getquickresume/
├── api/                       # Backend serverless API
│   ├── src/
│   │   ├── handlers/          # 25+ Lambda handlers
│   │   ├── services/          # Business logic services
│   │   ├── middleware/        # Rate limiting, auth
│   │   ├── utils/             # Utilities (sanitizer, validator)
│   │   └── types.ts           # TypeScript types
│   ├── serverless.yml         # API infrastructure config
│   └── package.json
│
├── src/                       # Frontend React app
│   ├── components/            # 60+ reusable components
│   │   ├── wizard/            # Resume creation wizard
│   │   ├── job-tailoring/     # Job tailoring feature
│   │   ├── cover-letter/      # Cover letter components
│   │   └── ...
│   ├── pages/                 # 20+ page components
│   ├── stores/                # Zustand state stores
│   ├── services/              # API client services
│   ├── hooks/                 # Custom React hooks
│   ├── i18n/                  # Internationalization (en, es)
│   ├── types/                 # TypeScript types
│   └── utils/                 # Utility functions
│
├── templates/                 # Resume templates system
├── serverless.yml             # Frontend S3/CloudFront config
└── package.json
```

---

## Main Features

### 1. Resume Creation
- **7-Step Wizard**: Professional profile → Skills → Experience → Education → Projects/Languages → Summary → Review
- **LinkedIn Import**: Parse LinkedIn profile data (Premium)
- **Resume Upload**: Extract data from uploaded documents (PDF/Word)
- **Auto-save**: Real-time saving during wizard

### 2. AI-Powered Features
- **Resume Generation**: Full AI-generated resumes from user data
- **AI Enhancements**: Text enhancement, section improvement, achievement suggestions
- **Resume Scoring**: ATS compatibility scoring (0-10 scale) with detailed feedback
- **Translation**: Multi-language support (10 languages)
- **Job Tailoring**: Customize resumes for specific job postings with AI analysis
- **Cover Letter Generation**: AI-powered personalized cover letters

### 3. Resume Management
- **CRUD Operations**: Create, read, update, delete resumes
- **Status Tracking**: Draft → Generated → Optimized
- **Resume Dashboard**: View all resumes with quick actions
- **Templates**: Multiple professional resume templates

### 4. Sharing & Analytics (Premium)
- **Public Sharing**: Generate shareable links with QR codes
- **Analytics**: View tracking, device/browser analytics, location tracking
- **Download Tracking**: Track resume downloads

### 5. User Management
- **Authentication**: OAuth 2.0 (Google, LinkedIn)
- **Freemium Model**: Free tier (1 resume) + Premium tier (unlimited)
- **Payment**: PayPal integration for premium subscriptions
- **Support System**: Ticket-based support system

---

## Free vs Premium Features

### Free Plan ($0 forever)

| Feature | Limit |
|---------|-------|
| AI-Generated Resumes | 1 (lifetime) |
| PDF Downloads | 1 (lifetime) |
| Cover Letters | 1 (lifetime) |
| Job-Tailored Resumes | 1 (lifetime) |
| Resume Templates | Basic only |
| Resume Editing | Only for free resume |
| AI Suggestions | Only if free resume not used |
| Resume Scoring | Limited (hints only, no detailed checklist) |
| Email Support | ✓ |

### Premium Plan ($15/month or $126/year)

| Feature | Limit |
|---------|-------|
| AI-Generated Resumes | 40/month |
| PDF Downloads | Unlimited |
| Cover Letters | Unlimited |
| Job-Tailored Resumes | 40/month |
| Resume Templates | All premium templates |
| Resume Editing | All resumes |
| AI Enhancements | Full access (text, sections, questions) |
| Resume Scoring | Full ATS analysis + detailed checklist |
| Resume Translation | 10+ languages |
| LinkedIn Import | ✓ |
| Resume Sharing | QR codes + analytics |
| Priority Support | ✓ |

### Rate Limits Comparison

| Feature | Free Users | Premium Users |
|---------|-----------|---------------|
| Resume Generation | 1/min | 5/min |
| AI Text Enhancement | 3/min | 10/min |
| AI Section Improvement | 1/min | 10/min |
| Summary Suggestions | 1/min | 10/min |
| Resume Scoring | 1/min | 5/min |
| Job Tailoring - Analyze | 5/min | 20/min |
| Job Tailoring - Generate | 2/min | 10/min |

---

## API Endpoints Summary

### Authentication
- `POST /api/auth/google` - Google OAuth
- `POST /api/auth/linkedin` - LinkedIn OAuth
- `GET /api/auth/validate` - Validate JWT token
- `GET /api/user/me` - Get current user profile

### Resume Management
- `POST /api/resume/generate` - Generate AI resume
- `GET /api/resumes` - List all resumes
- `GET /api/resumes/{id}` - Get specific resume
- `POST /api/resumes` - Create resume
- `PUT /api/resumes/{id}` - Update resume
- `DELETE /api/resumes/{id}` - Delete resume
- `POST /api/resumes/{id}/translate` - Translate resume
- `POST /api/resumes/{id}/score` - Score resume (ATS)

### Resume Sharing
- `POST /api/resumes/{id}/share` - Enable public sharing
- `DELETE /api/resumes/{id}/share` - Disable sharing
- `GET /api/public/resume/{shareToken}` - Get public resume

### Cover Letters
- `POST /api/cover-letters/generate` - Generate cover letter
- `GET /api/cover-letters` - List cover letters
- CRUD operations for cover letters

### AI Enhancement
- `POST /api/ai/enhance` - Enhance text with AI
- `POST /api/ai/improve-section` - Improve resume section
- `POST /api/ai/generate-enhancement-questions` - Get enhancement questions
- `POST /api/ai/direct-enhance` - Direct enhancement

### Job Tailoring
- `POST /api/job-tailoring/validate-url` - Validate job posting URL
- `POST /api/job-tailoring/analyze` - Analyze job vs resume
- `POST /api/job-tailoring/questions` - Get clarification questions
- `POST /api/job-tailoring/generate` - Generate tailored resume
- `POST /api/job-tailoring/save` - Save tailored resume

### Suggestions
- `GET /api/suggestions/{profession}` - Get skill suggestions
- `POST /api/achievements/suggestions` - Get achievement suggestions
- `POST /api/summary/suggestions` - Get summary suggestions

### Payment
- `POST /api/paypal/create-order` - Create PayPal order
- `POST /api/paypal/capture-order` - Capture payment

---

## Key Data Models

### User
```typescript
{
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  provider: 'google' | 'linkedin';
  isPremium: boolean;
  subscriptionExpiration?: string;
  planType?: 'monthly' | 'yearly';
  freeResumeUsed: boolean;
  freeDownloadUsed: boolean;
  freeCoverLetterUsed: boolean;
  premiumResumeCount: number;
  premiumResumeMonth: string; // YYYY-MM
  jobTailoringUsage: {
    totalUsed: number;
    monthlyUsed: number;
    currentMonth: string;
  };
}
```

### Resume
```typescript
{
  id: string;
  userId: string;
  title: string;
  status: 'draft' | 'generated' | 'optimized';
  resumeData: ResumeData;        // User input
  generatedResume: GeneratedResume; // AI output
  score?: ResumeScore;
  shareToken?: string;
  isPubliclyShared: boolean;
  isTailored: boolean;
  tailoringMetadata?: TailoringMetadata;
  aiCost?: AIUsageCost;
}
```

### ResumeData (Input)
```typescript
{
  firstName: string;
  lastName: string;
  profession: string;
  targetLevel: 'entry' | 'mid' | 'senior' | 'executive';
  tone: 'professional' | 'creative' | 'technical';
  language: string;
  skillsRaw: string[];
  experience: WorkExperience[];
  education: Education[];
  certifications: Certification[];
  projects: Project[];
  languages: Language[];
  summary?: string;
  jobDescription?: string;
}
```

---

## Key Services

### Backend Services (`api/src/services/`)

| Service | Responsibility |
|---------|---------------|
| `aiService.ts` | OpenAI/Groq API calls, token tracking |
| `aiUsageService.ts` | AI usage logging and cost tracking |
| `resumeService.ts` | Resume CRUD operations |
| `resumeScoringService.ts` | ATS scoring and analysis |
| `jobTailoringService.ts` | Job posting analysis and tailoring |
| `translationService.ts` | Multi-language translation |
| `coverLetterService.ts` | Cover letter management |
| `paypalService.ts` | Payment processing |
| `analyticsService.ts` | View tracking and analytics |

### Frontend Services (`src/services/`)

| Service | Responsibility |
|---------|---------------|
| `resumeService.ts` | Resume API client |
| `aiService.ts` | AI enhancement API client |
| `jobTailoringService.ts` | Job tailoring API client |
| `coverLetterService.ts` | Cover letter API client |
| `paypalService.ts` | Payment API client |

---

## Database Tables (DynamoDB)

1. `users` - User accounts and premium status
2. `resumes` - Resume data and metadata
3. `cover-letters` - Cover letter data
4. `resume-views` - Public sharing analytics
5. `profession-suggestions` - Cached AI suggestions
6. `validated-professions` - Profession validation cache
7. `job-title-achievements` - Achievement suggestions cache
8. `rate-limits` - Rate limiting counters (TTL)
9. `templates` - Resume templates metadata
10. `support-tickets` - Support ticket system
11. `ai-usage-logs` - AI cost tracking (TTL)

---

## Feature Gating Logic

### Premium Check Flow
1. Check `user.isPremium` flag
2. Verify `subscriptionExpiration` is in the future
3. For monthly limits, check `premiumResumeMonth` matches current month
4. Increment usage counters on successful operations

### Free User Restrictions
- `freeResumeUsed = true` → locked out of AI generation features
- `freeDownloadUsed = true` → locked out of PDF downloads
- `freeCoverLetterUsed = true` → locked out of cover letter generation
- Once free tier exhausted, must upgrade to continue

### AI Model Selection
- **Free users**: Groq (free/cheaper models)
- **Premium users**: OpenAI GPT-4o (configurable via `PREMIUM_AI_PROVIDER`)

---

## Supported Languages (Translation)

| Code | Language |
|------|----------|
| en | English |
| es | Spanish |
| zh | Chinese |
| hi | Hindi |
| fr | French |
| ar | Arabic |
| bn | Bengali |
| pt | Portuguese |
| ru | Russian |
| ja | Japanese |

---

## Environment & Deployment

### Environments
- **Development**: `localhost:3000` (frontend), `localhost:3001/dev` (API)
- **Production**: `getquickresume.com`, `api.getquickresume.com`

### Key Commands
```bash
# Frontend
npm run dev          # Start dev server
npm run build:prod   # Build for production
npm run deploy:frontend  # Deploy to S3/CloudFront

# Backend
npm run deploy:api   # Deploy Lambda functions
```

### Infrastructure
- Frontend: S3 + CloudFront + Route 53
- API: Lambda + API Gateway
- Database: DynamoDB
- Storage: S3
- Email: SES
- SSL: ACM certificates

---

## Important Notes for AI Assistants

1. **Freemium Model**: Always consider whether a feature should be gated behind premium
2. **Rate Limiting**: All AI endpoints have rate limits based on user tier
3. **Usage Tracking**: AI costs are tracked per-user and per-resume
4. **i18n**: UI supports English and Spanish; resume content supports 10 languages
5. **State Management**: Zustand stores in `src/stores/` manage application state
6. **API Pattern**: REST API with JWT auth, custom Lambda authorizer
7. **Error Handling**: Services use try/catch with proper HTTP status codes
8. **Caching**: Suggestions and validations are cached in DynamoDB
