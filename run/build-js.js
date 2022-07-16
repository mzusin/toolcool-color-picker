const fs = require('fs');
const path = require('path');
const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const uglifycss = require('uglifycss');

const pcssPlugin = {
    name: 'pcss',
    setup(build) {

        build.onLoad({ filter: /\.pcss$/ }, async (args) => {
            const source = await fs.promises.readFile(args.path, 'utf8');
            // const filename = path.relative(process.cwd(), args.path);

            const result = await postcss([
                autoprefixer({
                    overrideBrowserslist: [
                        '>0.2%',
                        'not dead',
                        'not op_mini all',
                    ]
                })
            ]).process(source, {
                from: undefined,
            });

            result.warnings().forEach(function (warn) {
                console.warn(warn.toString());
            });

            const uglified = uglifycss.processString(result.css);

            return {
                contents: uglified,
                loader: 'text',
            };
        })
    },
};

require('esbuild')
    .build({
        entryPoints: ['./src/index.ts'],
        bundle: true,
        sourcemap: true,
        minify: true,
        watch: {
            onRebuild(error, result) {

                if (error){
                    // console.error(error);
                }
                else {
                    console.log('Succeeded.');
                }
            },
        },
        target: [
            'es6',
        ],
        outfile: './public/lib/index.min.js',
        loader: {
            '.png': 'text',
            '.svg': 'dataurl',
            '.pcss': 'text',
        },
        plugins: [pcssPlugin],
    })
    .then(result => {
        console.log('Watching...');
    })
    .catch(() => process.exit(1));