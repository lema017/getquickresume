import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Readable, PassThrough } from 'node:stream';

vi.hoisted(() => {
  process.env.TEMPLATES_BUCKET = 'test-bucket';
  return null;
});

const ddbSend = vi.hoisted(() => vi.fn());
const s3Send = vi.hoisted(() => vi.fn());

vi.mock('@aws-sdk/client-dynamodb', () => ({
  DynamoDBClient: class {
    constructor() {}
  },
}));

vi.mock('@aws-sdk/lib-dynamodb', () => {
  class ScanCommand {
    constructor(public input: unknown) {}
  }
  class PutCommand {
    constructor(public input: unknown) {}
  }
  class GetCommand {
    constructor(public input: unknown) {}
  }
  return {
    DynamoDBDocumentClient: { from: () => ({ send: ddbSend }) },
    ScanCommand,
    PutCommand,
    GetCommand,
  };
});

vi.mock('@aws-sdk/client-s3', () => {
  class GetObjectCommand {
    constructor(public input: unknown) {}
  }
  class PutObjectCommand {
    constructor(public input: unknown) {}
  }
  class S3Client {
    send = s3Send;
    constructor() {}
  }
  return { S3Client, GetObjectCommand, PutObjectCommand };
});

import { templateService } from './templateService';

describe('templateService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('listAll maps items', async () => {
    ddbSend.mockResolvedValueOnce({
      Items: [{ id: 't1', category: 'free', s3Key: 'k' }],
    });
    const list = await templateService.listAll();
    expect(list[0].id).toBe('t1');
  });

  it('getCode reads stream', async () => {
    const stream = Readable.from([Buffer.from('export const x=1')]);
    s3Send.mockResolvedValueOnce({ Body: stream });
    const code = await templateService.getCode('templates/x.js');
    expect(code).toContain('export');
  });

  it('createTemplate', async () => {
    ddbSend.mockResolvedValueOnce({}).mockResolvedValueOnce({});
    s3Send.mockResolvedValueOnce({});
    const r = await templateService.createTemplate({
      id: 'new1',
      name: 'N',
      description: 'Optional description',
      category: 'free',
      tagName: 'n',
      jsCode: 'code',
      hash: 'preset-hash',
    });
    expect(r.s3Key).toBe('templates/new1.js');
    expect(r.hash).toBe('preset-hash');
  });

  it('createTemplate throws if exists', async () => {
    ddbSend.mockResolvedValueOnce({ Item: { id: 'x' } });
    await expect(
      templateService.createTemplate({
        id: 'x',
        name: 'n',
        category: 'free',
        tagName: 't',
        jsCode: 'c',
      })
    ).rejects.toThrow('already exists');
  });

  it('listAll throws on dynamo error', async () => {
    ddbSend.mockRejectedValueOnce(new Error('scan failed'));
    await expect(templateService.listAll()).rejects.toThrow();
  });

  it('getCode throws when S3 body missing', async () => {
    s3Send.mockResolvedValueOnce({ Body: undefined });
    await expect(templateService.getCode('k.js')).rejects.toThrow();
  });

  it('updateTemplate', async () => {
    ddbSend
      .mockResolvedValueOnce({
        Item: { id: 't1', s3Key: 'templates/t1.js', category: 'free' },
      })
      .mockResolvedValueOnce({});
    s3Send.mockResolvedValueOnce({});
    const r = await templateService.updateTemplate({ id: 't1', jsCode: 'new' });
    expect(r.hash).toBeTruthy();
  });

  it('updateTemplate respects explicit hash', async () => {
    ddbSend
      .mockResolvedValueOnce({
        Item: { id: 't1', s3Key: 'templates/t1.js', category: 'free', hash: 'old' },
      })
      .mockResolvedValueOnce({});
    s3Send.mockResolvedValueOnce({});
    const r = await templateService.updateTemplate({
      id: 't1',
      jsCode: 'newcode',
      hash: 'explicit-hash-value',
    });
    expect(r.hash).toBe('explicit-hash-value');
  });

  it('updateTemplate missing', async () => {
    ddbSend.mockResolvedValueOnce({});
    await expect(templateService.updateTemplate({ id: 'nope', jsCode: 'x' })).rejects.toThrow(
      'does not exist'
    );
  });

  it('updateTemplate propagates S3 upload failure', async () => {
    ddbSend.mockResolvedValueOnce({
      Item: { id: 't1', s3Key: 'templates/t1.js', category: 'free' },
    });
    s3Send.mockRejectedValueOnce(new Error('s3'));
    await expect(templateService.updateTemplate({ id: 't1', jsCode: 'x' })).rejects.toThrow();
  });

  it('getById throws on dynamo error', async () => {
    ddbSend.mockRejectedValueOnce(new Error('get failed'));
    await expect(templateService.getById('z')).rejects.toThrow();
  });

  it('getById returns record', async () => {
    ddbSend.mockResolvedValue({ Item: { id: 'a', s3Key: 'k', category: 'free' } });
    expect((await templateService.getById('a'))?.id).toBe('a');
  });

  it('getById returns null', async () => {
    ddbSend.mockResolvedValue({});
    expect(await templateService.getById('b')).toBeNull();
  });

  it('getCode propagates stream read errors', async () => {
    const stream = new PassThrough();
    s3Send.mockResolvedValueOnce({ Body: stream });
    const p = templateService.getCode('templates/err.js');
    queueMicrotask(() => stream.destroy(new Error('stream broke')));
    await expect(p).rejects.toThrow('stream broke');
  });

  it('createTemplate throws when DynamoDB put fails after S3', async () => {
    ddbSend.mockResolvedValueOnce({}).mockRejectedValueOnce(new Error('put failed'));
    s3Send.mockResolvedValueOnce({});
    await expect(
      templateService.createTemplate({
        id: 'failput',
        name: 'F',
        category: 'free',
        tagName: 'f',
        jsCode: 'export {}',
      })
    ).rejects.toThrow('put failed');
  });
});
