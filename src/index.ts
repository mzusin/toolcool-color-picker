import ColorPicker from './app/color-picker';

/**
 Usage:
 ----------------------
 const $colorPicker = document.querySelector('toolcool-color-picker') as ColorPicker;

 $colorPicker.addEventListener('change', (evt: CustomEvent) => {
    console.log(evt.detail.color);
 });

 $colorPicker.color = 'red';
 console.log($colorPicker.rgba);
 */

// register web components
if(!customElements.get('toolcool-color-picker')){
    customElements.define('toolcool-color-picker', ColorPicker);
}

