"use client";

import { useRouter } from "next/navigation"; // FIXED import
import { ElementRef, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dialogRef = useRef<ElementRef<"dialog">>(null);

    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
        }
    }, []); // Added dependency array to run only once

    function onDismiss() {
        router.back();
    }

    return createPortal(
        <dialog 
            ref={dialogRef} 
            className="m-0 h-screen w-screen bg-black/90 text-white"
            onCancel={onDismiss} // Listens for ESC key press
            onClose={onDismiss}  // Listens when the dialog is closed
        >
            {children}
        </dialog>,
        document.getElementById("modal-root")!,
    );
}
