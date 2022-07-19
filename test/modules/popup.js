
QUnit.module('Popup', () => {
    QUnit.test('initial color should be red', (assert) => {
        const $colorPicker = document.querySelector('#red');
        assert.equal($colorPicker.rgba, 'rgba(255, 0, 0, 1)');
    });

    QUnit.test('if initial color is not provided ---> it should be black', (assert) => {
        const $colorPicker = document.querySelector('#black');
        assert.equal($colorPicker.rgba, 'rgba(0, 0, 0, 1)');
    });

    QUnit.test('color picker popup should be closed by default', (assert) => {
        const $colorPicker = document.querySelector('#red');
        assert.equal($colorPicker.opened, false);
    });

    QUnit.test('color picker popup element should not appear', (assert) => {
        const $colorPicker = document.querySelector('#red');
        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        assert.equal($popup, null);
    });

    QUnit.test('after "opened = true ---> color picker popup should be opened', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;
        assert.equal($colorPicker.opened, true);
    });

    QUnit.test('after "opened = true and the opened = false---> color picker popup should be closed', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;
        $colorPicker.opened = false;
        assert.equal($colorPicker.opened, false);
    });

    QUnit.test('color picker popup element should appear', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;
        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        assert.notEqual($popup, null);
    });

    QUnit.test('when clicked outside popup should close', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;
        document.body.dispatchEvent(new MouseEvent('mousedown', {
            view: window,
            bubbles: true,
            cancelable: true,
        }));
        assert.equal($colorPicker.opened, false);
    });

    QUnit.test('when clicked outside popup element should not appear', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;
        document.body.dispatchEvent(new MouseEvent('mousedown', {
            view: window,
            bubbles: true,
            cancelable: true,
        }));
        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        assert.equal($popup, null);
    });

    QUnit.test('default popup position is left', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;
        const $popupBox = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $popup = $popupBox.shadowRoot.querySelector('.popup');
        assert.equal($popup.className, 'popup');
    });

    QUnit.test('popup-position="right"', (assert) => {
        const $colorPicker = document.querySelector('#blue');
        $colorPicker.opened = true;
        const $popupBox = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $popup = $popupBox.shadowRoot.querySelector('.popup');
        assert.equal($popup.className, 'popup right');
    });

    QUnit.test('popup-position="left"', (assert) => {
        const $colorPicker = document.querySelector('#green');
        $colorPicker.opened = true;
        const $popupBox = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $popup = $popupBox.shadowRoot.querySelector('.popup');
        assert.equal($popup.className, 'popup');
    });

    QUnit.test('update popup-position property from "none" to "right"', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;
        $colorPicker.setAttribute('popup-position', 'right');
        const $popupBox = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $popup = $popupBox.shadowRoot.querySelector('.popup');
        assert.equal($popup.className, 'popup right');
    });

    QUnit.test('update popup-position property from "left" to "right"', (assert) => {
        const $colorPicker = document.querySelector('#green');
        $colorPicker.opened = true;
        $colorPicker.setAttribute('popup-position', 'right');
        const $popupBox = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $popup = $popupBox.shadowRoot.querySelector('.popup');
        assert.equal($popup.className, 'popup right');
    });

    QUnit.test('update popup-position property from "right" to "left"', (assert) => {
        const $colorPicker = document.querySelector('#blue');
        $colorPicker.opened = true;
        $colorPicker.setAttribute('popup-position', 'left');
        const $popupBox = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $popup = $popupBox.shadowRoot.querySelector('.popup');
        assert.equal($popup.className, 'popup');
    });

    QUnit.test('click on color picker button ---> popup should open', (assert) => {
        const $colorPicker1 = document.querySelector('#red');
        const $button1 = $colorPicker1.shadowRoot.querySelector('.button');
        $button1.click();

        const done = assert.async();

        window.setTimeout(() => {
            assert.equal($colorPicker1.opened, true);
            done();
        }, 1);
    });

    QUnit.test('open one popup, the click on another popup ---> the second popup should be opened', (assert) => {
        const $colorPicker1 = document.querySelector('#red');
        $colorPicker1.opened = true;

        const $colorPicker2 = document.querySelector('#black');
        const $button2 = $colorPicker2.shadowRoot.querySelector('.button');
        $button2.click();

        const done = assert.async();

        window.setTimeout(() => {
            assert.equal($colorPicker2.opened, true);
            done();
        }, 1);
    });

    QUnit.test('open one popup, the click on another popup ---> the first popup should be closed', (assert) => {
        const $colorPicker1 = document.querySelector('#red');
        $colorPicker1.opened = true;

        const $colorPicker2 = document.querySelector('#black');
        const $button2 = $colorPicker2.shadowRoot.querySelector('.button');
        $button2.click();

        const done = assert.async();

        window.setTimeout(() => {
            assert.equal($colorPicker1.opened, false);
            done();
        }, 1);
    });

    QUnit.test('click on color picker button, then click again ---> popup should close', (assert) => {
        const $colorPicker1 = document.querySelector('#red');
        const $button1 = $colorPicker1.shadowRoot.querySelector('.button');
        $button1.click();

        const done = assert.async();

        window.setTimeout(() => {
            $button1.click();

            window.setTimeout(() => {
                assert.equal($colorPicker1.opened, false);

                done();
            }, 1);
        }, 1);
    });

    QUnit.test('click on color picker button, then click again ---> popup element should not appear', (assert) => {
        const $colorPicker1 = document.querySelector('#red');
        const $button1 = $colorPicker1.shadowRoot.querySelector('.button');
        $button1.click();

        const done = assert.async();

        window.setTimeout(() => {

            $button1.click();

            window.setTimeout(() => {
                const $popup = $colorPicker1.shadowRoot.querySelector('toolcool-color-picker-popup');
                assert.equal($popup, null);

                done();
            }, 1);
        }, 1);
    });

});
