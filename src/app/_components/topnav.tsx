"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { SimpleUploadButton } from "./simple-upload-button";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between bg-gray-900 text-white border-b border-gray-700 p-4 text-xl font-semibold shadow-lg">
      {/* Website Title */}
      <div className="text-2xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-400">
        SuperCar 🚗🔥
      </div>

      {/* Right Section (Upload Button only when signed in + User Profile) */}
      <div className="flex flex-row gap-4 items-center">
        <SignedIn>
          <SimpleUploadButton />
        </SignedIn>
        <UserButton />
      </div>
    </nav>
  );
}
