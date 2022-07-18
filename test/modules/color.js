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
        assert.equal($colorPicker.hsla, 'hsla(0, 100%, 50%, 1)');
    });

    QUnit.test('red hsv should be hsv(0, 100%, 100%)', (assert) => {
        const $colorPicker = document.querySelector('#red');
        assert.equal($colorPicker.hsv, 'hsv(0, 100%, 100%)');
    });

    QUnit.test('red hsva should be hsva(0%, 100%, 100%, 1)', (assert) => {
        const $colorPicker = document.querySelector('#red');
        assert.equal($colorPicker.hsva, 'hsva(0, 100%, 100%, 1)');
    });

    QUnit.test('#367E95 hsl color should be hsl(195, 47%, 40%)', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#367E95';
        assert.equal($colorPicker.hsl, 'hsl(195, 47%, 40%)');
    });

    QUnit.test('#367E95 hsla color should be hsla(195, 47%, 40%)', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#367E95';
        assert.equal($colorPicker.hsla, 'hsla(195, 47%, 40%, 1)');
    });

    QUnit.test('#367E95 hsla color should be hsla(195, 47%, 40%)', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(100, 12, 18, 0.21)';
        assert.equal($colorPicker.hsla, 'hsla(356, 79%, 22%, 0.21)');
    });

    QUnit.test('#367E95 hsl color should be hsv(195, 64%, 58%)', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#367E95';
        assert.equal($colorPicker.hsv, 'hsv(195, 64%, 58%)');
    });

    QUnit.test('#367E95 hsla color should be hsva(195, 64%, 58%, 1)', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = '#367E95';
        assert.equal($colorPicker.hsva, 'hsva(195, 64%, 58%, 1)');
    });

    QUnit.test('#367E95 hsla color should be hsva(356, 88%, 39%, 0.21)', (assert) => {
        const $colorPicker = document.querySelector('#red');
        $colorPicker.color = 'rgba(100, 12, 18, 0.21)';
        assert.equal($colorPicker.hsva, 'hsva(356, 88%, 39%, 0.21)');
    });

    QUnit.test('listen to color change event - hex', (assert) => {
        const $colorPicker = document.querySelector('#red');

        const done = assert.async();

        $colorPicker.addEventListener('change', (evt) => {

            assert.equal(evt.detail.hex, '#EF77AA');
            done();
        });

        $colorPicker.color = '#ef77aa';
    });

    QUnit.test('listen to color change event - hex8', (assert) => {
        const $colorPicker = document.querySelector('#red');

        const done = assert.async();

        $colorPicker.addEventListener('change', (evt) => {

            assert.equal(evt.detail.hex8, '#0038FF80');
            done();
        });

        $colorPicker.color = 'rgba(0, 56, 255, 0.5)';
    });

    QUnit.test('listen to color change event - rgb', (assert) => {
        const $colorPicker = document.querySelector('#red');

        const done = assert.async();

        $colorPicker.addEventListener('change', (evt) => {

            assert.equal(evt.detail.rgb, 'rgb(255, 255, 255)');
            done();
        });

        $colorPicker.color = '#ffffff';
    });

    QUnit.test('listen to color change event - rgba', (assert) => {
        const $colorPicker = document.querySelector('#red');

        const done = assert.async();

        $colorPicker.addEventListener('change', (evt) => {

            assert.equal(evt.detail.rgba, 'rgba(0, 56, 255, 0.5)');
            done();
        });

        $colorPicker.color = '#0038FF80';
    });

    QUnit.test('listen to color change event - hsl', (assert) => {
        const $colorPicker = document.querySelector('#red');

        const done = assert.async();

        $colorPicker.addEventListener('change', (evt) => {

            assert.equal(evt.detail.hsl, 'hsl(50, 100%, 80%)');
            done();
        });

        $colorPicker.color = '#ffee99';
    });

    QUnit.test('listen to color change event - hsla', (assert) => {
        const $colorPicker = document.querySelector('#red');

        const done = assert.async();

        $colorPicker.addEventListener('change', (evt) => {

            assert.equal(evt.detail.hsl, 'hsla(227, 100%, 50%, 0.5)');
            done();
        });

        $colorPicker.color = 'rgba(0, 56, 255, 0.5)';
    });

    QUnit.test('listen to color change event - hsv', (assert) => {
        const $colorPicker = document.querySelector('#red');

        const done = assert.async();

        $colorPicker.addEventListener('change', (evt) => {

            assert.equal(evt.detail.hsv, 'hsv(50, 40%, 100%)');
            done();
        });

        $colorPicker.color = '#ffee99';
    });

    QUnit.test('listen to color change event - hsla', (assert) => {
        const $colorPicker = document.querySelector('#red');

        const done = assert.async();

        $colorPicker.addEventListener('change', (evt) => {

            assert.equal(evt.detail.hsva, 'hsva(227, 100%, 100%, 0.5)');
            done();
        });

        $colorPicker.color = 'rgba(0, 56, 255, 0.5)';
    });
});