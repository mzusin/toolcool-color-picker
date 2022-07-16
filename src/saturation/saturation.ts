// @ts-ignore: esbuild custom loader
import styles from './saturation.pcss';
import tinycolor from 'tinycolor2';
import { CUSTOM_EVENT_COLOR_HSV_CHANGED, CUSTOM_EVENT_COLOR_HUE_CHANGED, sendHsvCustomEvent } from '../helpers';

/*
 Usage:
 ------
 <toolcool-color-picker-saturation color="#000" cid="..."></toolcool-color-picker-saturation>
 */
class ColorPickerSaturation extends HTMLElement {

    // this id attribute is used for custom events
    private cid: string;

    private $saturation: HTMLElement;
    private $color: HTMLElement;
    private $pointer: HTMLElement;

    private initialColor: tinycolor.Instance = tinycolor('#000');
    private hue: number = 0; // [0, 360]
    private saturation: number = 0; // [0, 1]
    private value: number = 0; // [0, 1]

    constructor() {
        super();

        this.attachShadow({
            mode: 'open', // 'closed', 'open',
        });

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);

        this.colorHsvChangedCustomEvent = this.colorHsvChangedCustomEvent.bind(this);
        this.colorHueChangedCustomEvent = this.colorHueChangedCustomEvent.bind(this);
    }

    performUpdate() {
        // change pointer position
        this.$pointer.style.left = `${ this.saturation * 100 }%`;
        this.$pointer.style.top = `${ -(this.value * 100) + 100 }%`;

        this.$color.style.background = `hsl(${ this.hue }, 100%, 50%)`;

        // update outer color to change the button, and
        // send the updated color to the user
        sendHsvCustomEvent(this.cid, this.hue, this.saturation, this.value);
    }

    onChange(evt: any) {
        if(!this.$saturation) return;

        const { width: boxWidth, height: boxHeight, left: boxLeft, top: boxTop } = this.$saturation.getBoundingClientRect();
        if(boxWidth === 0 || boxHeight === 0) return;

        const mouseX = typeof evt.clientX === 'number' ? evt.clientX : evt.touches[0].clientX;
        const mouseY = typeof evt.clientY === 'number' ? evt.clientY : evt.touches[0].clientY;

        let lPos = Math.min(Math.max(0, mouseX - boxLeft), boxWidth);
        let tPos = Math.min(Math.max(0, mouseY - boxTop), boxHeight);

        this.saturation = lPos / boxWidth;
        this.value = 1 - (tPos / boxHeight);

        this.performUpdate();
    }

    onKeyDown(evt: KeyboardEvent) {

        switch (evt.key){
            case 'ArrowLeft': {
                this.saturation = Math.max(0, this.saturation - 0.01);
                this.performUpdate();
                break;
            }

            case 'ArrowRight': {
                this.saturation = Math.min(1, this.saturation + 0.01);
                this.performUpdate();
                break;
            }

            case 'ArrowUp': {
                this.value = Math.min(1, this.value + 0.01);
                this.performUpdate();
                break;
            }

            case 'ArrowDown': {
                evt.preventDefault();
                this.value = Math.max(0, this.value - 0.01);
                this.performUpdate();
                break;
            }
        }
    }

    onMouseDown(evt: MouseEvent) {
        if(evt.preventDefault){
            evt.preventDefault();
        }

        this.onChange(evt);

        window.addEventListener('mousemove', this.onChange);
        window.addEventListener('mouseup', this.onMouseUp);

        window.setTimeout(() => {
            this.$pointer.focus();
        }, 0);
    }

    onMouseUp() {
        window.removeEventListener('mousemove', this.onChange);
        window.removeEventListener('mouseup', this.onChange);
    }

    colorHsvChangedCustomEvent(evt: CustomEvent) {

        if(!evt || !evt.detail || !evt.detail.cid) return;

        // handle only current instance
        if(evt.detail.cid !== this.cid) return;

        let changed = false;

        if(this.hue !== evt.detail.h){
            this.hue = evt.detail.h;
            changed = true;
        }

        if(this.saturation !== evt.detail.s){
            this.saturation = evt.detail.s;
            changed = true;
        }

        if(this.value !== evt.detail.v){
            this.value = evt.detail.v;
            changed = true;
        }

        if(changed){
            this.performUpdate();
        }
    }

    colorHueChangedCustomEvent(evt: CustomEvent) {

        if(!evt || !evt.detail || !evt.detail.cid) return;

        // handle only current instance
        if(evt.detail.cid !== this.cid) return;
        this.hue = evt.detail.h;
        this.$color.style.background = `hsl(${ this.hue }, 100%, 50%)`;
    }

    /**
     * when the custom element connected to DOM
     */
    connectedCallback(){

        this.cid = this.getAttribute('cid');
        this.initialColor = tinycolor(this.getAttribute('color') || '#000');

        const hsv = this.initialColor.toHsv();
        this.hue = hsv.h;
        this.saturation = hsv.s;
        this.value = hsv.v;

        const top = `${ -(this.value * 100) + 100 }%`;
        const left = `${ this.saturation * 100 }%`;

        this.shadowRoot.innerHTML = `
           <style>${ styles }</style>
           <div class="color-picker__saturation">
                <div class="color-picker__saturation-box" style="background: hsl(${ this.hue }, 100%, 50%)">
                    <div class="color-picker__saturation-white">
                        <div class="color-picker__saturation-black"></div>
                        
                        <div class="color-picker__saturation-pointer" tabindex="0" style="top: ${ top }; left: ${ left };">
                            <div class="color-picker__saturation-pointer-handler"></div>
                        </div>
                    </div>
                </div>
           </div>
        `;

        this.$saturation = this.shadowRoot.querySelector('.color-picker__saturation');
        this.$color = this.shadowRoot.querySelector('.color-picker__saturation-box');
        this.$pointer = this.shadowRoot.querySelector('.color-picker__saturation-pointer');

        this.$pointer.addEventListener('keydown', this.onKeyDown);
        this.$saturation.addEventListener('mousedown', this.onMouseDown);
        this.$saturation.addEventListener('mouseup', this.onMouseUp);
        this.$saturation.addEventListener('touchmove', this.onChange);
        this.$saturation.addEventListener('touchstart', this.onChange);

        document.addEventListener(CUSTOM_EVENT_COLOR_HSV_CHANGED, this.colorHsvChangedCustomEvent);
        document.addEventListener(CUSTOM_EVENT_COLOR_HUE_CHANGED, this.colorHueChangedCustomEvent);
    }

    /**
     * when the custom element disconnected from DOM
     */
    disconnectedCallback(){
        this.$saturation.removeEventListener('mousedown', this.onMouseDown);
        this.$saturation.removeEventListener('mouseup', this.onMouseUp);
        this.$saturation.removeEventListener('touchmove', this.onChange);
        this.$saturation.removeEventListener('touchstart', this.onChange);
        this.$pointer.removeEventListener('keydown', this.onKeyDown);

        document.removeEventListener(CUSTOM_EVENT_COLOR_HSV_CHANGED, this.colorHsvChangedCustomEvent);
        document.removeEventListener(CUSTOM_EVENT_COLOR_HUE_CHANGED, this.colorHueChangedCustomEvent);
    }

    /**
     * when attributes change
     */
    attributeChangedCallback(){
        this.initialColor = tinycolor(this.getAttribute('color') || '#000');
    }
}

export default ColorPickerSaturation;