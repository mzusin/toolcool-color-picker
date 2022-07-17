import ColorPicker from './app/color-picker';

// register web components
if(!customElements.get('toolcool-color-picker')){
    customElements.define('toolcool-color-picker', ColorPicker);
}
