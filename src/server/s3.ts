import { S3Client } from "@aws-sdk/client-s3";

const client = new S3Client({
  region: "us-west-1",
  credentials: {
    secretAccessKey: process.env.AWS_S3_SECRET!,
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
  },
	
	
});

export default client;
