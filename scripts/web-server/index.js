#!/usr/bin/env node

import path from 'node:path';
import { existsSync } from 'node:fs';
import { parseArgs } from 'node:util';

import express from 'express';

import Glaze from './../utilities/glaze/index.js';
import { getWorkspaceMeta } from './workspace-lookup.js';

const config = {
    options: {
      port: { type: 'string', short: 'p' }
    },
    strict: true,
    allowPositionals: true
  };
  
const { values: { port, workspace }, positionals } = parseArgs(config);
const targetWorkspaceInput = positionals[0]

let workspaceMeta;
try {
  workspaceMeta = await getWorkspaceMeta(targetWorkspaceInput);
} catch (error) {
  console.error(`${error.message}`);
  process.exit(1);
}

const show_runner = () => {
  console.log(workspaceMeta);

  const __root = path.resolve(workspaceMeta.path);
  const __dirname = path.join(__root, workspaceMeta.manifest.main);

  const app = express();
  const PORT = port || 3001;

  app.use(express.static(__dirname));

  if (!existsSync(path.join(__dirname, 'index.html'))) {
    console.log(Glaze.yellow(`Entry HTML file does not exist. Please rebuild and restart the web server.`))
    process.exit(1);
  }

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });

  app.listen(PORT, () => {
    console.log(`Web server running on port ${PORT} for ${workspaceMeta.name} v${workspaceMeta.version}`);
  });

}

show_runner();
