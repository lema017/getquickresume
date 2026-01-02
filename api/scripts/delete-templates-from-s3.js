/**
 * Delete all templates from dev S3 bucket
 * 
 * This script deletes all objects from the dev S3 bucket:
 * getquickresume-api-templates-dev
 * 
 * Usage:
 *   node scripts/delete-templates-from-s3.js
 *   node scripts/delete-templates-from-s3.js --dry-run
 * 
 * Prerequisites:
 *   - AWS credentials configured
 *   - Dev S3 bucket exists: getquickresume-api-templates-dev
 */

const { S3Client, ListObjectsV2Command, DeleteObjectsCommand } = require('@aws-sdk/client-s3');

// Configuration
const REGION = process.env.REGION || 'us-east-1';
const DEV_S3_BUCKET = 'getquickresume-api-templates-dev';

// Parse command line arguments
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');

// Initialize AWS S3 client
const s3Client = new S3Client({ region: REGION });

/**
 * List all objects in the bucket
 */
async function listAllObjects() {
  const objects = [];
  let continuationToken = undefined;

  do {
    const command = new ListObjectsV2Command({
      Bucket: DEV_S3_BUCKET,
      ContinuationToken: continuationToken,
    });

    const response = await s3Client.send(command);
    
    if (response.Contents) {
      objects.push(...response.Contents);
    }

    continuationToken = response.NextContinuationToken;
  } while (continuationToken);

  return objects;
}

/**
 * Delete objects from S3 (up to 1000 at a time)
 */
async function deleteObjects(objects) {
  if (objects.length === 0) {
    return;
  }

  // S3 allows deleting up to 1000 objects per request
  const batchSize = 1000;
  let deleted = 0;

  for (let i = 0; i < objects.length; i += batchSize) {
    const batch = objects.slice(i, i + batchSize);
    const deleteParams = {
      Bucket: DEV_S3_BUCKET,
      Delete: {
        Objects: batch.map(obj => ({ Key: obj.Key })),
        Quiet: false,
      },
    };

    const command = new DeleteObjectsCommand(deleteParams);
    const response = await s3Client.send(command);

    if (response.Deleted) {
      deleted += response.Deleted.length;
    }

    if (response.Errors && response.Errors.length > 0) {
      console.error('Errors deleting objects:');
      response.Errors.forEach(error => {
        console.error(`  ❌ ${error.Key}: ${error.Message}`);
      });
    }
  }

  return deleted;
}

/**
 * Main delete function
 */
async function deleteAllTemplates() {
  console.log('');
  console.log('🗑️  Delete Templates from Dev S3');
  console.log('=====================================');
  console.log('');
  console.log('Configuration:');
  console.log(`  • Bucket: ${DEV_S3_BUCKET}`);
  console.log(`  • Region: ${REGION}`);
  console.log(`  • Dry run: ${dryRun ? 'Yes' : 'No'}`);
  console.log('');

  try {
    // List all objects
    console.log('📋 Listing all objects in bucket...');
    const objects = await listAllObjects();

    if (objects.length === 0) {
      console.log('✅ Bucket is already empty. Nothing to delete.');
      console.log('');
      return;
    }

    console.log(`   Found ${objects.length} object(s) to delete:`);
    objects.forEach(obj => {
      console.log(`     • ${obj.Key} (${(obj.Size / 1024).toFixed(2)} KB)`);
    });
    console.log('');

    if (dryRun) {
      console.log('🔍 Dry run mode - no objects were deleted.');
      console.log('   Run without --dry-run to actually delete objects.');
      console.log('');
      return;
    }

    // Confirm deletion
    console.log('⚠️  WARNING: This will permanently delete all objects from the bucket!');
    console.log('');

    // Delete objects
    console.log('🗑️  Deleting objects...');
    const deleted = await deleteObjects(objects);

    console.log('');
    console.log('=====================================');
    console.log('📊 Summary');
    console.log('=====================================');
    console.log(`  ✅ Deleted: ${deleted} object(s)`);
    console.log('');

  } catch (error) {
    console.error('');
    console.error('❌ Fatal error:', error.message);
    console.error('');

    if (error.name === 'CredentialsError' || error.message.includes('credentials')) {
      console.error('💡 Tip: Make sure your AWS credentials are configured.');
      console.error('   You can set AWS_PROFILE or configure credentials in ~/.aws/credentials');
    }

    if (error.name === 'NoSuchBucket') {
      console.error(`💡 Tip: The bucket "${DEV_S3_BUCKET}" does not exist.`);
    }

    process.exit(1);
  }
}

// Run the delete
deleteAllTemplates();

