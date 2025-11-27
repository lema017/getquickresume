import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, PutCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { createHash } from 'crypto';

interface TemplateRecord {
  id: string;
  name?: string;
  description?: string;
  category: 'free' | 'premium';
  s3Key: string;
  tagName?: string;
  hash?: string;
}

const dynamoClient = new DynamoDBClient({
  region: process.env.REGION || 'us-east-1',
  ...(process.env.DYNAMODB_ENDPOINT && {
    endpoint: process.env.DYNAMODB_ENDPOINT,
    credentials: { accessKeyId: 'local', secretAccessKey: 'local' },
  }),
});
const ddb = DynamoDBDocumentClient.from(dynamoClient);

const s3 = new S3Client({ region: process.env.REGION || 'us-east-1' });

const TEMPLATES_TABLE = process.env.TEMPLATES_TABLE || 'getquickresume-api-templates-dev';
const TEMPLATES_BUCKET = process.env.TEMPLATES_BUCKET || '';

async function streamToString(stream: any): Promise<string> {
  return await new Promise<string>((resolve, reject) => {
    const chunks: any[] = [];
    stream.on('data', (chunk: any) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
  });
}

function generateHash(content: string): string {
  return createHash('sha256').update(content).digest('hex');
}

export interface CreateTemplateData {
  id: string;
  name: string;
  description?: string;
  category: 'free' | 'premium';
  tagName: string;
  jsCode: string;
  hash?: string;
}

export const templateService = {
  async listAll(): Promise<TemplateRecord[]> {
    const result = await ddb.send(new ScanCommand({ TableName: TEMPLATES_TABLE }));
    const items = (result.Items || []) as any[];
    return items.map((item) => ({
      id: item.id,
      name: item.name,
      description: item.description,
      category: item.category,
      s3Key: item.s3Key,
      tagName: item.tagName,
      hash: item.hash,
    })) as TemplateRecord[];
  },

  async getCode(s3Key: string): Promise<string> {
    if (!TEMPLATES_BUCKET) throw new Error('TEMPLATES_BUCKET is not configured');
    const res = await s3.send(new GetObjectCommand({ Bucket: TEMPLATES_BUCKET, Key: s3Key }));
    // @ts-ignore - Body type differs between runtimes
    const bodyStream = res.Body;
    const code = await streamToString(bodyStream);
    return code;
  },

  async createTemplate(data: CreateTemplateData): Promise<TemplateRecord> {
    if (!TEMPLATES_BUCKET) throw new Error('TEMPLATES_BUCKET is not configured');

    // Verificar si el template ya existe
    const existing = await ddb.send(
      new GetCommand({
        TableName: TEMPLATES_TABLE,
        Key: { id: data.id },
      })
    );

    if (existing.Item) {
      throw new Error(`Template with id "${data.id}" already exists`);
    }

    // Generar s3Key
    const s3Key = `templates/${data.id}.js`;

    // Generar hash si no se proporciona
    const hash = data.hash || generateHash(data.jsCode);

    // Subir código a S3
    await s3.send(
      new PutObjectCommand({
        Bucket: TEMPLATES_BUCKET,
        Key: s3Key,
        Body: data.jsCode,
        ContentType: 'application/javascript',
      })
    );

    // Guardar metadata en DynamoDB
    const templateRecord: TemplateRecord = {
      id: data.id,
      name: data.name,
      description: data.description,
      category: data.category,
      tagName: data.tagName,
      s3Key,
      hash,
    };

    await ddb.send(
      new PutCommand({
        TableName: TEMPLATES_TABLE,
        Item: templateRecord,
      })
    );

    return templateRecord;
  },
};

export type { TemplateRecord };


