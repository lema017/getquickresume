# Paddle Payment Integration - Production Setup Guide

This guide covers all steps needed to configure Paddle payments for production.

---

## Prerequisites

- Paddle account approved for production
- Domain verified with Paddle
- AWS SES configured and out of sandbox mode
- SSL certificate on your domain

---

## 1. Paddle Dashboard Configuration

### 1.1 Get Production API Credentials

1. Log in to **Paddle Production Dashboard**: https://vendors.paddle.com/
2. Navigate to **Developer Tools** → **Authentication**
3. Copy these values:
   - **API Key** (starts with `live_`)
   - **Client-side Token** (starts with `live_`)

### 1.2 Create Production Products & Prices

1. Go to **Catalog** → **Products**
2. Create your product (e.g., "GetQuickResume Premium")
3. Go to **Catalog** → **Prices**
4. Create two prices:
   - **Monthly**: Recurring, monthly billing
   - **Yearly**: Recurring, yearly billing
5. Copy the **Price IDs** (e.g., `pri_xxxxxx`)

### 1.3 Configure Webhook Notifications

1. Go to **Developer Tools** → **Notifications**
2. Click **Create Notification Destination**
3. Configure:

| Field | Value |
|-------|-------|
| URL | `https://api.yourdomain.com/api/webhooks/paddle` |
| Description | Production webhook |
| Events | Select all of these: |
| | `transaction.completed` |
| | `subscription.activated` |
| | `subscription.canceled` |
| | `subscription.updated` |
| | `subscription.paused` |
| | `subscription.resumed` |

4. Save and copy the **Webhook Secret** (starts with `pdl_ntfset_`)

---

## 2. Backend Configuration

### 2.1 Update `serverless.yml`

Replace sandbox values with production values:

```yaml
environment:
  # Paddle Configuration
  PADDLE_API_KEY: 'live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  PADDLE_WEBHOOK_SECRET: 'pdl_ntfset_xxxxxxxxxxxxxxxxxxxxxxxx'
  PADDLE_ENVIRONMENT: 'production'
  PADDLE_MONTHLY_PRICE_ID: 'pri_xxxxxxxxxxxxxxxxxxxxxxxx'
  PADDLE_YEARLY_PRICE_ID: 'pri_xxxxxxxxxxxxxxxxxxxxxxxx'
  
  # Email Configuration
  SES_FROM_EMAIL: 'noreply@yourdomain.com'
  
  # Frontend URL (for email links)
  FRONTEND_URL: 'https://yourdomain.com'
```

### 2.2 Environment Variables (Recommended for Production)

Instead of hardcoding, use AWS Parameter Store or Secrets Manager:

```yaml
environment:
  PADDLE_API_KEY: ${ssm:/getquickresume/prod/paddle-api-key~true}
  PADDLE_WEBHOOK_SECRET: ${ssm:/getquickresume/prod/paddle-webhook-secret~true}
```

---

## 3. Frontend Configuration

### 3.1 Update Paddle Client Token

In `src/pages/PremiumPage.tsx`, update:

```typescript
const PADDLE_CLIENT_TOKEN = 'live_xxxxxxxxxxxxxxxxxxxxxxxx';
const PADDLE_ENVIRONMENT = 'production';
```

### 3.2 Environment Variables (Recommended)

Create `.env.production`:

```bash
VITE_PADDLE_CLIENT_TOKEN=live_xxxxxxxxxxxxxxxxxxxxxxxx
VITE_PADDLE_ENVIRONMENT=production
VITE_API_URL=https://api.yourdomain.com
```

Update `PremiumPage.tsx`:

```typescript
const PADDLE_CLIENT_TOKEN = import.meta.env.VITE_PADDLE_CLIENT_TOKEN;
const PADDLE_ENVIRONMENT = import.meta.env.VITE_PADDLE_ENVIRONMENT || 'production';
```

---

## 4. AWS SES Configuration

### 4.1 Verify Domain

1. Go to AWS SES Console
2. **Verified Identities** → **Create Identity**
3. Select **Domain** and enter your domain
4. Add the DNS records provided by AWS
5. Wait for verification (can take up to 72 hours)

### 4.2 Request Production Access

1. In SES Console, go to **Account Dashboard**
2. Click **Request Production Access**
3. Fill out the form explaining your use case
4. Wait for approval (usually 24-48 hours)

### 4.3 Update Email Templates

Update `api/src/services/emailService.ts` with:
- Your brand colors and logo
- Proper unsubscribe links
- Physical address (required by law)

---

## 5. Deployment Checklist

### Backend

- [ ] Update `PADDLE_API_KEY` to production key
- [ ] Update `PADDLE_WEBHOOK_SECRET` to production secret
- [ ] Update `PADDLE_ENVIRONMENT` to `production`
- [ ] Update `PADDLE_MONTHLY_PRICE_ID` to production price
- [ ] Update `PADDLE_YEARLY_PRICE_ID` to production price
- [ ] Update `SES_FROM_EMAIL` to verified email
- [ ] Update `FRONTEND_URL` to production domain
- [ ] Deploy: `serverless deploy --stage prod`

### Frontend

- [ ] Update `PADDLE_CLIENT_TOKEN` to production token
- [ ] Update `PADDLE_ENVIRONMENT` to `production`
- [ ] Update `VITE_API_URL` to production API
- [ ] Build: `npm run build`
- [ ] Deploy to hosting (Vercel, Netlify, S3, etc.)

### Paddle Dashboard

- [ ] Verify webhook URL is accessible
- [ ] Test webhook with Paddle's test feature
- [ ] Verify products and prices are active

---

## 6. Testing Production

### 6.1 Test Webhook Connectivity

1. In Paddle Dashboard → **Notifications**
2. Click on your webhook destination
3. Click **Send Test Notification**
4. Check your backend logs for the received webhook

### 6.2 Test Full Flow

1. Use a real payment method (Paddle handles test mode differently in production)
2. Complete a purchase
3. Verify:
   - [ ] User upgraded to premium in database
   - [ ] Welcome email received
   - [ ] Thank you page displayed
   - [ ] User can access premium features

### 6.3 Test Subscription Cancellation

1. Cancel subscription from Paddle customer portal
2. Verify:
   - [ ] User downgraded in database
   - [ ] Cancellation email received

---

## 7. Configuration Reference

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PADDLE_API_KEY` | Server-side API key | `live_xxx...` |
| `PADDLE_WEBHOOK_SECRET` | Webhook signature secret | `pdl_ntfset_xxx...` |
| `PADDLE_ENVIRONMENT` | `sandbox` or `production` | `production` |
| `PADDLE_MONTHLY_PRICE_ID` | Monthly plan price ID | `pri_xxx...` |
| `PADDLE_YEARLY_PRICE_ID` | Yearly plan price ID | `pri_xxx...` |
| `SES_FROM_EMAIL` | Verified sender email | `noreply@domain.com` |
| `FRONTEND_URL` | Frontend base URL | `https://domain.com` |

### Frontend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `VITE_PADDLE_CLIENT_TOKEN` | Client-side token | `live_xxx...` |
| `VITE_PADDLE_ENVIRONMENT` | `sandbox` or `production` | `production` |
| `VITE_API_URL` | Backend API URL | `https://api.domain.com` |

---

## 8. Troubleshooting

### Webhook Not Receiving Events

1. Check webhook URL is publicly accessible
2. Verify SSL certificate is valid
3. Check Paddle Dashboard for failed webhook attempts
4. Review backend logs for errors

### Checkout Not Opening

1. Verify client token is correct
2. Check browser console for Paddle.js errors
3. Ensure Paddle.js script is loaded

### User Not Upgraded After Payment

1. Check webhook logs in Paddle Dashboard
2. Verify webhook signature validation
3. Check DynamoDB for user record
4. Review backend Lambda logs

### Emails Not Sending

1. Verify SES is out of sandbox mode
2. Check sender email is verified
3. Review SES sending statistics
4. Check Lambda logs for SES errors

---

## 9. Security Reminders

- **Never expose API keys** in frontend code
- **Always verify webhook signatures** before processing
- **Use HTTPS** for all endpoints
- **Store secrets** in AWS Parameter Store or Secrets Manager
- **Implement rate limiting** on checkout endpoint
- **Log all payment events** for audit trail
- **Monitor for fraud** using Paddle's fraud protection

---

## 10. Support Resources

- Paddle Documentation: https://developer.paddle.com/
- Paddle Support: https://paddle.com/support/
- AWS SES Documentation: https://docs.aws.amazon.com/ses/



