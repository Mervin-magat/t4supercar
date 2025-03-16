import { SignedIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server"; // FIX: Import auth to get userId
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";

// Enable dynamic rendering for server component
export const dynamic = "force-dynamic";

async function Images() {
  const { userId } = await auth(); // FIX: Get userId

  if (!userId) throw new Error("Unauthorized");

  // FIX: Correct way to query Drizzle ORM
  const userImages = await db
    .select()
    .from(images)
    .where(eq(images.userId, userId))
    .orderBy(images.id);

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {userImages.map((image) => (
        <div key={image.id} className="w-48">
          <img src={image.url} alt={image.name} className="w-full h-auto" />
          <div className="text-center">{image.name}</div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="min-h-screen p-4">
      <SignedOut>
        <div className="h-full w-full text-2xl text-center">PLEASE SIGN IN ABOVE</div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
