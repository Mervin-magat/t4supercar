import "server-only";
import { auth } from "@clerk/nextjs/server";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { images } from "./db/schema";

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
