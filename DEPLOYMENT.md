# Deployment Guide for GetQuickResume

This guide covers deployment procedures for both the Frontend and API components.

## Prerequisites

- Node.js 18+ installed
- AWS CLI configured with appropriate credentials
- Serverless Framework installed globally (`npm install -g serverless`)

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                              │
│  React + Vite → S3 Bucket → CloudFront → getquickresume.com │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                          API                                 │
│  Lambda Functions → API Gateway → api.getquickresume.com    │
│                         │                                    │
│                         ▼                                    │
│                     DynamoDB                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Frontend Deployment

### Quick Deploy (Recommended)

```bash
# From project root
npm run deploy:frontend
```

This single command will:
1. Build the frontend with production environment variables
2. Deploy/update CloudFormation stack
3. Sync files to S3

### Manual Deploy Steps

If you need more control over the deployment:

```bash
# 1. Build with production environment variables
npm run build:prod

# 2. Sync to S3
npx serverless s3sync --stage prod

# 3. Invalidate CloudFront cache (for immediate updates)
aws cloudfront create-invalidation \
  --distribution-id E2H0190TG5JILF \
  --paths "/*"
```

### Environment Variables (Frontend)

The `build:prod` script injects these variables at build time:

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API URL (`https://api.getquickresume.com`) |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Client ID |
| `VITE_LINKEDIN_CLIENT_ID` | LinkedIn OAuth Client ID |

> ⚠️ **Important:** Always use `npm run build:prod` instead of `npx vite build` directly. The latter will NOT include environment variables and will break authentication!

### CloudFront Distribution

- **Distribution ID:** `E2H0190TG5JILF`
- **Domain:** `getquickresume.com`
- **S3 Bucket:** `getquickresume.com`

---

## API Deployment

### Quick Deploy (Recommended)

```bash
# From project root
npm run deploy:api

# OR from api directory
cd api && npm run deploy:prod
```

### Manual Deploy Steps

```bash
cd api

# 1. Build TypeScript
npm run build

# 2. Deploy to AWS
npx serverless deploy --stage prod

# Force deploy (if no changes detected)
npx serverless deploy --stage prod --force
```

### API Endpoints

After deployment, the API is available at:
- **Production:** `https://api.getquickresume.com`
- **Development:** `http://localhost:3001/dev`

### Environment Variables (API)

API environment variables are configured in `api/serverless.yml` under the `environment` section. Sensitive values should be stored in AWS SSM Parameter Store or Secrets Manager.

Key variables:
- `JWT_SECRET` - JWT signing secret
- `OPENAI_API_KEY` - OpenAI API key for AI features
- `GROQ_API_KEY` - Groq API key (free tier AI)
- `GOOGLE_CLIENT_ID` - Google OAuth Client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth Client Secret
- `LINKEDIN_CLIENT_ID` - LinkedIn OAuth Client ID
- `LINKEDIN_CLIENT_SECRET` - LinkedIn OAuth Client Secret

---

## Development Deployment

For deploying to the development environment:

```bash
# Frontend (dev)
npm run deploy:frontend:dev

# API (dev)
npm run deploy:api:dev
```

---

## Full Deployment (Both Frontend + API)

When deploying changes to both frontend and API:

```bash
# 1. Deploy API first (backend changes need to be live)
npm run deploy:api

# 2. Then deploy frontend
npm run deploy:frontend

# 3. Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id E2H0190TG5JILF \
  --paths "/*"
```

---

## Rollback Procedures

### Frontend Rollback

CloudFront and S3 don't keep version history by default. To rollback:

1. Checkout the previous commit
2. Rebuild and redeploy:
   ```bash
   git checkout <previous-commit>
   npm run deploy:frontend
   ```

### API Rollback

Serverless keeps deployment versions. To rollback:

```bash
cd api
npx serverless rollback --timestamp <timestamp>
```

Or deploy a previous commit:
```bash
git checkout <previous-commit>
cd api && npm run deploy:prod
```

---

## Monitoring & Logs

### API Logs (CloudWatch)

```bash
# View recent logs for a specific function
aws logs tail /aws/lambda/getquickresume-api-prod-generateResume --follow

# View logs from last 30 minutes
aws logs filter-log-events \
  --log-group-name "/aws/lambda/getquickresume-api-prod-generateResume" \
  --start-time $(date -v-30M +%s000)
```

### Common Log Groups

- `/aws/lambda/getquickresume-api-prod-googleAuth`
- `/aws/lambda/getquickresume-api-prod-generateResume`
- `/aws/lambda/getquickresume-api-prod-scoreResume`
- `/aws/lambda/getquickresume-api-prod-getSuggestions`

---

## Troubleshooting

### Google OAuth "origin_mismatch" Error

**Cause:** Frontend built without `VITE_GOOGLE_CLIENT_ID` environment variable.

**Solution:** Rebuild with production script:
```bash
npm run build:prod
npx serverless s3sync --stage prod
aws cloudfront create-invalidation --distribution-id E2H0190TG5JILF --paths "/*"
```

### CloudFront Not Showing Updates

**Cause:** CloudFront caches content aggressively.

**Solution:** Create a cache invalidation:
```bash
aws cloudfront create-invalidation \
  --distribution-id E2H0190TG5JILF \
  --paths "/*"
```

### API Gateway Timeout

**Cause:** Lambda functions have a max timeout of 30 seconds when attached to API Gateway.

**Solution:** Optimize the function or consider async processing patterns.

### S3 Sync Not Working

**Cause:** Serverless may skip sync if no CloudFormation changes.

**Solution:** Run S3 sync directly:
```bash
npx serverless s3sync --stage prod
```

---

## Useful Commands Reference

| Command | Description |
|---------|-------------|
| `npm run deploy:frontend` | Build and deploy frontend to production |
| `npm run deploy:api` | Deploy API to production |
| `npm run build:prod` | Build frontend with prod env vars |
| `npx serverless s3sync --stage prod` | Sync dist/ to S3 |
| `aws cloudfront create-invalidation --distribution-id E2H0190TG5JILF --paths "/*"` | Clear CDN cache |
| `cd api && npm run deploy:prod` | Deploy API from api directory |
| `cd api && npm run offline` | Run API locally |

---

## CI/CD Notes

For automated deployments, ensure your CI/CD pipeline:

1. Uses `npm run build:prod` (not `vite build` or `npm run build`)
2. Has AWS credentials configured
3. Runs CloudFront invalidation after S3 sync
4. Deploys API before frontend when both have changes

