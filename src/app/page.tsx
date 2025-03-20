import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";
import Image from "next/image";
import Link from "next/link";

// Enable dynamic rendering for the server component
export const dynamic = "force-dynamic";

// Image Gallery Component (for signed-in users)
async function Images() {
    const userImages = await getMyImages();

    return (
        <div className="mt-8 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {userImages.map((image) => (
                <Link key={image.id} href={`/img/${image.id}`} passHref>
                    <div className="group relative overflow-hidden rounded-2xl shadow-xl transition transform hover:scale-105 hover:shadow-2xl cursor-pointer bg-gray-800">
                        {/* FIXED: Correctly render images */}
                        <Image 
                            src={image.url} 
                            alt={image.name} 
                            width={300} 
                            height={200} 
                            className="w-full h-56 object-cover rounded-2xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 rounded-2xl"></div>
                        <div className="absolute bottom-4 left-4 text-white text-lg font-semibold drop-shadow-md">
                            {image.name}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

// Signed Out Page
function SignedOutPage() {
    return (
        <div className="relative flex items-center justify-center h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
            {/* Background Placeholder */}
            <div className="absolute inset-0 bg-gray-900"></div>

            {/* Content */}
            <div className="relative z-10 text-center p-6">
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-400 drop-shadow-md">
                    Welcome to Cool Cars 🚗🔥
                </h1>
                <p className="mt-4 text-lg text-gray-300 max-w-md mx-auto">
                    Discover the sleekest and most exotic cars from around the world. Sign in to explore the collection!
                </p>

                {/* Sign In Button */}
                <div className="mt-6">
                    <SignInButton>
                        <button className="px-6 py-3 text-lg font-semibold bg-red-500 hover:bg-red-600 transition rounded-xl shadow-lg">
                            Sign In to Continue
                        </button>
                    </SignInButton>
                </div>
            </div>
        </div>
    );
}

// Main Page Component
export default function HomePage() {
    return (
        <main className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-8">
            <SignedOut>
                <SignedOutPage />
            </SignedOut>
            <SignedIn>
                <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-400 drop-shadow-lg mb-10 animate-fade-in">
                    Cool Cars Gallery 🚗🔥
                </h1>
                <Images />
            </SignedIn>
        </main>
    );
}
