"use client";

import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
    Home,
    Gamepad2,
    BookOpen,
    Mail,
    Github,
    Twitter,
    Linkedin,
    FileText,
    Search,
} from "lucide-react";

export function CommandMenu() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = (command: () => void) => {
        setOpen(false);
        command();
    };

    return (
        <Command.Dialog
            open={open}
            onOpenChange={setOpen}
            label="Global Command Menu"
            className="fixed inset-0 z-[999] bg-zinc-950/80 backdrop-blur-sm flex items-start justify-center pt-[20vh] px-4"
            onClick={() => setOpen(false)}
        >
            <div
                className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center border-b border-zinc-800 px-4">
                    <Search className="w-5 h-5 text-zinc-500 mr-2" />
                    <Command.Input
                        placeholder="Type a command or search..."
                        className="w-full py-4 bg-transparent text-zinc-100 placeholder-zinc-500 focus:outline-none text-lg"
                    />
                </div>

                <Command.List className="max-h-[60vh] overflow-y-auto p-2 scroll-py-2">
                    <Command.Empty className="py-6 text-center text-zinc-500">
                        No results found.
                    </Command.Empty>

                    <Command.Group heading="Navigation" className="text-xs font-medium text-zinc-500 mb-2 px-2">
                        <Command.Item
                            onSelect={() => runCommand(() => router.push("/"))}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-200 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors aria-selected:bg-zinc-800 aria-selected:text-white text-sm"
                        >
                            <Home className="w-4 h-4" />
                            Home
                        </Command.Item>
                        <Command.Item
                            onSelect={() => runCommand(() => router.push("/about"))}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-200 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors aria-selected:bg-zinc-800 aria-selected:text-white text-sm"
                        >
                            <User className="w-4 h-4" />
                            About
                        </Command.Item>
                        <Command.Item
                            onSelect={() => runCommand(() => router.push("/projects"))}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-200 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors aria-selected:bg-zinc-800 aria-selected:text-white text-sm"
                        >
                            <BookOpen className="w-4 h-4" />
                            Projects
                        </Command.Item>
                        <Command.Item
                            onSelect={() => runCommand(() => router.push("/gaming"))}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-200 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors aria-selected:bg-zinc-800 aria-selected:text-white text-sm"
                        >
                            <Gamepad2 className="w-4 h-4" />
                            Gaming
                        </Command.Item>
                        <Command.Item
                            onSelect={() => runCommand(() => router.push("/guestbook"))}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-200 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors aria-selected:bg-zinc-800 aria-selected:text-white text-sm"
                        >
                            <FileText className="w-4 h-4" />
                            Guestbook
                        </Command.Item>
                        <Command.Item
                            onSelect={() => runCommand(() => router.push("/contact"))}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-200 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors aria-selected:bg-zinc-800 aria-selected:text-white text-sm"
                        >
                            <Mail className="w-4 h-4" />
                            Contact
                        </Command.Item>
                    </Command.Group>

                    <Command.Separator className="h-px bg-zinc-800 my-2" />

                    <Command.Group heading="Socials" className="text-xs font-medium text-zinc-500 mb-2 px-2">
                        <Command.Item
                            onSelect={() => runCommand(() => window.open("https://github.com/rahul-sahani04", "_blank"))}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-200 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors aria-selected:bg-zinc-800 aria-selected:text-white text-sm"
                        >
                            <Github className="w-4 h-4" />
                            GitHub
                        </Command.Item>
                        <Command.Item
                            onSelect={() => runCommand(() => window.open("https://linkedin.in/in/rahul1sahani", "_blank"))}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-200 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors aria-selected:bg-zinc-800 aria-selected:text-white text-sm"
                        >
                            <Linkedin className="w-4 h-4" />
                            LinkedIn
                        </Command.Item>
                    </Command.Group>

                    <Command.Separator className="h-px bg-zinc-800 my-2" />

                    <Command.Group heading="General" className="text-xs font-medium text-zinc-500 mb-2 px-2">
                        <Command.Item
                            onSelect={() => runCommand(() => window.open("https://raw.githubusercontent.com/Rahul-Sahani04/Rahul-Sahani04/main/Rahul_Resume.pdf", "_blank"))}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-200 hover:bg-zinc-800 hover:text-white cursor-pointer transition-colors aria-selected:bg-zinc-800 aria-selected:text-white text-sm"
                        >
                            <FileText className="w-4 h-4" />
                            Resume
                        </Command.Item>
                    </Command.Group>

                </Command.List>
            </div>
        </Command.Dialog>
    );
}
