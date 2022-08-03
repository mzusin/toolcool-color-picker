
QUnit.module('Button', () => {

  QUnit.test('initial button width should be empty string', (assert) => {
    const $colorPicker = document.querySelector('#red');
    const $button = $colorPicker.shadowRoot.querySelector('.button');
    assert.equal($button.style.width, '');
  });

  QUnit.test('initial button height should be empty string', (assert) => {
    const $colorPicker = document.querySelector('#red');
    const $button = $colorPicker.shadowRoot.querySelector('.button');
    assert.equal($button.style.height, '');
  });

  QUnit.test('initial button padding should be empty string', (assert) => {
    const $colorPicker = document.querySelector('#red');
    const $button = $colorPicker.shadowRoot.querySelector('.button');
    assert.equal($button.style.padding, '');
  });

  QUnit.test('button width should be 1rem', (assert) => {
    const $colorPicker = document.querySelector('#btn-size-1');
    const $button = $colorPicker.shadowRoot.querySelector('.button');
    assert.equal($button.style.width, '1rem');
  });

  QUnit.test('button height should be 0.5rem', (assert) => {
    const $colorPicker = document.querySelector('#btn-size-2');
    const $button = $colorPicker.shadowRoot.querySelector('.button');
    assert.equal($button.style.height, '0.5rem');
  });

  QUnit.test('button padding should be 5px', (assert) => {
    const $colorPicker = document.querySelector('#btn-size-3');
    const $button = $colorPicker.shadowRoot.querySelector('.button');
    assert.equal($button.style.padding, '5px');
  });

  QUnit.test('update button width ---> it should be lg', (assert) => {
    const $colorPicker = document.querySelector('#red');
    $colorPicker.setAttribute('button-width', 'lg');
    const $button = $colorPicker.shadowRoot.querySelector('.button');
    assert.equal($button.style.width, '1.5rem');
  });

  QUnit.test('update button height ---> it should be lg', (assert) => {
    const $colorPicker = document.querySelector('#red');
    $colorPicker.setAttribute('button-height', 'lg');
    const $button = $colorPicker.shadowRoot.querySelector('.button');
    assert.equal($button.style.height, '1.5rem');
  });

  QUnit.test('update button padding ---> it should be 2px', (assert) => {
    const $colorPicker = document.querySelector('#red');
    $colorPicker.setAttribute('button-padding', '2px');
    const $button = $colorPicker.shadowRoot.querySelector('.button');
    assert.equal($button.style.padding, '2px');
  });

  QUnit.test('sm ---> 0.875rem', (assert) => {
    const $colorPicker = document.querySelector('#red');
    $colorPicker.setAttribute('button-width', 'sm');
    const $button = $colorPicker.shadowRoot.querySelector('.button');
    assert.equal($button.style.width, '0.875rem');
  });

  QUnit.test('md ---> 1.2rem', (assert) => {
    const $colorPicker = document.querySelector('#red');
    $colorPicker.setAttribute('button-width', 'md');
    const $button = $colorPicker.shadowRoot.querySelector('.button');
    assert.equal($button.style.width, '1.2rem');
  });

  QUnit.test('xl ---> 2.25rem', (assert) => {
    const $colorPicker = document.querySelector('#red');
    $colorPicker.setAttribute('button-width', 'xl');
    const $button = $colorPicker.shadowRoot.querySelector('.button');
    assert.equal($button.style.width, '2.25rem');
  });

  QUnit.test('2xl ---> 3rem', (assert) => {
    const $colorPicker = document.querySelector('#red');
    $colorPicker.setAttribute('button-width', '2xl');
    const $button = $colorPicker.shadowRoot.querySelector('.button');
    assert.equal($button.style.width, '3rem');
  });

  QUnit.test('3xl ---> 3.75rem', (assert) => {
    const $colorPicker = document.querySelector('#red');
    $colorPicker.setAttribute('button-width', '3xl');
    const $button = $colorPicker.shadowRoot.querySelector('.button');
    assert.equal($button.style.width, '3.75rem');
  });

  QUnit.test('4xl ---> 4.5rem', (assert) => {
    const $colorPicker = document.querySelector('#red');
    $colorPicker.setAttribute('button-width', '4xl');
    const $button = $colorPicker.shadowRoot.querySelector('.button');
    assert.equal($button.style.width, '4.5rem');
  });

  QUnit.test('size in rem', (assert) => {
    const $colorPicker = document.querySelector('#red');
    $colorPicker.setAttribute('button-width', '5rem');
    const $button = $colorPicker.shadowRoot.querySelector('.button');
    assert.equal($button.style.width, '5rem');
  });

});
