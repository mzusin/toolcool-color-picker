import pcssPlugin from './esbuild-pcss-plugin.js';

export default {
    entryPoints: ['./src/index.ts'],
    bundle: true,
    sourcemap: true,
    minify: true,
    target: [
        'es6',
    ],
    outfile: './public/lib/toolcool-color-picker.min.js',
    loader: {
        '.png': 'text',
        '.svg': 'dataurl',
        '.pcss': 'text',
    },
    plugins: [pcssPlugin],
}