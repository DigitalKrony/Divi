/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import fs from "node:fs";
import path from "node:path";
import { js_beautify } from "js-beautify";
import { faker } from "@faker-js/faker";

import { CreateHexKey, SanitizeJSON, Save } from "@df/utilities";

import type { BuildConfig, RandomProps } from "./Builder.types";
import { helpText } from "./Builder.help";
import { defaults } from "./Builder.defaults";

const CWD = process.cwd();
const configSrc: string = path.join(CWD, `database.config.json`);
const config: BuildConfig = fs.existsSync(path.resolve(configSrc))
  ? JSON.parse(fs.readFileSync(path.resolve(configSrc), "utf-8"))
  : {};
const fileDest = config.destination ? config.destination : `./static_db.json`;
const BuiltDatabase: any = {};
let DataToConvert: any = {};
let rerun: boolean = false;
let secondRun: boolean = false;

console.log(helpText);

const getExtensionFiles = (files: string[]): any => {
  const ExtensionObject = {};

  files.forEach((file) => {
    const filePath = path.resolve(path.join(CWD, file));
    const extensionFile = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, "utf-8"))
      : {};

    Object.assign(ExtensionObject, { ...ExtensionObject, ...extensionFile });
  });

  return ExtensionObject;
};

const buildSchemaObject = () => {
  config.includeDefaults && Object.assign(DataToConvert, defaults);
  !!config.extends &&
    Object.assign(DataToConvert, {
      ...DataToConvert,
      ...getExtensionFiles(config.extends),
    });

  fakeSchemas();
};

const fakeSchemas = () => {
  if (rerun) {
    secondRun = true;
    reprocess();
  } else {
    Object.keys(DataToConvert).forEach(async (value: string) => {
      const { count, schema } = DataToConvert[value];

      BuiltDatabase[value] = [];

      if (!!schema || !!count) {
        for (let i = 0; i < count; i++) {
          const newFakeBlock = processSchema({ item: schema, iteration: i });
          BuiltDatabase[value].push(newFakeBlock);
        }
      }
    });

    fakeSchemas();
  }
};

const processSchema = (args: {
  item: object | string | any;
  iteration?: number;
}) => {
  const { item, iteration } = args;
  const fakedBlock: any = {};

  Object.keys(item).forEach((key: string) => {
    const value = item[key];

    if (typeof value === "object") {
      if (value.array) {
        const _pa = processArray({ item: value.array, iteration });
        fakedBlock[key] = _pa;
      } else {
        fakedBlock[key] = processSchema({ item: value, iteration });
      }
    } else if (typeof value === "string") {
      fakedBlock[key] = fakeValue({ value, iteration });
    } else {
      // Unknown Type
    }
  });

  return fakedBlock;
};

const processArray = (args: {
  item: Object | Array<any> | any;
  iteration?: number;
}) => {
  const {
    item: { value, count, unique },
    iteration,
  } = args;
  const fakeArray: Array<string | number> = [];
  const uniqueValues: Set<string> = new Set();

  const setCount = () => {
    let _c = count;

    const _count = parseFloat(count).toString().split(".");

    if (_count.length > 1) {
      const _r = Math.floor(
        Math.random() * (parseInt(_count[0]) - parseInt(_count[1])) +
          parseInt(_count[1])
      );
      return _r;
    } else return _c;
  };

  const getUnique = (_v: any, _i: number) => {
    let _u = fakeValue({ value: _v, iteration: _i });

    if (secondRun) return _u;

    if (uniqueValues.has(_u)) {
      _u = getUnique(_v, _i);
    } else {
      uniqueValues.add(_u);
    }

    return _u;
  };

  if (secondRun) {
    const { item } = args;
    for (const i in item) {
      fakeArray.push(fakeValue({ value: item[i], iteration: parseInt(i) }));
    }
  } else {
    const _count = setCount();

    if (_count === 0) {
      return [];
    }

    for (let i = 0; i < _count; i++) {
      let _v: string = fakeValue({ value, iteration });

      // if(secondRun) _v = unique ? getUnique(value, iteration ?? 0) : fakeValue({ value, iteration });

      fakeArray.push(_v);
    }
  }
  return fakeArray;
};

const fakeValue = (args: { value: string | any; iteration?: number }) => {
  const { value, iteration } = args;

  const internalValue = `${value}`.indexOf(`$`) === 0;
  const fakerValue = /(?<={{)(.*?)(?=}})/g.exec(value);
  let fakedValue: any = "";

  if (!!internalValue) {
    if (value === "$i") {
      fakedValue = iteration;
    } else {
      const internalFn = /(?<=\$)(.*?)(?=\()/g.exec(value)![1];
      const fnProps = /(?<=\()(.*?)(?=\))/g.exec(value)![1];
      const fnVar: any = SanitizeJSON(fnProps);

      fakedValue = eval(`${internalFn}`)(fnVar);
    }
  } else if (!!fakerValue) {
    fakedValue = faker.helpers.fake(value);
  } else {
    fakedValue = value;
  }

  return fakedValue;
};

const reprocess = () => {
  Object.keys(BuiltDatabase).forEach((key: string) => {
    for (const i in BuiltDatabase[key]) {
      const block = BuiltDatabase[key][i];

      Object.keys(block).forEach((reKey: string) => {
        if (typeof block[reKey] === "object" && Array.isArray(block[reKey])) {
          block[reKey] = processArray({ item: block[reKey] });
        } else {
          block[reKey] = fakeValue({ value: block[reKey] });
        }
      });
    }
  });
};

// TS-Ignore on the function below because it is indirectly called from the imported JSON file, not this file direectly.
// @ts-ignore-nex-line no-unused-vars
const random = (args: RandomProps): any => {
  const { type } = args;

  switch (type) {
    case "connection":
      const { key, object } = args;
      const thisObj = DataToConvert[args.object!];
      const connectionIteration = Math.floor(Math.random() * thisObj.count);
      let connectId: string | number = "";

      if (!!key) {
        rerun = true;

        if (secondRun) {
          connectId = BuiltDatabase[object][connectionIteration][key];
        } else {
          connectId = `$random(${JSON.stringify(args)})`;
        }
      } else {
        connectId = connectionIteration;
      }

      return connectId;
    case "hex-key":
      const { lengths } = args;
      const id: string = CreateHexKey({ lengths });
      return id;
  }
};

(() => {
  buildSchemaObject();

  Save(
    fileDest,
    js_beautify(JSON.stringify(BuiltDatabase), {
      end_with_newline: true,
      brace_style: "expand",
      indent_size: 2,
    })
  );
})();
