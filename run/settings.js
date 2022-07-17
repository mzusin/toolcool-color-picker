import pcssPlugin from './esbuild-plugins/esbuild-pcss-plugin.js';
import esbuildCopyPlugin from './esbuild-plugins/esbuild-copy-plugin.js';

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
    plugins: [pcssPlugin, esbuildCopyPlugin],
}