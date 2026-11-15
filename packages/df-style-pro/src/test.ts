import { Convert } from './index.js';


const cssString = `
  @import url("global.css");
@import url("theme.css");

:root {
  --primary-color: #3490dc;
}

body {
  margin-top: 0;
  padding-left: 20px;
}

@font-face {
  font-family: 'Open Sans';
  src: url('opensans.woff2');
}

@media (max-width: 768px) {
  body {
    background-color: #000;
  }
  .card {
    border-radius: 10px;
  }
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
`;

const _j = Convert.toJson(cssString);
console.log('\n\r--- JSON Object ---\n\r', JSON.stringify(_j, null, 2));

const _c = Convert.toCss(_j);
console.log('\n\r--- CSS String ---\n\r', _c);
