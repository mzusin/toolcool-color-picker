// @ts-ignore: esbuild custom loader
import styles from './styles.pcss';
import ColorPickerPopup from '../ui/popup/popup';
import {
    CUSTOM_EVENT_COLOR_HSV_CHANGED,
    CUSTOM_EVENT_COLOR_HUE_CHANGED,
    CUSTOM_EVENT_COLOR_ALPHA_CHANGED,
} from '../domain/events-provider';
import { getUniqueId } from '../domain/common-provider';
import { hslaToString, hsvaToString, parseColor, rgbaToString } from '../domain/color-provider';
import { TinyColor } from '@ctrl/tinycolor'; // https://github.com/scttcper/tinycolor
import { ColorInput } from '@ctrl/tinycolor/dist';

/*
 Usage:
 ------
 <toolcool-color-picker color="#ff0000" popup-position="left"></toolcool-color-picker>
 */
interface IColorPickerState {
    isPopupVisible: boolean,
    popupPosition: string,
    initialColor: TinyColor,
    color: TinyColor,
}

class ColorPicker extends HTMLElement {

    static get observedAttributes() {
        return ['color', 'popup-position'];
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

    // -----------------------------------------

    // this id attribute is used for custom events
    public readonly cid: string;

    private $button: HTMLElement;
    private $buttonColor: HTMLElement;
    private $popupBox: HTMLElement;

    private stateDefaults: IColorPickerState = {
        isPopupVisible: false,
        popupPosition: 'left',
        initialColor: new TinyColor('#000'),
        color: new TinyColor('#000'),
    };
    private state: IColorPickerState;

    constructor() {
        super();

        this.cid = getUniqueId();

        // register web components
        if(!customElements.get('toolcool-color-picker-popup')){
            customElements.define('toolcool-color-picker-popup', ColorPickerPopup);
        }

        this.attachShadow({
            mode: 'open', // 'closed', 'open',
        });

        this.toggle = this.toggle.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.clickedOutside = this.clickedOutside.bind(this);

        this.hsvChanged = this.hsvChanged.bind(this);
        this.hueChanged = this.hueChanged.bind(this);
        this.alphaChanged = this.alphaChanged.bind(this);

        this.initState();
    }

    initState() {
        // eslint-disable-next-line
        const scope = this;
        this.state = new Proxy(scope.stateDefaults, {

            // eslint-disable-next-line
            set(target: IColorPickerState, key: string | symbol, value: any, receiver: any): boolean {
                target[key] = value;

                if(key === 'isPopupVisible'){
                    scope.onPopupVisibilityChange();
                }

                if(key === 'popupPosition'){
                    scope.onPopupPosChange();
                }

                if(key === 'initialColor'){
                    scope.onInitialColorChange();
                }

                if(key === 'color'){
                    scope.onColorChange();
                }

                return true;
            },
        });
    }

    onPopupVisibilityChange() {
        if(!this.$popupBox) return;
        this.$popupBox.innerHTML = this.state.isPopupVisible ?
            `<toolcool-color-picker-popup color="${ this.state.color.toRgbString() }" cid="${ this.cid }" popup-position="${ this.state.popupPosition }" />` :
            '';
    }

    onPopupPosChange() {
        if(!this.$popupBox) return;

        const $popup = this.$popupBox.querySelector('toolcool-color-picker-popup');
        if(!$popup) return;

        $popup.setAttribute('popup-position', this.state.popupPosition);
    }

    onInitialColorChange() {
        const bgColor = rgbaToString(this.state.color);

        if(this.$buttonColor){
            this.$buttonColor.style.backgroundColor = bgColor;
        }

        const $popup = this.shadowRoot.querySelector('toolcool-color-picker-popup');
        if($popup){
            $popup.setAttribute('color', bgColor);
        }
    }

    onColorChange() {

        if(this.$buttonColor){
            this.$buttonColor.style.backgroundColor = rgbaToString(this.state.color);
        }

        this.dispatchEvent(new CustomEvent('change', {
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
            }
        }));
    }

    hsvChanged(evt: CustomEvent) {
        if(!evt || !evt.detail || !evt.detail.cid) return;

        // handle only current instance
        if(evt.detail.cid !== this.cid) return;

        this.state.color = new TinyColor({
            h: evt.detail.h,
            s: evt.detail.s,
            v: evt.detail.v,
            a: this.state.color.toHsv().a,
        });
    }

    hueChanged(evt: CustomEvent) {

        if(!evt || !evt.detail || !evt.detail.cid) return;

        // handle only current instance
        if(evt.detail.cid !== this.cid) return;

        const hsv = this.state.color.toHsv();

        this.state.color = new TinyColor({
            h: evt.detail.h,
            s: hsv.s,
            v: hsv.v,
            a: hsv.a,
        });
    }

    alphaChanged(evt: CustomEvent) {

        if(!evt || !evt.detail || !evt.detail.cid) return;

        // handle only current instance
        if(evt.detail.cid !== this.cid) return;

        const rgba = this.state.color.toRgb();
        rgba.a = evt.detail.a;

        this.state.color = new TinyColor(rgba);
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
        }, 0);
    }

    onKeyDown(evt: KeyboardEvent) {
        if(evt.key === 'Escape') {

            // close the popup
            this.state.isPopupVisible = false;
        }
    }

    /**
     * when the custom element connected to DOM
     */
    connectedCallback() {

        this.state.initialColor = parseColor(this.getAttribute('color'));
        this.state.color = parseColor(this.getAttribute('color'));
        this.state.popupPosition = this.getAttribute('popup-position') || 'left';

        this.shadowRoot.innerHTML = `
            <style>${ styles }</style>
            <div class="color-picker">
                <button
                    type="button"
                    tabIndex="0"
                    class="button"
                    title="Select Color">
                    <span class="button-color" style="background: ${ rgbaToString(this.state.color) }"></span>
                </button>
                <div data-popup-box></div>
            </div>
        `;

        // init button and its events
        this.$button = this.shadowRoot.querySelector('.button');
        this.$buttonColor = this.shadowRoot.querySelector('.button-color');

        this.$button.addEventListener('click', this.toggle);
        this.$button.addEventListener('keydown', this.onKeyDown);

        // init popup container
        this.$popupBox = this.shadowRoot.querySelector('[data-popup-box]');

        // close popup when clicked outside - we use mousedown instead of click to fix strange behaviour when
        // user drags some inner element like saturation point from the bounds of the window,
        // and the popup is suddenly closed
        document.addEventListener('mousedown', this.clickedOutside);

        // custom event from other parts of the app
        document.addEventListener(CUSTOM_EVENT_COLOR_HSV_CHANGED, this.hsvChanged);
        document.addEventListener(CUSTOM_EVENT_COLOR_HUE_CHANGED, this.hueChanged);
        document.addEventListener(CUSTOM_EVENT_COLOR_ALPHA_CHANGED, this.alphaChanged);
    }

    /**
     * when the custom element disconnected from DOM
     */
    disconnectedCallback(){
        this.$button.removeEventListener('click', this.toggle);
        this.$button.removeEventListener('keydown', this.onKeyDown);
        document.removeEventListener('mousedown', this.clickedOutside);

        document.removeEventListener(CUSTOM_EVENT_COLOR_HSV_CHANGED, this.hsvChanged);
        document.removeEventListener(CUSTOM_EVENT_COLOR_HUE_CHANGED, this.hueChanged);
        document.removeEventListener(CUSTOM_EVENT_COLOR_ALPHA_CHANGED, this.alphaChanged);
    }

    /**
     * when attributes change
     */
    attributeChangedCallback(attrName){

        if(attrName === 'color') {
            this.state.initialColor = parseColor(this.getAttribute('color'));
            this.state.color = parseColor(this.getAttribute('color'));
            this.onInitialColorChange();
        }

        if(attrName === 'popup-position') {
            this.state.popupPosition = this.getAttribute('popup-position') || 'left';
            this.onPopupPosChange();
        }
    }
}

export default ColorPicker;