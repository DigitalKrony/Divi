/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { cwd } from "node:process";
import { readFileSync, existsSync } from "node:fs";
import { join, resolve, parse } from "node:path";

import { workspacePackage, workspaceDir } from "@df/utilities/_node.js";
import type { PackageJson } from "@df/utilities/_node.js";

import type { WorkspacePackageDependencies } from "./readWorkspace.types.js";

export const getWorkspacePackages = () => {
  const _root: string | null = workspaceDir(cwd());
  const _rootPackage = workspacePackage(cwd());
  const { workspaces } = _rootPackage!;
  const _spaces: { [key: string]: PackageJson } = {};

  if (!workspaces) return null;

  for (const _ws of workspaces as string[]) {
    const _space_root = resolve(_root!, _ws);
    const _space_package_uri = join(_space_root, "package.json");
    const _space_meta = parse(_space_root);

    if (!existsSync(_space_package_uri)) continue;

    const _space_package = JSON.parse(readFileSync(_space_package_uri, "utf8"));

    _spaces[_space_meta.base] = _space_package;
  }

  return _spaces;
};

export const getWorkspacePackageWeb = (
  workspacePackages: Record<string, PackageJson>,
  flat: boolean = true
): Record<string, string[] | WorkspacePackageDependencies> => {
  const workspacePackageNames = new Set(
    Object.values(workspacePackages)
      .map((workspacePackage) => workspacePackage.name)
      .filter((name): name is string => Boolean(name))
  );

  return Object.values(workspacePackages).reduce<
    Record<string, string[] | WorkspacePackageDependencies>
  >((web, workspacePackage) => {
    const packageName = workspacePackage.name;

    if (!packageName) return web;

    const getWorkspaceDependencies = (
      dependencies: Partial<Record<string, string>> | undefined
    ) =>
      Object.keys(dependencies ?? {}).filter((name) =>
        workspacePackageNames.has(name)
      );

    const dependencies = getWorkspaceDependencies(
      workspacePackage.dependencies
    );
    const devDependencies = getWorkspaceDependencies(
      workspacePackage.devDependencies
    );

    web[packageName] = flat
      ? [...new Set([...dependencies, ...devDependencies])]
      : { dependencies, devDependencies };

    return web;
  }, {});
};

export const findCircularWorkspaceDependencies = (
  packageWeb: Record<string, string[] | WorkspacePackageDependencies>
): string[][] => {
  const visited = new Set<string>();
  const activePath = new Map<string, number>();
  const path: string[] = [];
  const cycles: string[][] = [];

  const visit = (packageName: string) => {
    if (visited.has(packageName)) return;

    activePath.set(packageName, path.length);
    path.push(packageName);

    const packageDependencies = packageWeb[packageName];
    const dependencies = Array.isArray(packageDependencies)
      ? packageDependencies
      : packageDependencies
      ? [
          ...packageDependencies.dependencies,
          ...packageDependencies.devDependencies,
        ]
      : [];

    for (const dependency of dependencies) {
      const cycleStart = activePath.get(dependency);

      if (cycleStart !== undefined) {
        cycles.push([...path.slice(cycleStart), dependency]);
      } else {
        visit(dependency);
      }
    }

    path.pop();
    activePath.delete(packageName);
    visited.add(packageName);
  };

  for (const packageName of Object.keys(packageWeb)) {
    visit(packageName);
  }

  return cycles;
};
