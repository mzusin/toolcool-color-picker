
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
        document.body.click();
        assert.equal($colorPicker.opened, false);
    });

    QUnit.test('when clicked outside popup element should not appear', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;
        document.body.click();
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
});
