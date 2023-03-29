const cssnano = require('cssnano');
const atImport = require('postcss-import');

module.exports = {
    plugins: [
        atImport({}),
        require('tailwindcss'),
        cssnano({ preset: 'default' }),
        require('autoprefixer'),
    ]
}