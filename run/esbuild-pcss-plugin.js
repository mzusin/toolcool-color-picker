const fs = require('fs');
const postcss  = require('postcss');
const autoprefixer  = require('autoprefixer');
const uglifycss  = require('uglifycss');

const esbuildPcssPlugin = {
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

module.exports = esbuildPcssPlugin;