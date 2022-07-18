
QUnit.module('Hue', () => {

    QUnit.test('when popup is opened ---> hue element should exist', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $hue = $popup.shadowRoot.querySelector('toolcool-color-picker-hue');
        assert.notEqual($hue, null);
    });

    QUnit.test('for red color pointer left position should be 0%', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $hue = $popup.shadowRoot.querySelector('toolcool-color-picker-hue');
        const $pointer = $hue.shadowRoot.querySelector('.pointer-box');

        const left = $pointer.style.left;
        assert.equal(left, '0%');
    });

    QUnit.test('for initial #001aff color pointer left position should be 64.97%', (assert) => {
        const $colorPicker = document.querySelector('#color-001aff');
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $hue = $popup.shadowRoot.querySelector('toolcool-color-picker-hue');
        const $pointer = $hue.shadowRoot.querySelector('.pointer-box');

        const left = $pointer.style.left;
        assert.equal(left, `64.97%`);
    });

    QUnit.test('after color change to #001aff ---> color pointer left position should be 64.97%', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#001aff';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $hue = $popup.shadowRoot.querySelector('toolcool-color-picker-hue');
        const $pointer = $hue.shadowRoot.querySelector('.pointer-box');

        const left = $pointer.style.left;
        assert.equal(left, `64.97%`);
    });

    QUnit.test('after color change to #05FF00 ---> color pointer left position should be 33.01%', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#05FF00';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $hue = $popup.shadowRoot.querySelector('toolcool-color-picker-hue');
        const $pointer = $hue.shadowRoot.querySelector('.pointer-box');

        const left = $pointer.style.left;
        assert.equal(left, `33.01%`);
    });

    QUnit.test('pointer arrow left twice ---> left position has changed from 56.01% to 54.01%', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#00A3FF';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $hue = $popup.shadowRoot.querySelector('toolcool-color-picker-hue');
        const $pointer = $hue.shadowRoot.querySelector('.pointer-box');

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
        assert.equal(left, '54.01%');
    });

    QUnit.test('pointer arrow right twice ---> left position has changed from 56.01% to 58.01%', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#00A3FF';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $hue = $popup.shadowRoot.querySelector('toolcool-color-picker-hue');
        const $pointer = $hue.shadowRoot.querySelector('.pointer-box');

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
        assert.equal(left, '58.01%');
    });

    QUnit.test('pointer arrow left in red color ---> left position should remain 0%', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $hue = $popup.shadowRoot.querySelector('toolcool-color-picker-hue');
        const $pointer = $hue.shadowRoot.querySelector('.pointer-box');

        $pointer.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowLeft',
        }));

        const left = $pointer.style.left;
        assert.equal(left, '0%');
    });

    QUnit.test('pointer arrow right border case ---> left position should remain 100%', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#FF000F';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $hue = $popup.shadowRoot.querySelector('toolcool-color-picker-hue');
        const $pointer = $hue.shadowRoot.querySelector('.pointer-box');

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
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#00A3FF';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $hue = $popup.shadowRoot.querySelector('toolcool-color-picker-hue');
        const $pointer = $hue.shadowRoot.querySelector('.pointer-box');

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

        assert.equal($colorPicker.rgba, 'rgba(0, 194, 255, 1)'); // 00C2FF
    });

    QUnit.test('pointer arrow right twice ---> color picker value should change', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#00A3FF';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $hue = $popup.shadowRoot.querySelector('toolcool-color-picker-hue');
        const $pointer = $hue.shadowRoot.querySelector('.pointer-box');

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

        assert.equal($colorPicker.rgba, 'rgba(0, 132, 255, 1)');
    });

    QUnit.test('when hsv has changed from outside via event to (79, 0.93, 0.06) ---> pointer position should change too', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#fff';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $hue = $popup.shadowRoot.querySelector('toolcool-color-picker-hue');
        const $pointer = $hue.shadowRoot.querySelector('.pointer-box');

        document.dispatchEvent(new CustomEvent('tc-hsv-changed', {
            detail: {
                h: 79,
                s: 0.93,
                v: 0.06,
                cid: $colorPicker.cid,
            }
        }));

        const left = $pointer.style.left;
        assert.equal(left, '21.94%');
    });

    QUnit.test('when hsv has changed from outside via event to (320, 0.93, 0.06) ---> pointer position should change too', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#fff';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $hue = $popup.shadowRoot.querySelector('toolcool-color-picker-hue');
        const $pointer = $hue.shadowRoot.querySelector('.pointer-box');

        document.dispatchEvent(new CustomEvent('tc-hsv-changed', {
            detail: {
                h: 320,
                s: 0.93,
                v: 0.06,
                cid: $colorPicker.cid,
            }
        }));

        const left = $pointer.style.left;
        assert.equal(left, '88.89%');
    });

    QUnit.test('when hsv has changed from outside via attribute to (79, 0.93, 0.06) ---> pointer position should change too', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;
        $colorPicker.setAttribute('color', 'rgb(11, 15, 1)');

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $hue = $popup.shadowRoot.querySelector('toolcool-color-picker-hue');
        const $pointer = $hue.shadowRoot.querySelector('.pointer-box');

        const left = $pointer.style.left;
        assert.equal(left, '21.43%');
    });

    QUnit.test('when hsv has changed from outside via attribute to (320, 0.93, 0.06) ---> pointer position should change too', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#fff';
        $colorPicker.opened = true;
        $colorPicker.setAttribute('color', 'rgb(15, 1, 11)');

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $hue = $popup.shadowRoot.querySelector('toolcool-color-picker-hue');
        const $pointer = $hue.shadowRoot.querySelector('.pointer-box');

        const left = $pointer.style.left;
        assert.equal(left, '88.1%');
    });
});