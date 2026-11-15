/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

export interface PackagePerson {
  name: string;
  email?: string;
  url?: string;
}

export type PackageAuthor = string | PackagePerson;

export interface PackageFunding {
  type?: string;
  url: string;
}

export interface PackageRepository {
  type: string;
  url: string;
  directory?: string;
}

export interface PackageBugs {
  url?: string;
  email?: string;
}

export type PackageExportsCondition =
  | string
  | null
  | {
      types?: PackageExportsCondition;
      import?: PackageExportsCondition;
      require?: PackageExportsCondition;
      default?: PackageExportsCondition;
      node?: PackageExportsCondition;
      browser?: PackageExportsCondition;
      development?: PackageExportsCondition;
      production?: PackageExportsCondition;
      [condition: string]: PackageExportsCondition | undefined;
    };

export type PackageExports =
  | string
  | null
  | PackageExportsCondition[]
  | {
      [subpath: string]: PackageExportsCondition | PackageExportsCondition[];
    };

export interface PackageJson {
  // Core metadata
  name?: string;
  version?: string;
  description?: string;
  keywords?: string[];
  homepage?: string;
  bugs?: string | PackageBugs;
  license?: string;
  author?: PackageAuthor;
  contributors?: PackageAuthor[];
  maintainers?: PackageAuthor[];
  funding?: string | PackageFunding | Array<string | PackageFunding>;

  // Files & Entry points
  files?: string[];
  main?: string;
  module?: string;
  browser?: string | Record<string, string | false>;
  types?: string;
  typings?: string;
  exports?: PackageExports;
  imports?: Record<string, PackageExportsCondition>;
  bin?: string | Record<string, string>;
  man?: string | string[];
  directories?: {
    lib?: string;
    bin?: string;
    man?: string;
    doc?: string;
    example?: string;
    test?: string;
    [dir: string]: string | undefined;
  };

  // Module system & Execution
  type?: "module" | "commonjs";
  sideEffects?: boolean | string[];
  scripts?: Record<string, string>;
  config?: Record<string, unknown>;

  // Dependencies
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  peerDependenciesMeta?: Record<string, { optional?: boolean }>;
  optionalDependencies?: Record<string, string>;
  bundledDependencies?: string[];
  bundleDependencies?: string[];
  overrides?: Record<string, string | Record<string, unknown>>;
  resolutions?: Record<string, string>;

  // Environment & Publishing
  engines?: Record<string, string>;
  os?: string[];
  cpu?: string[];
  private?: boolean;
  publishConfig?: {
    access?: "public" | "restricted";
    registry?: string;
    tag?: string;
    provenance?: boolean;
    [key: string]: unknown;
  };
  repository?: string | PackageRepository;

  // Monorepo / Workspaces
  workspaces?:
    | string[]
    | {
        packages?: string[];
        nohoist?: string[];
      };
  packageManager?: string;

  // Allow custom/tool-specific fields (e.g., eslintConfig, prettier, volta, etc.)
  [key: string]: unknown;
}
