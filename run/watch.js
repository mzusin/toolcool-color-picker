const settings = require('./settings');

settings.watch = {
    onRebuild(error, result) {

        if (error){
            // console.error(error);
        }
        else {
            console.log('Succeeded.');
        }
    },
};

require('esbuild')
    .build(settings)
    .then(result => {
        console.log('Watching...');
    })
    .catch(() => process.exit(1));