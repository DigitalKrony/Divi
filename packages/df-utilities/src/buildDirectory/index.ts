/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import fs from 'node:fs';
import path from 'node:path';

export const BuildDirectory = (targetDir: string, toFile?: boolean) => {
  const targetPath = toFile 
    ? path.dirname(path.resolve(targetDir)) 
    : path.resolve(targetDir);
  
  if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath, { recursive: true });
  }
}