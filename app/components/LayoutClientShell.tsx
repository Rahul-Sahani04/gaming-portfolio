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

export default function LayoutClientShell() {
  return (
    <>
      <CommandMenu />
      <CmdKToast />
      <Toaster theme="dark" />
    </>
  );
}
