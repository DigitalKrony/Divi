/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import fs from 'node:fs';
import path from 'node:path';

export const BuildDirectory = (targetDir: string, toFile?: boolean) => {
    let pathParse = path.parse(path.resolve(targetDir)).dir.split(path.sep) as any;
    let destPath = pathParse!.dir;
    if (pathParse[0] == '.') {
        pathParse.shift();
    }

    if (!toFile) {
        destPath += `${path.sep}${pathParse!.base}`;
    }

    let curDir = '';
    for (let part of pathParse) {
        curDir += `${part}/`;
        if (!fs.existsSync(curDir)) {
            fs.mkdirSync(path.resolve(curDir));
        }
    }
}
