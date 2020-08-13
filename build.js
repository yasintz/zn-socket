const path = require('path');
const fs = require('fs');

require('@vercel/ncc')(path.join(process.cwd(), 'src', 'index.js'), {
  externals: [
    'morgan',
    'http',
    'fs',
    'path',
    'express',
    'handlebars',
    'socket.io',
  ],
  minify: true,
  sourceMap: false,
  watch: false,
}).then(({ code, map, assets }) => {
  fs.writeFileSync(path.join(process.cwd(), 'src', '_index.js'), code);
});
