import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";
import Image from "next/image";
import Link from "next/link";
import NotificationHandler from "./components/notification-handler";


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



function SignedOutPage() {
    return (
        <div className="fixed inset-0 flex items-center justify-center text-white overflow-hidden">
            <video 
                autoPlay 
                loop 
                muted 
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="https://tk8zpspyil.ufs.sh/f/jvybWn5giNAHuz4nCcbOC0oQ7YwcsaVjZbP16dAWpurBTGkR" type="video/mp4" />
            </video>

         
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>

          
            <div className="relative z-10 text-center px-6">
                <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-400 drop-shadow-lg animate-fade-in">
                    Request Hcc Documents
                </h1>
                <p className="mt-4 text-xl text-white-300 max-w-lg mx-auto animate-fade-in delay-100">
                    Sign in to request COR, COE, COG, and Good Moral
                </p>

              
                <div className="mt-6 animate-slide-up">
                    <SignInButton>
                        <button className="px-6 py-3 text-lg font-semibold bg-yellow-500 hover:bg-blue-600 transition-all duration-300 rounded-xl shadow-lg transform hover:scale-105">
                            Sign In
                        </button>
                    </SignInButton>
                </div>
            </div>
        </div>
    );
}



export default function HomePage() {
    return (
        <main className="min-h-screen text-white p-0 flex flex-col">
            <SignedOut>
                <div className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black">
                    <SignedOutPage />
                </div>
            </SignedOut>
            <SignedIn>
                <div className="flex-grow bg-white text-black p-8">
                    <NotificationHandler />
                    <h1 className="text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-400 drop-shadow-lg mb-10 animate-fade-in">
                    Request Documents
                    </h1>
                    <Images />
                </div>
            </SignedIn>

            {/* Footer */}
            <footer className="bg-yellow-400 text-black text-center py-4">
                <p className="font-semibold">Developed by:</p>
                <ul className="mt-2 space-y-1">
                    <li>Bernard Mangulabnan</li>
                    <li>Mervin Magat</li>
                    <li>Andrei Sampang</li>
                    <li>Renz Samson</li>
                    <li>Paul Vismonte</li>
                    <li>Steven Lising</li>
                </ul>
            </footer>
        </main>
    );
}


