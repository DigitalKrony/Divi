import fs from 'node:fs';
import yaml from 'js-yaml';

const transformScrapedMDX = (rawMdxString) => {
  const frontmatterRegex = /^\s*---\r?\n([\s\S]*?)\r?\n---/;
  const match = rawMdxString.match(frontmatterRegex);

  if (match) {
    const rawYaml = match[1];

    try {
      const parsedData = yaml.load(rawYaml);
      const title = parsedData?.title || 'HeroUI Component';
      const description = parsedData?.description || '';
      const strippedCode = rawMdxString.replace(frontmatterRegex, '');
      const metaInjection = `import { Meta } from '@storybook/blocks';\n\n<Meta title="HeroUI/${title}" description="${description}" />\n\n`;

      return metaInjection + strippedCode;
    } catch (error) {
      console.error('Failed to parse YAML during scrape:', error);
      return rawMdxString;
    }
  }

  return rawMdxString;
};
