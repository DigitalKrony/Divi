import { parse } from 'css';
import type { Node, Rule, Declaration, Media, KeyFrames, KeyFrame, FontFace, Import } from 'css';

import { Case, CaseTypes } from '@df/utilities';

import type { CSSDeclarations, CssJsonObject } from './types.js'; 

const parseRules = (rules: Node[]): Array<Record<string, unknown>> => {
  return rules.map((rule) => {
    switch (rule.type) {
      case 'rule': {
        const styleRule = rule as Rule;
        return {
          type: 'rule',
          selectors: styleRule.selectors,
          declarations: (styleRule.declarations || [])
            .filter((d): d is Declaration => d.type === 'declaration')
            .reduce<CSSDeclarations>((acc, d) => {
              if (d.property && d.value !== undefined) {
                acc[d.property] = d.value;
              }
              return acc;
            }, {}),
        };
      }

      case 'media': {
        const mediaRule = rule as unknown as Media;
        return {
          type: 'media',
          media: mediaRule.media,
          rules: parseRules((mediaRule.rules as Node[]) || []),
        };
      }

      case 'keyframes': {
        const kfRule = rule as unknown as KeyFrames;
        return {
          type: 'keyframes',
          name: kfRule.name,
          keyframes: (kfRule.keyframes || [])
            .filter((kf): kf is KeyFrame => kf.type === 'keyframe')
            .map((kf) => ({
              values: kf.values,
              declarations: (kf.declarations || [])
                .filter((d): d is Declaration => d.type === 'declaration')
                .reduce<CSSDeclarations>((acc, d) => {
                  if (d.property && d.value !== undefined) {
                    acc[d.property] = d.value;
                  }
                  return acc;
                }, {}),
            })),
        };
      }

      case 'font-face': {
        const fontRule = rule as unknown as FontFace;
        return {
          type: 'font-face',
          declarations: (fontRule.declarations || [])
            .filter((d): d is Declaration => d.type === 'declaration')
            .reduce<CSSDeclarations>((acc, d) => {
              if (d.property && d.value !== undefined) {
                acc[d.property] = d.value;
              }
              return acc;
            }, {}),
        };
      }

      case 'import': {
        const importRule = rule as unknown as Import;
        return {
          type: 'import',
          import: importRule.import,
        };
      }

      default:
        return { ...rule };
    }
  });
};

const flattenDeclarations = (
  declarations: Array<Declaration | { type?: string }> | undefined
): CSSDeclarations => {
  if (!declarations) return {};
  return declarations
    .filter((d): d is Declaration => d.type === 'declaration')
    .reduce<CSSDeclarations>((acc, d) => {
      if (d.property && d.value !== undefined) {
        const camelKey = Case(d.property, CaseTypes.camel);
        acc[camelKey] = d.value;
      }
      return acc;
    }, {});
};

const stringifyDeclarations = (decls: CSSDeclarations, indent = '  '): string => {
  return Object.entries(decls)
    .map(([prop, val]) => `${indent}${Case(prop, CaseTypes.snake)}: ${val};`)
    .join('\n');
};

export const Convert = {
  toCss: (json: CssJsonObject): string => {
    let cssString = '';

    for (const [key, value] of Object.entries(json)) {
      if (key.startsWith('@import')) {
        cssString += `${key};\n`;
      } else if (key === '@font-face' && Array.isArray(value)) {
        (value as CSSDeclarations[]).forEach((fontDecls) => {
          cssString += `@font-face {\n${stringifyDeclarations(fontDecls)}\n}\n\n`;
        });
      } else if (key.startsWith('@media') || key.startsWith('@supports')) {
        cssString += `${key} {\n`;
        for (const [selector, subDecls] of Object.entries(value as Record<string, CSSDeclarations>)) {
          cssString += `  ${selector} {\n${stringifyDeclarations(subDecls, '    ')}\n  }\n`;
        }
        cssString += '}\n\n';
      } else if (key.startsWith('@keyframes')) {
        cssString += `${key} {\n`;
        for (const [timelineFrame, kfDecls] of Object.entries(value as Record<string, CSSDeclarations>)) {
          cssString += `  ${timelineFrame} {\n${stringifyDeclarations(kfDecls, '    ')}\n  }\n`;
        }
        cssString += '}\n\n';
      } else {
        cssString += `${key} {\n${stringifyDeclarations(value as CSSDeclarations)}\n}\n\n`;
      }
    }

    return cssString.replace(/;\n([^@\s:({.])/g, ';\n\n$1').trim();
  },

  toJson: (css: string): CssJsonObject => {
    const ast = parse(css);
    const flatJson: CssJsonObject = {};

    if (!ast.stylesheet?.rules) return flatJson;

    (ast.stylesheet.rules as Node[]).forEach((rule) => {
      switch (rule.type) {
        case 'import': {
          const importRule = rule as unknown as Import;
          if (importRule.import) {
            flatJson[`@import ${importRule.import}`] = {};
          }
          break;
        }

        case 'rule': {
          const styleRule = rule as Rule;
          styleRule.selectors?.forEach((selector) => {
            flatJson[selector] = {
              ...((flatJson[selector] as CSSDeclarations) || {}),
              ...flattenDeclarations(styleRule.declarations),
            };
          });
          break;
        }

        case 'font-face': {
          const fontFaceRule = rule as unknown as FontFace;
          if (!Array.isArray(flatJson['@font-face'])) {
            flatJson['@font-face'] = [];
          }
          (flatJson['@font-face'] as CSSDeclarations[]).push(flattenDeclarations(fontFaceRule.declarations));
          break;
        }

        case 'keyframes': {
          const keyframeRule = rule as unknown as KeyFrames;
          const keyframeMap: Record<string, CSSDeclarations> = {};

          keyframeRule.keyframes
            ?.filter((kf): kf is KeyFrame => kf.type === 'keyframe')
            .forEach((kf) => {
              kf.values?.forEach((val) => {
                keyframeMap[val] = flattenDeclarations(kf.declarations);
              });
            });

          if (keyframeRule.name) {
            flatJson[`@keyframes ${keyframeRule.name}`] = keyframeMap;
          }
          break;
        }

        case 'media':
        case 'supports': {
          const mediaRule = rule as unknown as Media & { supports?: string };
          const condition = mediaRule.media || mediaRule.supports;
          const atRuleCondition = `@${rule.type} ${condition}`;

          if (!flatJson[atRuleCondition]) {
            flatJson[atRuleCondition] = {};
          }
          const container = flatJson[atRuleCondition] as Record<string, CSSDeclarations>;

          mediaRule.rules?.forEach((subRule) => {
            if (subRule.type === 'rule') {
              const styleRule = subRule as Rule;
              styleRule.selectors?.forEach((selector) => {
                container[selector] = {
                  ...(container[selector] || {}),
                  ...flattenDeclarations(styleRule.declarations),
                };
              });
            }
          });
          break;
        }
      }
    });

    return flatJson;
  },
};
