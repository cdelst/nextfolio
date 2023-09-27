declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AWS_S3_SECRET: string;
      AWS_S3_ACCESS_KEY_ID: string;
			AWS_CLOUDFRONT_URL: string;
    }
  }
}
