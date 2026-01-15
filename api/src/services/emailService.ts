import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { User } from './dynamodb';

const sesClient = new SESClient({
  region: process.env.REGION || 'us-east-1',
});

const FROM_EMAIL = process.env.SES_FROM_EMAIL || 'noreply@getquickresume.com';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

/**
 * Invoice details for premium purchase receipt
 */
export interface InvoiceDetails {
  transactionId: string;
  amount: string;
  currency: string;
  paymentDate: string;
  subscriptionExpiration: string;
}

/**
 * Format date for display in emails
 */
function formatDate(isoDate: string): string {
  try {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return isoDate;
  }
}

/**
 * Format currency for display
 */
function formatCurrency(amount: string, currency: string): string {
  const symbols: Record<string, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
  };
  const symbol = symbols[currency] || currency + ' ';
  return `${symbol}${amount}`;
}

/**
 * Send premium welcome email with purchase invoice to user
 */
export async function sendPremiumWelcomeEmail(
  user: User,
  planType: 'monthly' | 'yearly',
  invoiceDetails: InvoiceDetails
): Promise<void> {
  try {
    const planName = planType === 'monthly' ? 'Premium Monthly' : 'Premium Yearly';
    const billingPeriod = planType === 'monthly' ? 'month' : 'year';
    const formattedAmount = formatCurrency(invoiceDetails.amount, invoiceDetails.currency);
    const formattedPaymentDate = formatDate(invoiceDetails.paymentDate);
    const formattedExpiration = formatDate(invoiceDetails.subscriptionExpiration);
    const invoiceNumber = `INV-${invoiceDetails.transactionId.substring(0, 12).toUpperCase()}`;
    
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Premium!</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Welcome to Premium!</h1>
  </div>
  
  <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
    <p style="font-size: 16px; margin-bottom: 20px;">Hi ${user.firstName || 'there'},</p>
    
    <p style="font-size: 16px; margin-bottom: 20px;">
      Thank you for upgrading to <strong>${planName}</strong>! Your subscription is now active and you have access to all premium features.
    </p>
    
    <!-- Purchase Receipt Section -->
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
      <h2 style="margin-top: 0; font-size: 18px; color: #333;">📄 Purchase Receipt</h2>
      <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #666;">Invoice Number:</td>
          <td style="padding: 8px 0; text-align: right;"><strong>${invoiceNumber}</strong></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;">Transaction ID:</td>
          <td style="padding: 8px 0; text-align: right; font-family: monospace; font-size: 12px;">${invoiceDetails.transactionId}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;">Plan:</td>
          <td style="padding: 8px 0; text-align: right;">${planName}</td>
        </tr>
        <tr style="border-top: 1px solid #e0e0e0;">
          <td style="padding: 8px 0; color: #666;">Amount Paid:</td>
          <td style="padding: 8px 0; text-align: right; font-size: 16px;"><strong style="color: #667eea;">${formattedAmount}</strong></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;">Payment Date:</td>
          <td style="padding: 8px 0; text-align: right;">${formattedPaymentDate}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;">Valid Until:</td>
          <td style="padding: 8px 0; text-align: right;">${formattedExpiration}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;">Payment Method:</td>
          <td style="padding: 8px 0; text-align: right;">PayPal</td>
        </tr>
      </table>
    </div>
    
    <!-- Features Section -->
    <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h2 style="color: #667eea; margin-top: 0; font-size: 20px;">What's included:</h2>
      <ul style="margin: 0; padding-left: 20px;">
        <li>40 resume generations per ${billingPeriod}</li>
        <li>Unlimited downloads</li>
        <li>AI Resume Enhancement</li>
        <li>Multi-language translation</li>
        <li>QR code sharing with analytics</li>
        <li>Advanced resume scoring</li>
        <li>Premium templates</li>
        <li>Unlimited editing</li>
      </ul>
    </div>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${FRONTEND_URL}/dashboard" 
         style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
        Go to Dashboard
      </a>
    </div>
    
    <p style="font-size: 14px; color: #666; margin-top: 30px; border-top: 1px solid #e0e0e0; padding-top: 20px;">
      If you have any questions or need help, feel free to reach out to our support team.
    </p>
    
    <p style="font-size: 14px; color: #666; margin-top: 10px;">
      Best regards,<br>
      The GetQuickResume Team
    </p>
  </div>
  
  <div style="text-align: center; margin-top: 20px; padding: 20px; color: #999; font-size: 12px;">
    <p>GetQuickResume - Create professional resumes with AI</p>
    <p>
      <a href="${FRONTEND_URL}/legal/privacy" style="color: #667eea; text-decoration: none;">Privacy Policy</a> | 
      <a href="${FRONTEND_URL}/legal/terms" style="color: #667eea; text-decoration: none;">Terms of Service</a>
    </p>
  </div>
</body>
</html>
    `;

    const textBody = `
Welcome to Premium!

Hi ${user.firstName || 'there'},

Thank you for upgrading to ${planName}! Your subscription is now active and you have access to all premium features.

-----------------------------------------
PURCHASE RECEIPT
-----------------------------------------
Invoice Number: ${invoiceNumber}
Transaction ID: ${invoiceDetails.transactionId}
Plan: ${planName}
Amount Paid: ${formattedAmount}
Payment Date: ${formattedPaymentDate}
Valid Until: ${formattedExpiration}
Payment Method: PayPal
-----------------------------------------

What's included:
- 40 resume generations per ${billingPeriod}
- Unlimited downloads
- AI Resume Enhancement
- Multi-language translation
- QR code sharing with analytics
- Advanced resume scoring
- Premium templates
- Unlimited editing

Get started: ${FRONTEND_URL}/dashboard

If you have any questions or need help, feel free to reach out to our support team.

Best regards,
The GetQuickResume Team
    `.trim();

    const command = new SendEmailCommand({
      Source: FROM_EMAIL,
      Destination: {
        ToAddresses: [user.email],
      },
      Message: {
        Subject: {
          Data: `Welcome to Premium! Your receipt is inside 🎉`,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: htmlBody,
            Charset: 'UTF-8',
          },
          Text: {
            Data: textBody,
            Charset: 'UTF-8',
          },
        },
      },
    });

    await sesClient.send(command);
    console.log(`Premium welcome email with invoice sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending premium welcome email:', error);
    // Don't throw - email failures shouldn't break the upgrade process
    // Log for monitoring but allow the upgrade to complete
  }
}

/**
 * Send subscription canceled email
 */
export async function sendSubscriptionCanceledEmail(user: User): Promise<void> {
  try {
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Subscription Canceled</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #f8f9fa; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
    <h1 style="color: #333; margin: 0; font-size: 28px;">Subscription Canceled</h1>
  </div>
  
  <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
    <p style="font-size: 16px; margin-bottom: 20px;">Hi ${user.firstName || 'there'},</p>
    
    <p style="font-size: 16px; margin-bottom: 20px;">
      We've received your request to cancel your premium subscription. Your subscription will remain active until ${user.subscriptionExpiration ? new Date(user.subscriptionExpiration).toLocaleDateString() : 'the end of your billing period'}.
    </p>
    
    <p style="font-size: 16px; margin-bottom: 20px;">
      We're sorry to see you go! If you change your mind, you can reactivate your subscription anytime.
    </p>
    
    <div style="text-align: center; margin: 30px 0;">
      <a href="${FRONTEND_URL}/premium" 
         style="display: inline-block; background: #667eea; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
        Reactivate Premium
      </a>
    </div>
    
    <p style="font-size: 14px; color: #666; margin-top: 30px; border-top: 1px solid #e0e0e0; padding-top: 20px;">
      If you have any questions or feedback, please don't hesitate to contact our support team.
    </p>
    
    <p style="font-size: 14px; color: #666; margin-top: 10px;">
      Best regards,<br>
      The GetQuickResume Team
    </p>
  </div>
</body>
</html>
    `;

    const textBody = `
Subscription Canceled

Hi ${user.firstName || 'there'},

We've received your request to cancel your premium subscription. Your subscription will remain active until ${user.subscriptionExpiration ? new Date(user.subscriptionExpiration).toLocaleDateString() : 'the end of your billing period'}.

We're sorry to see you go! If you change your mind, you can reactivate your subscription anytime.

Reactivate: ${FRONTEND_URL}/premium

If you have any questions or feedback, please don't hesitate to contact our support team.

Best regards,
The GetQuickResume Team
    `.trim();

    const command = new SendEmailCommand({
      Source: FROM_EMAIL,
      Destination: {
        ToAddresses: [user.email],
      },
      Message: {
        Subject: {
          Data: 'Your Premium Subscription Has Been Canceled',
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: htmlBody,
            Charset: 'UTF-8',
          },
          Text: {
            Data: textBody,
            Charset: 'UTF-8',
          },
        },
      },
    });

    await sesClient.send(command);
    console.log(`Subscription canceled email sent to ${user.email}`);
  } catch (error) {
    console.error('Error sending subscription canceled email:', error);
    // Don't throw - email failures shouldn't break the cancellation process
  }
}

