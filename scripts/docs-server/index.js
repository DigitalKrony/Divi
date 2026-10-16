import path from 'node:path';
import fs from 'node:fs';

import express from 'express';

const _root = path.join(process.env.INIT_CWD ?? process.cwd());
const __dirname = path.join(_root, `packages`, `divi-docs`);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Frontend production server running on port ${PORT}`);
});
