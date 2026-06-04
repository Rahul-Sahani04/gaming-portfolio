"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export interface CommandOutput {
  id: string;
  command: string;
  output: React.ReactNode;
}

export function useTerminalCommands() {
  const router = useRouter();
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [isMatrixActive, setIsMatrixActive] = useState(false);

  const clear = () => setHistory([]);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) {
      setHistory((prev) => [...prev, { id: Math.random().toString(), command: "", output: null }]);
      return;
    }
    
    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    const newEntry: CommandOutput = {
      id: Math.random().toString(36).substring(2, 9),
      command: trimmed,
      output: null,
    };

    let output: React.ReactNode = null;

    switch (cmd) {
      case "help":
        output = (
          <div className="text-zinc-400">
            <p>Available commands:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li><span className="text-green-500">help</span>    - Show this help message</li>
              <li><span className="text-green-500">ls</span>      - List directories and files</li>
              <li><span className="text-green-500">cd [dir]</span>  - Navigate to a directory</li>
              <li><span className="text-green-500">cat [file]</span>- Display file contents</li>
              <li><span className="text-green-500">clear</span>   - Clear the terminal screen</li>
              <li><span className="text-green-500">whoami</span>  - Display user info</li>
              <li><span className="text-green-500">skills</span>  - Display tech stack</li>
              <li><span className="text-green-500">echo [txt]</span>- Print text</li>
              <li><span className="text-green-500">date</span>    - Show system time</li>
              <li><span className="text-green-500">ping</span>    - Check connection status</li>
              <li><span className="text-green-500">repo</span>    - Get repository access</li>
              <li><span className="text-green-500">matrix</span>  - Toggle the matrix</li>
            </ul>
          </div>
        );
        break;
      case "ls":
        output = (
          <div className="text-green-500 flex flex-wrap gap-4">
            <span className="text-blue-400 font-bold">about/</span>
            <span className="text-blue-400 font-bold">projects/</span>
            <span className="text-blue-400 font-bold">gaming/</span>
            <span className="text-blue-400 font-bold">contact/</span>
            <span className="text-zinc-300">resume.md</span>
            <span className="text-zinc-300">secrets.txt</span>
          </div>
        );
        break;
      case "cd":
        const target = args[0];
        if (!target) {
          output = <span className="text-red-500">cd: missing operand</span>;
        } else if (["about", "projects", "gaming", "contact"].includes(target.replace("/", ""))) {
          output = <span className="text-zinc-400">Navigating to /{target.replace("/", "")}...</span>;
          setTimeout(() => router.push(`/${target.replace("/", "")}`), 500);
        } else if (target === "~" || target === "/") {
          output = <span className="text-zinc-400">Navigating home...</span>;
          setTimeout(() => router.push(`/`), 500);
        } else {
          output = <span className="text-red-500">cd: {target}: No such file or directory</span>;
        }
        break;
      case "cat":
        const file = args[0];
        if (!file) {
          output = <span className="text-red-500">cat: missing file operand</span>;
        } else if (file === "resume.md" || file === "resume.txt") {
          output = (
            <div className="text-zinc-300 mt-2 space-y-2 text-sm max-w-2xl font-mono">
              <h1 className="text-green-500 font-bold text-lg"># Rahul Sahani</h1>
              <p className="italic">Full-Stack Developer & Creative Engineer</p>
              
              <h2 className="text-green-500 font-bold mt-4">## Experience</h2>
              <p><span className="text-green-500">-</span> Building immersive 3D web experiences using React, Three.js, and Next.js</p>
              <p><span className="text-green-500">-</span> Developing scalable full-stack applications with modern web tech</p>
              <p><span className="text-green-500">-</span> Fusing game development concepts with high-end web design</p>

              <h2 className="text-green-500 font-bold mt-4">## Core Stack</h2>
              <p>TypeScript, React, Next.js, Node.js, Three.js, Tailwind CSS</p>
              
              <h2 className="text-green-500 font-bold mt-4">## Objective</h2>
              <p>To create the most memorable and interactive experiences on the web.</p>
              
              <p className="mt-4 text-zinc-500 italic">Type 'cd contact' to get in touch!</p>
            </div>
          );
        } else if (file === "secrets.txt") {
          output = <span className="text-red-500 animate-pulse">ERROR: PERMISSION DENIED. ENCRYPTED FILE.</span>;
        } else if (["about", "projects", "gaming", "contact"].includes(file.replace("/", ""))) {
          output = <span className="text-red-500">cat: {file}: Is a directory</span>;
        } else {
          output = <span className="text-red-500">cat: {file}: No such file or directory</span>;
        }
        break;
      case "clear":
        clear();
        return; // don't add to history
      case "whoami":
        output = (
          <div className="flex flex-col sm:flex-row gap-6 mt-2 text-zinc-300">
            <pre className="text-green-500 font-bold text-[10px] sm:text-xs leading-tight">
{`
    .----.
   /  ..  \\
  |   __   |
   \\  ""  /
    '----'
`}
            </pre>
            <div className="flex flex-col gap-1 text-sm justify-center">
              <p><span className="text-green-500 font-bold w-20 inline-block">Name:</span> Rahul Sahani</p>
              <p><span className="text-green-500 font-bold w-20 inline-block">Role:</span> Full-Stack Developer & Creative Engineer</p>
              <p><span className="text-green-500 font-bold w-20 inline-block">Location:</span> India</p>
              <p><span className="text-green-500 font-bold w-20 inline-block">Status:</span> Building interactive web experiences...</p>
            </div>
          </div>
        );
        break;
      case "skills":
        output = (
          <div className="flex flex-col gap-3 mt-2 text-sm text-zinc-300 w-full max-w-md">
            <div className="flex justify-between items-center">
              <span className="w-24 text-right pr-4 font-bold">TypeScript</span>
              <div className="flex-1 h-2 bg-zinc-800 relative overflow-hidden"><div className="absolute top-0 left-0 h-full bg-green-500 w-[95%] shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="w-24 text-right pr-4 font-bold">React/Next</span>
              <div className="flex-1 h-2 bg-zinc-800 relative overflow-hidden"><div className="absolute top-0 left-0 h-full bg-green-500 w-[90%] shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="w-24 text-right pr-4 font-bold">Three.js</span>
              <div className="flex-1 h-2 bg-zinc-800 relative overflow-hidden"><div className="absolute top-0 left-0 h-full bg-green-500 w-[80%] shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="w-24 text-right pr-4 font-bold">Node.js</span>
              <div className="flex-1 h-2 bg-zinc-800 relative overflow-hidden"><div className="absolute top-0 left-0 h-full bg-green-500 w-[85%] shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div></div>
            </div>
          </div>
        );
        break;
      case "echo":
        output = <span className="text-zinc-300">{args.join(" ")}</span>;
        break;
      case "date":
        output = <span className="text-zinc-300">SYS_TIME: {new Date().toISOString()}</span>;
        break;
      case "ping":
        output = <span className="text-zinc-300">Pinging cyber-net... latency {Math.floor(Math.random() * 5 + 1)}.{Math.floor(Math.random() * 99)}ms. <span className="text-green-500">Connection secure.</span></span>;
        break;
      case "repo":
        output = <span className="text-red-500 animate-pulse">ACCESS_DENIED: CLASSIFIED_REPOSITORY</span>;
        break;
      case "sudo":
        if (args[0] === "rm" && args[1] === "-rf" && args[2] === "/") {
          output = <span className="text-red-500 animate-pulse">INITIATING SYSTEM PURGE... just kidding.</span>;
        } else {
          output = <span className="text-red-500">guest_user_992 is not in the sudoers file. This incident will be reported.</span>;
        }
        break;
      case "matrix":
        setIsMatrixActive((prev) => !prev);
        output = <span className="text-green-500">Matrix sequence {isMatrixActive ? "deactivated" : "activated"}.</span>;
        break;
      default:
        output = <span className="text-red-500">command not found: {cmd}</span>;
    }

    newEntry.output = output;
    setHistory((prev) => [...prev, newEntry]);
  };

  return { history, executeCommand, clear, isMatrixActive };
}
