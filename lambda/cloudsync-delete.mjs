import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";

const s3  = new S3Client({ region: "ap-south-1" });
const ddb = new DynamoDBClient({ region: "ap-south-1" });

export const handler = async (event) => {
  const fileId = event.queryStringParameters?.fileId;
  if (!fileId) {
    return {
      statusCode: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "fileId is required" }),
    };
  }

  // Delete from S3
  await s3.send(new DeleteObjectCommand({
    Bucket: "cloudsync-private",
    Key: fileId,
  }));

  // Delete from DynamoDB
  await ddb.send(new DeleteItemCommand({
    TableName: "cloudsync",
    Key: { "file id": { S: fileId } },
  }));

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ message: "Deleted successfully" }),
  };
};
