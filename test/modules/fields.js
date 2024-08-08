
QUnit.module('Fields', () => {

    QUnit.test('when popup is opened ---> fields element should exist', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        assert.notEqual($fields, null);
    });

    QUnit.test('when popup is opened ---> hex element should exist', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $hex = $fields.shadowRoot.querySelector('[data-type="hex"]');
        assert.notEqual($hex, null);
    });

    QUnit.test('when popup is opened ---> red field element should exist', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $red = $fields.shadowRoot.querySelector('[data-type="r"]');
        assert.notEqual($red, null);
    });

    QUnit.test('when popup is opened ---> green field element should exist', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $green = $fields.shadowRoot.querySelector('[data-type="g"]');
        assert.notEqual($green, null);
    });

    QUnit.test('when popup is opened ---> blue field element should exist', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $blue = $fields.shadowRoot.querySelector('[data-type="b"]');
        assert.notEqual($blue, null);
    });

    QUnit.test('when popup is opened ---> alpha field element should exist', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $alpha = $fields.shadowRoot.querySelector('[data-type="a"]');
        assert.notEqual($alpha, null);
    });

    QUnit.test('when popup is opened with show-alpha="false" ---> alpha field element should be hidden', (assert) => {
        const $colorPicker = document.querySelector('#no-alpha');
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $alpha = $fields.shadowRoot.querySelector('[data-type="a"]');
        const $alphaLabel = $fields.shadowRoot.querySelector('label[id^="a-label"]');
        assert.equal($alpha.checkVisibility({checkVisibilityCSS: true}), false);
        assert.equal($alphaLabel.checkVisibility({checkVisibilityCSS: true}), false);
    });

    QUnit.test('when popup is opened and show-alpha attribute changes ---> alpha field element should be shown or hidden', (assert) => {
        const $colorPicker = document.querySelector('#no-alpha');
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $alpha = $fields.shadowRoot.querySelector('[data-type="a"]');
        const $alphaLabel = $fields.shadowRoot.querySelector('label[id^="a-label"]');

        $colorPicker.setAttribute('show-alpha', 'true');
        assert.equal($alpha.checkVisibility({checkVisibilityCSS: true}), true);
        assert.equal($alphaLabel.checkVisibility({checkVisibilityCSS: true}), true);

        $colorPicker.setAttribute('show-alpha', 'false');
        assert.equal($alpha.checkVisibility({checkVisibilityCSS: true}), false);
        assert.equal($alphaLabel.checkVisibility({checkVisibilityCSS: true}), false);
    });

    QUnit.test('initial color red ---> hex element should contain the correct value', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $hex = $fields.shadowRoot.querySelector('[data-type="hex"]');
        assert.equal($hex.value, 'FF0000');
    });

    QUnit.test('initial color red ---> red field element should contain the correct value', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $red = $fields.shadowRoot.querySelector('[data-type="r"]');
        assert.equal($red.value, '255');
    });

    QUnit.test('initial color red ---> green field element should contain the correct value', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $green = $fields.shadowRoot.querySelector('[data-type="g"]');
        assert.equal($green.value, '0');
    });

    QUnit.test('initial color red ---> blue field element should contain the correct value', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $blue = $fields.shadowRoot.querySelector('[data-type="b"]');
        assert.equal($blue.value, '0');
    });

    QUnit.test('initial color red ---> alpha field element should contain the correct value', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $alpha = $fields.shadowRoot.querySelector('[data-type="a"]');
        assert.equal($alpha.value, '100');
    });

    QUnit.test('initial color #328ba8 ---> hex element should contain the correct value', (assert) => {
        const $colorPicker = document.querySelector('#color-328ba8');
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $hex = $fields.shadowRoot.querySelector('[data-type="hex"]');
        assert.equal($hex.value, '328BA8');
    });

    QUnit.test('initial color #328ba8 ---> red field element should contain the correct value', (assert) => {
        const $colorPicker = document.querySelector('#color-328ba8');
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $red = $fields.shadowRoot.querySelector('[data-type="r"]');
        assert.equal($red.value, '50');
    });

    QUnit.test('initial color #328ba8 ---> green field element should contain the correct value', (assert) => {
        const $colorPicker = document.querySelector('#color-328ba8');
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $green = $fields.shadowRoot.querySelector('[data-type="g"]');
        assert.equal($green.value, '139');
    });

    QUnit.test('initial color #328ba8 ---> blue field element should contain the correct value', (assert) => {
        const $colorPicker = document.querySelector('#color-328ba8');
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $blue = $fields.shadowRoot.querySelector('[data-type="b"]');
        assert.equal($blue.value, '168');
    });

    QUnit.test('initial color #328ba8 ---> alpha field element should contain the correct value', (assert) => {
        const $colorPicker = document.querySelector('#color-328ba8');
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $alpha = $fields.shadowRoot.querySelector('[data-type="a"]');
        assert.equal($alpha.value, '100');
    });

    QUnit.test('initial color rgba(255, 255, 255, 0.5) ---> hex element should contain the correct value', (assert) => {
        const $colorPicker = document.querySelector('#alpha-0-5');
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $hex = $fields.shadowRoot.querySelector('[data-type="hex"]');
        assert.equal($hex.value, 'FFFFFF');
    });

    QUnit.test('initial color rgba(255, 255, 255, 0.5) ---> red field element should contain the correct value', (assert) => {
        const $colorPicker = document.querySelector('#alpha-0-5');
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $red = $fields.shadowRoot.querySelector('[data-type="r"]');
        assert.equal($red.value, '255');
    });

    QUnit.test('initial color rgba(255, 255, 255, 0.5) ---> green field element should contain the correct value', (assert) => {
        const $colorPicker = document.querySelector('#alpha-0-5');
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $green = $fields.shadowRoot.querySelector('[data-type="g"]');
        assert.equal($green.value, '255');
    });

    QUnit.test('initial color rgba(255, 255, 255, 0.5) ---> blue field element should contain the correct value', (assert) => {
        const $colorPicker = document.querySelector('#alpha-0-5');
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $blue = $fields.shadowRoot.querySelector('[data-type="b"]');
        assert.equal($blue.value, '255');
    });

    QUnit.test('initial color rgba(255, 255, 255, 0.5) ---> alpha field element should contain the correct value', (assert) => {
        const $colorPicker = document.querySelector('#alpha-0-5');
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $alpha = $fields.shadowRoot.querySelector('[data-type="a"]');
        assert.equal($alpha.value, '50');
    });

    QUnit.test('change color to rgba(255, 255, 255, 0.5) ---> hex element should contain the correct value', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(255, 255, 255, 0.5)';
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $hex = $fields.shadowRoot.querySelector('[data-type="hex"]');
        assert.equal($hex.value, 'FFFFFF');
    });

    QUnit.test('change color to rgba(255, 255, 255, 0.5) ---> red field element should contain the correct value', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(255, 255, 255, 0.5)';
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $red = $fields.shadowRoot.querySelector('[data-type="r"]');
        assert.equal($red.value, '255');
    });

    QUnit.test('change color to rgba(255, 255, 255, 0.5) ---> green field element should contain the correct value', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(255, 255, 255, 0.5)';
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $green = $fields.shadowRoot.querySelector('[data-type="g"]');
        assert.equal($green.value, '255');
    });

    QUnit.test('change color to rgba(255, 255, 255, 0.5) ---> blue field element should contain the correct value', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(255, 255, 255, 0.5)';
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $blue = $fields.shadowRoot.querySelector('[data-type="b"]');
        assert.equal($blue.value, '255');
    });

    QUnit.test('change color to rgba(255, 255, 255, 0.5) ---> alpha field element should contain the correct value', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(255, 255, 255, 0.5)';
        $colorPicker.opened = true;

        const $popup =  $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $alpha = $fields.shadowRoot.querySelector('[data-type="a"]');
        assert.equal($alpha.value, '50');
    });

    QUnit.test('when hsv has changed from outside via events to (79, 0.93, 0.06) ---> hex value should be correct', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(100, 200, 255, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $hex = $fields.shadowRoot.querySelector('[data-type="hex"]');

        document.dispatchEvent(new CustomEvent('tc-hsv-changed', {
            detail: {
                h: 79,
                s: 0.93,
                v: 0.06,
                cid: $colorPicker.cid,
            }
        }));

        assert.equal($hex.value, '0B0F01');
    });

    QUnit.test('when hsv has changed from outside via events to (79, 0.93, 0.06) ---> red value should be correct', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(100, 200, 255, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $red = $fields.shadowRoot.querySelector('[data-type="r"]');

        document.dispatchEvent(new CustomEvent('tc-hsv-changed', {
            detail: {
                h: 79,
                s: 0.93,
                v: 0.06,
                cid: $colorPicker.cid,
            }
        }));

        assert.equal($red.value, '11');
    });

    QUnit.test('when hsv has changed from outside via events to (79, 0.93, 0.06) ---> green value should be correct', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(100, 200, 255, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $green = $fields.shadowRoot.querySelector('[data-type="g"]');

        document.dispatchEvent(new CustomEvent('tc-hsv-changed', {
            detail: {
                h: 79,
                s: 0.93,
                v: 0.06,
                cid: $colorPicker.cid,
            }
        }));

        assert.equal($green.value, '15');
    });

    QUnit.test('when hsv has changed from outside via events to (79, 0.93, 0.06) ---> blue value should be correct', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(100, 200, 255, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $blue = $fields.shadowRoot.querySelector('[data-type="b"]');

        document.dispatchEvent(new CustomEvent('tc-hsv-changed', {
            detail: {
                h: 79,
                s: 0.93,
                v: 0.06,
                cid: $colorPicker.cid,
            }
        }));

        assert.equal($blue.value, '1');
    });

    QUnit.test('when hsv has changed from outside via events to (79, 0.93, 0.06) ---> alpha value should be correct', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(100, 200, 255, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $alpha = $fields.shadowRoot.querySelector('[data-type="a"]');

        document.dispatchEvent(new CustomEvent('tc-hsv-changed', {
            detail: {
                h: 79,
                s: 0.93,
                v: 0.06,
                cid: $colorPicker.cid,
            }
        }));

        assert.equal($alpha.value, '25');
    });

    QUnit.test('when hue has changed from outside via events to 79 ---> hex value should be correct', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(100, 200, 255, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $hex = $fields.shadowRoot.querySelector('[data-type="hex"]');

        document.dispatchEvent(new CustomEvent('tc-hue-changed', {
            detail: {
                h: 79,
                cid: $colorPicker.cid,
            }
        }));

        assert.equal($hex.value, 'CEFF64');
    });

    QUnit.test('when hue has changed from outside via events to 79 ---> red value should be correct', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(100, 200, 255, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $red = $fields.shadowRoot.querySelector('[data-type="r"]');

        document.dispatchEvent(new CustomEvent('tc-hue-changed', {
            detail: {
                h: 79,
                cid: $colorPicker.cid,
            }
        }));

        assert.equal($red.value, '206');
    });

    QUnit.test('when hue has changed from outside via events to 79 ---> green value should be correct', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(100, 200, 255, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $green = $fields.shadowRoot.querySelector('[data-type="g"]');

        document.dispatchEvent(new CustomEvent('tc-hue-changed', {
            detail: {
                h: 79,
                cid: $colorPicker.cid,
            }
        }));

        assert.equal($green.value, '255');
    });

    QUnit.test('when hue has changed from outside via events to 79 ---> blue value should be correct', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(100, 200, 255, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $blue = $fields.shadowRoot.querySelector('[data-type="b"]');

        document.dispatchEvent(new CustomEvent('tc-hue-changed', {
            detail: {
                h: 79,
                cid: $colorPicker.cid,
            }
        }));

        assert.equal($blue.value, '100');
    });

    QUnit.test('when hue has changed from outside via events to 79 ---> alpha value should not change', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(100, 200, 255, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $alpha = $fields.shadowRoot.querySelector('[data-type="a"]');

        document.dispatchEvent(new CustomEvent('tc-hue-changed', {
            detail: {
                h: 79,
                cid: $colorPicker.cid,
            }
        }));

        assert.equal($alpha.value, '25');
    });

    QUnit.test('when alpha has changed from outside via events to 10 ---> hex value should not change', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(100, 200, 255, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $hex = $fields.shadowRoot.querySelector('[data-type="hex"]');

        document.dispatchEvent(new CustomEvent('tc-alpha-changed', {
            detail: {
                a: 0.1,
                cid: $colorPicker.cid,
            }
        }));

        assert.equal($hex.value, '64C8FF');
    });

    QUnit.test('when alpha has changed from outside via events to 10 ---> red value should not change', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(100, 200, 255, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $red = $fields.shadowRoot.querySelector('[data-type="r"]');

        document.dispatchEvent(new CustomEvent('tc-alpha-changed', {
            detail: {
                a: 0.1,
                cid: $colorPicker.cid,
            }
        }));

        assert.equal($red.value, '100');
    });

    QUnit.test('when alpha has changed from outside via events to 10 ---> green value should not change', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(100, 200, 255, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $green = $fields.shadowRoot.querySelector('[data-type="g"]');

        document.dispatchEvent(new CustomEvent('tc-alpha-changed', {
            detail: {
                a: 0.1,
                cid: $colorPicker.cid,
            }
        }));

        assert.equal($green.value, '200');
    });

    QUnit.test('when alpha has changed from outside via events to 10 ---> blue value should not change', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(100, 200, 255, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $blue = $fields.shadowRoot.querySelector('[data-type="b"]');

        document.dispatchEvent(new CustomEvent('tc-alpha-changed', {
            detail: {
                a: 0.1,
                cid: $colorPicker.cid,
            }
        }));

        assert.equal($blue.value, '255');
    });

    QUnit.test('when color has changed from outside via property to (79, 0.93, 0.06) ---> hex value should be correct', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.setAttribute('color', 'hsv(79, 93%, 6%)');
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $hex = $fields.shadowRoot.querySelector('[data-type="hex"]');

        assert.equal($hex.value, '0B0F01');
    });

    QUnit.test('when color has changed from outside via property to rgba(100, 15, 18, 0.1) ---> red value should be correct', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.setAttribute('color', 'rgba(100, 15, 18, 0.1)');
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $red = $fields.shadowRoot.querySelector('[data-type="r"]');

        assert.equal($red.value, '100');
    });

    QUnit.test('when color has changed from outside via property to rgba(100, 15, 18, 0.1) ---> green value should be correct', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.setAttribute('color', 'rgba(100, 15, 18, 0.1)');
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $green = $fields.shadowRoot.querySelector('[data-type="g"]');

        assert.equal($green.value, '15');
    });

    QUnit.test('when color has changed from outside via property to rgba(100, 15, 18, 0.1) ---> blue value should be correct', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.setAttribute('color', 'rgba(100, 15, 18, 0.1)');
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $blue = $fields.shadowRoot.querySelector('[data-type="b"]');

        assert.equal($blue.value, '18');
    });

    QUnit.test('when color has changed from outside via property to rgba(100, 15, 18, 0.1) ---> alpha value should be correct', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.setAttribute('color', 'rgba(100, 15, 18, 0.1)');
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $alpha = $fields.shadowRoot.querySelector('[data-type="a"]');

        assert.equal($alpha.value, '10');
    });

    QUnit.test('when alpha has changed from outside via events to 10 ---> alpha value should not change', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(100, 200, 255, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $alpha = $fields.shadowRoot.querySelector('[data-type="a"]');

        document.dispatchEvent(new CustomEvent('tc-alpha-changed', {
            detail: {
                a: 0.1,
                cid: $colorPicker.cid,
            }
        }));

        assert.equal($alpha.value, '10');
    });

    QUnit.test('change hex field to c464ff ---> color picker value should be correct', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(100, 200, 255, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $hex = $fields.shadowRoot.querySelector('[data-type="hex"]');
        $hex.value = 'c464ff';

        $hex.dispatchEvent(new Event('input', {
            view: window,
            bubbles: true,
            cancelable: true,
        }));

        assert.equal($colorPicker.rgba, 'rgba(196, 100, 255, 0.25)');
    });

    QUnit.test('change red field to 50 ---> color picker value should be correct', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(100, 200, 120, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $red = $fields.shadowRoot.querySelector('[data-type="r"]');
        $red.value = '50';

        $red.dispatchEvent(new Event('input', {
            view: window,
            bubbles: true,
            cancelable: true,
        }));

        assert.equal($colorPicker.rgba, 'rgba(50, 200, 120, 0.25)');
    });

    QUnit.test('change green field to 50 ---> color picker value should be correct', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(100, 150, 120, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $green = $fields.shadowRoot.querySelector('[data-type="g"]');
        $green.value = '50';

        $green.dispatchEvent(new Event('input', {
            view: window,
            bubbles: true,
            cancelable: true,
        }));

        assert.equal($colorPicker.rgba, 'rgba(100, 50, 120, 0.25)');
    });

    QUnit.test('change blue field to 50 ---> color picker value should be correct', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(100, 12, 120, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $blue = $fields.shadowRoot.querySelector('[data-type="b"]');
        $blue.value = '50';

        $blue.dispatchEvent(new Event('input', {
            view: window,
            bubbles: true,
            cancelable: true,
        }));

        assert.equal($colorPicker.rgba, 'rgba(100, 12, 50, 0.25)');
    });

    QUnit.test('change alpha field to 11 ---> color picker value should be correct', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(100, 12, 120, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $alpha = $fields.shadowRoot.querySelector('[data-type="a"]');
        $alpha.value = '11';

        $alpha.dispatchEvent(new Event('input', {
            view: window,
            bubbles: true,
            cancelable: true,
        }));

        assert.equal($colorPicker.rgba, 'rgba(100, 12, 120, 0.11)');
    });

    QUnit.test('red field arrow up ---> color picker value should be correct', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(100, 200, 120, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $red = $fields.shadowRoot.querySelector('[data-type="r"]');

        $red.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowUp',
        }));

        assert.equal($colorPicker.rgba, 'rgba(101, 200, 120, 0.25)');
    });

    QUnit.test('red field arrow down ---> color picker value should be correct', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(100, 200, 120, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $red = $fields.shadowRoot.querySelector('[data-type="r"]');

        $red.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowDown',
        }));

        assert.equal($colorPicker.rgba, 'rgba(99, 200, 120, 0.25)');
    });

    QUnit.test('green field arrow up ---> color picker value should be correct', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(100, 150, 120, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $green = $fields.shadowRoot.querySelector('[data-type="g"]');

        $green.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowUp',
        }));

        assert.equal($colorPicker.rgba, 'rgba(100, 151, 120, 0.25)');
    });

    QUnit.test('green field arrow down ---> color picker value should be correct', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(100, 150, 120, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $green = $fields.shadowRoot.querySelector('[data-type="g"]');

        $green.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowDown',
        }));

        assert.equal($colorPicker.rgba, 'rgba(100, 149, 120, 0.25)');
    });

    QUnit.test('blue field arrow up ---> color picker value should be correct', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(100, 12, 120, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $blue = $fields.shadowRoot.querySelector('[data-type="b"]');

        $blue.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowUp',
        }));

        assert.equal($colorPicker.rgba, 'rgba(100, 12, 121, 0.25)');
    });

    QUnit.test('blue field arrow down ---> color picker value should be correct', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(100, 12, 120, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $blue = $fields.shadowRoot.querySelector('[data-type="b"]');

        $blue.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowDown',
        }));

        assert.equal($colorPicker.rgba, 'rgba(100, 12, 119, 0.25)');
    });

    QUnit.test('alpha field arrow up ---> color picker value should be correct', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(100, 12, 120, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $alpha = $fields.shadowRoot.querySelector('[data-type="a"]');

        $alpha.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowUp',
        }));

        assert.equal($colorPicker.rgba, 'rgba(100, 12, 120, 0.26)');
    });

    QUnit.test('alpha field arrow down ---> color picker value should be correct', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(100, 12, 120, 0.25)'
        $colorPicker.opened = true;

        const $popup = $colorPicker.shadowRoot.querySelector('toolcool-color-picker-popup');
        const $fields = $popup.shadowRoot.querySelector('toolcool-color-picker-fields');
        const $alpha = $fields.shadowRoot.querySelector('[data-type="a"]');

        $alpha.dispatchEvent(new KeyboardEvent('keydown', {
            view: window,
            bubbles: true,
            cancelable: true,
            key: 'ArrowDown',
        }));

        assert.equal($colorPicker.rgba, 'rgba(100, 12, 120, 0.24)');
    });
});
