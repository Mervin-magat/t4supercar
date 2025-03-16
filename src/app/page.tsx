import { SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";

// Enable dynamic rendering for server component
export const dynamic = "force-dynamic";

async function Images () {
  const images= await db.query.images.findMany({
    orderBy: (model, {desc}) => desc(model.id),
}); // Fixed variable name
  return (
    <div className="flex flex-wrap justify-items-center gap-4">
    {images.map((image) => (
      <div key={image.id} className="w-48">
        <img src={image.url}/>
        <div className="text-center">{image.name}</div>
      </div>
    ))}
  </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
<div className="h-full w-full text-2xl text-center">PLEASE SIGN IN ABOVE</div>
      </SignedOut>
      <SignedIn>
        <Images/>
      </SignedIn>
    </main>
  );
}
