// https://modern-web.dev/docs/test-runner/cli-and-configuration/
const { esbuildPlugin } = require('@web/dev-server-esbuild');

module.exports = {
    files: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
    plugins: [esbuildPlugin({ ts: true })],
};