"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTerminal } from "./TerminalProvider";
import { useTerminalCommands } from "./useTerminalCommands";

export function TerminalOverlay() {
  const { isOpen, closeTerminal } = useTerminal();
  const { history, executeCommand, isMatrixActive } = useTerminalCommands();
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Command history navigation
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  if (!isOpen) return null;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (input.trim()) {
        setCommandHistory((prev) => [...prev, input]);
      }
      executeCommand(input);
      setInput("");
      setHistoryIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIdx = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIdx);
        setInput(commandHistory[commandHistory.length - 1 - newIdx] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIdx = historyIndex - 1;
        setHistoryIndex(newIdx);
        setInput(commandHistory[commandHistory.length - 1 - newIdx] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Escape") {
      closeTerminal();
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };



  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
      onClick={closeTerminal}
    >
      <div
        className="relative w-full h-full md:w-[90vw] lg:w-[75vw] md:h-[80vh] flex flex-col bg-[#050505] border border-green-500/20 shadow-[0_0_50px_rgba(0,255,65,0.05)] md:rounded-lg overflow-hidden font-mono text-sm selection:bg-green-500/30 text-green-500"
        onClick={(e) => {
          e.stopPropagation();
          focusInput();
        }}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-green-500/20 bg-[#0a0a0a]">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/50 hover:bg-red-500 cursor-pointer transition-colors" onClick={closeTerminal} />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <div className="text-xs tracking-widest text-green-500/50 uppercase select-none">
            TERMINAL_OVERLAY_V1.0
          </div>
          <div className="w-16" /> {/* Spacer for centering */}
        </div>

        {/* Matrix Effect */}
        {isMatrixActive && (
          <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden mix-blend-screen z-0">
            <div className="animate-pulse text-green-500 text-xs whitespace-pre">
              {Array.from({ length: 80 }).map(() => Math.random().toString(36).substring(2, 80)).join("\n")}
            </div>
          </div>
        )}

        {/* CRT Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-cyber-scanline mix-blend-overlay opacity-10 z-10" />

        {/* Terminal Body */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 relative z-20" style={{ scrollbarWidth: "thin", scrollbarColor: "#22c55e transparent" }}>

          {/* Neofetch Section */}
          <div className="flex flex-col gap-6 mb-8 items-start">
            <div className="flex gap-8">
              <div className="hidden sm:block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/asciinator_sage.png"
                  alt="ASCII Avatar"
                  className="w-full max-w-[600px] h-auto object-contain rounded shadow-lg shadow-green-500/20"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-6 mt-4 w-full">
                <div className="flex flex-col gap-1.5 text-xs md:text-sm text-zinc-300">
                  <div className="text-green-400 font-bold mb-2">rsahani@portfolio-os</div>
                  <div className="flex gap-4">
                    <span className="text-green-500 font-bold w-16">OS</span>
                    <span className="text-zinc-400">Next.js v14 (App Router)</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-green-500 font-bold w-16">Host</span>
                    <span className="text-zinc-400">Vercel Edge Network</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-green-500 font-bold w-16">Uptime</span>
                    <span className="text-zinc-400">99.99%</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-green-500 font-bold w-16">Shell</span>
                    <span className="text-zinc-400">zsh-react</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-green-500 font-bold w-16">Theme</span>
                    <span className="text-zinc-400">Matrix_Green</span>
                  </div>
                  <div className="flex gap-4 mt-3">
                    <div className="w-4 h-4 bg-black" />
                    <div className="w-4 h-4 bg-red-500" />
                    <div className="w-4 h-4 bg-green-500" />
                    <div className="w-4 h-4 bg-yellow-500" />
                    <div className="w-4 h-4 bg-blue-500" />
                    <div className="w-4 h-4 bg-purple-500" />
                    <div className="w-4 h-4 bg-cyan-500" />
                    <div className="w-4 h-4 bg-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="text-zinc-400 mb-6">
              Type <span className="text-green-500">help</span> to see available commands.
            </div>

            {/* Command History */}
            <div className="flex flex-col gap-2">
              {history.map((entry: any) => (
                <div key={entry.id} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">guest@portfolio ~ %</span>
                    <span className="text-white">{entry.command}</span>
                  </div>
                  {entry.output && <div className="text-zinc-300">{entry.output}</div>}
                </div>
              ))}
            </div>

            {/* Current Input */}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-green-500">guest@portfolio ~ %</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none text-white border-none focus:ring-0 p-0 m-0 shadow-none"
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
            </div>
            <div ref={bottomRef} className="h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
