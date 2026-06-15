"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";

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
      case "void":
        output = <span className="text-red-600 font-bold bg-black tracking-widest animate-pulse">ENTERING THE VOID...</span>;
        setTimeout(() => router.push(`/void`), 1500);
        break;
      case "sudo":
        if (args[0] === "rm" && args[1] === "-rf" && args[2] === "/") {
          const pages = ["/about", "/projects", "/gaming", "/contact", "/guestbook", "/home"];
          const shuffledPages = [...pages].sort(() => 0.5 - Math.random());
          const currentPath = window.location.pathname === "/" ? "/home" : window.location.pathname;
          const filteredPages = shuffledPages.filter(p => p !== currentPath);
          filteredPages.push(currentPath);

          output = <SystemPurgeEffect pages={filteredPages} />;
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

function SystemPurgeEffect({ pages }: { pages: string[] }) {
  const [logs, setLogs] = useState<string[]>([]);
  const [phase, setPhase] = useState<'warn' | 'init' | 'deleting' | 'panic'>('warn');
  const [deletedCount, setDeletedCount] = useState(0);

  useEffect(() => {
    let timeout: any;
    if (phase === 'warn') {
      setLogs(["WARNING: YOU ARE ABOUT TO DELETE ALL FILES AND DIRECTORIES.", "BYPASSING SECURITY PROTOCOLS..."]);
      timeout = setTimeout(() => setPhase('init'), 1000);
    } else if (phase === 'init') {
      const interval = setInterval(() => {
        setLogs(prev => [...prev.slice(-30), `[${(Math.random() * 10000).toFixed(4)}] CPU_ERR: 0x${Math.floor(Math.random() * 16777215).toString(16).toUpperCase()} - SEGMENTATION FAULT`]);
      }, 30);

      timeout = setTimeout(() => {
        clearInterval(interval);
        setPhase('deleting');
      }, 1500);
      return () => clearInterval(interval);
    } else if (phase === 'deleting') {
      if (deletedCount < pages.length) {
        timeout = setTimeout(() => {
          setLogs(prev => [...prev, `[!!!] FATAL: UNLINKING SECTOR ${pages[deletedCount]}... DATA CORRUPTED`]);
          setDeletedCount(c => c + 1);
        }, Math.random() * 400 + 100);
      } else {
        timeout = setTimeout(() => setPhase('panic'), 1000);
      }
    } else if (phase === 'panic') {
      setLogs(prev => [...prev, "KERNEL PANIC - NOT SYNCING: Attempted to kill init!"]);
      timeout = setTimeout(() => {
        window.close();
        document.body.innerHTML = '<div style="display:flex;justify-content:center;align-items:center;height:100vh;background:black;color:#ff0000;font-family:monospace;font-size:2rem;font-weight:bold;text-align:center;text-transform:uppercase;margin:0;padding:2rem;line-height:1.5;">*** STOP: 0x000000ED (UNMOUNTABLE_BOOT_VOLUME)<br/><br/>A problem has been detected and the system has been shut down to prevent damage to your computer.</div>';
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [phase, deletedCount, pages]);

  const endRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "instant", block: "end" });
  }, [logs]);

  return (
    <div className="relative flex flex-col gap-0.5 text-red-500 font-mono text-xs sm:text-sm mt-2 w-full break-all">
      <style>{`
        @keyframes screen-shake {
          0%, 100% { transform: translate(0, 0) }
          10%, 30%, 50%, 70%, 90% { transform: translate(-10px, 10px) }
          20%, 40%, 60%, 80% { transform: translate(10px, -10px) }
        }
        .animate-screen-shake {
          animation: screen-shake 0.1s infinite;
        }
        @keyframes text-glitch {
          0% { text-shadow: 2px 0 0 red, -2px 0 0 blue; }
          25% { text-shadow: -2px 0 0 red, 2px 0 0 blue; }
          50% { text-shadow: 2px 0 0 blue, -2px 0 0 red; }
          75% { text-shadow: -2px 0 0 blue, 2px 0 0 red; }
          100% { text-shadow: 2px 0 0 red, -2px 0 0 blue; }
        }
        .animate-text-glitch {
          animation: text-glitch 0.1s infinite;
        }
      `}</style>

      {phase === 'panic' && (
        <div className="fixed inset-0 z-[9999] bg-red-900/50 mix-blend-color-burn pointer-events-none animate-screen-shake backdrop-invert" />
      )}
      {(phase === 'deleting' || phase === 'panic') && (
        <div className="fixed inset-0 z-[9998] pointer-events-none animate-pulse bg-red-900/20 mix-blend-color-burn" />
      )}

      {logs.map((log, i) => (
        <div key={i} className={`${log.includes('FATAL') ? 'text-red-400 font-bold text-sm md:text-base bg-red-950/50 p-1 animate-pulse' :
          log.includes('KERNEL PANIC') ? 'text-white bg-red-600 p-2 mt-4 text-xl md:text-3xl animate-screen-shake' :
            'text-red-700 opacity-80'
          } ${phase === 'panic' ? 'animate-text-glitch' : ''}`}>
          {log}
        </div>
      ))}
      <div className="absolute -bottom-16" ref={endRef} />
    </div>
  );
}
