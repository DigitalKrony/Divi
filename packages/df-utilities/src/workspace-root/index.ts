/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { cwd } from "node:process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, parse, resolve } from "node:path";

import type { PackageJson } from "@df/utilities/_node.js";

/**
 * Traverses upward to find the workspace root directory.
 * @param _dir The directory to start searching from. Defaults to the current working directory.
 * @returns The absolute path to the workspace root, or null if not found.
 */
export const workspaceDir = (_dir: string = cwd()): string | null => {
  let currentDir = resolve(_dir);

  while (currentDir !== parse(currentDir).root) {
    const pkgPath = join(currentDir, "package.json");
    const pnpmWorkspacePath = join(currentDir, "pnpm-workspace.yaml");

    // Fast path: pnpm-workspace.yaml explicitly defines a workspace root
    if (existsSync(pnpmWorkspacePath)) {
      return currentDir;
    }

    if (existsSync(pkgPath)) {
      try {
        const pkgContent = readFileSync(pkgPath, "utf-8");
        const pkg = JSON.parse(pkgContent);

        if (pkg.workspaces) {
          return currentDir;
        }
      } catch (error) {
        console.error(`Error reading or parsing ${pkgPath}:`, error);
      }
    }

    currentDir = dirname(currentDir);
  }

  return null;
};

/**
 * Finds the workspace root and returns its parsed package.json content.
 * @param _dir The directory to start searching from. Defaults to the current working directory.
 * @returns The parsed PackageJson object, or null if not found.
 */
export const workspacePackage = (_dir: string = cwd()): PackageJson | null => {
  const rootDir = workspaceDir(_dir);

  if (!rootDir) {
    return null;
  }

  const pkgPath = join(rootDir, "package.json");

  if (!existsSync(pkgPath)) {
    return null;
  }

  try {
    const pkgContent = readFileSync(pkgPath, "utf-8");
    return JSON.parse(pkgContent) as PackageJson;
  } catch (error) {
    console.error(`Error reading or parsing ${pkgPath}:`, error);
    return null;
  }
};
