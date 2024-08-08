// @ts-ignore: esbuild custom loader
import styles from './styles.pcss';
import ColorPickerPopup from '../ui/popup/popup';
import { castShowAlphaAttribute } from '../domain/attribute-provider';
import { CUSTOM_EVENT_COLOR_HSV_CHANGED, CUSTOM_EVENT_COLOR_HUE_CHANGED, CUSTOM_EVENT_COLOR_ALPHA_CHANGED, CUSTOM_EVENT_BUTTON_CLICKED, sendButtonClickedCustomEvent } from '../domain/events-provider';
import { getUniqueId } from '../domain/common-provider';
import { hslaToString, hsvaToString, parseColor, rgbaToString } from '../domain/color-provider';
import { TinyColor } from '@ctrl/tinycolor'; // https://github.com/scttcper/tinycolor
import { ColorInput } from '@ctrl/tinycolor/dist';

/**
 * predefined button widths
 */
const buttonPredefinedSizes: { [key: string]: string } = {
  sm: '0.875rem',
  md: '1.2rem',
  lg: '1.5rem',
  xl: '2.25rem',
  '2xl': '3rem',
  '3xl': '3.75rem',
  '4xl': '4.5rem',
};

/*
 Usage:
 ------
 <toolcool-color-picker color="#ff0000" popup-position="left"></toolcool-color-picker>
 */
interface IColorPickerState {
  // popup
  isPopupVisible: boolean;
  popupPosition: string;
  isAlphaControlVisible: boolean;

  // color
  initialColor: TinyColor;
  color: TinyColor;

  // button
  buttonWidth?: string | null;
  buttonHeight?: string | null;
  buttonPadding?: string | null;
}

class ColorPicker extends HTMLElement {
  static get observedAttributes() {
    return ['color', 'popup-position', 'show-alpha', 'button-width', 'button-height', 'button-padding'];
  }

  // ----------- APIs ------------------------

  /**
   * set any color that TinyColor accepts
   */
  public set color(userColor: ColorInput) {
    this.state.color = new TinyColor(userColor);
  }

  /**
   * returns TinyColor object
   */
  public get color() {
    return this.state.color;
  }

  /**
   * hex format getter
   */
  public get hex() {
    return this.state.color.toHexString().toUpperCase();
  }

  /**
   * hex with alpha format getter
   */
  public get hex8() {
    return this.state.color.toHex8String().toUpperCase();
  }

  /**
   * rgb format getter
   */
  public get rgb() {
    return this.state.color.toRgbString();
  }

  /**
   * rgba format getter
   */
  public get rgba() {
    return rgbaToString(this.state.color);
  }

  /**
   * hsl format getter
   */
  public get hsl() {
    return this.state.color.toHslString();
  }

  /**
   * hsla format getter
   */
  public get hsla() {
    return hslaToString(this.state.color);
  }

  /**
   * hsv format getter
   */
  public get hsv() {
    return this.state.color.toHsvString();
  }

  /**
   * hsva format getter
   */
  public get hsva() {
    return hsvaToString(this.state.color);
  }

  public get opened() {
    return this.state.isPopupVisible;
  }

  public set opened(isOpened: boolean) {
    this.state.isPopupVisible = isOpened;
  }

  // ------------------------- INIT ----------------

  // this id attribute is used for custom events
  public readonly cid: string;

  private $button: HTMLElement | null;
  private $buttonColor: HTMLElement | null;
  private $popupBox: HTMLElement | null;

  private stateDefaults: IColorPickerState = {
    isPopupVisible: false,
    popupPosition: 'left',
    isAlphaControlVisible: true,
    initialColor: new TinyColor('#000'),
    color: new TinyColor('#000'),
    buttonWidth: null,
    buttonHeight: null,
    buttonPadding: null,
  };
  private state: IColorPickerState;

  constructor() {
    super();

    this.cid = getUniqueId();

    // register web components
    if (!customElements.get('toolcool-color-picker-popup')) {
      customElements.define('toolcool-color-picker-popup', ColorPickerPopup);
    }

    this.attachShadow({
      mode: 'open', // 'closed', 'open',
    });

    this.toggle = this.toggle.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.clickedOutside = this.clickedOutside.bind(this);
    this.stopPropagation = this.stopPropagation.bind(this);

    this.hsvChanged = this.hsvChanged.bind(this);
    this.hueChanged = this.hueChanged.bind(this);
    this.alphaChanged = this.alphaChanged.bind(this);
    this.buttonClicked = this.buttonClicked.bind(this);
    this.formatButtonSize = this.formatButtonSize.bind(this);

    this.initState();
  }

  // --------------------------------------------------

  initState() {
    // eslint-disable-next-line
    const scope = this;
    this.state = new Proxy(scope.stateDefaults, {
      // eslint-disable-next-line
      set(target: IColorPickerState, key: keyof IColorPickerState, value: any, _receiver: any): boolean {
        target[key] = value;

        if (key === 'isPopupVisible') {
          scope.onPopupVisibilityChange();
        }

        if (key === 'popupPosition') {
          scope.onPopupPosChange();
        }

        if (key === 'isAlphaControlVisible') {
          scope.onAlphaControlVisibilityChange();
        }

        if (key === 'initialColor') {
          scope.onInitialColorChange();
        }

        if (key === 'color') {
          scope.onColorChange();
        }

        if (key === 'buttonWidth' || key === 'buttonHeight' || key === 'buttonPadding') {
          scope.setButtonSize();
        }

        return true;
      },
    });
  }

  onPopupVisibilityChange() {
    if (!this.$popupBox) return;
    this.$popupBox.innerHTML = this.state.isPopupVisible
      ? `<toolcool-color-picker-popup
            color="${this.state.color.toRgbString()}"
            cid="${this.cid}"
            popup-position="${this.state.popupPosition}"
            show-alpha="${this.state.isAlphaControlVisible ? 'true' : 'false'}"
         />`
      : '';
  }

  onPopupPosChange() {
    if (!this.$popupBox) return;

    const $popup = this.$popupBox.querySelector('toolcool-color-picker-popup');
    if (!$popup) return;

    $popup.setAttribute('popup-position', this.state.popupPosition);
  }

  onAlphaControlVisibilityChange() {
    if (!this.$popupBox) return;

    const $popup = this.$popupBox.querySelector('toolcool-color-picker-popup');
    if (!$popup) return;

    $popup.setAttribute('show-alpha', String(this.state.isAlphaControlVisible));
  }

  onInitialColorChange() {
    const bgColor = rgbaToString(this.state.color);

    if (this.$buttonColor) {
      this.$buttonColor.style.backgroundColor = bgColor;
    }

    const $popup = this.shadowRoot?.querySelector('toolcool-color-picker-popup');
    if ($popup) {
      $popup.setAttribute('color', bgColor);
    }
  }

  setButtonSize() {
    if (!this.$button) return;

    if (this.state.buttonWidth) {
      this.$button.style.width = this.formatButtonSize(this.state.buttonWidth);
    }

    if (this.state.buttonHeight) {
      this.$button.style.height = this.formatButtonSize(this.state.buttonHeight);
    }

    if (this.state.buttonPadding) {
      this.$button.style.padding = this.state.buttonPadding;
    }
  }

  onColorChange() {
    if (this.$buttonColor) {
      this.$buttonColor.style.backgroundColor = rgbaToString(this.state.color);
    }

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          hex: this.hex,
          hex8: this.hex8,
          rgb: this.rgb,
          rgba: this.rgba,
          hsl: this.hsl,
          hsla: this.hsla,
          hsv: this.hsv,
          hsva: this.hsva,
          color: this.color,
        },
      })
    );
  }

  hsvChanged(evt: CustomEvent) {
    if (!evt || !evt.detail || !evt.detail.cid) return;

    // handle only current instance
    if (evt.detail.cid !== this.cid) return;

    this.state.color = new TinyColor({
      h: evt.detail.h,
      s: evt.detail.s,
      v: evt.detail.v,
      a: this.state.color.toHsv().a,
    });
  }

  hueChanged(evt: CustomEvent) {
    if (!evt || !evt.detail || !evt.detail.cid) return;

    // handle only current instance
    if (evt.detail.cid !== this.cid) return;

    const hsv = this.state.color.toHsv();

    this.state.color = new TinyColor({
      h: evt.detail.h,
      s: hsv.s,
      v: hsv.v,
      a: hsv.a,
    });
  }

  alphaChanged(evt: CustomEvent) {
    if (!evt || !evt.detail || !evt.detail.cid) return;

    // handle only current instance
    if (evt.detail.cid !== this.cid) return;

    const rgba = this.state.color.toRgb();
    rgba.a = evt.detail.a;

    this.state.color = new TinyColor(rgba);
  }

  /**
   * when button clicked ---> close all other color pickers
   */
  buttonClicked(evt: CustomEvent) {
    if (!evt || !evt.detail || !evt.detail.cid) return;

    if (evt.detail.cid === this.cid) return;

    this.state.isPopupVisible = false;
  }

  clickedOutside() {
    this.state.isPopupVisible = false;
  }

  toggle() {
    const isVisible = this.state.isPopupVisible;

    // setTimeout is used instead stopPropagation
    // to close other popup instances
    window.setTimeout(() => {
      this.state.isPopupVisible = !isVisible;

      sendButtonClickedCustomEvent(this.cid);
    }, 0);
  }

  onKeyDown(evt: KeyboardEvent) {
    if (evt.key === 'Escape') {
      // close the popup
      this.state.isPopupVisible = false;
    }
  }

  stopPropagation(evt: MouseEvent) {
    evt.stopPropagation();
  }

  /**
   * button can accept predefined width and height lik sm, lg, etc.
   * and also it can accept any css sizes like 1rem, 50px, etc.
   */
  formatButtonSize(size: string) {
    return buttonPredefinedSizes[size] ?? size;
  }

  // ------------------------- WEB COMPONENT LIFECYCLE ----------------------------

  /**
   * when the custom element connected to DOM
   */
  connectedCallback() {
    if (!this.shadowRoot) return;

    this.state.initialColor = parseColor(this.getAttribute('color'));
    this.state.color = parseColor(this.getAttribute('color'));
    this.state.popupPosition = this.getAttribute('popup-position') || 'left';
    this.state.isAlphaControlVisible = castShowAlphaAttribute(this.getAttribute('show-alpha'));
    this.state.buttonWidth = this.getAttribute('button-width');
    this.state.buttonHeight = this.getAttribute('button-height');
    this.state.buttonPadding = this.getAttribute('button-padding');

    this.shadowRoot.innerHTML = `
            <style>
                ${styles}
            </style>
            <div class="color-picker" >
                <button
                    type="button"
                    tabIndex="0"
                    class="button"
                    title="Select Color">
                    <span class="button-color" style="background: ${rgbaToString(this.state.color)};"></span>
                </button>
                <div data-popup-box></div>
            </div>
        `;

    // init button and its events
    this.$button = this.shadowRoot.querySelector('.button');
    this.$buttonColor = this.shadowRoot.querySelector('.button-color');

    this.$button?.addEventListener('click', this.toggle);
    this.$button?.addEventListener('keydown', this.onKeyDown);
    this.$button?.addEventListener('mousedown', this.stopPropagation);

    // init popup container
    this.$popupBox = this.shadowRoot.querySelector('[data-popup-box]');

    // init button dimensions
    this.setButtonSize();

    // close popup when clicked outside - we use mousedown instead of click to fix strange behaviour when
    // user drags some inner element like saturation point from the bounds of the window,
    // and the popup is suddenly closed
    document.addEventListener('mousedown', this.clickedOutside);

    // custom event from other parts of the app
    document.addEventListener(CUSTOM_EVENT_COLOR_HSV_CHANGED, this.hsvChanged);
    document.addEventListener(CUSTOM_EVENT_COLOR_HUE_CHANGED, this.hueChanged);
    document.addEventListener(CUSTOM_EVENT_COLOR_ALPHA_CHANGED, this.alphaChanged);
    document.addEventListener(CUSTOM_EVENT_BUTTON_CLICKED, this.buttonClicked);
  }

  /**
   * when the custom element disconnected from DOM
   */
  disconnectedCallback() {
    this.$button?.removeEventListener('click', this.toggle);
    this.$button?.removeEventListener('keydown', this.onKeyDown);
    this.$button?.removeEventListener('mousedown', this.stopPropagation);
    document.removeEventListener('mousedown', this.clickedOutside);

    document.removeEventListener(CUSTOM_EVENT_COLOR_HSV_CHANGED, this.hsvChanged);
    document.removeEventListener(CUSTOM_EVENT_COLOR_HUE_CHANGED, this.hueChanged);
    document.removeEventListener(CUSTOM_EVENT_COLOR_ALPHA_CHANGED, this.alphaChanged);
    document.removeEventListener(CUSTOM_EVENT_BUTTON_CLICKED, this.buttonClicked);
  }

  /**
   * when attributes change
   */
  attributeChangedCallback(attrName: string) {
    switch (attrName) {
      case 'color': {
        this.state.initialColor = parseColor(this.getAttribute('color'));
        this.state.color = parseColor(this.getAttribute('color'));
        this.onInitialColorChange();
        break;
      }

      case 'popup-position': {
        this.state.popupPosition = this.getAttribute('popup-position') || 'left';
        this.onPopupPosChange();
        break;
      }

      case 'show-alpha': {
        this.state.isAlphaControlVisible = castShowAlphaAttribute(this.getAttribute('show-alpha'));
        this.onAlphaControlVisibilityChange();
        break;
      }

      case 'button-width': {
        this.state.buttonWidth = this.getAttribute('button-width');
        this.setButtonSize();
        break;
      }

      case 'button-height': {
        this.state.buttonHeight = this.getAttribute('button-height');
        this.setButtonSize();
        break;
      }

      case 'button-padding': {
        this.state.buttonPadding = this.getAttribute('button-padding');
        this.setButtonSize();
        break;
      }
    }
  }
}

export default ColorPicker;
