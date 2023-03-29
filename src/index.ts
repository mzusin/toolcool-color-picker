import ColorPicker from './app/color-picker';

/*
 Usage: https://github.com/toolcool-org/toolcool-color-picker
 Demo: https://toolcool.org/toolcool-color-picker/
 */

// register web components
if (!customElements.get('toolcool-color-picker')) {
  customElements.define('toolcool-color-picker', ColorPicker);
}

