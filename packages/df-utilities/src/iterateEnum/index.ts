/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

export type EnumConversionProps = {
  key: string;
  value: any;
};

export function iterateEnum<T extends object>(
  enumObj: T
): Array<EnumConversionProps> {
  const Enum: Array<EnumConversionProps> = [];
  for (const [key, value] of Object.entries(enumObj)) {
    if (typeof value === "number" && !isNaN(Number(key))) {
      continue;
    }

    Enum.push({ key: key, value: value });
  }

  return Enum;
}
