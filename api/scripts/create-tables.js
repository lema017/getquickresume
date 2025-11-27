const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { CreateTableCommand } = require('@aws-sdk/client-dynamodb');

const client = new DynamoDBClient({
  region: process.env.REGION || 'us-east-1',
  endpoint: process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000',
  credentials: {
    accessKeyId: 'local',
    secretAccessKey: 'local'
  }
});

const usersTableName = process.env.DYNAMODB_TABLE || 'getquickresume-api-users-dev';
const resumesTableName = process.env.RESUMES_TABLE || 'getquickresume-api-resumes-dev';
const jobInterestsTableName = process.env.JOB_INTERESTS_TABLE || 'getquickresume-api-job-interests-dev';
const professionSuggestionsTableName = process.env.PROFESSION_SUGGESTIONS_TABLE || 'getquickresume-api-profession-suggestions-dev';
const jobTitleAchievementsTableName = process.env.JOB_TITLE_ACHIEVEMENTS_TABLE || 'getquickresume-api-job-title-achievements-dev';
const rateLimitsTableName = process.env.RATE_LIMITS_TABLE || 'getquickresume-api-rate-limits-dev';
const templatesTableName = process.env.TEMPLATES_TABLE || 'getquickresume-api-templates-dev';

/**
 * Creates the Users table
 * 
 * Note: DynamoDB is schemaless, so field definitions are not required here.
 * The User model includes:
 * - id (primary key)
 * - email (indexed via GSI)
 * - isPremium (boolean, default: false)
 * - freeResumeUsed (boolean, default: false)
 * - premiumResumeCount (number, default: 0)
 * - premiumResumeMonth (string, YYYY-MM format)
 * - Other user profile fields (firstName, lastName, etc.)
 * 
 * The tokens field has been removed in favor of free/premium limits.
 */
async function createUsersTable() {
  try {
    console.log(`Creating table: ${usersTableName}`);
    
    const command = new CreateTableCommand({
      TableName: usersTableName,
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S'
        },
        {
          AttributeName: 'email',
          AttributeType: 'S'
        }
      ],
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH'
        }
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: 'email-index',
          KeySchema: [
            {
              AttributeName: 'email',
              KeyType: 'HASH'
            }
          ],
          Projection: {
            ProjectionType: 'ALL'
          }
        }
      ],
      BillingMode: 'PAY_PER_REQUEST'
    });

    await client.send(command);
    console.log(`✅ Table ${usersTableName} created successfully!`);
  } catch (error) {
    if (error.name === 'ResourceInUseException') {
      console.log(`ℹ️  Table ${usersTableName} already exists`);
    } else {
      console.error('❌ Error creating table:', error);
      throw error;
    }
  }
}

async function createResumesTable() {
  try {
    console.log(`Creating table: ${resumesTableName}`);
    
    const command = new CreateTableCommand({
      TableName: resumesTableName,
      AttributeDefinitions: [
        {
          AttributeName: 'userId',
          AttributeType: 'S'
        },
        {
          AttributeName: 'resumeId',
          AttributeType: 'S'
        }
      ],
      KeySchema: [
        {
          AttributeName: 'userId',
          KeyType: 'HASH'
        },
        {
          AttributeName: 'resumeId',
          KeyType: 'RANGE'
        }
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: 'resumeId-index',
          KeySchema: [
            {
              AttributeName: 'resumeId',
              KeyType: 'HASH'
            }
          ],
          Projection: {
            ProjectionType: 'ALL'
          }
        }
      ],
      BillingMode: 'PAY_PER_REQUEST'
    });

    await client.send(command);
    console.log(`✅ Table ${resumesTableName} created successfully!`);
  } catch (error) {
    if (error.name === 'ResourceInUseException') {
      console.log(`ℹ️  Table ${resumesTableName} already exists`);
    } else {
      console.error('❌ Error creating table:', error);
      throw error;
    }
  }
}

async function createJobInterestsTable() {
  try {
    console.log(`Creating table: ${jobInterestsTableName}`);
    
    const command = new CreateTableCommand({
      TableName: jobInterestsTableName,
      AttributeDefinitions: [
        {
          AttributeName: 'userId',
          AttributeType: 'S'
        },
        {
          AttributeName: 'jobId',
          AttributeType: 'S'
        }
      ],
      KeySchema: [
        {
          AttributeName: 'userId',
          KeyType: 'HASH'
        },
        {
          AttributeName: 'jobId',
          KeyType: 'RANGE'
        }
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: 'jobId-index',
          KeySchema: [
            {
              AttributeName: 'jobId',
              KeyType: 'HASH'
            }
          ],
          Projection: {
            ProjectionType: 'ALL'
          }
        }
      ],
      BillingMode: 'PAY_PER_REQUEST'
    });

    await client.send(command);
    console.log(`✅ Table ${jobInterestsTableName} created successfully!`);
  } catch (error) {
    if (error.name === 'ResourceInUseException') {
      console.log(`ℹ️  Table ${jobInterestsTableName} already exists`);
    } else {
      console.error('❌ Error creating table:', error);
      throw error;
    }
  }
}

async function createProfessionSuggestionsTable() {
  try {
    console.log(`Creating table: ${professionSuggestionsTableName}`);
    
    const command = new CreateTableCommand({
      TableName: professionSuggestionsTableName,
      AttributeDefinitions: [
        {
          AttributeName: 'profession',
          AttributeType: 'S'
        }
      ],
      KeySchema: [
        {
          AttributeName: 'profession',
          KeyType: 'HASH'
        }
      ],
      BillingMode: 'PAY_PER_REQUEST'
    });

    await client.send(command);
    console.log(`✅ Table ${professionSuggestionsTableName} created successfully!`);
  } catch (error) {
    if (error.name === 'ResourceInUseException') {
      console.log(`ℹ️  Table ${professionSuggestionsTableName} already exists`);
    } else {
      console.error('❌ Error creating table:', error);
      throw error;
    }
  }
}

async function createJobTitleAchievementsTable() {
  try {
    console.log(`Creating table: ${jobTitleAchievementsTableName}`);
    
    const command = new CreateTableCommand({
      TableName: jobTitleAchievementsTableName,
      AttributeDefinitions: [
        {
          AttributeName: 'jobTitle',
          AttributeType: 'S'
        }
      ],
      KeySchema: [
        {
          AttributeName: 'jobTitle',
          KeyType: 'HASH'
        }
      ],
      BillingMode: 'PAY_PER_REQUEST'
    });

    await client.send(command);
    console.log(`✅ Table ${jobTitleAchievementsTableName} created successfully!`);
  } catch (error) {
    if (error.name === 'ResourceInUseException') {
      console.log(`ℹ️  Table ${jobTitleAchievementsTableName} already exists`);
    } else {
      console.error('❌ Error creating table:', error);
      throw error;
    }
  }
}

async function createRateLimitsTable() {
  try {
    console.log(`Creating table: ${rateLimitsTableName}`);
    
    const command = new CreateTableCommand({
      TableName: rateLimitsTableName,
      AttributeDefinitions: [
        {
          AttributeName: 'key',
          AttributeType: 'S'
        }
      ],
      KeySchema: [
        {
          AttributeName: 'key',
          KeyType: 'HASH'
        }
      ],
      TimeToLiveSpecification: {
        AttributeName: 'ttl',
        Enabled: true
      },
      BillingMode: 'PAY_PER_REQUEST'
    });

    await client.send(command);
    console.log(`✅ Table ${rateLimitsTableName} created successfully!`);
  } catch (error) {
    if (error.name === 'ResourceInUseException') {
      console.log(`ℹ️  Table ${rateLimitsTableName} already exists`);
    } else {
      console.error('❌ Error creating table:', error);
      throw error;
    }
  }
}

async function createTemplatesTable() {
  try {
    console.log(`Creating table: ${templatesTableName}`);
    
    const command = new CreateTableCommand({
      TableName: templatesTableName,
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S'
        }
      ],
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH'
        }
      ],
      BillingMode: 'PAY_PER_REQUEST'
    });

    await client.send(command);
    console.log(`✅ Table ${templatesTableName} created successfully!`);
  } catch (error) {
    if (error.name === 'ResourceInUseException') {
      console.log(`ℹ️  Table ${templatesTableName} already exists`);
    } else {
      console.error('❌ Error creating table:', error);
      throw error;
    }
  }
}

async function main() {
  try {
    console.log('🚀 Setting up DynamoDB local tables...');
    console.log(`Environment: ${process.env.STAGE || 'dev'}`);
    console.log(`Region: ${process.env.REGION || 'us-east-1'}`);
    console.log(`DynamoDB Endpoint: ${process.env.DYNAMODB_ENDPOINT || 'http://localhost:8000'}`);
    console.log(`Users Table: ${usersTableName}`);
    console.log(`Resumes Table: ${resumesTableName}`);
    console.log(`Job Interests Table: ${jobInterestsTableName}`);
    console.log(`Profession Suggestions Table: ${professionSuggestionsTableName}`);
    console.log(`Job Title Achievements Table: ${jobTitleAchievementsTableName}`);
    console.log(`Rate Limits Table: ${rateLimitsTableName}`);
    console.log(`Templates Table: ${templatesTableName}`);
    console.log('');

    await createUsersTable();
    await createResumesTable();
    await createJobInterestsTable();
    await createProfessionSuggestionsTable();
    await createJobTitleAchievementsTable();
    await createRateLimitsTable();
    await createTemplatesTable();
    
    console.log('');
    console.log('✅ All tables created successfully!');
    console.log('You can now start your serverless offline with: npm run dev');
  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

main();
