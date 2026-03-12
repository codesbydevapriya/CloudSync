import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({ region: "ap-south-1" });

export const handler = async (event) => {
  const fileId = event.queryStringParameters?.fileId;
  if (!fileId) {
    return {
      statusCode: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "fileId is required" }),
    };
  }
  const command = new GetObjectCommand({
    Bucket: "cloudsync-private",
    Key: fileId,
  });
  const url = await getSignedUrl(s3, command, { expiresIn: 300 });
  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ url }),
  };
};
