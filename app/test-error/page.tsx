"use client";

import { useEffect } from "react";

export default function TestErrorPage() {
    useEffect(() => {
        throw new Error("Simulated Critical failure for testing!");
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <h1>This text should not be visible if Error Boundary works.</h1>
        </div>
    );
}
