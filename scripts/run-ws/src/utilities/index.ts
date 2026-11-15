/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

export {
  getWorkspacePackages,
  getWorkspacePackageWeb,
  findCircularWorkspaceDependencies,
} from "./readWorkspace.js";

export type { WorkspacePackageDependencies } from "./readWorkspace.types.js";
