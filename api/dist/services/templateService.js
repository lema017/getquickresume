"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateService = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const client_s3_1 = require("@aws-sdk/client-s3");
const crypto_1 = require("crypto");
const dynamoClient = new client_dynamodb_1.DynamoDBClient({
    region: process.env.REGION || 'us-east-1',
    ...(process.env.DYNAMODB_ENDPOINT && {
        endpoint: process.env.DYNAMODB_ENDPOINT,
        credentials: { accessKeyId: 'local', secretAccessKey: 'local' },
    }),
});
const ddb = lib_dynamodb_1.DynamoDBDocumentClient.from(dynamoClient);
const s3 = new client_s3_1.S3Client({ region: process.env.REGION || 'us-east-1' });
const TEMPLATES_TABLE = process.env.TEMPLATES_TABLE || 'getquickresume-api-templates-dev';
const TEMPLATES_BUCKET = process.env.TEMPLATES_BUCKET || '';
async function streamToString(stream) {
    return await new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', (chunk) => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    });
}
function generateHash(content) {
    return (0, crypto_1.createHash)('sha256').update(content).digest('hex');
}
exports.templateService = {
    async listAll() {
        const result = await ddb.send(new lib_dynamodb_1.ScanCommand({ TableName: TEMPLATES_TABLE }));
        const items = (result.Items || []);
        return items.map((item) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            category: item.category,
            s3Key: item.s3Key,
            tagName: item.tagName,
            hash: item.hash,
        }));
    },
    async getCode(s3Key) {
        if (!TEMPLATES_BUCKET)
            throw new Error('TEMPLATES_BUCKET is not configured');
        const res = await s3.send(new client_s3_1.GetObjectCommand({ Bucket: TEMPLATES_BUCKET, Key: s3Key }));
        // @ts-ignore - Body type differs between runtimes
        const bodyStream = res.Body;
        const code = await streamToString(bodyStream);
        return code;
    },
    async createTemplate(data) {
        if (!TEMPLATES_BUCKET)
            throw new Error('TEMPLATES_BUCKET is not configured');
        // Verificar si el template ya existe
        const existing = await ddb.send(new lib_dynamodb_1.GetCommand({
            TableName: TEMPLATES_TABLE,
            Key: { id: data.id },
        }));
        if (existing.Item) {
            throw new Error(`Template with id "${data.id}" already exists`);
        }
        // Generar s3Key
        const s3Key = `templates/${data.id}.js`;
        // Generar hash si no se proporciona
        const hash = data.hash || generateHash(data.jsCode);
        // Subir código a S3
        await s3.send(new client_s3_1.PutObjectCommand({
            Bucket: TEMPLATES_BUCKET,
            Key: s3Key,
            Body: data.jsCode,
            ContentType: 'application/javascript',
        }));
        // Guardar metadata en DynamoDB
        const templateRecord = {
            id: data.id,
            name: data.name,
            description: data.description,
            category: data.category,
            tagName: data.tagName,
            s3Key,
            hash,
        };
        await ddb.send(new lib_dynamodb_1.PutCommand({
            TableName: TEMPLATES_TABLE,
            Item: templateRecord,
        }));
        return templateRecord;
    },
    /**
     * Update an existing template's code in S3 and update hash in DynamoDB
     */
    async updateTemplate(data) {
        if (!TEMPLATES_BUCKET)
            throw new Error('TEMPLATES_BUCKET is not configured');
        // Verify template exists
        const existing = await ddb.send(new lib_dynamodb_1.GetCommand({
            TableName: TEMPLATES_TABLE,
            Key: { id: data.id },
        }));
        if (!existing.Item) {
            throw new Error(`Template with id "${data.id}" does not exist`);
        }
        const templateRecord = existing.Item;
        const s3Key = templateRecord.s3Key;
        // Generate new hash
        const hash = data.hash || generateHash(data.jsCode);
        // Upload updated code to S3
        await s3.send(new client_s3_1.PutObjectCommand({
            Bucket: TEMPLATES_BUCKET,
            Key: s3Key,
            Body: data.jsCode,
            ContentType: 'application/javascript',
        }));
        // Update hash in DynamoDB
        const updatedRecord = {
            ...templateRecord,
            hash,
        };
        await ddb.send(new lib_dynamodb_1.PutCommand({
            TableName: TEMPLATES_TABLE,
            Item: updatedRecord,
        }));
        return updatedRecord;
    },
    /**
     * Get a template by ID
     */
    async getById(id) {
        const result = await ddb.send(new lib_dynamodb_1.GetCommand({
            TableName: TEMPLATES_TABLE,
            Key: { id },
        }));
        if (!result.Item) {
            return null;
        }
        return result.Item;
    },
};
//# sourceMappingURL=templateService.js.map