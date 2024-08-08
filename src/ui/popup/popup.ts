// @ts-ignore: esbuild custom loader
import styles from './popup.pcss';
import Saturation from '../saturation/saturation';
import Hue from '../hue/hue';
import Alpha from '../alpha/alpha';
import Fields from '../fields/fields';
import { castShowAlphaAttribute } from '../../domain/attribute-provider';

/*
 Usage:
 ------
 <toolcool-color-picker-popup color="#000" cid="..." popup-position="left"></toolcool-color-picker-popup>
 */
class ColorPickerPopup extends HTMLElement {
  // this id attribute is used for custom events
  private readonly cid: string;
  private popupPosition = 'left';
  private alphaControlVisible = true;

  private $popup: HTMLElement | null;
  private color = '#000';

  static get observedAttributes() {
    return ['color', 'popup-position', 'show-alpha'];
  }

  constructor() {
    super();

    // register web components
    if (!customElements.get('toolcool-color-picker-saturation')) {
      customElements.define('toolcool-color-picker-saturation', Saturation);
    }

    if (!customElements.get('toolcool-color-picker-hue')) {
      customElements.define('toolcool-color-picker-hue', Hue);
    }

    if (!customElements.get('toolcool-color-picker-alpha')) {
      customElements.define('toolcool-color-picker-alpha', Alpha);
    }

    if (!customElements.get('toolcool-color-picker-fields')) {
      customElements.define('toolcool-color-picker-fields', Fields);
    }

    this.cid = this.getAttribute('cid') || '';
    this.prevent = this.prevent.bind(this);

    this.attachShadow({
      mode: 'open', // 'closed', 'open',
    });
  }

  prevent(evt: MouseEvent) {
    evt.stopPropagation();
  }

  onAlphaControlVisibilityChange() {
    const $alpha = this.shadowRoot?.querySelector('toolcool-color-picker-alpha') as HTMLElement|null;
    const $fields = this.shadowRoot?.querySelector('toolcool-color-picker-fields');

    if ($alpha) {
      $alpha.style.display = this.alphaControlVisible ? 'block' : 'none';
    }

    if ($fields) {
      $fields.setAttribute('show-alpha', String(this.alphaControlVisible));
    }
  }

  /**
   * when the custom element connected to DOM
   */
  connectedCallback() {
    if (!this.shadowRoot) return;

    this.color = this.getAttribute('color') || '#000';
    this.popupPosition = this.getAttribute('popup-position') || 'left';
    this.alphaControlVisible = castShowAlphaAttribute(this.getAttribute('show-alpha'));

    this.shadowRoot.innerHTML = `
           <style>${styles}</style>
           <div class="popup">
                <toolcool-color-picker-saturation color="${this.color}" cid="${this.cid}"></toolcool-color-picker-saturation>
                <toolcool-color-picker-hue color="${this.color}" cid="${this.cid}"></toolcool-color-picker-hue>
                <toolcool-color-picker-alpha color="${this.color}" cid="${this.cid}"></toolcool-color-picker-alpha>
                <toolcool-color-picker-fields color="${this.color}" cid="${this.cid}" show-alpha="${this.alphaControlVisible}"></toolcool-color-picker-fields>
           </div>
        `;

    this.$popup = this.shadowRoot.querySelector('.popup');
    this.$popup?.addEventListener('mousedown', this.prevent); // disable 'click outside' feature inside the popup
    this.$popup?.classList.toggle('right', this.popupPosition === 'right');

    this.onAlphaControlVisibilityChange();
  }

  /**
   * when the custom element disconnected from DOM
   */
  disconnectedCallback() {
    this.$popup?.removeEventListener('mousedown', this.prevent);
  }

  /**
   * when attributes change
   */
  attributeChangedCallback(attrName: string, _oldVal: string, newVal: string) {
    if (attrName === 'popup-position') {
      this.popupPosition = newVal;

      if (this.$popup) {
        this.$popup.classList.toggle('right', this.popupPosition === 'right');
      }
    }

    if (attrName === 'color') {
      this.color = newVal;

      const $saturation = this.shadowRoot?.querySelector('toolcool-color-picker-saturation');
      const $hue = this.shadowRoot?.querySelector('toolcool-color-picker-hue');
      const $alpha = this.shadowRoot?.querySelector('toolcool-color-picker-alpha');
      const $fields = this.shadowRoot?.querySelector('toolcool-color-picker-fields');

      if ($saturation) {
        $saturation.setAttribute('color', this.color);
      }

      if ($hue) {
        $hue.setAttribute('color', this.color);
      }

      if ($alpha) {
        $alpha.setAttribute('color', this.color);
      }

      if ($fields) {
        $fields.setAttribute('color', this.color);
      }
    }

    if (attrName === 'show-alpha') {
      this.alphaControlVisible = castShowAlphaAttribute(newVal);
      this.onAlphaControlVisibilityChange();
    }
  }
}

export default ColorPickerPopup;
