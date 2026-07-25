/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

export type RandomProps =
  | {
    type: 'connection';
    object: string;
    returns?: string; 
    key?: string;
  }
  | {
    type: 'hex-key';
    lengths: Array<number>;
  };

export interface BuildConfig {
  includeDefaults: boolean;
  extends: Array<string>;
  destination: string;
  staticData: any;
}

export interface Defaults { }

export interface PackageJson {
  name: string;
  version: string;
  description?: string;
  main?: string;
  author?: string | Array<string>;
  license?: string;
  type?: string;
  scripts?: {
    [key: string]: string;
  };
  dependencies?: {
    [key: string]: string;
  };
  devDependencies?: {
    [key: string]: string;
  };
}
