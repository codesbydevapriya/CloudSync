import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const s3  = new S3Client({ region: "ap-south-1" });
const ddb = new DynamoDBClient({ region: "ap-south-1" });

export const handler = async (event) => {
  const { fileName, fileType, fileSize, userEmail } = JSON.parse(event.body);

  // Generate pre-signed upload URL
  const command = new PutObjectCommand({
    Bucket: "cloudsync-private",
    Key: `${userEmail}/${fileName}`,
    ContentType: fileType,
  });
  const url = await getSignedUrl(s3, command, { expiresIn: 300 });

  // Save metadata to DynamoDB
  await ddb.send(new PutItemCommand({
    TableName: "cloudsync",
    Item: {
      "file id": { S: `${userEmail}/${fileName}` },
      userEmail: { S: userEmail },
      fileName:  { S: fileName },
      fileSize:  { N: String(fileSize) },
      fileType:  { S: fileType },
      uploadedAt:{ S: new Date().toISOString() },
    }
  }));

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ url }),
  };
};
