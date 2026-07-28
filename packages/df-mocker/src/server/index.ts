/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

// import jsonServer from 'json-server';
import cookieParser from 'cookie-parser';
import express from 'express';
import logger from 'morgan';
import path from 'path';

// import fs from 'fs';
// import jsonServer from 'json-server';

export const app = express();

// Config Files
// const _package = JSON.parse(fs.readFileSync('package.json', 'utf8'));
// const dbConfig = JSON.parse(fs.readFileSync(`./database.config.json`));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app')));

// app.use('/_api/mockdata', jsonServer.router(dbConfig.dest ? dbConfig.dest : `./db.json`));
// app.use('/_api', require('./_api/img'));
// app.use('/', require('./routes/index'));
// app.use('/', express.static(path.resolve(`./app/build`)));
