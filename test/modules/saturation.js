QUnit.module('Saturation', () => {

    QUnit.test('when popup is opened ---> saturation element should exist', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        assert.notEqual($saturation, null);
    });

    QUnit.test('for red color saturation background should have 0 saturation', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $saturationColor = $saturation.shadowRoot.querySelector('.box');
        const style = $saturationColor.getAttribute('style');
        assert.equal(style, 'background: hsl(0, 100%, 50%)');
    });

    QUnit.test('for #001aff color saturation background should have 234 saturation', (assert) => {
        const $colorPicker = document.querySelector('#color-001aff');
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $saturationColor = $saturation.shadowRoot.querySelector('.box');
        const style = $saturationColor.getAttribute('style');
        assert.equal(style, 'background: hsl(234, 100%, 50%)');
    });

    QUnit.test('for #001aff color saturation background should have 234 saturation', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#001aff';
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $saturationColor = $saturation.shadowRoot.querySelector('.box');
        const style = $saturationColor.getAttribute('style');
        assert.equal(style, 'background: hsl(234, 100%, 50%)');
    });

    QUnit.test('for #282e5c color saturation background should have 233 saturation', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#282e5c';
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $saturationColor = $saturation.shadowRoot.querySelector('.box');
        const style = $saturationColor.getAttribute('style');
        assert.equal(style, 'background: hsl(233, 100%, 50%)');
    });

    QUnit.test('for red color pointer left position should be 100%', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $pointer = $saturation.shadowRoot.querySelector('.pointer');

        const left = $pointer.style.left;

        assert.equal(left, '100%');
    });

    QUnit.test('for red color pointer top position should be 0%', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $pointer = $saturation.shadowRoot.querySelector('.pointer');

        const top = $pointer.style.top;
        assert.equal(top, '0%');
    });

    QUnit.test('for #7EC6A8 color pointer left position should be 36.36%', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#7EC6A8';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $pointer = $saturation.shadowRoot.querySelector('.pointer');

        const left = $pointer.style.left;

        assert.equal(left, '36.36%');
    });

    QUnit.test('for #7EC6A8 color pointer top position should be 22.35%', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#7EC6A8';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $pointer = $saturation.shadowRoot.querySelector('.pointer');

        const top = $pointer.style.top;
        assert.equal(top, '22.35%');
    });

    QUnit.test('for #0a010f color pointer left position should be 93.33%', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#0a010f';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $pointer = $saturation.shadowRoot.querySelector('.pointer');

        const left = $pointer.style.left;

        assert.equal(left, '93.33%');
    });

    QUnit.test('for #0a010f color pointer top position should be 94.12%', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#0a010f';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $pointer = $saturation.shadowRoot.querySelector('.pointer');

        const top = $pointer.style.top;
        assert.equal(top, '94.12%');
    });

    QUnit.test('pointer arrow left twice ---> left position has changed from 100% to 98%', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $pointer = $saturation.shadowRoot.querySelector('.pointer');

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
        assert.equal(left, '98%');
    });

    QUnit.test('pointer arrow left twice ---> top position has not changed', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $pointer = $saturation.shadowRoot.querySelector('.pointer');

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

        const top = $pointer.style.top;
        assert.equal(top, '0%');
    });

    QUnit.test('pointer arrow right twice ---> left position has changed from 0% to 2%', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#B1B1B1';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $pointer = $saturation.shadowRoot.querySelector('.pointer');

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
        assert.equal(left, '2%');
    });

    QUnit.test('pointer arrow right twice ---> top position should not change', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#B1B1B1';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $pointer = $saturation.shadowRoot.querySelector('.pointer');

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

        const top = $pointer.style.top;
        assert.equal(top, '30.59%');
    });

    QUnit.test('pointer arrow up twice ---> top position should change from 30.59% to 28.59%', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#B1B1B1';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $pointer = $saturation.shadowRoot.querySelector('.pointer');

        $pointer.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowUp',
        }));

        $pointer.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowUp',
        }));

        const top = $pointer.style.top;
        assert.equal(top, '28.59%');
    });

    QUnit.test('pointer arrow up twice ---> left position should not change', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#B1B1B1';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $pointer = $saturation.shadowRoot.querySelector('.pointer');

        $pointer.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowUp',
        }));

        $pointer.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowUp',
        }));

        const left = $pointer.style.left;
        assert.equal(left, '0%');
    });

    QUnit.test('pointer arrow down twice ---> top position should change from 30.59% to 32.59%', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#B1B1B1';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $pointer = $saturation.shadowRoot.querySelector('.pointer');

        $pointer.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowDown',
        }));

        $pointer.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowDown',
        }));

        const top = $pointer.style.top;
        assert.equal(top, '32.59%');
    });

    QUnit.test('pointer arrow down twice ---> left position should not change', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#B1B1B1';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $pointer = $saturation.shadowRoot.querySelector('.pointer');

        $pointer.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowDown',
        }));

        $pointer.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowDown',
        }));

        const left = $pointer.style.left;
        assert.equal(left, '0%');
    });

    QUnit.test('pointer arrow right border case ---> left position should not change', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $pointer = $saturation.shadowRoot.querySelector('.pointer');

        $pointer.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowRight',
        }));

        const left = $pointer.style.left;
        assert.equal(left, '100%');
    });

    QUnit.test('pointer arrow up border case ---> top position should not change', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $pointer = $saturation.shadowRoot.querySelector('.pointer');

        $pointer.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowUp',
        }));

        const top = $pointer.style.top;
        assert.equal(top, '0%');
    });

    QUnit.test('pointer arrow left border case ---> left position should not change', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#B1B1B1';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $pointer = $saturation.shadowRoot.querySelector('.pointer');

        $pointer.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowLeft',
        }));

        const left = $pointer.style.left;
        assert.equal(left, '0%');
    });

    QUnit.test('pointer arrow down border case ---> top position should not change', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#000000';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $pointer = $saturation.shadowRoot.querySelector('.pointer');

        $pointer.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowDown',
        }));

        const top = $pointer.style.top;
        assert.equal(top, '100%');
    });

    QUnit.test('pointer arrow left twice ---> color picker value should change', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $pointer = $saturation.shadowRoot.querySelector('.pointer');

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

        assert.equal($colorPicker.rgba, 'rgba(255, 5, 5, 1)');
    });

    QUnit.test('when hsv has changed from outside via events to (79, 0.93, 0.06) ---> saturation bg color should change too', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#7EC6A8';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $saturationColor = $saturation.shadowRoot.querySelector('.box');

        document.dispatchEvent(new CustomEvent('tc-hsv-changed', {
            detail: {
                h: 79,
                s: 0.93,
                v: 0.06,
                cid: $colorPicker.cid,
            }
        }));

        const style = $saturationColor.getAttribute('style');
        assert.equal(style, 'background: hsl(79, 100%, 50%)');
    });

    QUnit.test('when hsv has changed from outside via events to (320, 0.93, 0.06) ---> saturation bg color should change too', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#7EC6A8';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $saturationColor = $saturation.shadowRoot.querySelector('.box');

        document.dispatchEvent(new CustomEvent('tc-hsv-changed', {
            detail: {
                h: 320,
                s: 0.93,
                v: 0.06,
                cid: $colorPicker.cid,
            }
        }));

        const style = $saturationColor.getAttribute('style');
        assert.equal(style, 'background: hsl(320, 100%, 50%)');
    });

    QUnit.test('when hsv has changed from outside via events to (320, 0.93, 0.06) ---> saturation bg color should change too', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#7EC6A8';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $saturationColor = $saturation.shadowRoot.querySelector('.box');

        document.dispatchEvent(new CustomEvent('tc-hsv-changed', {
            detail: {
                h: 360,
                s: 0.93,
                v: 0.06,
                cid: $colorPicker.cid,
            }
        }));

        const style = $saturationColor.getAttribute('style');
        assert.equal(style, 'background: hsl(360, 100%, 50%)');
    });

    QUnit.test('when hsv has changed from outside via events to (79, 0.93, 0.06) ---> pointer left position should be 93%', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#7EC6A8';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $pointer = $saturation.shadowRoot.querySelector('.pointer');

        document.dispatchEvent(new CustomEvent('tc-hsv-changed', {
            detail: {
                h: 79,
                s: 0.93,
                v: 0.06,
                cid: $colorPicker.cid,
            }
        }));

        const left = $pointer.style.left;
        assert.equal(left, '93%');
    });

    QUnit.test('when hsv has changed from outside via events to (79, 0.93, 0.06) ---> pointer top position should be 94%', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#7EC6A8';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $pointer = $saturation.shadowRoot.querySelector('.pointer');

        document.dispatchEvent(new CustomEvent('tc-hsv-changed', {
            detail: {
                h: 79,
                s: 0.93,
                v: 0.06,
                cid: $colorPicker.cid,
            }
        }));

        const top = $pointer.style.top;
        assert.equal(top, '94%');
    });

    QUnit.test('when hue has changed from outside via events to 79 ---> saturation bg color should change too', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#7EC6A8';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $saturationColor = $saturation.shadowRoot.querySelector('.box');

        document.dispatchEvent(new CustomEvent('tc-hue-changed', {
            detail: {
                h: 79,
                cid: $colorPicker.cid,
            }
        }));

        const style = $saturationColor.getAttribute('style');
        assert.equal(style, 'background: hsl(79, 100%, 50%)');
    });

    QUnit.test('when hue has changed from outside via events to 200 ---> saturation bg color should change too', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#7EC6A8';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $saturationColor = $saturation.shadowRoot.querySelector('.box');

        document.dispatchEvent(new CustomEvent('tc-hue-changed', {
            detail: {
                h: 200,
                cid: $colorPicker.cid,
            }
        }));

        const style = $saturationColor.getAttribute('style');
        assert.equal(style, 'background: hsl(200, 100%, 50%)');
    });

    QUnit.test('when hue has changed from outside via events to 79 ---> pointer left position should be 36.36%', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#7EC6A8';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $pointer = $saturation.shadowRoot.querySelector('.pointer');

        document.dispatchEvent(new CustomEvent('tc-hue-changed', {
            detail: {
                h: 79,
                cid: $colorPicker.cid,
            }
        }));

        const left = $pointer.style.left;
        assert.equal(left, '36.36%');
    });

    QUnit.test('when hue has changed from outside via events to 79 ---> pointer top position should be 22.35%', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#7EC6A8';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $pointer = $saturation.shadowRoot.querySelector('.pointer');

        document.dispatchEvent(new CustomEvent('tc-hue-changed', {
            detail: {
                h: 79,
                cid: $colorPicker.cid,
            }
        }));

        const top = $pointer.style.top;
        assert.equal(top, '22.35%');
    });

    QUnit.test('when color has changed from outside via property to hsv(79, 36%, 78%) ---> pointer left position should be 36.18%', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;
        $colorPicker.setAttribute('color', 'hsv(79, 36%, 78%)');

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $pointer = $saturation.shadowRoot.querySelector('.pointer');

        const left = $pointer.style.left;
        assert.equal(left, '36.18%');
    });

    QUnit.test('when hue has changed from outside via property to hsl(11, 36%, 78%) ---> saturation bg color should change too', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#7EC6A8';
        $colorPicker.opened = true;
        $colorPicker.setAttribute('color', 'hsl(11, 36%, 78%)');

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $saturation = $popup.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $saturationColor = $saturation.shadowRoot.querySelector('.box');

        const style = $saturationColor.getAttribute('style');
        assert.equal(style, 'background: hsl(11, 100%, 50%)');
    });
});