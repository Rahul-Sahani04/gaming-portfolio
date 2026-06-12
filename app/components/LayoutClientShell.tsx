"use client";

import dynamic from "next/dynamic";

const CommandMenu = dynamic(
  () => import("./CommandMenu").then((mod) => mod.CommandMenu)
);
const CmdKToast = dynamic(
  () => import("./CmdKToast").then((mod) => mod.CmdKToast)
);
const Toaster = dynamic(
  () => import("sonner").then((mod) => mod.Toaster)
);
const TerminalOverlay = dynamic(
  () => import("./terminal/TerminalOverlay").then((mod) => mod.TerminalOverlay)
);

export default function LayoutClientShell() {
  return (
    <>
      <CommandMenu />
      <CmdKToast />
      <Toaster
        theme="dark"
        position="top-center"
        toastOptions={{
          style: { background: "#0a0a0a", border: "1px solid rgba(255,255,255,0.08)", color: "#e4e4e7" },
        }}
      />
      <TerminalOverlay />
    </>
  );
}
