import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";

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


// Signed Out Page with Video Background
function SignedOutPage() {
    return (
        <div className="fixed inset-0 flex items-center justify-center text-white overflow-hidden">
            {/* Background Video */}
            <video 
                autoPlay 
                loop 
                muted 
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="https://tk8zpspyil.ufs.sh/f/jvybWn5giNAHv7hmwMdNt3F2n5qK1P7pLlGohcUwE869ZCHW" type="video/mp4" />
            </video>

            {/* Dark Overlay for Better Contrast */}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>

            {/* Content */}
            <div className="relative z-10 text-center px-6">
                <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-400 drop-shadow-lg animate-fade-in">
                    Welcome to Cool Cars 🚗🔥
                </h1>
                <p className="mt-4 text-xl text-gray-300 max-w-lg mx-auto animate-fade-in delay-100">
                    Sign in to explore and showcase your stunning collection of cool car pictures.
                </p>

                {/* Sign In Button */}
                <div className="mt-6 animate-slide-up">
                    <SignInButton>
                        <button className="px-6 py-3 text-lg font-semibold bg-red-500 hover:bg-red-600 transition-all duration-300 rounded-xl shadow-lg transform hover:scale-105">
                            Sign In
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
