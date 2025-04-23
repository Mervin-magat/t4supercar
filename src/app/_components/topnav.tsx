"use client";

import { SignedIn, UserButton } from "@clerk/nextjs";
import { SimpleUploadButton } from "./simple-upload-button";

export function TopNav() {
  return (
    <nav className="flex w-full items-center justify-between bg-blue-500 text-black border-b border-gray-300 p-4 text-xl font-semibold shadow-md">
      {/* Website Title */}
      <div className="text-2xl font-extrabold tracking-wide text-white">
        Holy Cross College
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
