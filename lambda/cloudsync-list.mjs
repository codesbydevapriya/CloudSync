import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";

const ddb = new DynamoDBClient({ region: "ap-south-1" });

export const handler = async (event) => {
  const userEmail = event.queryStringParameters?.userEmail;
  if (!userEmail) {
    return {
      statusCode: 400,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "userEmail is required" }),
    };
  }

  const result = await ddb.send(new QueryCommand({
    TableName: "cloudsync",
    IndexName: "userEmail-index",
    KeyConditionExpression: "userEmail = :email",
    ExpressionAttributeValues: { ":email": { S: userEmail } },
  }));

  const files = result.Items.map(item => ({
    fileId:     item["file id"].S,
    fileName:   item.fileName.S,
    fileSize:   Number(item.fileSize.N),
    uploadedAt: item.uploadedAt.S,
  }));

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ files }),
  };
};
