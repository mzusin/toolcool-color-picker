
QUnit.module('Alpha', () => {

    QUnit.test('when popup is opened ---> alpha element should exist', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $alpha = $popup.shadowRoot.querySelector('toolcool-color-picker-alpha');
        assert.notEqual($alpha, null);
    });

    QUnit.test('when popup is opened with show-alpha ---> alpha element should be visible', (assert) => {
        const $colorPicker = document.querySelector('#show-alpha');
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $alpha = $popup.shadowRoot.querySelector('toolcool-color-picker-alpha');
        assert.equal($alpha.checkVisibility({checkVisibilityCSS: true}), true);
    });

    QUnit.test('when popup is opened with show-alpha="false" ---> alpha element should be hidden', (assert) => {
        const $colorPicker = document.querySelector('#no-alpha');
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $alpha = $popup.shadowRoot.querySelector('toolcool-color-picker-alpha');
        assert.equal($alpha.checkVisibility({checkVisibilityCSS: true}), false);
    });

    QUnit.test('when popup is opened and show-alpha attribute changes ---> alpha element should be shown or hidden', (assert) => {
        const $colorPicker = document.querySelector('#no-alpha');
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $alpha = $popup.shadowRoot.querySelector('toolcool-color-picker-alpha');

        $colorPicker.setAttribute('show-alpha', 'true');
        assert.equal($alpha.checkVisibility({checkVisibilityCSS: true}), true);

        $colorPicker.setAttribute('show-alpha', 'false');
        assert.equal($alpha.checkVisibility({checkVisibilityCSS: true}), false);
    });

    QUnit.test('for red with 100% opacity color pointer left position should be 100%', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $alpha = $popup.shadowRoot.querySelector('toolcool-color-picker-alpha');
        const $pointer = $alpha.shadowRoot.querySelector('.pointer-box');

        const left = $pointer.style.left;
        assert.equal(left, '100%');
    });

    QUnit.test('for 50% opacity color pointer left position should be 50%', (assert) => {
        const $colorPicker = document.querySelector('#alpha-0-5');
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $alpha = $popup.shadowRoot.querySelector('toolcool-color-picker-alpha');
        const $pointer = $alpha.shadowRoot.querySelector('.pointer-box');

        const left = $pointer.style.left;
        assert.equal(left, '50%');
    });

    QUnit.test('for 0% opacity color pointer left position should be 0%', (assert) => {
        const $colorPicker = document.querySelector('#alpha-0-5');
        $colorPicker.color = 'rgba(100, 200, 255, 0)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $alpha = $popup.shadowRoot.querySelector('toolcool-color-picker-alpha');
        const $pointer = $alpha.shadowRoot.querySelector('.pointer-box');

        const left = $pointer.style.left;
        assert.equal(left, '0%');
    });

    QUnit.test('for 25% opacity color pointer left position should be 25%', (assert) => {
        const $colorPicker = document.querySelector('#alpha-0-5');
        $colorPicker.color = 'rgba(100, 200, 255, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $alpha = $popup.shadowRoot.querySelector('toolcool-color-picker-alpha');
        const $pointer = $alpha.shadowRoot.querySelector('.pointer-box');

        const left = $pointer.style.left;
        assert.equal(left, '25%');
    });

    QUnit.test('pointer arrow left twice ---> left position has changed from 25% to 23%', (assert) => {
        const $colorPicker = document.querySelector('#alpha-0-5');
        $colorPicker.color = 'rgba(100, 200, 255, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $alpha = $popup.shadowRoot.querySelector('toolcool-color-picker-alpha');
        const $pointer = $alpha.shadowRoot.querySelector('.pointer-box');

        $pointer.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowLeft',
        }));

        $pointer.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowLeft',
        }));

        const left = $pointer.style.left;
        assert.equal(left, '23%');
    });

    QUnit.test('pointer arrow right twice ---> left position has changed from 25% to 27%', (assert) => {
        const $colorPicker = document.querySelector('#alpha-0-5');
        $colorPicker.color = 'rgba(100, 200, 255, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $alpha = $popup.shadowRoot.querySelector('toolcool-color-picker-alpha');
        const $pointer = $alpha.shadowRoot.querySelector('.pointer-box');

        $pointer.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowRight',
        }));

        $pointer.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowRight',
        }));

        const left = $pointer.style.left;
        assert.equal(left, '27%');
    });

    QUnit.test('pointer arrow left border case', (assert) => {
        const $colorPicker = document.querySelector('#alpha-0-5');
        $colorPicker.color = 'rgba(100, 200, 255, 0)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $alpha = $popup.shadowRoot.querySelector('toolcool-color-picker-alpha');
        const $pointer = $alpha.shadowRoot.querySelector('.pointer-box');

        $pointer.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowLeft',
        }));

        const left = $pointer.style.left;
        assert.equal(left, '0%');
    });

    QUnit.test('pointer arrow right border case', (assert) => {
        const $colorPicker = document.querySelector('#alpha-0-5');
        $colorPicker.color = 'rgba(100, 200, 255, 1)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $alpha = $popup.shadowRoot.querySelector('toolcool-color-picker-alpha');
        const $pointer = $alpha.shadowRoot.querySelector('.pointer-box');

        $pointer.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowRight',
        }));

        const left = $pointer.style.left;
        assert.equal(left, '100%');
    });

    QUnit.test('pointer arrow left twice ---> color picker value should change', (assert) => {
        const $colorPicker = document.querySelector('#alpha-0-5');
        $colorPicker.color = 'rgba(100, 200, 255, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $alpha = $popup.shadowRoot.querySelector('toolcool-color-picker-alpha');
        const $pointer = $alpha.shadowRoot.querySelector('.pointer-box');

        $pointer.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowLeft',
        }));

        $pointer.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowLeft',
        }));

        assert.equal($colorPicker.rgba, 'rgba(100, 200, 255, 0.23)');
    });

    QUnit.test('pointer arrow right twice ---> color picker value should change', (assert) => {
        const $colorPicker = document.querySelector('#alpha-0-5');
        $colorPicker.color = 'rgba(100, 200, 255, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $alpha = $popup.shadowRoot.querySelector('toolcool-color-picker-alpha');
        const $pointer = $alpha.shadowRoot.querySelector('.pointer-box');

        $pointer.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowRight',
        }));

        $pointer.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowRight',
        }));

        assert.equal($colorPicker.rgba, 'rgba(100, 200, 255, 0.27)');
    });

    QUnit.test('when hsv has changed from outside to (79, 0.93, 0.06) ---> pointer position should not change', (assert) => {
        const $colorPicker = document.querySelector('#alpha-0-5');
        $colorPicker.color = 'rgba(100, 200, 255, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $alpha = $popup.shadowRoot.querySelector('toolcool-color-picker-alpha');
        const $pointer = $alpha.shadowRoot.querySelector('.pointer-box');

        document.dispatchEvent(new CustomEvent('tc-hsv-changed', {
            detail: {
                h: 79,
                s: 0.93,
                v: 0.06,
                cid: $colorPicker.cid,
            }
        }));

        const left = $pointer.style.left;
        assert.equal(left, '25%');
    });

    QUnit.test('when hue has changed from outside to (79) ---> pointer position should not change', (assert) => {
        const $colorPicker = document.querySelector('#alpha-0-5');
        $colorPicker.color = 'rgba(100, 200, 255, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $alpha = $popup.shadowRoot.querySelector('toolcool-color-picker-alpha');
        const $pointer = $alpha.shadowRoot.querySelector('.pointer-box');

        document.dispatchEvent(new CustomEvent('tc-hue-changed', {
            detail: {
                h: 79,
                cid: $colorPicker.cid,
            }
        }));

        const left = $pointer.style.left;
        assert.equal(left, '25%');
    });

    QUnit.test('for red with 100% opacity ---> bg color should be red', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $alpha = $popup.shadowRoot.querySelector('toolcool-color-picker-alpha');
        const $bg = $alpha.shadowRoot.querySelector('.color-bg');

        const style = $bg.getAttribute('style');
        assert.equal(style, 'background: linear-gradient(to right, rgba(255,0,0, 0) 0%, rgba(255,0,0, 1) 100%)');
    });

    QUnit.test('for red with 50% opacity ---> bg color should be red', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(255, 0, 0, 0.5)';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $alpha = $popup.shadowRoot.querySelector('toolcool-color-picker-alpha');
        const $bg = $alpha.shadowRoot.querySelector('.color-bg');

        const style = $bg.getAttribute('style');
        assert.equal(style, 'background: linear-gradient(to right, rgba(255,0,0, 0) 0%, rgba(255,0,0, 1) 100%)');
    });

    QUnit.test('for #FFC80A color ---> bg color should be #FFC80A', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#FFC80A';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $alpha = $popup.shadowRoot.querySelector('toolcool-color-picker-alpha');
        const $bg = $alpha.shadowRoot.querySelector('.color-bg');

        const style = $bg.getAttribute('style');
        assert.equal(style, 'background: linear-gradient(to right, rgba(255,200,10, 0) 0%, rgba(255,200,10, 1) 100%)');
    });

    QUnit.test('when hsv has changed from outside to (79, 0.93, 0.06) ---> bg color should change too', (assert) => {
        const $colorPicker = document.querySelector('#alpha-0-5');
        $colorPicker.color = 'rgba(100, 200, 255, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $alpha = $popup.shadowRoot.querySelector('toolcool-color-picker-alpha');
        const $bg = $alpha.shadowRoot.querySelector('.color-bg');

        document.dispatchEvent(new CustomEvent('tc-hsv-changed', {
            detail: {
                h: 79,
                s: 0.93,
                v: 0.06,
                cid: $colorPicker.cid,
            }
        }));

        const backgroundImage = $bg.style.backgroundImage;
        assert.equal(backgroundImage, 'linear-gradient(to right, rgba(15, 3, 3, 0) 0%, rgb(15, 3, 3) 100%)');
    });

    QUnit.test('when hue has changed from outside to (79) ---> bg color should change too', (assert) => {
        const $colorPicker = document.querySelector('#alpha-0-5');
        $colorPicker.color = 'rgba(100, 200, 255, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $alpha = $popup.shadowRoot.querySelector('toolcool-color-picker-alpha');
        const $bg = $alpha.shadowRoot.querySelector('.color-bg');

        document.dispatchEvent(new CustomEvent('tc-hue-changed', {
            detail: {
                h: 79,
                cid: $colorPicker.cid,
            }
        }));

        const backgroundImage = $bg.style.backgroundImage;
        assert.equal(backgroundImage, 'linear-gradient(to right, rgba(191, 255, 54, 0) 0%, rgb(191, 255, 54) 100%)');
    });

    QUnit.test('when alpha has changed from outside to (0.45) ---> pointer position should change too', (assert) => {
        const $colorPicker = document.querySelector('#alpha-0-5');
        $colorPicker.color = 'rgba(100, 200, 255, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $alpha = $popup.shadowRoot.querySelector('toolcool-color-picker-alpha');
        const $pointer = $alpha.shadowRoot.querySelector('.pointer-box');

        document.dispatchEvent(new CustomEvent('tc-alpha-changed', {
            detail: {
                a: 0.45,
                cid: $colorPicker.cid,
            }
        }));

        const left = $pointer.style.left;
        assert.equal(left, '45%');
    });

    QUnit.test('when alpha has changed from outside to (0.37) ---> pointer position should change too', (assert) => {
        const $colorPicker = document.querySelector('#alpha-0-5');
        $colorPicker.color = 'rgba(100, 200, 255, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $alpha = $popup.shadowRoot.querySelector('toolcool-color-picker-alpha');
        const $pointer = $alpha.shadowRoot.querySelector('.pointer-box');

        document.dispatchEvent(new CustomEvent('tc-alpha-changed', {
            detail: {
                a: 0.37,
                cid: $colorPicker.cid,
            }
        }));

        const left = $pointer.style.left;
        assert.equal(left, '37%');
    });

    QUnit.test('pointer arrow left twice ---> left position has changed from 25% to 23%', (assert) => {
        const $colorPicker = document.querySelector('#alpha-0-5');
        $colorPicker.color = 'rgba(100, 200, 255, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $alpha = $popup.shadowRoot.querySelector('toolcool-color-picker-alpha');
        const $pointer = $alpha.shadowRoot.querySelector('.pointer-box');

        $pointer.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowLeft',
        }));

        $pointer.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowLeft',
        }));

        assert.equal($colorPicker.rgba, 'rgba(100, 200, 255, 0.23)');
    });

    QUnit.test('pointer arrow right twice ---> left position has changed from 25% to 27%', (assert) => {
        const $colorPicker = document.querySelector('#alpha-0-5');
        $colorPicker.color = 'rgba(100, 200, 255, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $alpha = $popup.shadowRoot.querySelector('toolcool-color-picker-alpha');
        const $pointer = $alpha.shadowRoot.querySelector('.pointer-box');

        $pointer.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowRight',
        }));

        $pointer.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowRight',
        }));

        assert.equal($colorPicker.rgba, 'rgba(100, 200, 255, 0.27)');
    });

    QUnit.test('when color picker color attribute changes ---> color property change too', (assert) => {
        const $colorPicker = document.querySelector('#alpha-0-5');
        $colorPicker.opened = true;
        $colorPicker.setAttribute('color', 'rgba(100, 200, 100, 0.1');
        assert.equal($colorPicker.rgba, 'rgba(100, 200, 100, 0.1)');
    });

    QUnit.test('when color picker color attribute changes ---> pointer position should change too', (assert) => {
        const $colorPicker = document.querySelector('#alpha-0-5');
        $colorPicker.opened = true;
        $colorPicker.setAttribute('color', 'rgba(100, 200, 100, 0.1');

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $alpha = $popup.shadowRoot.querySelector('toolcool-color-picker-alpha');
        const $pointer = $alpha.shadowRoot.querySelector('.pointer-box');

        const left = $pointer.style.left;
        assert.equal(left, '10%');
    });

    QUnit.test('when color picker color attribute changes ---> background color should change too', (assert) => {
        const $colorPicker = document.querySelector('#alpha-0-5');
        $colorPicker.opened = true;
        $colorPicker.setAttribute('color', 'rgba(100, 200, 100, 0.1');

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $alpha = $popup.shadowRoot.querySelector('toolcool-color-picker-alpha');
        const $bg = $alpha.shadowRoot.querySelector('.color-bg');

        const done = assert.async();

        window.setTimeout(() => {
            const backgroundImage = $bg.style.backgroundImage;
            assert.equal(backgroundImage, 'linear-gradient(to right, rgba(100, 200, 100, 0) 0%, rgb(100, 200, 100) 100%)');
            done();
        }, 0);
    });
});
