import { describe, it, expect, vi, beforeEach } from 'vitest';
import { makeAuthorizedEvent } from '../test-utils/apiGateway';

const payPalSend = vi.hoisted(() => vi.fn());
const getUserById = vi.hoisted(() => vi.fn());
const upgradeUserToPremium = vi.hoisted(() => vi.fn());
const createOrder = vi.hoisted(() => vi.fn());
const getOrderDetails = vi.hoisted(() => vi.fn());
const captureOrder = vi.hoisted(() => vi.fn());
const extractCustomData = vi.hoisted(() => vi.fn());
const sendPremiumWelcomeEmail = vi.hoisted(() => vi.fn());

vi.mock('@aws-sdk/client-dynamodb', () => ({
  DynamoDBClient: class {
    constructor() {}
  },
}));

vi.mock('@aws-sdk/lib-dynamodb', () => {
  class GetCommand {
    constructor(public input: unknown) {}
  }
  class PutCommand {
    constructor(public input: unknown) {}
  }
  return {
    DynamoDBDocumentClient: { from: () => ({ send: payPalSend }) },
    GetCommand,
    PutCommand,
  };
});

vi.mock('../services/dynamodb', () => ({
  getUserById,
  upgradeUserToPremium,
}));

vi.mock('../services/paypalService', () => ({
  createOrder: (...a: unknown[]) => createOrder(...a),
  getOrderDetails: (...a: unknown[]) => getOrderDetails(...a),
  captureOrder: (...a: unknown[]) => captureOrder(...a),
  extractCustomData: (...a: unknown[]) => extractCustomData(...a),
  PLAN_PRICES: {
    monthly: { amount: '10.00', currency: 'USD' },
    yearly: { amount: '60.00', currency: 'USD' },
  },
}));

vi.mock('../services/emailService', () => ({
  sendPremiumWelcomeEmail: (...a: unknown[]) => sendPremiumWelcomeEmail(...a),
}));

import { createPayPalOrder, capturePayPalOrder } from './paypalCheckout';

const user = {
  id: 'u1',
  email: 'e@test.com',
  isPremium: false,
  subscriptionExpiration: undefined,
};

function authPost(body: object) {
  return makeAuthorizedEvent({
    httpMethod: 'POST',
    body: JSON.stringify(body),
  });
}

describe('paypalCheckout', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sendPremiumWelcomeEmail.mockResolvedValue(undefined);
  });

  describe('createPayPalOrder', () => {
    it('401', async () => {
      const ev = makeAuthorizedEvent();
      (ev.requestContext as { authorizer?: unknown }).authorizer = undefined;
      expect((await createPayPalOrder(ev)).statusCode).toBe(401);
    });

    it('429 rate limited', async () => {
      payPalSend.mockResolvedValueOnce({
        Item: { requestCount: 5, windowStart: Date.now() },
      });
      const res = await createPayPalOrder(authPost({ planType: 'monthly' }));
      expect(res.statusCode).toBe(429);
    });

    it('404 user', async () => {
      payPalSend.mockResolvedValueOnce({});
      getUserById.mockResolvedValueOnce(null);
      const res = await createPayPalOrder(authPost({ planType: 'monthly' }));
      expect(res.statusCode).toBe(404);
    });

    it('400 already premium', async () => {
      payPalSend.mockResolvedValueOnce({});
      const future = new Date(Date.now() + 86400000).toISOString();
      getUserById.mockResolvedValueOnce({
        ...user,
        isPremium: true,
        subscriptionExpiration: future,
      });
      const res = await createPayPalOrder(authPost({ planType: 'monthly' }));
      expect(res.statusCode).toBe(400);
    });

    it('400 missing body', async () => {
      payPalSend.mockResolvedValueOnce({});
      getUserById.mockResolvedValueOnce(user);
      const res = await createPayPalOrder(
        makeAuthorizedEvent({ httpMethod: 'POST', body: null })
      );
      expect(res.statusCode).toBe(400);
    });

    it('400 bad json', async () => {
      payPalSend.mockResolvedValueOnce({});
      getUserById.mockResolvedValueOnce(user);
      const res = await createPayPalOrder(
        makeAuthorizedEvent({ httpMethod: 'POST', body: '{' })
      );
      expect(res.statusCode).toBe(400);
    });

    it('400 bad plan', async () => {
      payPalSend.mockResolvedValueOnce({});
      getUserById.mockResolvedValueOnce(user);
      const res = await createPayPalOrder(authPost({ planType: 'daily' }));
      expect(res.statusCode).toBe(400);
    });

    it('200 creates order', async () => {
      payPalSend.mockResolvedValueOnce({});
      getUserById.mockResolvedValueOnce(user);
      createOrder.mockResolvedValueOnce({
        id: 'ord1',
        status: 'CREATED',
        links: [{ rel: 'approve', href: 'https://paypal.test/approve' }],
      });
      const res = await createPayPalOrder(authPost({ planType: 'monthly' }));
      expect(res.statusCode).toBe(200);
    });

    it('500', async () => {
      payPalSend.mockResolvedValueOnce({});
      getUserById.mockResolvedValueOnce(user);
      createOrder.mockRejectedValueOnce(new Error('api'));
      expect((await createPayPalOrder(authPost({ planType: 'monthly' }))).statusCode).toBe(500);
    });
  });

  describe('capturePayPalOrder', () => {
    const captureOk = {
      status: 'COMPLETED',
      purchase_units: [
        {
          payments: {
            captures: [
              {
                id: 'cap1',
                amount: { value: '10.00', currency_code: 'USD' },
              },
            ],
          },
        },
      ],
      payer: { payer_id: 'p1' },
    };

    it('401', async () => {
      const ev = makeAuthorizedEvent({ body: JSON.stringify({ orderId: 'o' }) });
      (ev.requestContext as { authorizer?: unknown }).authorizer = undefined;
      expect((await capturePayPalOrder(ev)).statusCode).toBe(401);
    });

    it('400 missing orderId', async () => {
      const res = await capturePayPalOrder(authPost({}));
      expect(res.statusCode).toBe(400);
    });

    it('200 duplicate processed', async () => {
      payPalSend.mockResolvedValueOnce({ Item: { key: 'paypal-processed:o1' } });
      const res = await capturePayPalOrder(authPost({ orderId: 'o1' }));
      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res.body || '{}').duplicate).toBe(true);
    });

    it('400 getOrderDetails fails', async () => {
      payPalSend.mockResolvedValueOnce({});
      getOrderDetails.mockRejectedValueOnce(new Error('bad'));
      const res = await capturePayPalOrder(authPost({ orderId: 'o1' }));
      expect(res.statusCode).toBe(400);
    });

    it('400 not approved', async () => {
      payPalSend.mockResolvedValueOnce({});
      getOrderDetails.mockResolvedValueOnce({ status: 'CREATED' });
      const res = await capturePayPalOrder(authPost({ orderId: 'o1' }));
      expect(res.statusCode).toBe(400);
    });

    it('400 capture not completed', async () => {
      payPalSend.mockResolvedValueOnce({});
      getOrderDetails.mockResolvedValueOnce({ status: 'APPROVED' });
      captureOrder.mockResolvedValueOnce({ status: 'PENDING' });
      const res = await capturePayPalOrder(authPost({ orderId: 'o1' }));
      expect(res.statusCode).toBe(400);
    });

    it('500 no custom data', async () => {
      payPalSend.mockResolvedValueOnce({});
      getOrderDetails.mockResolvedValueOnce({ status: 'APPROVED' });
      captureOrder.mockResolvedValueOnce(captureOk);
      extractCustomData.mockReturnValueOnce(null);
      const res = await capturePayPalOrder(authPost({ orderId: 'o1' }));
      expect(res.statusCode).toBe(500);
    });

    it('403 user mismatch', async () => {
      payPalSend.mockResolvedValueOnce({});
      getOrderDetails.mockResolvedValueOnce({ status: 'APPROVED' });
      captureOrder.mockResolvedValueOnce(captureOk);
      extractCustomData.mockReturnValueOnce({ userId: 'other', planType: 'monthly' });
      const res = await capturePayPalOrder(authPost({ orderId: 'o1' }));
      expect(res.statusCode).toBe(403);
    });

    it('400 amount mismatch', async () => {
      payPalSend.mockResolvedValueOnce({});
      getOrderDetails.mockResolvedValueOnce({ status: 'APPROVED' });
      captureOrder.mockResolvedValueOnce({
        ...captureOk,
        purchase_units: [
          {
            payments: {
              captures: [
                {
                  id: 'c',
                  amount: { value: '1.00', currency_code: 'USD' },
                },
              ],
            },
          },
        ],
      });
      extractCustomData.mockReturnValueOnce({
        userId: 'user_test_1',
        planType: 'monthly',
      });
      const res = await capturePayPalOrder(authPost({ orderId: 'o1' }));
      expect(res.statusCode).toBe(400);
    });

    it('200 success', async () => {
      payPalSend
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce({});
      getOrderDetails.mockResolvedValueOnce({ status: 'APPROVED' });
      captureOrder.mockResolvedValueOnce(captureOk);
      extractCustomData.mockReturnValueOnce({
        userId: 'user_test_1',
        planType: 'monthly',
      });
      upgradeUserToPremium.mockResolvedValueOnce({
        ...user,
        isPremium: true,
        subscriptionExpiration: '2030-01-01',
      });
      const res = await capturePayPalOrder(authPost({ orderId: 'o1' }));
      expect(res.statusCode).toBe(200);
    });
  });
});
