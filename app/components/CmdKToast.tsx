"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function CmdKToast() {
    useEffect(() => {
        const hasSeenToast = localStorage.getItem("cmdk-toast-seen");
        if (hasSeenToast) return;

        const timer = setTimeout(() => {
            toast("Pro tip: Press ⌘K to navigate quickly", {
                duration: 5000,
                position: "bottom-right",
                action: {
                    label: "Try it",
                    onClick: () => {
                        document.dispatchEvent(new KeyboardEvent("keydown", { key: "k", metaKey: true }));
                    },
                },
            });
            localStorage.setItem("cmdk-toast-seen", "true");
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return null;
}
