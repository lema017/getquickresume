import { describe, it, expect, vi, beforeEach } from 'vitest';

const sendMock = vi.hoisted(() => vi.fn());

vi.mock('@aws-sdk/client-dynamodb', () => ({
  DynamoDBClient: vi.fn().mockImplementation(() => ({})),
}));

vi.mock('@aws-sdk/lib-dynamodb', () => ({
  DynamoDBDocumentClient: {
    from: () => ({ send: sendMock }),
  },
  PutCommand: vi.fn((input: unknown) => ({ __put: input })),
  QueryCommand: vi.fn((input: unknown) => ({ __query: input })),
}));

import { recordView, getAnalytics, getRecentViewers, parseUserAgent } from './analyticsService';

describe('analyticsService', () => {
  beforeEach(() => {
    sendMock.mockReset();
  });

  it('recordView sends PutCommand', async () => {
    sendMock.mockResolvedValueOnce({});
    await recordView({
      shareToken: 't',
      viewedAt: new Date().toISOString(),
      ipAddress: '1.1.1.1',
    });
    expect(sendMock).toHaveBeenCalled();
  });

  it('recordView throws on failure', async () => {
    sendMock.mockRejectedValueOnce(new Error('ddb'));
    await expect(
      recordView({ shareToken: 't', viewedAt: '2020-01-01T00:00:00.000Z' })
    ).rejects.toThrow('Failed to record view');
  });

  it('getAnalytics aggregates views', async () => {
    sendMock.mockResolvedValueOnce({
      Items: [
        {
          shareToken: 't',
          viewedAt: '2024-06-01T12:00:00.000Z',
          ipAddress: '1.1.1.1',
          device: 'mobile',
          browser: 'Chrome',
          country: 'US',
          city: 'Austin',
        },
        {
          shareToken: 't',
          viewedAt: '2024-06-02T12:00:00.000Z',
          ipAddress: '1.1.1.1',
          device: 'desktop',
          browser: 'Firefox',
          country: 'US',
        },
        {
          shareToken: 't',
          viewedAt: '2024-06-03T12:00:00.000Z',
          device: 'tablet',
          browser: undefined,
          country: undefined,
          city: undefined,
        },
      ],
    });
    const a = await getAnalytics('t');
    expect(a.totalViews).toBe(3);
    expect(a.uniqueViews).toBe(1);
    expect(a.viewsByDevice.mobile).toBe(1);
    expect(a.viewsByDevice.desktop).toBe(1);
    expect(a.viewsByDevice.tablet).toBe(1);
    expect(a.viewsByBrowser.Unknown).toBe(1);
    expect(a.viewsByCountry.Unknown).toBe(1);
    expect(a.viewsOverTime.length).toBeGreaterThan(0);
  });

  it('getAnalytics returns empty summary on query error', async () => {
    sendMock.mockRejectedValueOnce(new Error('q'));
    const a = await getAnalytics('t');
    expect(a.totalViews).toBe(0);
    expect(a.uniqueViews).toBe(0);
  });

  it('getRecentViewers maps and sanitizes referrer', async () => {
    sendMock.mockResolvedValueOnce({
      Items: [
        {
          shareToken: 't',
          viewedAt: '2024-01-01T00:00:00.000Z',
          ipAddress: '9.9.9.9',
          device: undefined,
          browser: undefined,
          os: undefined,
          country: undefined,
          city: undefined,
          referrer: 'https://evil.com/path?q=1',
        },
      ],
    });
    const rows = await getRecentViewers('t', 5);
    expect(rows).toHaveLength(1);
    expect(rows[0].referrer).toBe('evil.com');
    expect(rows[0].device).toBe('unknown');
  });

  it('getRecentViewers returns [] on error', async () => {
    sendMock.mockRejectedValueOnce(new Error('x'));
    await expect(getRecentViewers('t')).resolves.toEqual([]);
  });

  it('parseUserAgent detects tablet mobile browsers and OS', () => {
    expect(parseUserAgent('Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)').device).toBe('tablet');
    expect(parseUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)').device).toBe('mobile');
    expect(parseUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/90.0').browser).toBe('Chrome');
    expect(parseUserAgent('Mozilla/5.0 (Windows NT 10.0; rv:91.0) Gecko/20100101 Firefox/91.0').browser).toBe(
      'Firefox'
    );
    expect(parseUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0 Safari/605.1.15').browser).toBe('Safari');
    expect(parseUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edg/91.0').browser).toBe('Edge');
    expect(parseUserAgent('Mozilla/5.0 Opera/9.0').browser).toBe('Opera');
    expect(parseUserAgent('Mozilla/5.0 (Windows NT 10.0)').os).toBe('Windows');
    expect(parseUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)').os).toBe('macOS');
    expect(parseUserAgent('Mozilla/5.0 (X11; Linux x86_64)').os).toBe('Linux');
    expect(parseUserAgent('Mozilla/5.0 (Android 13; Mobile)').os).toBe('Android');
    expect(parseUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0)').os).toBe('iOS');
  });
});
