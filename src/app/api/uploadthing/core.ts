import { clerkClient } from '@clerk/nextjs/server';
import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import { ratelimit } from "~/server/ratelimit";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      // Await the authentication result
      const user = await auth(); 

      if (!user.userId) throw new UploadThingError("Unauthorized");

  
      const {success} = await ratelimit.limit(user.userId);
      if (!success) throw new UploadThingError("Rate Limit  Exceeded")

      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);

      try {
        // Insert file details into database
        await db.insert(images).values({
          name: file.name,
          url: file.ufsUrl, // Use ufsUrl instead of deprecated url
          userId: metadata.userId,
        });

        console.log("File URL:", file.ufsUrl);
      } catch (error) {
        console.error("Database insert error:", error);
      }

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;