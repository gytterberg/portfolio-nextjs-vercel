import AWS from 'aws-sdk';

const s3 = new AWS.S3({ region: process.env.AWS_REGION });

export async function listPosts(bucket: string) {
  const res = await s3.listObjectsV2({ Bucket: bucket }).promise();
  const keys = (res.Contents || []).map((o) => o.Key).filter(Boolean) as string[];
  return keys;
}

export async function getPost(bucket: string, key: string) {
  const res = await s3.getObject({ Bucket: bucket, Key: key }).promise();

  if (!res.Body) return '';

  if (Buffer.isBuffer(res.Body)) return res.Body.toString('utf8');

  // res.Body can be a stream in some environments; coerce to string conservatively
  return String(res.Body);
}

export default s3;
