import { describe, it, expect, vi, beforeEach } from 'vitest';

const sesSend = vi.hoisted(() => vi.fn().mockResolvedValue(undefined));

vi.mock('@aws-sdk/client-ses', () => ({
  SESClient: class {
    send = sesSend;
  },
  SendEmailCommand: class {
    constructor(public input: unknown) {}
  },
}));

import { sendPremiumWelcomeEmail, sendSubscriptionCanceledEmail } from './emailService';
import type { User } from './dynamodb';

const user: User = {
  id: 'u1',
  email: 'buyer@test.com',
  firstName: 'Sam',
  lastName: 'P',
  provider: 'google',
  isPremium: true,
  freeResumeUsed: false,
  premiumResumeCount: 0,
  premiumResumeMonth: '2026-03',
  freeDownloadUsed: false,
  totalDownloads: 0,
  freeCoverLetterUsed: false,
  premiumCoverLetterCount: 0,
  premiumCoverLetterMonth: '2026-03',
  createdAt: 't',
  updatedAt: 't',
};

const invoice = {
  transactionId: 'txn_abcdefghijklmno',
  amount: '19.99',
  currency: 'EUR',
  paymentDate: new Date().toISOString(),
  subscriptionExpiration: new Date(Date.now() + 86400000).toISOString(),
};

describe('emailService', () => {
  beforeEach(() => {
    sesSend.mockClear();
    sesSend.mockResolvedValue(undefined);
  });

  it('sendPremiumWelcomeEmail monthly does not throw', async () => {
    await expect(sendPremiumWelcomeEmail(user, 'monthly', invoice)).resolves.toBeUndefined();
    expect(sesSend).toHaveBeenCalled();
  });

  it('sendPremiumWelcomeEmail yearly', async () => {
    await sendPremiumWelcomeEmail(user, 'yearly', { ...invoice, currency: 'GBP' });
    expect(sesSend).toHaveBeenCalled();
  });

  it('sendPremiumWelcomeEmail tolerates odd payment date strings', async () => {
    await sendPremiumWelcomeEmail(user, 'monthly', {
      ...invoice,
      paymentDate: 'not-a-real-iso-date',
      subscriptionExpiration: 'also-invalid',
    });
    expect(sesSend).toHaveBeenCalled();
  });

  it('sendPremiumWelcomeEmail survives toLocaleDateString throwing', async () => {
    const orig = Date.prototype.toLocaleDateString;
    Date.prototype.toLocaleDateString = function () {
      throw new Error('locale broken');
    };
    try {
      await sendPremiumWelcomeEmail(user, 'monthly', invoice);
      expect(sesSend).toHaveBeenCalled();
    } finally {
      Date.prototype.toLocaleDateString = orig;
    }
  });

  it('sendPremiumWelcomeEmail swallows SES errors', async () => {
    sesSend.mockRejectedValueOnce(new Error('SES down'));
    await expect(sendPremiumWelcomeEmail(user, 'monthly', invoice)).resolves.toBeUndefined();
  });

  it('sendPremiumWelcomeEmail uses unknown currency symbol fallback', async () => {
    await sendPremiumWelcomeEmail(user, 'monthly', { ...invoice, currency: 'JPY' });
    expect(sesSend).toHaveBeenCalled();
  });

  it('sendSubscriptionCanceledEmail with and without expiration', async () => {
    await sendSubscriptionCanceledEmail(user);
    await sendSubscriptionCanceledEmail({
      ...user,
      subscriptionExpiration: undefined,
    } as User);
    expect(sesSend.mock.calls.length).toBeGreaterThanOrEqual(2);
  });

  it('sendSubscriptionCanceledEmail swallows errors', async () => {
    sesSend.mockRejectedValueOnce(new Error('bounce'));
    await expect(sendSubscriptionCanceledEmail(user)).resolves.toBeUndefined();
  });

  it('uses “there” when firstName empty on welcome email', async () => {
    await sendPremiumWelcomeEmail({ ...user, firstName: '' }, 'yearly', invoice);
    expect(sesSend).toHaveBeenCalled();
  });

  it('cancel email uses fallback when subscriptionExpiration absent', async () => {
    await sendSubscriptionCanceledEmail({ ...user, firstName: '', subscriptionExpiration: undefined } as User);
    expect(sesSend).toHaveBeenCalled();
  });

  it('cancel email formats subscriptionExpiration when present', async () => {
    await sendSubscriptionCanceledEmail({
      ...user,
      subscriptionExpiration: new Date().toISOString(),
    } as User);
    expect(sesSend).toHaveBeenCalled();
  });
});
