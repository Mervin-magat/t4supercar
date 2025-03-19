import "server-only";
import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { images } from "./db/schema";
import { error } from "console";

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
