const concat = require('concat');
(async function build() {
  const files = [
    './dist/recruitment-helper/runtime.js',
    './dist/recruitment-helper/polyfills.js',
    './dist/recruitment-helper/main.js'
  ];

  await concat(files, './dist/recruitment-helper/recruitment-helper.js')
})();
