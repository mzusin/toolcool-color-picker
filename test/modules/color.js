QUnit.module('Color', () => {
    QUnit.test('initial color should be red', (assert) => {
        const $colorPicker = document.querySelector('#red');
        assert.equal($colorPicker.rgba, 'rgba(255, 0, 0, 1)');
    });

    QUnit.test('if initial color is not provided ---> it should be black', (assert) => {
        const $colorPicker = document.querySelector('#black');
        assert.equal($colorPicker.rgba, 'rgba(0, 0, 0, 1)');
    });

    QUnit.test('change color to #282e5c', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#282e5c';
        assert.equal($colorPicker.rgba, 'rgba(40, 46, 92, 1)');
    });

    QUnit.test('change color to rgb(100, 200, 125)', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgb(100, 200, 125)';
        assert.equal($colorPicker.rgba, 'rgba(100, 200, 125, 1)');
    });

    QUnit.test('change color to rgba(100, 200, 125, 0.25)', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(100, 200, 125, 0.25)';
        assert.equal($colorPicker.rgba, 'rgba(100, 200, 125, 0.25)');
    });

    QUnit.test('red hex should be #FF0000', (assert) => {
        const $colorPicker = document.querySelector('#red');
        assert.equal($colorPicker.hex, '#FF0000');
    });

    QUnit.test('rgba(255, 0, 0, 0.5) hex8 should be FF000080', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(255, 0, 0, 0.5)';
        assert.equal($colorPicker.hex8, '#FF000080');
    });

    QUnit.test('red rgb should be rgb(255, 0, 0)', (assert) => {
        const $colorPicker = document.querySelector('#red');
        assert.equal($colorPicker.rgb, 'rgb(255, 0, 0)');
    });

    QUnit.test('red rgba should be rgb(255, 0, 0, 1)', (assert) => {
        const $colorPicker = document.querySelector('#red');
        assert.equal($colorPicker.rgba, 'rgba(255, 0, 0, 1)');
    });

    QUnit.test('red hsl should be hsl(0, 100%, 50%)', (assert) => {
        const $colorPicker = document.querySelector('#red');
        assert.equal($colorPicker.hsl, 'hsl(0, 100%, 50%)');
    });

    QUnit.test('red hsla should be hsla(0, 100%, 50%, 1)', (assert) => {
        const $colorPicker = document.querySelector('#red');
        assert.equal($colorPicker.hsla, 'hsla(0%, 100%, 50%, 1)');
    });

    QUnit.test('red hsv should be hsv(0, 100%, 100%)', (assert) => {
        const $colorPicker = document.querySelector('#red');
        assert.equal($colorPicker.hsv, 'hsv(0, 100%, 100%)');
    });

    QUnit.test('red hsva should be hsva(0%, 100%, 100%, 1)', (assert) => {
        const $colorPicker = document.querySelector('#red');
        assert.equal($colorPicker.hsva, 'hsva(0%, 100%, 100%, 1)');
    });
});