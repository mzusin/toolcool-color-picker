const pcssPlugin = require('./esbuild-pcss-plugin');

module.exports = {
    entryPoints: ['./src/index.ts'],
    bundle: true,
    sourcemap: true,
    minify: true,
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
}