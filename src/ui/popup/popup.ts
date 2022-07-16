// @ts-ignore: esbuild custom loader
import styles from './popup.pcss';
import ColorPickerSaturation from '../saturation/saturation';
import ColorPickerHue from '../hue/hue';
import ColorPickerAlpha from '../alpha/alpha';
import ColorPickerFields from '../fields/fields';
import tinycolor from 'tinycolor2';

/*
 Usage:
 ------
 <toolcool-color-picker-popup color="#000" cid="..."></toolcool-color-picker-popup>
 */
class ColorPickerPopup extends HTMLElement {

    // this id attribute is used for custom events
    private readonly cid: string;

    private $popup: HTMLElement;
    private initialColor: string = '#000';

    constructor() {
        super();

        // register web components
        if(!customElements.get('toolcool-color-picker-saturation')){
            customElements.define('toolcool-color-picker-saturation', ColorPickerSaturation);
        }

        if(!customElements.get('toolcool-color-picker-hue')){
            customElements.define('toolcool-color-picker-hue', ColorPickerHue);
        }

        if(!customElements.get('toolcool-color-picker-alpha')){
            customElements.define('toolcool-color-picker-alpha', ColorPickerAlpha);
        }

        if(!customElements.get('toolcool-color-picker-fields')){
            customElements.define('toolcool-color-picker-fields', ColorPickerFields);
        }

        this.cid = this.getAttribute('cid');
        this.prevent = this.prevent.bind(this);

        this.attachShadow({
            mode: 'open', // 'closed', 'open',
        });
    }

    prevent(evt: MouseEvent) {
        evt.preventDefault();
        evt.stopPropagation();
    }

    /**
     * when the custom element connected to DOM
     */
    connectedCallback(){
        this.initialColor = this.getAttribute('color') || '#000';

        this.shadowRoot.innerHTML = `
           <style>${ styles }</style>
           <div class="color-picker__popup">
                <toolcool-color-picker-saturation color="${ this.initialColor }" cid="${ this.cid }"></toolcool-color-picker-saturation>
                <toolcool-color-picker-hue color="${ this.initialColor }" cid="${ this.cid }"></toolcool-color-picker-hue>
                <toolcool-color-picker-alpha color="${ this.initialColor }" cid="${ this.cid }"></toolcool-color-picker-alpha>
                <toolcool-color-picker-fields color="${ this.initialColor }" cid="${ this.cid }"></toolcool-color-picker-fields>
           </div>
        `;

        this.$popup = this.shadowRoot.querySelector('.color-picker__popup');
        this.$popup.addEventListener('click', this.prevent);
    }

    /**
     * when the custom element disconnected from DOM
     */
    disconnectedCallback(){
        this.$popup.removeEventListener('click', this.prevent);
    }

    /**
     * when attributes change
     */
    attributeChangedCallback(){
        this.initialColor = this.getAttribute('color') || '#000';

        const $saturation = this.shadowRoot.querySelector('toolcool-color-picker-saturation');
        const $hue = this.shadowRoot.querySelector('toolcool-color-picker-hue');
        const $alpha = this.shadowRoot.querySelector('toolcool-color-picker-alpha');
        const $fields = this.shadowRoot.querySelector('toolcool-color-picker-fields');

        if($saturation){
            $saturation.setAttribute('color',  this.initialColor);
        }

        if($hue){
            $hue.setAttribute('color',  this.initialColor);
        }

        if($alpha){
            $alpha.setAttribute('color',  this.initialColor);
        }

        if($fields){
            $fields.setAttribute('color',  this.initialColor);
        }
    }
}

export default ColorPickerPopup;