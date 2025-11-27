# Product Requirement Document - GetQuickResume

**Version:** 1.0  
**Last Updated:** 2024  
**Purpose:** Comprehensive system documentation for AI context recreation and development reference

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [System Architecture](#2-system-architecture)
3. [Core Features & User Flows](#3-core-features--user-flows)
4. [Data Models & Types](#4-data-models--types)
5. [API Specification](#5-api-specification)
6. [AI Services & Prompts](#6-ai-services--prompts)
7. [Authentication & Authorization](#7-authentication--authorization)
8. [Premium Features & Monetization](#8-premium-features--monetization)
9. [Frontend Architecture](#9-frontend-architecture)
10. [Business Rules & Validation](#10-business-rules--validation)
11. [Error Handling & Edge Cases](#11-error-handling--edge-cases)
12. [Deployment & Infrastructure](#12-deployment--infrastructure)

---

## 1. Executive Summary

### 1.1 Project Overview

GetQuickResume is a modern, AI-powered resume generation platform that enables users to create professional, ATS-optimized resumes with multi-language support. The platform combines a guided wizard interface with AI-powered content generation and optimization.

### 1.2 Core Value Proposition

- **AI-Powered Resume Generation**: Generate professional resumes using GPT-4/Anthropic/Groq
- **Multi-Language Support**: Support for Spanish and English with extensibility for more languages
- **ATS Optimization**: Automatically optimize resumes for Applicant Tracking Systems
- **Template System**: Multiple resume templates with pagination support
- **LinkedIn Integration**: Import and parse LinkedIn profile data
- **Job Interest Tracking**: Optimize resumes for specific job postings
- **Premium Token System**: Freemium model with token-based premium features

### 1.3 Technology Stack

**Frontend:**
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Zustand for state management
- React Router DOM for routing
- React Hook Form + Zod for form validation
- i18next for internationalization

**Backend:**
- AWS Lambda (Serverless Framework)
- Node.js 18.x runtime
- TypeScript
- DynamoDB for data storage
- JWT for authentication
- OpenAI/Anthropic/Groq for AI services

**Infrastructure:**
- AWS API Gateway
- AWS DynamoDB
- AWS S3 (for templates)
- Serverless Framework for deployment

---

## 2. System Architecture

### 2.1 High-Level Architecture

```
┌─────────────────┐
│   React Frontend │
│   (Vite + TS)    │
└────────┬─────────┘
         │ HTTPS
         ▼
┌─────────────────┐
│  API Gateway    │
│  (AWS)          │
└────────┬─────────┘
         │
         ├──► Lambda Authorizer (JWT validation)
         │
         ▼
┌─────────────────┐
│  Lambda Functions│
│  (Node.js 18.x)  │
└────────┬─────────┘
         │
         ├──► DynamoDB (Users, Resumes, Job Interests, Cache)
         ├──► S3 (Templates)
         └──► AI Services (OpenAI/Anthropic/Groq)
```

### 2.2 Component Architecture

**Frontend Structure:**
```
src/
├── components/          # Reusable UI components
│   ├── wizard/         # Wizard step components
│   ├── dashboard/      # Dashboard components
│   ├── resume-view/    # Resume viewing components
│   └── ui/             # Base UI components
├── pages/              # Route pages
├── stores/             # Zustand state stores
├── services/           # API service layer
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── types/              # TypeScript type definitions
```

**Backend Structure:**
```
api/src/
├── handlers/          # Lambda handler functions
├── services/          # Business logic services
├── middleware/        # Middleware (rate limiting, etc.)
├── utils/             # Utility functions
└── types.ts           # TypeScript type definitions
```

### 2.3 Data Flow

1. **User Authentication Flow:**
   - User authenticates via Google/LinkedIn OAuth
   - Frontend receives OAuth token
   - Frontend sends token to `/api/auth/google` or `/api/auth/linkedin`
   - Backend validates token, creates/updates user in DynamoDB
   - Backend returns JWT token
   - Frontend stores JWT in localStorage

2. **Resume Generation Flow:**
   - User completes wizard steps (1-7)
   - Frontend auto-saves resume data to API (debounced 1s)
   - User reaches Step 8 (Preview)
   - Frontend calls `/api/resume/generate` with resumeData
   - Backend validates tokens (requires 5 tokens)
   - Backend calls AI service to generate resume
   - AI service builds prompt, calls OpenAI/Anthropic/Groq
   - Backend parses AI response, saves to DynamoDB
   - Frontend receives GeneratedResume, displays in Step 9/10

3. **Template Rendering Flow:**
   - User selects template in Step 9
   - Frontend calculates pagination using `paginationService`
   - Pagination service measures rendered elements
   - Frontend filters data per page
   - Frontend renders template with paginated data
   - User can download PDF via `pdfGenerator`

---

## 3. Core Features & User Flows

### 3.1 Wizard Flow (10 Steps)

The wizard is the core user journey for creating a resume. It consists of 10 steps:

**Step 0: Resume Creation Mode Selection**
- Route: `/wizard/`
- Component: `ResumeCreationMode`
- Options:
  - Manual creation (wizard)
  - Upload existing resume
  - Import from LinkedIn

**Step 1: Professional Profile**
- Route: `/wizard/manual/step-1`
- Component: `Step1Profile`
- Fields:
  - First Name, Last Name
  - Email, Phone
  - Country
  - LinkedIn URL
  - Language (es/en)
  - Target Level (entry/mid/senior/executive)
  - Profession
  - Tone (professional/creative/technical/friendly)

**Step 2: Skills**
- Route: `/wizard/manual/step-2`
- Component: `Step2Skills`
- Fields:
  - Skills (raw array of strings)
  - Auto-suggestions based on profession

**Step 3: Work Experience**
- Route: `/wizard/manual/step-3`
- Component: `Step3Experience`
- Fields per experience:
  - Title, Company
  - Start Date, End Date (or Current)
  - Responsibilities (array)
  - Achievements (array)
  - AI suggestions for achievements based on job title

**Step 4: Education**
- Route: `/wizard/manual/step-4`
- Component: `Step4Education`
- Fields per education:
  - Institution, Degree, Field
  - Start Date, End Date (or In Progress)
  - GPA (optional)

**Step 5: Projects & Languages**
- Route: `/wizard/manual/step-5`
- Component: `Step5Projects`
- Fields:
  - Projects: Name, Description, Technologies, URL, Dates
  - Languages: Name, Level (basic/intermediate/advanced/native)

**Step 6: Achievements**
- Route: `/wizard/manual/step-6`
- Component: `Step6Achievements`
- Fields:
  - Title, Description, Year
  - AI suggestions based on projects

**Step 7: Professional Summary**
- Route: `/wizard/manual/step-7`
- Component: `Step7Summary`
- Fields:
  - Summary (textarea)
  - Job Description (textarea)
  - AI suggestions for summary

**Step 8: Preview & Generate**
- Route: `/wizard/manual/step-8`
- Component: `Step8Preview`
- Actions:
  - Validates token availability (requires 5 tokens)
  - Calls `/api/resume/generate`
  - Displays loading state
  - Shows generated resume on success

**Step 9: Template Selection**
- Route: `/wizard/manual/step-9`
- Component: `Step9Preview`
- Actions:
  - Displays template gallery
  - Calculates pagination for selected template
  - Renders preview with pagination
  - Allows template switching

**Step 10: Final Download**
- Route: `/wizard/manual/step-10`
- Component: `Step10Final`
- Actions:
  - Final resume preview
  - PDF generation
  - Share functionality
  - Edit/Regenerate options

### 3.2 LinkedIn Import Flow

**Route:** `/wizard/linkedin`

**Component:** `LinkedInImport` → `LinkedInDataWizard`

**Steps:**
1. User pastes LinkedIn profile data (About, Experience, Education, etc.)
2. User selects target language (es/en)
3. User provides profession
4. Frontend sends data to `/api/linkedInData`
5. Backend uses AI to parse and structure LinkedIn data
6. Backend creates resume with parsed data
7. Frontend redirects to wizard with pre-filled data

**LinkedIn Data Structure:**
```typescript
{
  profession: string;
  about: string;
  experience: string;
  education: string;
  certifications?: string;
  projects?: string;
  skills?: string;
  recommendations?: string;
  targetLanguage: 'es' | 'en';
}
```

### 3.3 Resume Generation with AI

**Endpoint:** `POST /api/resume/generate`

**Process:**
1. Validates user has 5 tokens
2. Consumes 5 tokens before generation
3. Builds prompt from `ResumeData` (see AI Services section)
4. Calls AI service (OpenAI/Anthropic/Groq)
5. Parses AI response to `GeneratedResume` format
6. Saves to DynamoDB
7. Returns generated resume

**Prompt Structure:**
- Base template: ~4,342 characters
- User data: Variable (3,500-15,000 characters)
- Total: ~4,500-20,000 characters (~1,125-5,000 tokens)

**Response Structure:**
- Small resume: ~3,000-5,000 characters (~750-1,250 tokens)
- Medium resume: ~5,000-8,000 characters (~1,250-2,000 tokens)
- Large resume: ~8,000-12,000 characters (~2,000-3,000 tokens)

### 3.4 Template System

**Templates:**
- Stored in DynamoDB (`templates` table)
- JavaScript code stored in S3
- Templates are Web Components (custom elements)
- Support single-column and two-column layouts

**Pagination:**
- Calculated dynamically based on template layout
- Measures actual rendered element heights
- Distributes content across pages (A4 size: 1083px content height)
- Supports multi-page resumes

**Template Selection:**
- User selects template in Step 9
- Frontend calculates pagination
- Frontend filters data per page
- Frontend renders template with paginated data

### 3.5 Job Interest Tracking

**Features:**
- Create job interests with title, company, description, URL
- Link resumes to job interests
- Optimize resume for specific job (consumes 5 tokens)
- Track status: active/applied/closed

**Optimization Process:**
1. User creates job interest
2. User links resume to job interest
3. User clicks "Optimize for Job"
4. Backend uses AI to optimize resume based on job description
5. Creates optimized version of resume
6. Updates job interest with optimized resume ID

---

## 4. Data Models & Types

### 4.1 User Model

**Location:** `api/src/services/dynamodb.ts`, `api/src/types.ts`, `src/types/index.ts`

```typescript
interface User {
  id: string;                    // Primary key: user_${timestamp}_${random}
  email: string;                 // Unique, indexed
  firstName: string;
  lastName: string;
  fullName?: string;
  avatarUrl?: string;
  city?: string;
  country?: string;
  location?: string;
  linkedin?: string;
  targetFunction?: string;
  profession?: string;
  provider: 'google' | 'facebook' | 'linkedin';
  isPremium: boolean;             // Default: false (all users start as free)
  freeResumeUsed: boolean;       // Tracks if free user used their 1 lifetime resume
  premiumResumeCount: number;    // Current month count for premium users (0-40)
  premiumResumeMonth: string;    // YYYY-MM format for tracking month
  createdAt: string;             // ISO timestamp
  updatedAt: string;             // ISO timestamp
}
```

**DynamoDB Table:** `getquickresume-api-users-{stage}`
- Primary Key: `id` (String)
- Global Secondary Index: `email-index` on `email`

### 4.2 ResumeData Model

**Location:** `src/types/index.ts`, `api/src/types.ts`

```typescript
interface ResumeData {
  // Step 1: Professional Profile
  firstName: string;
  lastName: string;
  country: string;
  linkedin: string;
  language: 'es' | 'en';
  targetLevel: 'entry' | 'mid' | 'senior' | 'executive';
  profession: string;
  tone: 'professional' | 'creative' | 'technical' | 'friendly';
  phone: string;
  email: string;
  
  // Step 2: Skills
  skillsRaw: string[];
  
  // Step 3: Work Experience
  experience: WorkExperience[];
  
  // Step 4: Education and Certifications
  education: Education[];
  certifications: Certification[];
  
  // Step 5: Projects and Languages
  projects: Project[];
  languages: Language[];
  
  // Step 6: Key Achievements
  achievements: Achievement[];
  
  // Step 7: Professional Summary
  summary: string;
  jobDescription: string;
  
  // Metadata
  completedSteps: number[];
  currentStep: number;
  totalCharacters: number;
  lastSaved: Date | string;
  
  // Pagination fields (calculated in Step 9)
  firstNamePageNumber: number | null;
  lastNamePageNumber: number | null;
  countryPageNumber: number | null;
  linkedinPageNumber: number | null;
  languagePageNumber: number | null;
  targetLevelPageNumber: number | null;
  professionPageNumber: number | null;
  tonePageNumber: number | null;
  phonePageNumber: number | null;
  emailPageNumber: number | null;
  summaryPageNumber: number | null;
  jobDescriptionPageNumber: number | null;
  skillsPagination: SkillPageRange[] | null;
}
```

**Sub-models:**

```typescript
interface WorkExperience {
  id: string;
  title: string;
  company: string;
  startDate: string;            // YYYY-MM format
  endDate?: string;             // YYYY-MM format
  isCurrent: boolean;
  achievements: string[];
  responsibilities: string[];
  pageNumber: number | null;    // Calculated during pagination
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;            // YYYY-MM format
  endDate?: string;             // YYYY-MM format
  isCompleted: boolean;
  gpa?: string;
  pageNumber: number | null;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;                 // YYYY-MM format
  credentialId?: string;
  url?: string;
  pageNumber: number | null;
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  startDate: string;            // YYYY-MM format
  endDate?: string;             // YYYY-MM format
  isOngoing: boolean;
  pageNumber: number | null;
}

interface Language {
  id: string;
  name: string;
  level: 'basic' | 'intermediate' | 'advanced' | 'native';
  pageNumber: number | null;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  year: string;                 // YYYY format
  _suggestionTitle?: string;   // Metadata for tracking AI suggestions
  pageNumber: number | null;
}

interface SkillPageRange {
  startIndex: number;
  endIndex: number;
  pageNumber: number;
}
```

### 4.3 GeneratedResume Model

**Location:** `src/types/index.ts`, `api/src/types.ts`

```typescript
interface GeneratedResume {
  professionalSummary: string;
  experience: EnhancedExperience[];
  education: EnhancedEducation[];
  skills: {
    technical: string[];
    soft: string[];
    tools: string[];
  };
  projects: EnhancedProject[];
  certifications: EnhancedCertification[];
  achievements: string[];
  languages: LanguageProficiency[];
  contactInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
  };
  metadata: {
    generatedAt: string;        // ISO timestamp
    tokensUsed: number;          // Estimated tokens used
    aiProvider: string;          // 'openai' | 'anthropic' | 'groq'
    model: string;               // e.g., 'gpt-4', 'gpt-4o', 'claude-3-opus'
  };
}
```

**Enhanced Models:**

```typescript
interface EnhancedExperience {
  title: string;
  company: string;
  duration: string;             // e.g., "2020 - 2023"
  location?: string;
  description: string;
  achievements: string[];
  skills: string[];
  impact: string[];
}

interface EnhancedEducation {
  degree: string;
  institution: string;
  field: string;
  duration: string;
  gpa?: string;
  relevantCoursework?: string[];
  honors?: string[];
}

interface EnhancedProject {
  name: string;
  description: string;
  technologies: string[];
  duration: string;
  url?: string;
  achievements: string[];
  impact: string;
}

interface EnhancedCertification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
  skills: string[];
}

interface LanguageProficiency {
  language: string;
  level: string;
  certifications?: string[];
}
```

### 4.4 Resume Model

**Location:** `src/types/index.ts`, `api/src/types.ts`

```typescript
interface Resume {
  id: string;                    // Primary key: resume_${timestamp}_${random}
  userId: string;                // Foreign key to User
  title: string;                 // Default: "${firstName} ${lastName} - CV"
  resumeData: ResumeData;
  generatedResume?: GeneratedResume;
  status: 'draft' | 'generated' | 'optimized';
  createdAt: string;            // ISO timestamp
  updatedAt: string;             // ISO timestamp
}
```

**DynamoDB Table:** `getquickresume-api-resumes-{stage}`
- Primary Key: `userId` (String) + `resumeId` (String)
- Global Secondary Index: `resumeId-index` on `resumeId`

### 4.5 JobInterest Model

**Location:** `src/types/index.ts`, `api/src/types.ts`

```typescript
interface JobInterest {
  id: string;                    // Primary key: job_${timestamp}_${random}
  userId: string;                // Foreign key to User
  jobTitle: string;
  company: string;
  jobDescription: string;
  jobUrl?: string;
  optimizedResumeId?: string;    // Foreign key to Resume
  status: 'active' | 'applied' | 'closed';
  createdAt: string;             // ISO timestamp
}
```

**DynamoDB Table:** `getquickresume-api-job-interests-{stage}`
- Primary Key: `userId` (String) + `jobId` (String)
- Global Secondary Index: `jobId-index` on `jobId`

### 4.6 WizardState Model

**Location:** `src/types/index.ts`

```typescript
interface WizardState {
  currentStep: number;           // 1-10
  completedSteps: number[];       // Array of completed step numbers
  mode: 'manual' | 'guided';
  isCompleted: boolean;
}
```

### 4.7 Template Model

**Location:** `src/services/templatesService.ts`

```typescript
interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  category: 'free' | 'premium';
  tagName: string;               // Web Component tag name
  jsCode: string;                // JavaScript code for template
  layout: 'single-column' | 'two-column';
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
}
```

**DynamoDB Table:** `getquickresume-api-templates-{stage}`
- Primary Key: `id` (String)
- JavaScript code stored in S3 bucket

---

## 5. API Specification

### 5.1 Base URL

- **Development:** `http://localhost:3001`
- **Production:** `https://api.getquickresume.com`

### 5.2 Authentication

All endpoints except `/api/auth/*` require JWT authentication via `Authorization: Bearer <token>` header.

**JWT Payload:**
```typescript
{
  userId: string;
  email: string;
  isPremium: boolean;
  iat?: number;
  exp?: number;
}
```

**Token Generation:** See `api/src/services/jwt.ts`

### 5.3 Authentication Endpoints

#### POST `/api/auth/google`

**Description:** Authenticate/create user using Google OAuth

**Request:**
```json
{
  "token": "google_oauth_token"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "jwt_token_string",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "fullName": "John Doe",
    "avatarUrl": "https://...",
    "city": "New York",
    "country": "United States",
    "location": "New York, United States",
    "linkedin": "https://linkedin.com/in/johndoe",
    "targetFunction": "Software Developer",
    "profession": "Software Engineer",
    "provider": "google",
    "isPremium": false,
    "tokens": 5,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Handler:** `api/src/handlers/auth.ts::googleAuth`

#### POST `/api/auth/linkedin`

**Description:** Authenticate/create user using LinkedIn OAuth (PKCE flow)

**Request:**
```json
{
  "code": "linkedin_authorization_code"
}
```

**Response:** Same structure as Google auth

**Handler:** `api/src/handlers/auth.ts::linkedinAuth`

#### GET `/api/auth/validate`

**Description:** Validate JWT token

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "message": "Token is valid"
}
```

**Handler:** `api/src/handlers/auth.ts::validateToken`

### 5.4 User Endpoints

**Note:** Token endpoints have been removed. The system now uses a free/premium model with resume generation limits instead of tokens.

### 5.5 Resume Endpoints

#### POST `/api/resume/generate`

**Description:** Generate resume with AI (subject to free/premium limits)

**Headers:** `Authorization: Bearer <token>`

**Request:**
```json
{
  "resumeData": { /* ResumeData object */ },
  "resumeId": "optional_existing_resume_id"
}
```

**Validations:**
- **Free users**: Must have `freeResumeUsed === false` (1 resume lifetime)
- **Premium users**: Must have `premiumResumeCount < 40` and current month matches (40/month)
- Rate limit: 5 requests per minute per user

**Response (200):**
```json
{
  "success": true,
  "data": { /* GeneratedResume object */ },
  "message": "Resume generated successfully",
  "resumeId": "resume_id",
  "remainingRequests": 4,
  "resetTime": 1234567890
}
```

**Error Response (403):**
```json
{
  "success": false,
  "error": "Free resume limit reached" | "Monthly limit reached",
  "message": "You have already used your free resume. Please upgrade to premium to generate more resumes."
}
```

**Handler:** `api/src/handlers/resume.ts::generateResume`

**AI Provider Selection:**
- Free users: Groq (`gpt-oss-20b-128k`)
- Premium users: OpenAI (`gpt-4o`)

#### GET `/api/resumes`

**Description:** List all resumes for authenticated user

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "resume_id",
      "userId": "user_id",
      "title": "John Doe - CV",
      "resumeData": { /* ResumeData */ },
      "generatedResume": { /* GeneratedResume */ },
      "status": "generated",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "message": "Resumes retrieved successfully"
}
```

**Handler:** `api/src/handlers/resume.ts::listResumes`

#### GET `/api/resumes/{id}`

**Description:** Get specific resume by ID

**Handler:** `api/src/handlers/resume.ts::getResume`

#### POST `/api/resumes`

**Description:** Create new resume draft

**Request:**
```json
{
  "resumeData": { /* ResumeData */ },
  "title": "Optional title"
}
```

**Handler:** `api/src/handlers/resume.ts::createResumeHandler`

#### PUT `/api/resumes/{id}`

**Description:** Update existing resume

**Request:**
```json
{
  "title": "Optional",
  "resumeData": { /* Partial ResumeData */ },
  "status": "draft | generated | optimized"
}
```

**Handler:** `api/src/handlers/resume.ts::updateResumeHandler`

#### DELETE `/api/resumes/{id}`

**Description:** Delete resume

**Handler:** `api/src/handlers/resume.ts::deleteResumeHandler`

### 5.6 Job Interest Endpoints

#### GET `/api/job-interests`

**Description:** List all job interests for authenticated user

**Handler:** `api/src/handlers/jobInterest.ts::listJobInterests`

#### POST `/api/job-interests`

**Description:** Create new job interest

**Request:**
```json
{
  "jobTitle": "Software Engineer",
  "company": "Tech Corp",
  "jobDescription": "Job description text...",
  "jobUrl": "https://..."
}
```

**Handler:** `api/src/handlers/jobInterest.ts::createJobInterestHandler`

#### POST `/api/job-interests/{id}/optimize`

**Description:** Optimize resume for specific job (consumes 5 tokens)

**Request:**
```json
{
  "resumeId": "resume_id"
}
```

**Handler:** `api/src/handlers/jobInterest.ts::optimizeForJob`

### 5.7 Suggestion Endpoints

#### GET `/api/suggestions/{profession}`

**Description:** Get profession-based skill suggestions (cached)

**Query Parameters:**
- `type`: "skills" | "tools" (optional)
- `language`: "es" | "en" (optional, default: "es")

**Response (200):**
```json
{
  "success": true,
  "data": {
    "skills": ["JavaScript", "React", "Node.js", ...]
  },
  "fromCache": true,
  "message": "Suggestions retrieved from cache"
}
```

**Handler:** `api/src/handlers/suggestions.ts::getSuggestions`

#### POST `/api/achievements/suggestions`

**Description:** Generate achievement suggestions based on projects

**Request:**
```json
{
  "profession": "Software Engineer",
  "projects": [
    {
      "name": "E-commerce Platform",
      "description": "Full-stack solution",
      "technologies": ["React", "Node.js"]
    }
  ],
  "language": "es"
}
```

**Handler:** `api/src/handlers/achievementSuggestions.ts::generateSuggestions`

#### POST `/api/summary/suggestions`

**Description:** Generate professional summary suggestions

**Request:**
```json
{
  "profession": "Software Engineer",
  "achievements": ["Led team...", "Improved performance..."],
  "projectDescriptions": ["Full-stack solution...", "Mobile app..."],
  "language": "es",
  "type": "experience" | "differentiators"
}
```

**Handler:** `api/src/handlers/summarySuggestions.ts::generateSuggestions`

#### POST `/api/experience-achievements/suggestions`

**Description:** Get job title achievement suggestions (cached)

**Request:**
```json
{
  "jobTitle": "Senior Software Engineer",
  "language": "es"
}
```

**Handler:** `api/src/handlers/experienceAchievements.ts::getJobTitleAchievements`

### 5.8 AI Enhancement Endpoints

#### POST `/api/ai/enhance`

**Description:** Enhance text with AI

**Request:**
```json
{
  "context": "achievement" | "summary" | "project" | "responsibility",
  "text": "Original text to enhance",
  "language": "es" | "en",
  "jobTitle": "Optional job title"
}
```

**Handler:** `api/src/handlers/aiEnhance.ts::enhanceTextWithAI`

#### POST `/api/ai/improve-section`

**Description:** Improve resume section with user instructions

**Request:**
```json
{
  "sectionType": "summary" | "experience" | "education" | "certification" | "project" | "achievement" | "language",
  "originalText": "Original text",
  "userInstructions": "Make it more impactful",
  "language": "es" | "en"
}
```

**Rate Limit:** 10 requests per minute per user

**Handler:** `api/src/handlers/aiSectionImprovement.ts::improveSectionWithAI`

### 5.9 LinkedIn Import Endpoint

#### POST `/api/linkedInData`

**Description:** Parse LinkedIn profile data and create resume

**Request:**
```json
{
  "profession": "Software Engineer",
  "about": "LinkedIn about section text...",
  "experience": "LinkedIn experience text...",
  "education": "LinkedIn education text...",
  "certifications": "Optional certifications text...",
  "projects": "Optional projects text...",
  "skills": "Optional skills text...",
  "recommendations": "Optional recommendations text...",
  "targetLanguage": "es" | "en"
}
```

**Rate Limit:** 5 requests per minute per user

**Response (200):**
```json
{
  "success": true,
  "resumeId": "created_resume_id",
  "message": "LinkedIn data parsed and resume created successfully",
  "remainingRequests": 4,
  "resetTime": 1234567890
}
```

**Handler:** `api/src/handlers/linkedInData.ts::parseLinkedInData`

### 5.10 Template Endpoints

#### GET `/api/templates`

**Description:** List available resume templates

**Handler:** `api/src/handlers/templates.ts::listTemplates`

#### POST `/api/templates`

**Description:** Create template (public, for local development)

**Handler:** `api/src/handlers/templates.ts::createTemplate`

### 5.11 CORS Configuration

All endpoints include CORS headers:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Headers: Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent
Access-Control-Allow-Methods: GET,POST,PUT,PATCH,DELETE,OPTIONS
```

### 5.12 Error Responses

**Standard Error Format:**
```json
{
  "success": false,
  "error": "Error message",
  "message": "Detailed error message (optional)"
}
```

**HTTP Status Codes:**
- `200`: Success
- `201`: Created
- `400`: Bad Request (invalid input)
- `401`: Unauthorized (invalid/missing token)
- `404`: Not Found
- `409`: Conflict (insufficient tokens)
- `500`: Internal Server Error

---

## 6. AI Services & Prompts

### 6.1 AI Service Configuration

**Location:** `api/src/services/aiService.ts`

**Configuration:**
```typescript
interface AIConfig {
  provider: 'openai' | 'anthropic' | 'groq';
  apiKey: string;
  model: string;
}
```

**Environment Variables:**
- `OPENAI_API_KEY`: OpenAI API key (required for premium users)
- `GROQ_API_KEY`: Groq API key (required for free users)
- `ANTHROPIC_API_KEY`: Anthropic API key (optional)
- `AI_MODEL`: Model name for OpenAI (default: 'gpt-4o')

**Note:** Provider selection is now based on user type (`isPremium`), not environment variables.

**Supported Models:**
- OpenAI: `gpt-4`, `gpt-4o`, `gpt-4-turbo`, `gpt-4o-mini` (used for premium users)
- Anthropic: `claude-3-opus`, `claude-3-sonnet`, `claude-3-haiku`
- Groq: `gpt-oss-20b-128k` (used for free users)

**Provider Selection:**
- Determined by user type (`isPremium`), not environment variable
- Free users: Groq (`gpt-oss-20b-128k`)
- Premium users: OpenAI (`gpt-4o`)

### 6.2 Resume Generation Prompt

**Location:** `api/src/services/aiService.ts::buildPrompt()`

**Prompt Structure:**

1. **System Context** (~200 chars)
   - Role: Expert recruiter and resume writer
   - Task: Generate ATS-optimized resume in JSON format

2. **User Information Section** (~500-15,000 chars, variable)
   - Profession, job description
   - Personal data (name, email, phone, location, LinkedIn)
   - Professional summary
   - Skills
   - Work experience (with responsibilities and achievements)
   - Education
   - Certifications
   - Projects
   - Languages
   - Additional achievements

3. **Generation Instructions** (~200 chars)
   - Output format: Valid JSON only
   - No markdown, no explanations

4. **Generation Rules** (~1,500 chars)
   - 8 detailed rules covering:
     - Professional Summary Optimization
     - Work Experience formatting
     - Skills classification
     - Education summarization
     - Certifications and Projects
     - Languages and Achievements
     - ATS Optimization
     - Personalization

5. **TypeScript Interface Definitions** (~2,000 chars)
   - Complete interface definitions for `GeneratedResume`
   - All nested interfaces (EnhancedExperience, EnhancedEducation, etc.)

**Total Prompt Size:**
- Base template: **4,342 characters** (~1,085 tokens)
- With minimal user data: ~4,500-5,000 characters
- With average user data: ~5,000-8,000 characters
- With extensive user data: ~8,000-15,000 characters

**Prompt Template (Key Sections):**

```typescript
const prompt = `You are an **expert recruiter and resume writer** with over 20 years of experience.  
Your task is to generate a **professional, ATS-optimized resume focused on measurable results** in **valid JSON format**, based on the information provided by the user.

The resume should highlight **impact, leadership, and technical skills** in a concise, natural way without redundancies.  
The language must be **${outputLanguage}**, with **${tone}** tone, adapted to **${targetLevel}** experience level.

### 🧩 User Information
- **Profession:** ${profession}  
- **Desired position description:** ${jobDescription || 'Not provided...'}

**Personal data:**  
${firstName} ${lastName} — ${email} — ${phone} — ${country}  
LinkedIn: ${linkedin || 'N/A'}

[... user data sections ...]

### ⚙️ Generation Instructions
**Output format:**  
Return **only a valid JSON object** following the \`GeneratedResume\` interface.  
Do not include additional text, headers, or markdown.

### 🧱 Generation Rules
1. **Professional Summary Optimization**
   - Must be in **first person** ("I am", "I have", "I led").  
   - Length: 3–4 short paragraphs.  
   [... 7 more rules ...]

Here is the TypeScript interface for the JSON object you must generate:
\`\`\`typescript
interface GeneratedResume {
  [... complete interface definitions ...]
}
\`\`\``;
```

### 6.3 Token Usage & Costs

**Current Estimation:**
- Formula: `(response_length / 4) + (prompt_length / 4)`
- This is approximate (assumes ~4 characters per token)

**Actual API Usage:**
- OpenAI API returns actual token counts in `data.usage`
- Contains: `prompt_tokens`, `completion_tokens`, `total_tokens`
- Currently logged but not used for cost tracking

**Average Token Usage:**

| Resume Type | Prompt Tokens | Response Tokens | Total Tokens |
|------------|---------------|-----------------|--------------|
| Entry Level | 875-1,250 | 750-1,250 | **1,625-2,500** |
| Mid Level | 1,250-2,000 | 1,250-2,000 | **2,500-4,000** |
| Senior/Executive | 2,000-3,750 | 2,000-3,000 | **4,000-6,750** |

**Average:** ~3,000-4,000 tokens per generation

**Cost Analysis:**

| Provider | Model | Input Cost/1M | Output Cost/1M | Cost/Resume | Monthly (1K) |
|----------|-------|---------------|----------------|-------------|--------------|
| OpenAI | GPT-4 Turbo | $10.00 | $30.00 | **$0.065** | **$65** |
| OpenAI | GPT-4 | $30.00 | $60.00 | **$0.15** | **$150** |
| Groq | GPT OSS 20B | $0.075 | $0.30 | **$0.0006** | **$0.60** |

**Detailed breakdown:** See `RESUME_GENERATION_PROMPT_AND_COSTS.md`

### 6.4 AI Service Methods

**Location:** `api/src/services/aiService.ts`

**Key Methods:**

1. **`generateResume(resumeData: ResumeData): Promise<GeneratedResume>`**
   - Main method for resume generation
   - Builds prompt, calls AI, parses response

2. **`generateProfessionSuggestions(profession: string)`**
   - Generates bilingual skill suggestions
   - Returns: `{ es: { skills: string[] }, en: { skills: string[] } }`

3. **`generateAchievementSuggestions(profession, projects, language)`**
   - Generates achievement suggestions based on projects
   - Returns: `Array<{ title: string; description: string }>`

4. **`generateSummarySuggestions(profession, achievements, projects, language, type)`**
   - Generates summary suggestions
   - Type: 'experience' | 'differentiators'
   - Returns: `string[]` (3 suggestions)

5. **`generateJobTitleAchievements(jobTitle, language)`**
   - Generates typical achievements for a job title
   - Returns: `string[]` (5 suggestions)

6. **`enhanceText(context, text, language, jobTitle?)`**
   - Enhances text based on context
   - Context: 'achievement' | 'summary' | 'project' | 'responsibility'

7. **`improveSectionWithUserInstructions(sectionType, originalText, userInstructions, language)`**
   - Improves section with custom user instructions
   - Includes input sanitization and output validation

8. **`parseLinkedInTextToResumeData(linkedInData: LinkedInDataRequest)`**
   - Parses LinkedIn profile text into structured ResumeData
   - Handles translation to target language
   - Returns: `Partial<ResumeData>`

### 6.5 Response Parsing

**Location:** `api/src/services/aiService.ts::parseAIResponse()`

**Process:**
1. Clean response (remove markdown code blocks)
2. Parse JSON
3. Validate structure (check required fields)
4. Calculate estimated tokens
5. Add metadata (generatedAt, tokensUsed, aiProvider, model)

**Error Handling:**
- Invalid JSON → Error with raw response logged
- Missing required fields → Error
- Empty response → Error

### 6.6 Provider-Specific Implementations

**OpenAI (`callOpenAI`):**
- Endpoint: `https://api.openai.com/v1/chat/completions`
- Uses `messages` array with system and user roles
- Supports `response_format: { type: 'json_object' }` for structured output
- Handles model-specific parameters (temperature, max_tokens)
- Special handling for restricted models (gpt-5, o1, o3)

**Anthropic (`callAnthropic`):**
- Endpoint: `https://api.anthropic.com/v1/messages`
- Uses `messages` array with user role
- Supports `max_tokens` and `temperature`

**Groq:**
- Similar to OpenAI implementation
- Lower cost, faster inference

---

## 7. Authentication & Authorization

### 7.1 OAuth Providers

**Supported Providers:**
- Google OAuth 2.0
- LinkedIn OAuth 2.0 (PKCE flow)
- Facebook (planned, not implemented)

### 7.2 Google OAuth Flow

**Frontend:** `src/hooks/useGoogleAuth.ts`

**Flow:**
1. User clicks "Continue with Google"
2. Frontend opens Google OAuth popup
3. User authenticates with Google
4. Frontend receives Google OAuth token
5. Frontend sends token to `/api/auth/google`
6. Backend validates token with Google API
7. Backend extracts user info (name, email, picture, locale)
8. Backend creates/updates user in DynamoDB
9. Backend generates JWT token
10. Frontend stores JWT in localStorage

**Backend Handler:** `api/src/handlers/auth.ts::googleAuth`

**Token Validation:** `api/src/services/googleAuth.ts::verifyGoogleToken`

### 7.3 LinkedIn OAuth Flow

**Frontend:** `src/hooks/useLinkedInAuth.ts`

**Flow (PKCE):**
1. User clicks "Continue with LinkedIn"
2. Frontend generates PKCE code verifier and challenge
3. Frontend redirects to LinkedIn OAuth URL with PKCE parameters
4. User authenticates with LinkedIn
5. LinkedIn redirects back with authorization code
6. Frontend sends code to `/api/auth/linkedin`
7. Backend exchanges code for access token
8. Backend validates access token and fetches profile
9. Backend creates/updates user in DynamoDB
10. Backend generates JWT token
11. Frontend stores JWT in localStorage

**Backend Handler:** `api/src/handlers/auth.ts::linkedinAuth`

**Token Exchange:** `api/src/services/linkedinAuth.ts::exchangeCodeForToken`

**Profile Fetching:** `api/src/services/linkedinAuth.ts::verifyLinkedInToken`

### 7.4 JWT Implementation

**Location:** `api/src/services/jwt.ts`

**JWT Payload:**
```typescript
{
  userId: string;
  email: string;
  isPremium: boolean;
  iat: number;  // Issued at
  exp: number; // Expiration
}
```

**Token Generation:**
- Secret: `JWT_SECRET` environment variable
- Expiration: Configurable (default: 24 hours)

**Token Validation:**
- Lambda Authorizer validates JWT on each protected request
- Authorizer caches results for 5 minutes (300 seconds)

### 7.5 Lambda Authorizer

**Location:** `api/src/handlers/authorizer.ts`

**Process:**
1. Receives Authorization header from API Gateway
2. Extracts JWT token
3. Validates JWT signature and expiration
4. Returns IAM policy with user context
5. API Gateway injects user context into request

**Authorizer Context:**
```typescript
{
  userId: string;
  email: string;
}
```

**Configuration:** See `api/serverless.yml` - `authorize` function

### 7.6 Security Measures

1. **Input Sanitization:**
   - Location: `api/src/utils/inputSanitizer.ts`
   - Sanitizes user input for AI prompts
   - Validates URLs, text length, special characters

2. **Output Validation:**
   - Location: `api/src/utils/outputValidator.ts`
   - Validates AI responses
   - Checks for malicious content
   - Validates structure and length

3. **Rate Limiting:**
   - Location: `api/src/middleware/rateLimiter.ts`
   - Per-user, per-endpoint rate limits
   - Stored in DynamoDB with TTL
   - Prevents abuse

4. **CORS:**
   - Configured in `serverless.yml`
   - Allows specific origins
   - Credentials: false (no cookies)

---

## 8. Premium Features & Monetization

### 8.1 Free/Premium User Model

**User Types:**
- **Free Users**: All users start as free by default (`isPremium: false`)
- **Premium Users**: Users who have upgraded to premium (`isPremium: true`)

**Resume Generation Limits:**
- **Free Users**: 1 resume lifetime (tracked via `freeResumeUsed: boolean`)
- **Premium Users**: 40 resumes per calendar month (tracked via `premiumResumeCount` and `premiumResumeMonth`)

**Limit Tracking:**
- Free users: `freeResumeUsed` is set to `true` after first resume generation
- Premium users: `premiumResumeCount` increments with each generation, resets on 1st of each month
- Month tracking: `premiumResumeMonth` stores current month in YYYY-MM format

### 8.2 AI Provider Selection

**Provider Routing Based on User Type:**
- **Free Users**: Use **Groq** (`gpt-oss-20b-128k` model) - Lower cost, faster inference
- **Premium Users**: Use **OpenAI** (`gpt-4o` model) - Higher quality, more features

**Implementation:**
- Provider selection happens in `aiService.generateResume(resumeData, isPremium)`
- Free users get Groq API calls, premium users get OpenAI API calls
- All other AI features (suggestions, enhancements) are free for all users

### 8.3 Premium Features

**Current Premium Features:**
1. **AI Resume Generation** (40/month for premium, 1 lifetime for free)
   - Full resume generation with AI
   - ATS optimization
   - Professional formatting
   - Premium users get OpenAI GPT-4o, free users get Groq

2. **Job-Specific Optimization** (counts as resume generation)
   - Optimize resume for specific job posting
   - Match keywords from job description
   - Customize content for role
   - Same limits as resume generation

**Free Features (Available to All Users):**
- AI Text Enhancement
- Section Improvement with Instructions
- Profession Suggestions
- Achievement Suggestions
- Summary Suggestions
- LinkedIn Import

### 8.4 Feature Gating

**Frontend Gating:**
- Check user type (`isPremium`) and limits before showing generation options
- Display free/premium status in HUD
- Show upgrade prompts when limits reached
- Display limit status (e.g., "1/1 used" for free, "X/40 used this month" for premium)

**Backend Gating:**
- Validate limits before processing resume generation requests
- Free users: Check `freeResumeUsed === false`
- Premium users: Check `premiumResumeCount < 40` and current month matches
- Return 403 (Forbidden) if limit reached
- Error message includes limit information and upgrade prompt

---

## 9. Frontend Architecture

### 9.1 State Management

**Zustand Stores:**

1. **`authStore`** (`src/stores/authStore.ts`)
   - User authentication state
   - JWT token management
   - User profile data
   - Free/premium status

2. **`resumeStore`** (`src/stores/resumeStore.ts`)
   - Resume data (ResumeData)
   - Wizard state
   - Generated resume
   - Template selection
   - Auto-save functionality (debounced 1s)

3. **`dashboardStore`** (`src/stores/dashboardStore.ts`)
   - Resume list
   - Job interests
   - Dashboard statistics
   - Loading states

### 9.2 Routing

**Location:** `src/App.tsx`

**Routes:**
- `/` - Landing page
- `/login` - Authentication
- `/dashboard` - User dashboard (protected)
- `/wizard/*` - Resume wizard (protected)
- `/premium` - Premium features page (protected)
- `/account` - User account (protected)
- `/contact`, `/about`, `/legal/*` - Static pages

**Protected Routes:**
- Wrapped in `ProtectedRoute` component
- Checks authentication
- Redirects to `/login` if not authenticated

### 9.3 Component Structure

**Wizard Components:**
- `Step1Profile` - Professional profile
- `Step2Skills` - Skills input
- `Step3Experience` - Work experience
- `Step4Education` - Education
- `Step5Projects` - Projects and languages
- `Step6Achievements` - Achievements
- `Step7Summary` - Professional summary
- `Step8Preview` - Preview and generate
- `Step9Preview` - Template selection
- `Step10Final` - Final download

**Shared Components:**
- `HUD` - Persistent progress indicator
- `Header` - Navigation
- `Footer` - Footer
- `BannerAd` - Advertisement banners
- `FloatingTips` - Contextual tips
- `TemplatePreviewModal` - Template preview

### 9.4 Services Layer

**Location:** `src/services/`

**Services:**
- `authService.ts` - Authentication API calls
- `resumeService.ts` - Resume CRUD operations
- `jobInterestService.ts` - Job interest management
- `suggestionService.ts` - Profession suggestions
- `achievementSuggestionService.ts` - Achievement suggestions
- `summarySuggestionService.ts` - Summary suggestions
- `sectionImprovementService.ts` - Section improvement
- `linkedInProfileService.ts` - LinkedIn import
- `templatesService.ts` - Template management
- `paginationService.ts` - Resume pagination

### 9.5 Internationalization

**Location:** `src/i18n/`

**Supported Languages:**
- Spanish (es) - Default
- English (en)

**Configuration:** `src/i18n/config.ts`

**Translation Files:**
- `src/i18n/locales/es.ts` - Spanish translations
- `src/i18n/locales/en.ts` - English translations

**Usage:**
```typescript
const { t } = useTranslation();
const title = t('wizard.steps.profile.title');
```

### 9.6 Form Validation

**Library:** React Hook Form + Zod

**Validation Schemas:**
- Defined per step component
- Zod schemas for type-safe validation
- Real-time validation feedback

**Example:**
```typescript
const schema = z.object({
  firstName: z.string().min(1, 'Required'),
  email: z.string().email('Invalid email'),
});
```

### 9.7 PDF Generation

**Location:** `src/utils/pdfGenerator.ts`

**Process:**
1. Render template in hidden iframe
2. Use `html2canvas` to capture each page
3. Use `jspdf` to create PDF
4. Handle multi-page resumes
5. Download PDF file

**Functions:**
- `generateResumePDF()` - Main PDF generation
- `generateResumePDFSimple()` - Simple single-page PDF
- `generateResumePDFFromPages()` - Multi-page PDF

---

## 10. Business Rules & Validation

### 10.1 Character Limits

**Free Tier:**
- Maximum: **3,500 characters** total
- Tracked in real-time via HUD
- Warning at 80% (2,800 characters)
- Error at 100% (3,500 characters)

**Character Calculation:**
- Location: `src/stores/resumeStore.ts::calculateCharacters()`
- Includes: summary, jobDescription, skills, experience, education, certifications, projects, languages

### 10.2 Free/Premium Limit Rules

1. **Resume Generation Limits:**
   - **Free Users**: 1 resume lifetime
     - Check: `freeResumeUsed === false`
     - After generation: Set `freeResumeUsed = true`
     - Error: 403 "Free resume limit reached"
   
   - **Premium Users**: 40 resumes per calendar month
     - Check: `premiumResumeCount < 40` and `premiumResumeMonth === currentMonth`
     - After generation: Increment `premiumResumeCount`, update `premiumResumeMonth` if new month
     - Month reset: On 1st of each month, counter resets to 0
     - Error: 403 "Monthly limit reached"

2. **Job Optimization:**
   - Same limits as resume generation (counts as one generation)
   - Free users: Only if `freeResumeUsed === false`
   - Premium users: Only if within monthly limit

3. **Rate Limiting:**
   - Resume generation: 5 requests per minute
   - Section improvement: 10 requests per minute
   - LinkedIn import: 5 requests per minute

### 10.3 Resume Status Lifecycle

```
draft → generated → optimized
```

**Status Transitions:**
- `draft`: Initial state, user filling wizard
- `generated`: AI has generated resume content
- `optimized`: Resume optimized for specific job

**Status Updates:**
- Set to `generated` when `/api/resume/generate` succeeds
- Set to `optimized` when `/api/job-interests/{id}/optimize` succeeds

### 10.4 Pagination Rules

**A4 Dimensions:**
- Page width: 210mm (794px at 96 DPI)
- Page height: 297mm (1123px at 96 DPI)
- Content height: ~1083px (after margins)

**Pagination Algorithm:**
1. Measure each section's rendered height
2. Distribute sections across pages
3. Ensure no section exceeds page height
4. Handle page breaks for long sections

**Single-Column Layout:**
- Sections in order: Header → Summary → Experience → Projects → Skills → Education → Languages → Achievements → Certifications

**Two-Column Layout:**
- Main column: Experience, Projects, Education
- Sidebar: Skills, Languages, Contact, Certifications
- Balance heights between columns

### 10.5 Input Validation

**Text Fields:**
- Max length: 2000 characters (for section improvements)
- Sanitized for XSS prevention
- URL validation for links

**Date Fields:**
- Format: YYYY-MM
- Start date must be before end date
- Current positions: `isCurrent: true`, no end date required

**Email:**
- Valid email format
- Required for user account

**Phone:**
- Optional
- No format validation (international support)

### 10.6 Data Persistence

**Auto-Save:**
- Debounced: 1 second after last change
- Saves to `/api/resumes` (POST for new, PUT for existing)
- Prevents concurrent saves with flag

**Local Storage:**
- `resume_wizard_v1`: Resume data backup
- `auth-token`: JWT token
- `generated-resume`: Generated resume backup (deprecated, now in API)

---

## 11. Error Handling & Edge Cases

### 11.1 Authentication Errors

**Invalid OAuth Token:**
- Status: 401
- Message: "Invalid or expired [Provider] token"
- User Action: Re-authenticate

**Missing JWT:**
- Status: 401
- Message: "Authorization header required"
- User Action: Login again

**Expired JWT:**
- Status: 401
- Message: "Token expired"
- User Action: Refresh token or re-login

### 11.2 AI Service Errors

**API Rate Limits:**
- OpenAI/Anthropic rate limit exceeded
- Status: 429 (if returned by API) or 500
- Retry with exponential backoff

**Invalid AI Response:**
- JSON parsing fails
- Missing required fields
- Status: 500
- Logs raw response for debugging
- User Action: Retry generation

**Empty AI Response:**
- AI returns empty content
- Status: 500
- Message: "AI service returned empty response"
- User Action: Retry generation

**Token Limit Exceeded:**
- Prompt too long for model context
- Status: 400
- Message: "Input too long"
- User Action: Reduce resume content

### 11.3 Database Errors

**User Not Found:**
- Status: 404
- Message: "User not found"
- Usually indicates data inconsistency

**Resume Not Found:**
- Status: 404
- Message: "Resume not found"
- User Action: Check resume ID or create new

**DynamoDB Errors:**
- Throttling: Retry with exponential backoff
- Validation: 400 with specific error
- Internal: 500 with generic message

### 11.4 Limit Errors

**Free Resume Limit Reached:**
- Status: 403 (Forbidden)
- Message: "You have already used your free resume. Please upgrade to premium to generate more resumes."
- User Action: Upgrade to premium

**Monthly Limit Reached (Premium):**
- Status: 403 (Forbidden)
- Message: "You have reached your monthly limit of 40 resumes. Your limit will reset on the 1st of next month."
- User Action: Wait for month reset or contact support

### 11.5 Rate Limiting Errors

**Rate Limit Exceeded:**
- Status: 429 (if implemented) or 500
- Response includes: `remainingRequests`, `resetTime`
- User Action: Wait for reset time

**Rate Limit Implementation:**
- Location: `api/src/middleware/rateLimiter.ts`
- Per-user, per-endpoint tracking
- Sliding window: 1 minute default
- Stored in DynamoDB with TTL

### 11.6 Frontend Error Handling

**Network Errors:**
- Display user-friendly error message
- Retry button for transient errors
- Log to console for debugging

**Validation Errors:**
- Inline field errors
- Form-level error summary
- Prevent submission until valid

**State Sync Errors:**
- Auto-save failures: Show warning, allow manual save
- Token refresh failures: Redirect to login
- Resume load failures: Show error, allow retry

### 11.7 Edge Cases

**Empty Resume Data:**
- Allow draft with minimal data
- Validate before generation
- Show helpful prompts for empty sections

**Very Long Content:**
- Character limit warning
- Pagination handles overflow
- PDF generation handles multi-page

**Concurrent Edits:**
- Last-write-wins (no conflict resolution)
- Auto-save prevents most conflicts
- User can manually refresh

**Template Rendering Failures:**
- Fallback to default template
- Log template errors
- Allow template switching

**PDF Generation Failures:**
- Retry mechanism
- Fallback to simple PDF
- Show error with download retry option

---

## 12. Deployment & Infrastructure

### 12.1 AWS Infrastructure

**Services Used:**
- **API Gateway**: HTTP API for Lambda functions
- **Lambda**: Serverless function execution
- **DynamoDB**: NoSQL database
- **S3**: Template storage
- **CloudWatch**: Logging and monitoring

### 12.2 DynamoDB Tables

**Tables:**

1. **Users Table** (`getquickresume-api-users-{stage}`)
   - Primary Key: `id` (String)
   - GSI: `email-index` on `email`
   - Billing: Pay-per-request

2. **Resumes Table** (`getquickresume-api-resumes-{stage}`)
   - Primary Key: `userId` (String) + `resumeId` (String)
   - GSI: `resumeId-index` on `resumeId`
   - Billing: Pay-per-request

3. **Job Interests Table** (`getquickresume-api-job-interests-{stage}`)
   - Primary Key: `userId` (String) + `jobId` (String)
   - GSI: `jobId-index` on `jobId`
   - Billing: Pay-per-request

4. **Profession Suggestions Table** (`getquickresume-api-profession-suggestions-{stage}`)
   - Primary Key: `profession` (String)
   - Used for caching AI-generated suggestions
   - Billing: Pay-per-request

5. **Job Title Achievements Table** (`getquickresume-api-job-title-achievements-{stage}`)
   - Primary Key: `jobTitle` (String)
   - Used for caching job title achievements
   - Billing: Pay-per-request

6. **Rate Limits Table** (`getquickresume-api-rate-limits-{stage}`)
   - Primary Key: `key` (String) - Format: `${userId}-${endpoint}`
   - TTL: `ttl` field (1 hour)
   - Billing: Pay-per-request

7. **Templates Table** (`getquickresume-api-templates-{stage}`)
   - Primary Key: `id` (String)
   - Billing: Pay-per-request

### 12.3 S3 Buckets

**Templates Bucket** (`getquickresume-api-templates-{stage}`)
- Stores template JavaScript code
- Versioning enabled
- Lifecycle: Delete old versions after 30 days
- Private access (no public read)

### 12.4 Lambda Functions

**Configuration:** `api/serverless.yml`

**Function Settings:**
- Runtime: Node.js 18.x
- Timeout: 900 seconds (15 minutes) - **DEBUG ONLY, reduce for production**
- Memory: Default (128MB-10GB based on usage)
- Region: us-east-1

**Functions:**
- `googleAuth` - Google OAuth handler
- `linkedinAuth` - LinkedIn OAuth handler
- `validateToken` - Token validation
- `authorize` - Lambda authorizer
- `getUserTokens` - Get user tokens
- `reduceUserTokens` - Reduce user tokens
- `generateResume` - Resume generation
- `listResumes`, `getResume`, `createResume`, `updateResume`, `deleteResume` - Resume CRUD
- `listJobInterests`, `getJobInterest`, `createJobInterest`, `updateJobInterest`, `deleteJobInterest` - Job interest CRUD
- `optimizeForJob` - Job optimization
- `getSuggestions` - Profession suggestions
- `generateAchievementSuggestions` - Achievement suggestions
- `generateSummarySuggestions` - Summary suggestions
- `getJobTitleAchievements` - Job title achievements
- `enhanceTextWithAI` - Text enhancement
- `improveSectionWithAI` - Section improvement
- `parseLinkedInData` - LinkedIn import
- `listTemplates`, `createTemplate` - Template management

### 12.5 Environment Variables

**Required:**
- `JWT_SECRET` - JWT signing secret
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret
- `LINKEDIN_CLIENT_ID` - LinkedIn OAuth client ID
- `LINKEDIN_CLIENT_SECRET` - LinkedIn OAuth client secret
- `OPENAI_API_KEY` - OpenAI API key (or `ANTHROPIC_API_KEY`)
- `AI_PROVIDER` - 'openai' | 'anthropic' | 'groq'
- `AI_MODEL` - Model name (e.g., 'gpt-4o')

**Optional:**
- `REGION` - AWS region (default: us-east-1)
- `STAGE` - Deployment stage (dev/prod)
- `DYNAMODB_ENDPOINT` - Local DynamoDB endpoint (for development)

### 12.6 Deployment

**Serverless Framework:**
- Configuration: `api/serverless.yml`
- Deploy: `serverless deploy --stage dev`
- Local development: `serverless offline`

**Build Process:**
1. TypeScript compilation: `tsc`
2. Serverless packaging
3. Lambda deployment
4. API Gateway configuration
5. DynamoDB table creation (if not exists)

**Stages:**
- `dev` - Development environment
- `prod` - Production environment

### 12.7 Local Development

**Prerequisites:**
- Node.js 18.x
- Serverless Framework CLI
- Local DynamoDB (DynamoDB Local)
- AWS credentials configured

**Setup:**
1. Install dependencies: `npm install`
2. Start local DynamoDB: `docker run -p 8000:8000 amazon/dynamodb-local`
3. Create tables: `node api/scripts/create-tables.js`
4. Start API: `cd api && serverless offline`
5. Start frontend: `npm run dev`

**Local Endpoints:**
- API: `http://localhost:3001`
- Frontend: `http://localhost:3000`

### 12.8 Monitoring & Logging

**CloudWatch Logs:**
- All Lambda functions log to CloudWatch
- Log groups: `/aws/lambda/getquickresume-api-{function}-{stage}`
- Log retention: 30 days (default)

**Key Metrics to Monitor:**
- Lambda invocation count
- Lambda error rate
- Lambda duration
- DynamoDB read/write capacity
- API Gateway request count
- API Gateway 4xx/5xx errors

**Error Tracking:**
- Console.error for errors
- Structured logging with context
- Suspicious activity logging (rateLimiter)

---

## Appendix A: File Reference Map

### Key Files by Function

**Authentication:**
- `api/src/handlers/auth.ts` - OAuth handlers
- `api/src/services/googleAuth.ts` - Google token validation
- `api/src/services/linkedinAuth.ts` - LinkedIn token exchange
- `api/src/services/jwt.ts` - JWT generation
- `api/src/handlers/authorizer.ts` - Lambda authorizer
- `src/hooks/useGoogleAuth.ts` - Google OAuth hook
- `src/hooks/useLinkedInAuth.ts` - LinkedIn OAuth hook

**Resume Generation:**
- `api/src/handlers/resume.ts` - Resume endpoints
- `api/src/services/aiService.ts` - AI service implementation
- `api/src/services/resumeService.ts` - Resume CRUD
- `src/services/resumeService.ts` - Frontend resume service
- `src/stores/resumeStore.ts` - Resume state management

**Wizard:**
- `src/pages/WizardPage.tsx` - Wizard routing
- `src/components/wizard/Step*.tsx` - Step components
- `src/components/HUD.tsx` - Progress indicator

**Templates:**
- `src/services/templatesService.ts` - Template management
- `src/services/paginationService.ts` - Pagination calculation
- `src/utils/pdfGenerator.ts` - PDF generation
- `src/components/wizard/TemplatePreviewModal.tsx` - Template preview

**Database:**
- `api/src/services/dynamodb.ts` - User operations
- `api/src/services/resumeService.ts` - Resume operations
- `api/src/services/jobInterestService.ts` - Job interest operations

**Configuration:**
- `api/serverless.yml` - Serverless configuration
- `package.json` - Frontend dependencies
- `api/package.json` - Backend dependencies
- `tsconfig.json` - TypeScript configuration

---

## Appendix B: Type Definitions Reference

### Complete Type Exports

**Frontend Types:** `src/types/index.ts`
- User, AuthState
- ResumeData, WorkExperience, Education, Certification, Project, Language, Achievement
- WizardState, WizardStep
- GeneratedResume, EnhancedExperience, EnhancedEducation, etc.
- Resume, JobInterest
- TokenPackage, PremiumFeature
- TranslationOptions, TranslationResult
- ApiResponse, PaginatedResponse
- FormField, AppError

**Backend Types:** `api/src/types.ts`
- User, JWTPayload, AuthorizerContext, AuthorizedEvent
- ResumeData (same structure as frontend)
- GenerateResumeRequest, GenerateResumeResponse
- Resume, JobInterest
- ProfessionSuggestion, SuggestionsResponse
- AchievementSuggestionRequest, AchievementSuggestionResponse
- SummarySuggestionRequest, SummarySuggestionResponse
- JobTitleAchievementsRequest, JobTitleAchievementsResponse
- EnhanceTextRequest, EnhanceTextResponse
- ImproveSectionRequest, ImproveSectionResponse
- LinkedInDataRequest, LinkedInDataResponse

---

## Appendix C: API Endpoint Summary

### Complete Endpoint List

**Authentication (Public):**
- `POST /api/auth/google`
- `POST /api/auth/linkedin`
- `GET /api/auth/validate`

**User (Protected):**
- `GET /api/user/tokens`
- `POST /api/user/tokens/reduce`

**Resume (Protected):**
- `POST /api/resume/generate` (5 tokens)
- `GET /api/resumes`
- `GET /api/resumes/{id}`
- `POST /api/resumes`
- `PUT /api/resumes/{id}`
- `DELETE /api/resumes/{id}`

**Job Interests (Protected):**
- `GET /api/job-interests`
- `GET /api/job-interests/{id}`
- `POST /api/job-interests`
- `PUT /api/job-interests/{id}`
- `DELETE /api/job-interests/{id}`
- `POST /api/job-interests/{id}/optimize` (5 tokens)

**Suggestions (Protected):**
- `GET /api/suggestions/{profession}`
- `POST /api/achievements/suggestions`
- `POST /api/summary/suggestions`
- `POST /api/experience-achievements/suggestions`

**AI (Protected):**
- `POST /api/ai/enhance`
- `POST /api/ai/improve-section` (rate limited: 10/min)

**LinkedIn (Protected):**
- `POST /api/linkedInData` (rate limited: 5/min)

**Templates:**
- `GET /api/templates` (protected)
- `POST /api/templates` (public, for local dev)

---

## Document Maintenance

**Update Frequency:**
- Update when adding new features
- Update when changing API contracts
- Update when modifying data models
- Review quarterly for accuracy

**Version History:**
- v1.0 (2024): Initial comprehensive PRD

---

**End of Document**

