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
              <li><span className="text-green-500">help</span>   - Show this help message</li>
              <li><span className="text-green-500">ls</span>     - List directories</li>
              <li><span className="text-green-500">cd [dir]</span> - Navigate to a directory</li>
              <li><span className="text-green-500">clear</span>  - Clear the terminal screen</li>
              <li><span className="text-green-500">whoami</span> - Display user info</li>
              <li><span className="text-green-500">matrix</span> - Toggle the matrix</li>
            </ul>
          </div>
        );
        break;
      case "ls":
        output = (
          <div className="text-green-500 flex gap-4">
            <span>about/</span>
            <span>projects/</span>
            <span>gaming/</span>
            <span>contact/</span>
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
      case "clear":
        clear();
        return; // don't add to history
      case "whoami":
        output = <span className="text-zinc-400">guest_user_992 (Creative Engineer Protocol)</span>;
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
