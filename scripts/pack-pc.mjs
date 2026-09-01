#!/usr/bin/env node
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, relative } from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const outDir = join(root, "public");
const zipPath = join(outDir, "korteks-pc.zip");
const stage = join(tmpdir(), "korteks-pc-pack");
const dest = join(stage, "KORTEKS");

const skip = (rel) => {
  const p = rel.replace(/\\/g, "/");
  if (!p) return false;
  return (
    p.startsWith("node_modules") ||
    p.startsWith(".git") ||
    p.startsWith(".vercel") ||
    p.startsWith("screenshots") ||
    p.startsWith("artifacts") ||
    p.startsWith(".grok/skills") ||
    p.startsWith(".grok/references") ||
    p === "public/korteks-pc.zip" ||
    p.endsWith(".log")
  );
};

rmSync(stage, { recursive: true, force: true });
mkdirSync(dest, { recursive: true });
mkdirSync(outDir, { recursive: true });
if (existsSync(zipPath)) rmSync(zipPath);

cpSync(root, dest, {
  recursive: true,
  filter: (src) => !skip(relative(root, src)),
});

const py = `
import os, zipfile
root = ${JSON.stringify(stage)}
out = ${JSON.stringify(zipPath)}
with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED) as z:
    for dirpath, dirnames, filenames in os.walk(root):
        for name in filenames:
            path = os.path.join(dirpath, name)
            z.write(path, os.path.relpath(path, root))
print("files", sum(1 for _ in zipfile.ZipFile(out).namelist()))
`;
const r = spawnSync("python3", ["-c", py], { stdio: "inherit" });
rmSync(stage, { recursive: true, force: true });
if (r.status !== 0) process.exit(r.status || 1);
console.log("wrote", zipPath);
