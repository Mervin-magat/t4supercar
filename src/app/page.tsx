import { db } from "~/server/db";
import { images } from "~/server/db/schema";

// Enable dynamic rendering for server component
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images= await db.query.images.findMany({
    orderBy: (model, {desc}) => desc(model.id),
}); // Fixed variable name

  return (
    <main className="p-4">
      <div className="flex flex-wrap gap-4">
        {images.map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url}/>
            <div>{image.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
