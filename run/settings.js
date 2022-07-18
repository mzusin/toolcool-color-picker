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
    outfile: './examples/js/toolcool-color-picker.min.js',
    loader: {
        '.png': 'text',
        '.svg': 'dataurl',
        '.pcss': 'text',
    },
    plugins: [pcssPlugin, esbuildCopyPlugin],
    banner: {
        js: '// Tool Cool Picker v1.0.1, MIT License - https://github.com/toolcool-org/toolcool-color-picker',
    },
}