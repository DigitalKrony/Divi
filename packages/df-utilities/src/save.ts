/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import fs from 'node:fs';
import { BuildDirectory } from './buildDirectory';

export const Save = (src: string, data: any, cb?: (err?: any) => void) => {
    BuildDirectory(src, true);
    fs.writeFile(src.trim(), data, (err: any) => { if (cb) { cb(err) } });
}