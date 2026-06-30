#!/usr/bin/env node
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const textExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".md",
  ".mjs",
  ".sql",
  ".svg",
  ".toml",
  ".ts",
  ".tsx",
  ".txt",
  ".yaml",
  ".yml",
]);
const textBasenames = new Set([".env.example", ".gitignore"]);
const ignoredDirectories = new Set([
  ".git",
  ".next",
  ".tmp",
  "node_modules",
  "test-results",
]);

const checks = [
  { label: "replacement character", pattern: /\uFFFD/u },
  {
    label: "probable UTF-8 mojibake",
    pattern:
      /(?:Ã[\u00A0-\u00BF\u0192]|á[º»]|Ä[\u0080-\u00BF\u2018\u2019]|Æ[\u00A0-\u00BF]|Â[\u0080-\u00A0]|â[€\u0080-\u009F])/u,
  },
];

function listFiles(directory = ".") {
  const files = [];

  for (const entry of readdirSync(directory)) {
    if (ignoredDirectories.has(entry)) {
      continue;
    }

    const entryPath = path.join(directory, entry);
    const stats = statSync(entryPath);

    if (stats.isDirectory()) {
      files.push(...listFiles(entryPath));
    } else if (stats.isFile()) {
      files.push(entryPath);
    }
  }

  return files;
}

function isTextFile(filePath) {
  const basename = path.basename(filePath);
  return textBasenames.has(basename) || textExtensions.has(path.extname(filePath).toLowerCase());
}

const failures = [];

for (const filePath of listFiles()) {
  if (!isTextFile(filePath)) {
    continue;
  }

  const text = readFileSync(filePath, "utf8");
  const lines = text.split(/\r?\n/);

  for (const [index, line] of lines.entries()) {
    for (const check of checks) {
      if (check.pattern.test(line)) {
        failures.push(`${filePath}:${index + 1}: ${check.label}: ${line.trim()}`);
        break;
      }
    }
  }
}

if (failures.length > 0) {
  console.error("Text encoding check failed:");
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Text encoding check passed.");
