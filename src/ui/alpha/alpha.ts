// @ts-ignore: esbuild custom loader
import styles from './alpha.pcss';
import { CUSTOM_EVENT_COLOR_ALPHA_CHANGED, CUSTOM_EVENT_COLOR_HSV_CHANGED, CUSTOM_EVENT_COLOR_HUE_CHANGED, sendAlphaCustomEvent } from '../../domain/events-provider';
import { getAlphaColorBackground, parseColor } from '../../domain/color-provider';
import { TinyColor } from '@ctrl/tinycolor';

/*
 Usage:
 ------
 <toolcool-color-picker-alpha color="#000" cid="..."></toolcool-color-picker-alpha>
 */
class Alpha extends HTMLElement {
  static get observedAttributes() {
    return ['color'];
  }

  // this id attribute is used for custom events
  private cid: string;

  private $alpha: HTMLElement | null;
  private $color: HTMLElement | null;
  private $pointer: HTMLElement | null;

  private alpha = 1; // [0, 1]
  private hue = 0; // [0, 360]
  private saturation = 0; // [0, 1]
  private value = 0; // [0, 1]

  constructor() {
    super();

    this.attachShadow({
      mode: 'open', // 'closed', 'open',
    });

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

    this.hsvChanged = this.hsvChanged.bind(this);
    this.hueChanged = this.hueChanged.bind(this);
    this.alphaChanged = this.alphaChanged.bind(this);
  }

  render(sendEvent = true) {
    if (this.$pointer) {
      this.$pointer.style.left = `${this.alpha * 100}%`;
    }

    if (this.$color) {
      const color = new TinyColor({
        h: this.hue,
        s: this.saturation,
        v: this.value,
        a: this.alpha,
      });

      this.$color.style.background = getAlphaColorBackground(color);
    }

    if (sendEvent) {
      sendAlphaCustomEvent(this.cid, this.alpha);
    }
  }

  // we need to handle both MouseEvent and TouchEvent --->
  // eslint-disable-next-line
  onChange(evt: any) {
    if (!this.$alpha) return;

    if (evt.preventDefault) {
      evt.preventDefault();
    }

    const { width: boxWidth, left: boxLeft } = this.$alpha.getBoundingClientRect();
    if (boxWidth === 0) return;

    const mouseX = typeof evt.clientX === 'number' ? evt.clientX : evt.touches[0].clientX;

    const left = Math.min(Math.max(0, mouseX - boxLeft), boxWidth);
    const percent = Math.min(Math.max(0, (left * 100) / boxWidth), 100);

    this.alpha = percent / 100;
    this.render();
  }

  onKeyDown(evt: KeyboardEvent) {
    this.$pointer?.focus();

    switch (evt.key) {
      case 'ArrowLeft': {
        let percent = this.alpha * 100;
        percent = Math.max(0, percent - 1);
        this.alpha = percent / 100;
        this.render();
        break;
      }

      case 'ArrowRight': {
        let percent = this.alpha * 100;
        percent = Math.min(100, percent + 1);
        this.alpha = percent / 100;
        this.render();
        break;
      }
    }
  }

  hsvChanged(evt: CustomEvent) {
    if (!evt || !evt.detail || !evt.detail.cid) return;

    // handle only current instance
    if (evt.detail.cid !== this.cid) return;

    this.saturation = evt.detail.h;
    this.hue = evt.detail.s;
    this.value = evt.detail.v;

    this.render(false);
  }

  hueChanged(evt: CustomEvent) {
    if (!evt || !evt.detail || !evt.detail.cid) return;

    // handle only current instance
    if (evt.detail.cid !== this.cid) return;

    this.hue = evt.detail.h;

    this.render(false);
  }

  alphaChanged(evt: CustomEvent) {
    if (!evt || !evt.detail || !evt.detail.cid) return;

    // handle only current instance
    if (evt.detail.cid !== this.cid) return;

    if (this.alpha !== evt.detail.a) {
      this.alpha = evt.detail.a;
      this.render();
    }
  }

  onMouseDown(evt: MouseEvent) {
    if (evt.preventDefault) {
      evt.preventDefault();
    }

    this.onChange(evt);

    window.addEventListener('mousemove', this.onChange);
    window.addEventListener('mouseup', this.onMouseUp);

    window.setTimeout(() => {
      this.$pointer?.focus();
    }, 0);
  }

  onMouseUp() {
    window.removeEventListener('mousemove', this.onChange);
    window.removeEventListener('mouseup', this.onChange);
  }

  /**
   * when the custom element connected to DOM
   */
  connectedCallback() {
    if (!this.shadowRoot) return;

    this.cid = this.getAttribute('cid') || '';

    const color = parseColor(this.getAttribute('color'));
    const hsv = color.toHsv();

    this.alpha = hsv.a;
    this.hue = hsv.h;
    this.saturation = hsv.s;
    this.value = hsv.v;

    this.shadowRoot.innerHTML = `
           <style>${styles}</style>
           <div class="alpha">
                <div class="box">
                    <div class="transparent-bg box"></div>
                    <div class="color-bg box" style="background: ${getAlphaColorBackground(color)}"></div>
                    
                    <div class="pointer box">
                        <div class="pointer-box" tabindex="0" style="left: ${this.alpha * 100}%;" >
                            <div class="handler"></div>
                        </div>
                    </div>
                </div>
           </div>
        `;

    this.$alpha = this.shadowRoot.querySelector('.alpha');
    this.$color = this.shadowRoot.querySelector('.color-bg');
    this.$pointer = this.shadowRoot.querySelector('.pointer-box');

    this.$alpha?.addEventListener('mousedown', this.onMouseDown);
    this.$alpha?.addEventListener('mouseup', this.onMouseUp);
    this.$alpha?.addEventListener('touchmove', this.onChange);
    this.$alpha?.addEventListener('touchstart', this.onChange);
    this.$pointer?.addEventListener('keydown', this.onKeyDown);

    document.addEventListener(CUSTOM_EVENT_COLOR_HSV_CHANGED, this.hsvChanged);
    document.addEventListener(CUSTOM_EVENT_COLOR_HUE_CHANGED, this.hueChanged);
    document.addEventListener(CUSTOM_EVENT_COLOR_ALPHA_CHANGED, this.alphaChanged);
  }

  /**
   * when the custom element disconnected from DOM
   */
  disconnectedCallback() {
    this.$alpha?.removeEventListener('mousedown', this.onMouseDown);
    this.$alpha?.removeEventListener('mouseup', this.onMouseUp);
    this.$alpha?.removeEventListener('touchmove', this.onChange);
    this.$alpha?.removeEventListener('touchstart', this.onChange);
    this.$pointer?.removeEventListener('keydown', this.onKeyDown);

    document.removeEventListener(CUSTOM_EVENT_COLOR_HSV_CHANGED, this.hsvChanged);
    document.removeEventListener(CUSTOM_EVENT_COLOR_HUE_CHANGED, this.hueChanged);
    document.removeEventListener(CUSTOM_EVENT_COLOR_ALPHA_CHANGED, this.alphaChanged);
  }

  /**
   * when attributes change
   */
  attributeChangedCallback(_attrName: string, _oldVal: string, newVal: string) {
    const color = parseColor(newVal);
    const hsv = color.toHsv();

    this.alpha = hsv.a;
    this.hue = hsv.h;
    this.saturation = hsv.s;
    this.value = hsv.v;

    this.render();
  }
}

export default Alpha;
