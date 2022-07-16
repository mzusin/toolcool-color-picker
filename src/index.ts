import ColorPicker from './app/color-picker';

// register web components
if(!customElements.get('toolcool-color-picker')){
    customElements.define('toolcool-color-picker', ColorPicker);
}

/*
// TEST - TO REMOVE
const $colorPicker = document.querySelector('toolcool-color-picker') as ColorPicker;

$colorPicker.addEventListener('change', (evt: CustomEvent) => {
    console.log(evt.detail.value);
});

$colorPicker.value = 'red';
console.log($colorPicker.value);

export {}*/