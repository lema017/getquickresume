import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('paypalService', () => {
  const fetchMock = vi.fn();

  async function loadModule(opts?: { clientId?: string; clientSecret?: string }) {
    vi.resetModules();
    process.env.PAYPAL_CLIENT_ID = opts?.clientId ?? 'cid';
    process.env.PAYPAL_CLIENT_SECRET = opts?.clientSecret ?? 'sec';
    process.env.PAYPAL_ENVIRONMENT = 'sandbox';
    vi.stubGlobal('fetch', fetchMock);
    return import('./paypalService');
  }

  beforeEach(() => {
    fetchMock.mockReset();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  function oauthOk() {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      text: async () => '',
      json: async () => ({ access_token: 'atok', expires_in: 3600 }),
    });
  }

  it('getAccessToken fetches token', async () => {
    const paypal = await loadModule();
    oauthOk();
    expect(await paypal.getAccessToken()).toBe('atok');
  });

  it('getAccessToken throws without credentials', async () => {
    const paypal = await loadModule({ clientId: '', clientSecret: '' });
    await expect(paypal.getAccessToken()).rejects.toThrow('credentials');
  });

  it('getAccessToken throws on bad response', async () => {
    const paypal = await loadModule();
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 401,
      text: async () => 'err',
    });
    await expect(paypal.getAccessToken()).rejects.toThrow('access token');
  });

  it('createOrder', async () => {
    const paypal = await loadModule();
    oauthOk();
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 201,
      text: async () => '',
      json: async () => ({ id: 'ORD', status: 'CREATED', links: [] }),
    });
    const o = await paypal.createOrder('monthly', 'user1');
    expect(o.id).toBe('ORD');
  });

  it('createOrder invalid plan', async () => {
    const paypal = await loadModule();
    oauthOk();
    await expect(paypal.createOrder('invalid' as 'monthly', 'u')).rejects.toThrow('Invalid plan');
  });

  it('createOrder api error', async () => {
    const paypal = await loadModule();
    oauthOk();
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 400,
      text: async () => 'bad',
    });
    await expect(paypal.createOrder('monthly', 'u')).rejects.toThrow('create PayPal order');
  });

  it('captureOrder', async () => {
    const paypal = await loadModule();
    oauthOk();
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 201,
      text: async () => '',
      json: async () => ({ id: 'cap', status: 'COMPLETED', purchase_units: [], payer: {} }),
    });
    const c = await paypal.captureOrder('ORD');
    expect(c.status).toBe('COMPLETED');
  });

  it('captureOrder error', async () => {
    const paypal = await loadModule();
    oauthOk();
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: async () => 'x',
    });
    await expect(paypal.captureOrder('ORD')).rejects.toThrow('capture');
  });

  it('getOrderDetails', async () => {
    const paypal = await loadModule();
    oauthOk();
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 200,
      text: async () => '',
      json: async () => ({ id: 'ORD', status: 'APPROVED', links: [] }),
    });
    const d = await paypal.getOrderDetails('ORD');
    expect(d.status).toBe('APPROVED');
  });

  it('getOrderDetails error', async () => {
    const paypal = await loadModule();
    oauthOk();
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 404,
      text: async () => 'n',
    });
    await expect(paypal.getOrderDetails('ORD')).rejects.toThrow('get PayPal order');
  });

  it('extractCustomData', async () => {
    const { extractCustomData } = await loadModule();
    type PCR = import('./paypalService').PayPalCaptureResponse;
    const cap = {
      purchase_units: [
        { payments: { captures: [{ custom_id: JSON.stringify({ userId: 'u', planType: 'monthly' }) }] } },
      ],
    } as PCR;
    expect(extractCustomData(cap)).toEqual({ userId: 'u', planType: 'monthly' });
    expect(extractCustomData({ purchase_units: [] } as PCR)).toBeNull();
  });

  it('extractCustomData parse error', async () => {
    const { extractCustomData } = await loadModule();
    type PCR = import('./paypalService').PayPalCaptureResponse;
    const cap = {
      purchase_units: [
        { payments: { captures: [{ custom_id: 'not-json' }] } },
      ],
    } as PCR;
    expect(extractCustomData(cap)).toBeNull();
  });
});
