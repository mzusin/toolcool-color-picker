// @ts-ignore: esbuild custom loader
import styles from './fields.pcss';
import { CUSTOM_EVENT_COLOR_ALPHA_CHANGED, CUSTOM_EVENT_COLOR_HSV_CHANGED, CUSTOM_EVENT_COLOR_HUE_CHANGED, sendAlphaCustomEvent, sendHsvCustomEvent } from '../../domain/events-provider';
import { TinyColor } from '@ctrl/tinycolor';
import { castShowAlphaAttribute } from '../../domain/attribute-provider';
import { fixPercent, fixRGB, parseColor } from '../../domain/color-provider';
import { getUniqueId } from '../../domain/common-provider';

/*
 Usage:
 ------
 <toolcool-color-picker-fields color="#000" cid="..."></toolcool-color-picker-fields>
 */
class Fields extends HTMLElement {
  // this id attribute is used for custom events
  private cid: string;
  private color: TinyColor = new TinyColor('#000');
  private alphaControlVisible = true;

  private $hex: HTMLInputElement;
  private $r: HTMLInputElement;
  private $g: HTMLInputElement;
  private $b: HTMLInputElement;
  private $a: HTMLInputElement;
  private $aLabel: HTMLLabelElement;

  private hex = '';
  private r = 0;
  private g = 0;
  private b = 0;
  private a = 1;

  static get observedAttributes() {
    return ['color', 'show-alpha'];
  }

  constructor() {
    super();

    this.attachShadow({
      mode: 'open', // 'closed', 'open',
    });

    this.hsvChanged = this.hsvChanged.bind(this);
    this.hueChanged = this.hueChanged.bind(this);
    this.alphaChanged = this.alphaChanged.bind(this);

    this.onHexChange = this.onHexChange.bind(this);
    this.render = this.render.bind(this);
    this.onRedChange = this.onRedChange.bind(this);
    this.onGreenChange = this.onGreenChange.bind(this);
    this.onBlueChange = this.onBlueChange.bind(this);
    this.onAlphaChange = this.onAlphaChange.bind(this);
    this.onRedKeyDown = this.onRedKeyDown.bind(this);
    this.onBlueKeyDown = this.onBlueKeyDown.bind(this);
    this.onGreenKeyDown = this.onGreenKeyDown.bind(this);
    this.onAlphaKeyDown = this.onAlphaKeyDown.bind(this);
  }

  hueChanged(evt: CustomEvent) {
    if (!evt || !evt.detail || !evt.detail.cid) return;

    // handle only current instance
    if (evt.detail.cid !== this.cid) return;

    const hsv = this.color.toHsv();

    this.color = new TinyColor({
      h: Number(evt.detail.h),
      s: hsv.s,
      v: hsv.v,
      a: hsv.a,
    });

    this.render();
  }

  alphaChanged(evt: CustomEvent) {
    if (!evt || !evt.detail || !evt.detail.cid) return;

    // handle only current instance
    if (evt.detail.cid !== this.cid) return;

    const rgba = this.color.toRgb();
    rgba.a = evt.detail.a;

    this.color = new TinyColor(rgba);
    this.render();
  }

  hsvChanged(evt: CustomEvent) {
    if (!evt || !evt.detail || !evt.detail.cid) return;

    // handle only current instance
    if (evt.detail.cid !== this.cid) return;

    this.color = new TinyColor({
      h: evt.detail.h,
      s: evt.detail.s,
      v: evt.detail.v,
      a: this.color.toHsv().a,
    });

    this.render();
  }

  render() {
    const rgba = this.color.toRgb();
    this.r = rgba.r;
    this.g = rgba.g;
    this.b = rgba.b;
    this.a = rgba.a;
    this.hex = this.color.toHex();

    if (this.$hex && this.shadowRoot?.activeElement !== this.$hex) {
      this.$hex.value = this.hex.toUpperCase();
    }

    if (this.$r && this.shadowRoot?.activeElement !== this.$r) {
      this.$r.value = this.r.toString();
    }

    if (this.$g && this.shadowRoot?.activeElement !== this.$g) {
      this.$g.value = this.g.toString();
    }

    if (this.$b && this.shadowRoot?.activeElement !== this.$b) {
      this.$b.value = this.b.toString();
    }

    if (this.$a && this.shadowRoot?.activeElement !== this.$a) {
      this.$a.value = Math.round(this.a * 100).toString();
    }
  }

  onFieldKeyDown(evt: KeyboardEvent, type: string) {
    const rgba = this.color.toRgb();

    switch (evt.key) {
      case 'ArrowUp': {
        if (type === 'r') {
          this.r = Math.min(255, rgba.r + 1);
          rgba.r = this.r;
          const hsv = new TinyColor(rgba).toHsv();
          sendHsvCustomEvent(this.cid, hsv.h, hsv.s, hsv.v);
          this.$r.value = this.r.toString();
          this.render();
        }
        if (type === 'g') {
          this.g = Math.min(255, rgba.g + 1);
          rgba.g = this.g;

          const hsv = new TinyColor(rgba).toHsv();
          sendHsvCustomEvent(this.cid, hsv.h, hsv.s, hsv.v);
          this.$g.value = this.g.toString();
          this.render();
        }
        if (type === 'b') {
          this.b = Math.min(255, rgba.b + 1);
          rgba.b = this.b;
          const hsv = new TinyColor(rgba).toHsv();
          sendHsvCustomEvent(this.cid, hsv.h, hsv.s, hsv.v);
          this.$b.value = this.b.toString();
          this.render();
        }
        if (type === 'a') {
          this.a = Math.max(0, Math.min(this.a + 0.01, 1));
          this.$a.value = Math.round(this.a * 100).toString();

          const rgba = this.color.toRgb();
          rgba.a = this.a;
          this.color = new TinyColor(rgba);

          this.render();
          sendAlphaCustomEvent(this.cid, this.a);
        }
        break;
      }
      case 'ArrowDown': {
        if (type === 'r') {
          this.r = Math.max(0, rgba.r - 1);
          rgba.r = this.r;
          const hsv = new TinyColor(rgba).toHsv();
          sendHsvCustomEvent(this.cid, hsv.h, hsv.s, hsv.v);
          this.$r.value = this.r.toString();
          this.render();
        }
        if (type === 'g') {
          this.g = Math.max(0, rgba.g - 1);
          rgba.g = this.g;

          const hsv = new TinyColor(rgba).toHsv();
          sendHsvCustomEvent(this.cid, hsv.h, hsv.s, hsv.v);
          this.$g.value = this.g.toString();
          this.render();
        }
        if (type === 'b') {
          this.b = Math.max(0, rgba.b - 1);
          rgba.b = this.b;
          const hsv = new TinyColor(rgba).toHsv();
          sendHsvCustomEvent(this.cid, hsv.h, hsv.s, hsv.v);
          this.$b.value = this.b.toString();
          this.render();
        }
        if (type === 'a') {
          this.a = Math.max(0, this.a - 0.01);
          this.$a.value = Math.round(this.a * 100).toString();

          const rgba = this.color.toRgb();
          rgba.a = this.a;
          this.color = new TinyColor(rgba);

          this.render();
          sendAlphaCustomEvent(this.cid, this.a);
        }
        break;
      }
      case 'Escape': {
        if (this.shadowRoot?.activeElement) {
          const $el = this.shadowRoot.activeElement as HTMLElement;
          $el.blur();
        }

        this.render();
        break;
      }
      case 'Enter': {
        if (this.shadowRoot?.activeElement) {
          const $el = this.shadowRoot.activeElement as HTMLElement;
          $el.blur();
        }

        this.render();
        break;
      }
    }
  }

  onRedKeyDown(evt: KeyboardEvent) {
    this.onFieldKeyDown(evt, 'r');
  }

  onGreenKeyDown(evt: KeyboardEvent) {
    this.onFieldKeyDown(evt, 'g');
  }

  onBlueKeyDown(evt: KeyboardEvent) {
    this.onFieldKeyDown(evt, 'b');
  }

  onAlphaKeyDown(evt: KeyboardEvent) {
    this.onFieldKeyDown(evt, 'a');
  }

  onHexChange(evt: Event) {
    const $target = evt.target as HTMLInputElement;
    if ($target.value.length !== 6) return;

    const updatedColor = new TinyColor(`#${$target.value}`);

    if (updatedColor.isValid) {
      this.color = updatedColor;

      const hsv = this.color.toHsv();

      // update outer color to change the button, and
      // send the updated color to the user
      sendHsvCustomEvent(this.cid, hsv.h, hsv.s, hsv.v);
    }
  }

  onRedChange(evt: Event) {
    const $target = evt.target as HTMLInputElement;
    const fixedValue = fixRGB($target.value);

    if (fixedValue.toString() === $target.value) {
      const rgba = this.color.toRgb();
      rgba.r = fixedValue;
      const hsv = new TinyColor(rgba).toHsv();

      // update outer color to change the button, and
      // send the updated color to the user
      sendHsvCustomEvent(this.cid, hsv.h, hsv.s, hsv.v);
    }
  }

  onGreenChange(evt: Event) {
    const $target = evt.target as HTMLInputElement;
    const fixedValue = fixRGB($target.value);

    if (fixedValue.toString() === $target.value) {
      const rgba = this.color.toRgb();
      rgba.g = fixedValue;
      const hsv = new TinyColor(rgba).toHsv();

      // update outer color to change the button, and
      // send the updated color to the user
      sendHsvCustomEvent(this.cid, hsv.h, hsv.s, hsv.v);
    }
  }

  onBlueChange(evt: Event) {
    const $target = evt.target as HTMLInputElement;
    const fixedValue = fixRGB($target.value);

    if (fixedValue.toString() === $target.value) {
      const rgba = this.color.toRgb();
      rgba.b = fixedValue;
      const hsv = new TinyColor(rgba).toHsv();

      // update outer color to change the button, and
      // send the updated color to the user
      sendHsvCustomEvent(this.cid, hsv.h, hsv.s, hsv.v);
    }
  }

  onAlphaChange(evt: Event) {
    const $target = evt.target as HTMLInputElement;
    const fixedValue = fixPercent($target.value);

    if (fixedValue.toString() === $target.value) {
      sendAlphaCustomEvent(this.cid, fixedValue / 100);
    }
  }

  onAlphaControlVisibilityChange() {
    if (this.$a) {
      this.$a.style.visibility = this.alphaControlVisible ? 'visible' : 'hidden';
    }

    if (this.$aLabel) {
      this.$aLabel.style.visibility = this.alphaControlVisible ? 'visible' : 'hidden';
    }
  }

  /**
   * when the custom element connected to DOM
   */
  connectedCallback() {
    if (!this.shadowRoot) return;

    this.cid = this.getAttribute('cid') || '';
    this.color = parseColor(this.getAttribute('color'));
    this.alphaControlVisible = castShowAlphaAttribute(this.getAttribute('show-alpha'));

    const rgba = this.color.toRgb();
    this.r = rgba.r;
    this.g = rgba.g;
    this.b = rgba.b;
    this.a = rgba.a;
    this.hex = this.color.toHex();

    const hexId = getUniqueId();
    const rId = getUniqueId();
    const gId = getUniqueId();
    const bId = getUniqueId();
    const aId = getUniqueId();

    this.shadowRoot.innerHTML = `
           <style>${styles}</style>
           <div class="fields">
               <input id="hex-${hexId}" type="text" value="${this.hex.toUpperCase()}" data-type="hex" />
               <input id="r-${rId}" type="text" value="${this.r}" data-type="r" />
               <input id="g-${gId}" type="text" value="${this.g}" data-type="g" />
               <input id="b-${bId}" type="text" value="${this.b}" data-type="b" />
               <input id="a-${aId}" type="text" value="${Math.round(this.a * 100)}" data-type="a" />

               <label for="hex-${hexId}">Hex</label>
               <label for="r-${rId}">R</label>
               <label for="g-${gId}">G</label>
               <label for="b-${bId}">B</label>
               <label id="a-label-${aId}" for="a-${aId}">A</label>
           </div>
        `;

    this.$hex = this.shadowRoot.getElementById(`hex-${hexId}`) as HTMLInputElement;
    this.$r = this.shadowRoot.getElementById(`r-${rId}`) as HTMLInputElement;
    this.$g = this.shadowRoot.getElementById(`g-${gId}`) as HTMLInputElement;
    this.$b = this.shadowRoot.getElementById(`b-${bId}`) as HTMLInputElement;
    this.$a = this.shadowRoot.getElementById(`a-${aId}`) as HTMLInputElement;
    this.$aLabel = this.shadowRoot.getElementById(`a-label-${aId}`) as HTMLLabelElement;

    this.onAlphaControlVisibilityChange();

    // custom event from other parts of the app
    document.addEventListener(CUSTOM_EVENT_COLOR_HSV_CHANGED, this.hsvChanged);
    document.addEventListener(CUSTOM_EVENT_COLOR_HUE_CHANGED, this.hueChanged);
    document.addEventListener(CUSTOM_EVENT_COLOR_ALPHA_CHANGED, this.alphaChanged);

    this.$hex.addEventListener('input', this.onHexChange);
    this.$r.addEventListener('input', this.onRedChange);
    this.$g.addEventListener('input', this.onGreenChange);
    this.$b.addEventListener('input', this.onBlueChange);
    this.$a.addEventListener('input', this.onAlphaChange);

    this.$hex.addEventListener('blur', this.render);
    this.$r.addEventListener('blur', this.render);
    this.$g.addEventListener('blur', this.render);
    this.$b.addEventListener('blur', this.render);
    this.$a.addEventListener('blur', this.render);

    this.$r.addEventListener('keydown', this.onRedKeyDown);
    this.$g.addEventListener('keydown', this.onGreenKeyDown);
    this.$b.addEventListener('keydown', this.onBlueKeyDown);
    this.$a.addEventListener('keydown', this.onAlphaKeyDown);
  }

  /**
   * when the custom element disconnected from DOM
   */
  disconnectedCallback() {
    document.removeEventListener(CUSTOM_EVENT_COLOR_HSV_CHANGED, this.hsvChanged);
    document.removeEventListener(CUSTOM_EVENT_COLOR_HUE_CHANGED, this.hueChanged);
    document.removeEventListener(CUSTOM_EVENT_COLOR_ALPHA_CHANGED, this.alphaChanged);

    this.$hex.removeEventListener('input', this.onHexChange);
    this.$r.removeEventListener('input', this.onRedChange);
    this.$g.removeEventListener('input', this.onGreenChange);
    this.$b.removeEventListener('input', this.onBlueChange);
    this.$a.removeEventListener('input', this.onAlphaChange);

    this.$hex.removeEventListener('blur', this.render);
    this.$r.removeEventListener('blur', this.render);
    this.$g.removeEventListener('blur', this.render);
    this.$b.removeEventListener('blur', this.render);
    this.$a.removeEventListener('blur', this.render);

    this.$r.removeEventListener('keydown', this.onRedKeyDown);
    this.$g.removeEventListener('keydown', this.onGreenKeyDown);
    this.$b.removeEventListener('keydown', this.onBlueKeyDown);
    this.$a.removeEventListener('keydown', this.onAlphaKeyDown);
  }

  /**
   * when attributes change
   */
  attributeChangedCallback(attrName: string, _oldVal: string, newVal: string) {
    if (attrName === 'color') {
      this.color = parseColor(newVal);
      this.render();
    }

    if (attrName === 'show-alpha') {
      this.alphaControlVisible = castShowAlphaAttribute(newVal);
      this.onAlphaControlVisibilityChange();
    }
  }
}

export default Fields;
