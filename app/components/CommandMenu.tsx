"use client";

import { Command } from "cmdk";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
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
    FileText,
    Search,
    TerminalSquare
} from "lucide-react";

import { Github, Linkedin } from "@/components/Icons";

import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

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
            className="fixed inset-0 z-[999] bg-black/85 backdrop-blur-md flex items-start justify-center pt-[15vh] px-4"
            onClick={() => setOpen(false)}
        >
            <VisuallyHidden>
                <DialogTitle>Command Menu</DialogTitle>
            </VisuallyHidden>
            <div
                className="w-full max-w-2xl bg-zinc-950 border border-zinc-800/60 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                {/* ─── Terminal Header / HUD ─── */}
                <div className="flex justify-between items-center bg-zinc-900/30 px-4 py-3 border-b border-zinc-800/60">
                    <div className="text-zinc-500 font-mono text-[9px] tracking-[0.25em] flex items-center gap-2">
                        <TerminalSquare className="w-3 h-3" />
                        // COMMAND.SYS
                    </div>
                    <DialogDescription className="sr-only">
                        Global command palette and site navigation.
                    </DialogDescription>
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-sm bg-zinc-800" />
                        <div className="w-2.5 h-2.5 rounded-sm bg-zinc-800" />
                        <div className="w-2.5 h-2.5 rounded-sm bg-zinc-700" />
                    </div>
                </div>

                {/* ─── Input Area ─── */}
                <div className="flex items-center px-4 py-2 border-b border-zinc-800/60">
                    <span className="text-zinc-500 font-mono text-sm mr-3 font-bold">{'>'}</span>
                    <Command.Input
                        placeholder="EXECUTE COMMAND..."
                        className="w-full py-3 bg-transparent text-zinc-100 font-mono text-xs md:text-sm tracking-widest placeholder-zinc-600 focus:outline-none"
                    />
                </div>

                {/* ─── Command List ─── */}
                <Command.List className="max-h-[50vh] overflow-y-auto p-3 pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-800 hover:[&::-webkit-scrollbar-thumb]:bg-zinc-700 [&::-webkit-scrollbar-thumb]:rounded-full">
                    <Command.Empty className="py-8 text-center text-zinc-500 font-mono text-xs tracking-widest uppercase">
                        [ERR] 404: COMMAND NOT FOUND
                    </Command.Empty>

                    <Command.Group heading="[ NAVIGATION ]" className="text-[10px] font-mono tracking-[0.2em] text-zinc-600 mb-2 px-2 pt-2">
                        <Command.Item
                            onSelect={() => runCommand(() => router.push("/"))}
                            className="flex items-center gap-4 px-3 py-3 text-zinc-400 cursor-pointer transition-all aria-selected:text-zinc-100 aria-selected:bg-zinc-900/50 aria-selected:translate-x-1 group"
                        >
                            <Home className="w-4 h-4 opacity-50 group-aria-selected:opacity-100 transition-opacity" />
                            <span className="font-mono text-xs uppercase tracking-widest">Home</span>
                        </Command.Item>
                        <Command.Item
                            onSelect={() => runCommand(() => router.push("/about"))}
                            className="flex items-center gap-4 px-3 py-3 text-zinc-400 cursor-pointer transition-all aria-selected:text-zinc-100 aria-selected:bg-zinc-900/50 aria-selected:translate-x-1 group"
                        >
                            <User className="w-4 h-4 opacity-50 group-aria-selected:opacity-100 transition-opacity" />
                            <span className="font-mono text-xs uppercase tracking-widest">About</span>
                        </Command.Item>
                        <Command.Item
                            onSelect={() => runCommand(() => router.push("/projects"))}
                            className="flex items-center gap-4 px-3 py-3 text-zinc-400 cursor-pointer transition-all aria-selected:text-zinc-100 aria-selected:bg-zinc-900/50 aria-selected:translate-x-1 group"
                        >
                            <BookOpen className="w-4 h-4 opacity-50 group-aria-selected:opacity-100 transition-opacity" />
                            <span className="font-mono text-xs uppercase tracking-widest">Projects</span>
                        </Command.Item>
                        <Command.Item
                            onSelect={() => runCommand(() => router.push("/gaming"))}
                            className="flex items-center gap-4 px-3 py-3 text-zinc-400 cursor-pointer transition-all aria-selected:text-zinc-100 aria-selected:bg-zinc-900/50 aria-selected:translate-x-1 group"
                        >
                            <Gamepad2 className="w-4 h-4 opacity-50 group-aria-selected:opacity-100 transition-opacity" />
                            <span className="font-mono text-xs uppercase tracking-widest">Gaming</span>
                        </Command.Item>
                        <Command.Item
                            onSelect={() => runCommand(() => router.push("/guestbook"))}
                            className="flex items-center gap-4 px-3 py-3 text-zinc-400 cursor-pointer transition-all aria-selected:text-zinc-100 aria-selected:bg-zinc-900/50 aria-selected:translate-x-1 group"
                        >
                            <FileText className="w-4 h-4 opacity-50 group-aria-selected:opacity-100 transition-opacity" />
                            <span className="font-mono text-xs uppercase tracking-widest">Guestbook</span>
                        </Command.Item>
                        <Command.Item
                            onSelect={() => runCommand(() => router.push("/contact"))}
                            className="flex items-center gap-4 px-3 py-3 text-zinc-400 cursor-pointer transition-all aria-selected:text-zinc-100 aria-selected:bg-zinc-900/50 aria-selected:translate-x-1 group"
                        >
                            <Mail className="w-4 h-4 opacity-50 group-aria-selected:opacity-100 transition-opacity" />
                            <span className="font-mono text-xs uppercase tracking-widest">Contact</span>
                        </Command.Item>
                    </Command.Group>

                    <Command.Separator className="h-px bg-zinc-800/60 my-2 mx-2" />

                    <Command.Group heading="[ NETWORK ]" className="text-[10px] font-mono tracking-[0.2em] text-zinc-600 mb-2 px-2 pt-2">
                        <Command.Item
                            onSelect={() => runCommand(() => window.open("https://github.com/rahul-sahani04", "_blank"))}
                            className="flex items-center gap-4 px-3 py-3 text-zinc-400 cursor-pointer transition-all aria-selected:text-zinc-100 aria-selected:bg-zinc-900/50 aria-selected:translate-x-1 group"
                        >
                            <Github className="w-4 h-4 opacity-50 group-aria-selected:opacity-100 transition-opacity" />
                            <span className="font-mono text-xs uppercase tracking-widest">GitHub</span>
                        </Command.Item>
                        <Command.Item
                            onSelect={() => runCommand(() => window.open("https://linkedin.in/in/rahul1sahani", "_blank"))}
                            className="flex items-center gap-4 px-3 py-3 text-zinc-400 cursor-pointer transition-all aria-selected:text-zinc-100 aria-selected:bg-zinc-900/50 aria-selected:translate-x-1 group"
                        >
                            <Linkedin className="w-4 h-4 opacity-50 group-aria-selected:opacity-100 transition-opacity" />
                            <span className="font-mono text-xs uppercase tracking-widest">LinkedIn</span>
                        </Command.Item>
                    </Command.Group>

                    <Command.Separator className="h-px bg-zinc-800/60 my-2 mx-2" />

                    <Command.Group heading="[ SYSTEM ]" className="text-[10px] font-mono tracking-[0.2em] text-zinc-600 mb-2 px-2 pt-2">
                        <Command.Item
                            onSelect={() => runCommand(() => window.open("https://raw.githubusercontent.com/Rahul-Sahani04/Rahul-Sahani04/main/Rahul_Resume.pdf", "_blank"))}
                            className="flex items-center gap-4 px-3 py-3 text-zinc-400 cursor-pointer transition-all aria-selected:text-zinc-100 aria-selected:bg-zinc-900/50 aria-selected:translate-x-1 group"
                        >
                            <FileText className="w-4 h-4 opacity-50 group-aria-selected:opacity-100 transition-opacity" />
                            <span className="font-mono text-xs uppercase tracking-widest">Resume</span>
                        </Command.Item>
                    </Command.Group>

                </Command.List>
            </div>
        </Command.Dialog>
    );
}
