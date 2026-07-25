/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

import { parseAAMVADate, ElementIDs, type AAMVAElement } from '.';

export const parseAAMVA = (rawString: string): Record<string, any> | undefined => {
  const result: Record<string, any> = {};

  const validIds = new Set<string>();
  const elementsArray = Array.isArray(ElementIDs) ? ElementIDs : Object.values(ElementIDs);

  elementsArray.forEach((val: any) => {
    if (!validIds.has(val.id)) validIds.add(val.id);
  });

  let dataStartIndex = -1;
  let firstId = '';
  let searchIndex = rawString.indexOf('DL');

  while (searchIndex !== -1) {
    const potentialId = rawString.substring(searchIndex + 2, searchIndex + 5);
    const isStandardId = validIds.has(potentialId);
    const isCustomId = potentialId.startsWith('Z') && potentialId.length === 3;

    if (isStandardId || isCustomId) {
      dataStartIndex = searchIndex + 2;
      firstId = potentialId;
      break;
    }
    searchIndex = rawString.indexOf('DL', searchIndex + 1);
  }

  if (dataStartIndex === -1) {
    console.error('Failed to locate valid AAMVA data block.');
    return undefined;
  }

  const dataBlock = rawString.substring(dataStartIndex);
  let currentId = firstId;
  let currentBuffer = '';
  let cursor = 3;

  while (cursor < dataBlock.length) {
    const potentialId = dataBlock.substring(cursor, cursor + 3);
    const isStandardId = validIds.has(potentialId);
    const isCustomId = potentialId.startsWith('Z') && potentialId.length === 3;

    if (isStandardId || isCustomId) {
      const nextId = dataBlock.substring(cursor + 1, cursor + 4);
      const isNextStandard = validIds.has(nextId);
      const isNextCustom = nextId.startsWith('Z') && nextId.length === 3;

      if (isNextStandard || isNextCustom) {
        currentBuffer += dataBlock[cursor];
        cursor++;
        continue;
      }

      if (currentId) {
        const meta = elementsArray.find((val: any) => val.id === currentId) as AAMVAElement;
        const cleanValue = currentBuffer.trim();

        result[currentId] = meta?.type === 'date' && cleanValue ? parseAAMVADate(cleanValue) : cleanValue;
      }

      currentId = potentialId;
      currentBuffer = '';
      cursor += 3;
    } else {
      currentBuffer += dataBlock[cursor];
      cursor++;
    }
  }

  if (currentId) {
    const meta = elementsArray.find((val: any) => val.id === currentId) as AAMVAElement;
    const cleanValue = currentBuffer.trim();

    result[currentId] = meta?.type === 'date' && cleanValue ? parseAAMVADate(cleanValue) : cleanValue;
  }

  return result;
};
