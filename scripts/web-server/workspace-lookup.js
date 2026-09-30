import fs from 'node:fs/promises';
import path from 'node:path';
import { glob } from 'node:fs/promises';

/**
 * Finds workspace metadata matching a specific string input.
 * @param {string} targetInput - The workspace package name or name suffix (e.g. "docs").
 * @returns {Promise<{name: string, version: string, path: string, manifest: object}>}
 */
export async function getWorkspaceMeta(targetInput) {
  if (!targetInput) {
    throw new Error('No target workspace specified.');
  }

  const rootDir = process.cwd();
  const rootPkgPath = path.join(rootDir, 'package.json');
  
  let rootPkg;
  try {
    rootPkg = JSON.parse(await fs.readFile(rootPkgPath, 'utf8'));
  } catch (err) {
    throw new Error(`Failed to read root package.json from ${rootDir}`);
  }

  const workspacePatterns = rootPkg.workspaces;
  if (!workspacePatterns || !Array.isArray(workspacePatterns)) {
    throw new Error('No workspaces array found in root package.json');
  }

  for (const pattern of workspacePatterns) {
    const cleanPattern = pattern.endsWith('/') ? pattern : `${pattern}/package.json`;
    
    for await (const match of glob(cleanPattern, { cwd: rootDir })) {
      const childPkgPath = path.join(rootDir, match);
      const childDir = path.dirname(childPkgPath);
      
      try {
        const childPkg = JSON.parse(await fs.readFile(childPkgPath, 'utf8'));
        const pkgName = childPkg.name;

        if (pkgName) {
          if (pkgName === targetInput || pkgName.endsWith(`/${targetInput}`) || pkgName.endsWith(`-${targetInput}`)) {
            return {
              name: pkgName,
              version: childPkg.version,
              path: childDir,
              manifest: childPkg
            };
          }
        }
      } catch {
        continue;
      }
    }
  }

  throw new Error(`Workspace matching "${targetInput}" could not be found.`);
}
