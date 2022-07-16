const settings = require('./settings');

require('esbuild')
    .build(settings)
    .then(result => {
        console.log('Done.');
    })
    .catch(() => process.exit(1));