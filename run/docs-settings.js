export default {
    entryPoints: ['./docs/src/index.ts'],
    bundle: true,
    sourcemap: true,
    minify: true,
    target: [
        'es6',
    ],
    outfile: './docs/assets/docs.min.js',
    loader: {
        '.png': 'text',
        '.svg': 'dataurl',
        '.pcss': 'text',
    }
}