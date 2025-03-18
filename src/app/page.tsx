import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";

// Enable dynamic rendering for the server component
export const dynamic = "force-dynamic";

async function Images() {
    const userImages = await getMyImages(); // FIX: Correct variable name

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
