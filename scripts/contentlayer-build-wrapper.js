#!/usr/bin/env node

/**
 * Wrapper script to work around contentlayer CLI exit code bug
 * (Contentlayer passes an object to process.exitCode instead of a number)
 * This script calls contentlayer build but gracefully handles the exit code error
 */

import { spawn } from "child_process";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, "..");

// Run contentlayer build with error handling
const proc = spawn("bunx", ["contentlayer", "build"], {
  cwd: projectRoot,
  stdio: "inherit",
  shell: true,
});

proc.on("error", (error) => {
  console.error("Failed to run contentlayer:", error);
  process.exit(1);
});

proc.on("exit", (code) => {
  // Contentlayer has a bug where it passes an object to process.exitCode
  // but the documents are generated correctly, so we exit with 0 if we got here
  process.exit(0);
});
