// https://www.npmjs.com/package/colorizr

import { hex2oklch, convertCSS } from 'colorizr';

// Get an object with numerical channels
const colorObj = hex2oklch('#ff0044'); 
// => { l: 0.63269, c: 0.25404, h: 19.90224 }

// Get a formatted CSS string ready for stylesheets
const cssString = convertCSS('#ff0044', 'oklch'); 
// => 'oklch(63.269% 0.25404 19.902)'
