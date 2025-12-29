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
const coverLettersTableName = process.env.COVER_LETTERS_TABLE || 'getquickresume-api-cover-letters-dev';
const professionSuggestionsTableName = process.env.PROFESSION_SUGGESTIONS_TABLE || 'getquickresume-api-profession-suggestions-dev';
const jobTitleAchievementsTableName = process.env.JOB_TITLE_ACHIEVEMENTS_TABLE || 'getquickresume-api-job-title-achievements-dev';
const rateLimitsTableName = process.env.RATE_LIMITS_TABLE || 'getquickresume-api-rate-limits-dev';
const templatesTableName = process.env.TEMPLATES_TABLE || 'getquickresume-api-templates-dev';
const supportTicketsTableName = process.env.SUPPORT_TICKETS_TABLE || 'getquickresume-api-support-tickets-dev';
const resumeViewsTableName = process.env.RESUME_VIEWS_TABLE || 'getquickresume-api-resume-views-dev';
const aiUsageLogsTableName = process.env.AI_USAGE_LOGS_TABLE || 'getquickresume-api-ai-usage-logs-dev';

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
        },
        {
          AttributeName: 'shareToken',
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
        },
        {
          IndexName: 'shareToken-index',
          KeySchema: [
            {
              AttributeName: 'shareToken',
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
      console.log(`⚠️  Note: If shareToken-index GSI is missing, you may need to delete and recreate this table.`);
    } else {
      console.error('❌ Error creating table:', error);
      throw error;
    }
  }
}

async function createCoverLettersTable() {
  try {
    console.log(`Creating table: ${coverLettersTableName}`);
    
    const command = new CreateTableCommand({
      TableName: coverLettersTableName,
      AttributeDefinitions: [
        {
          AttributeName: 'userId',
          AttributeType: 'S'
        },
        {
          AttributeName: 'coverLetterId',
          AttributeType: 'S'
        }
      ],
      KeySchema: [
        {
          AttributeName: 'userId',
          KeyType: 'HASH'  // Partition key - ensures ownership isolation
        },
        {
          AttributeName: 'coverLetterId',
          KeyType: 'RANGE'  // Sort key
        }
      ],
      BillingMode: 'PAY_PER_REQUEST'
    });

    await client.send(command);
    console.log(`✅ Table ${coverLettersTableName} created successfully!`);
  } catch (error) {
    if (error.name === 'ResourceInUseException') {
      console.log(`ℹ️  Table ${coverLettersTableName} already exists`);
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

async function createSupportTicketsTable() {
  try {
    console.log(`Creating table: ${supportTicketsTableName}`);
    
    const command = new CreateTableCommand({
      TableName: supportTicketsTableName,
      AttributeDefinitions: [
        {
          AttributeName: 'ticketId',
          AttributeType: 'S'
        },
        {
          AttributeName: 'userId',
          AttributeType: 'S'
        }
      ],
      KeySchema: [
        {
          AttributeName: 'ticketId',
          KeyType: 'HASH'
        }
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: 'userId-index',
          KeySchema: [
            {
              AttributeName: 'userId',
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
    console.log(`✅ Table ${supportTicketsTableName} created successfully!`);
  } catch (error) {
    if (error.name === 'ResourceInUseException') {
      console.log(`ℹ️  Table ${supportTicketsTableName} already exists`);
    } else {
      console.error('❌ Error creating table:', error);
      throw error;
    }
  }
}

async function createResumeViewsTable() {
  try {
    console.log(`Creating table: ${resumeViewsTableName}`);
    
    const command = new CreateTableCommand({
      TableName: resumeViewsTableName,
      AttributeDefinitions: [
        {
          AttributeName: 'shareToken',
          AttributeType: 'S'
        },
        {
          AttributeName: 'viewedAt',
          AttributeType: 'S'
        }
      ],
      KeySchema: [
        {
          AttributeName: 'shareToken',
          KeyType: 'HASH'
        },
        {
          AttributeName: 'viewedAt',
          KeyType: 'RANGE'
        }
      ],
      BillingMode: 'PAY_PER_REQUEST'
    });

    await client.send(command);
    console.log(`✅ Table ${resumeViewsTableName} created successfully!`);
  } catch (error) {
    if (error.name === 'ResourceInUseException') {
      console.log(`ℹ️  Table ${resumeViewsTableName} already exists`);
    } else {
      console.error('❌ Error creating table:', error);
      throw error;
    }
  }
}

async function createAIUsageLogsTable() {
  try {
    console.log(`Creating table: ${aiUsageLogsTableName}`);
    
    const command = new CreateTableCommand({
      TableName: aiUsageLogsTableName,
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S'
        },
        {
          AttributeName: 'userId',
          AttributeType: 'S'
        },
        {
          AttributeName: 'resumeId',
          AttributeType: 'S'
        },
        {
          AttributeName: 'timestamp',
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
          IndexName: 'userId-index',
          KeySchema: [
            {
              AttributeName: 'userId',
              KeyType: 'HASH'
            },
            {
              AttributeName: 'timestamp',
              KeyType: 'RANGE'
            }
          ],
          Projection: {
            ProjectionType: 'ALL'
          }
        },
        {
          IndexName: 'resumeId-index',
          KeySchema: [
            {
              AttributeName: 'resumeId',
              KeyType: 'HASH'
            },
            {
              AttributeName: 'timestamp',
              KeyType: 'RANGE'
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
    console.log(`✅ Table ${aiUsageLogsTableName} created successfully!`);
  } catch (error) {
    if (error.name === 'ResourceInUseException') {
      console.log(`ℹ️  Table ${aiUsageLogsTableName} already exists`);
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
    console.log(`Cover Letters Table: ${coverLettersTableName}`);
    console.log(`Profession Suggestions Table: ${professionSuggestionsTableName}`);
    console.log(`Job Title Achievements Table: ${jobTitleAchievementsTableName}`);
    console.log(`Rate Limits Table: ${rateLimitsTableName}`);
    console.log(`Templates Table: ${templatesTableName}`);
    console.log(`Support Tickets Table: ${supportTicketsTableName}`);
    console.log(`Resume Views Table: ${resumeViewsTableName}`);
    console.log(`AI Usage Logs Table: ${aiUsageLogsTableName}`);
    console.log('');

    await createUsersTable();
    await createResumesTable();
    await createCoverLettersTable();
    await createProfessionSuggestionsTable();
    await createJobTitleAchievementsTable();
    await createRateLimitsTable();
    await createTemplatesTable();
    await createSupportTicketsTable();
    await createResumeViewsTable();
    await createAIUsageLogsTable();
    
    console.log('');
    console.log('✅ All tables created successfully!');
    console.log('You can now start your serverless offline with: npm run dev');
  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

main();
