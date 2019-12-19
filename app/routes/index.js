require('fs')
  .readdirSync(__dirname)
  .map(filename => {
    const moduleName = filename.split('.')[0];
    console.log(`${__dirname}/${filename}`)
    exports[moduleName] = require(`${__dirname}/${filename}`);
  });