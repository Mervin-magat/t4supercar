import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";
import Image from "next/image";

// Enable dynamic rendering for the server component
export const dynamic = "force-dynamic";

async function Images() {
    const userImages = await getMyImages(); // FIX: Correct variable name

    return (
        <div className="mt-5 flex flex-wrap justify-center gap-4">
            {userImages.map((image) => (
                <div key={image.id} className="w-48">
                    <Image src={image.url} objectFit="contaion" width={200} height={20} alt="{image.name}" />
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
