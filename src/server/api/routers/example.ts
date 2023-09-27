import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "app/server/api/trpc";

import { getAllObjectIds } from "app/server/s3";
import { z } from "zod";

import {
  type ListObjectVersionsCommandInput,
  ListObjectsV2Command,
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

import client from "app/server/s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  getAllObjectKeys: publicProcedure.query(async () => {
    const params: ListObjectVersionsCommandInput = {
      Bucket: "nextfolio",
    };

    const command = new ListObjectsV2Command(params);

    const response = await client.send(command);

    return response.Contents?.map((content) => content.Key).filter(
      (key) => !!key,
    );
  }),

  getObject: publicProcedure
    .input(z.object({ key: z.string().optional() }))
    .query(({ input }) => {
      if (!input.key) {
        return;
      }

      return process.env.AWS_CLOUDFRONT_URL + input.key;
    }),
});
