import fs from 'fs';
import path from 'path';

const script = fs.readFileSync(path.join(process.cwd(), '/public/lib/index.min.js'), 'utf-8');

describe('Color Picker Root', () => {

    beforeAll(async () => {
        await global.page.setContent(`
            <html lang="en">
                <head>
                    <title>test</title>
                    <meta charset="utf-8">
                </head>
                <body>
                    <toolcool-color-picker color="#ff0000"></toolcool-color-picker>
                    <script>${ script }</script>
                </body>
            </html>
        `);
    });

    it('initial color value should be #ff0000', async () => {

        await global.page.waitForSelector('toolcool-color-picker');

        const $colorPicker = await global.page.evaluate(() => {
            return document.querySelector('toolcool-color-picker');
        });

        expect($colorPicker.value).toBe('#ff0000');
    });
});

