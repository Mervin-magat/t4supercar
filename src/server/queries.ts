import "server-only";
import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { and, eq } from "drizzle-orm";
import { images } from "./db/schema";
import { utapi } from "./uploadthing";
import analyticsServerClient from "./analytics";
import { redirect } from "next/navigation";

export async function getMyImages() {
    const { userId } = await auth(); // FIX: No need for `await` since auth() is synchronous

    if (!userId) throw new Error("Unauthorized");

    // FIX: Corrected return statement
    return await db
        .select()
        .from(images)
        .where(eq(images.userId, userId))
        .orderBy(images.id);
}

export async function getImage(id:number ) {
    const user = await auth(); // FIX: No need for `await` since auth() is synchronous
    if (!user.userId) throw new Error("Unauthorized");

  const image = await db.query.images.findFirst({
    where: (model,{eq}) => eq(model.id, id),
  })

   if (!image) throw new Error("image not found");
   if(image.userId !== user.userId) throw new Error("Unauthorized");

  return image;
}



export async function deleteImage(id:number ) {
  const user = await auth(); 
  if (!user.userId) throw new Error("Unauthorized");

const image = await db.query.images.findFirst({
  where: (model,{eq}) => eq(model.id, id),
})

 if (!image) throw new Error("image not found");

 if(image.userId !== user.userId) throw new Error("Unauthorized");

 const fileKey = image.url?.split("/").pop();

 if (!fileKey) throw new Error("Invalid FileKey");

 await utapi.deleteFiles(fileKey);

 await db.delete(images).where(and(eq(images.id, id), eq(images.userId, user.userId)));

 analyticsServerClient.capture({
  distinctId: user.userId,
  event: "Delete Image",
  properties: {
    imageId: id,
  },
 });

redirect("/?deleted=true");
}

