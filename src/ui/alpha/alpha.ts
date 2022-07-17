// @ts-ignore: esbuild custom loader
import styles from './alpha.pcss';
import {
    CUSTOM_EVENT_COLOR_ALPHA_CHANGED,
    CUSTOM_EVENT_COLOR_HSV_CHANGED,
    CUSTOM_EVENT_COLOR_HUE_CHANGED,
    sendAlphaCustomEvent
} from '../../domain/events-provider';
import { fromRatio } from 'tinycolor2';
import { getAlphaColorBackground, parseColor } from '../../domain/color-provider';

/*
 Usage:
 ------
 <toolcool-color-picker-alpha color="#000" cid="..."></toolcool-color-picker-alpha>
 */
class ColorPickerAlpha extends HTMLElement {

    // this id attribute is used for custom events
    private cid: string;

    private $alpha: HTMLElement;
    private $color: HTMLElement;
    private $pointer: HTMLElement;

    private alpha: number = 1; // [0, 1]
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
        this.colorAlphaChangedCustomEvent = this.colorAlphaChangedCustomEvent.bind(this);
    }

    performUpdate() {
        this.$pointer.style.left = `${ this.alpha * 100 }%`;
        sendAlphaCustomEvent(this.cid, this.alpha);
    }

    onChange(evt: any) {
        if(!this.$alpha) return;

        const { width: boxWidth, left: boxLeft } = this.$alpha.getBoundingClientRect();
        if(boxWidth === 0) return;

        const mouseX = typeof evt.clientX === 'number' ? evt.clientX : evt.touches[0].clientX;

        const left = Math.min(Math.max(0, mouseX - boxLeft), boxWidth);
        const percent = Math.min(Math.max(0, (left * 100) / boxWidth), 100);

        this.alpha = percent / 100;
        this.performUpdate();
    }

    onKeyDown(evt: KeyboardEvent) {

        this.$pointer.focus();

        switch (evt.key){
            case 'ArrowLeft': {
                let percent = this.alpha * 100;
                percent = Math.max(0, percent - 1);
                this.alpha = percent / 100;
                this.performUpdate();
                break;
            }

            case 'ArrowRight': {
                let percent = this.alpha * 100;
                percent = Math.min(100, percent + 1)
                this.alpha = percent / 100;
                this.performUpdate();
                break;
            }
        }
    }

    colorHsvChangedCustomEvent(evt: CustomEvent) {
        if(!evt || !evt.detail || !evt.detail.cid) return;

        // handle only current instance
        if(evt.detail.cid !== this.cid) return;

        const color = fromRatio({
            h: evt.detail.h,
            s: evt.detail.s,
            v: evt.detail.v,
            a: this.alpha,
        });

        this.$color.style.background = getAlphaColorBackground(color);
    }

    colorHueChangedCustomEvent(evt: CustomEvent) {

        if(!evt || !evt.detail || !evt.detail.cid) return;

        // handle only current instance
        if(evt.detail.cid !== this.cid) return;

        const color = fromRatio({
            h: evt.detail.h,
            s: this.saturation,
            v: this.value,
            a: this.alpha,
        });

        this.$color.style.background = getAlphaColorBackground(color);
    }

    colorAlphaChangedCustomEvent(evt: CustomEvent) {

        if(!evt || !evt.detail || !evt.detail.cid) return;

        // handle only current instance
        if(evt.detail.cid !== this.cid) return;

        if(this.alpha !== evt.detail.a){
            this.alpha = evt.detail.a;
            this.performUpdate();
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

    /**
     * when the custom element connected to DOM
     */
    connectedCallback(){

        this.cid = this.getAttribute('cid');

        const color = parseColor(this.getAttribute('color'));
        const hsv = color.toHsv();

        this.alpha = hsv.a;
        this.hue = hsv.h;
        this.saturation = hsv.s;
        this.value = hsv.v;

        this.shadowRoot.innerHTML = `
           <style>${ styles }</style>
           <div class="color-picker__alpha">
                <div class="color-picker__alpha-box">
                    <div class="color-picker__alpha-transparent-bg"></div>
                    <div class="color-picker__alpha-color-bg" style="background: ${ getAlphaColorBackground(color) }"></div>
                    
                    <div class="color-picker__alpha-pointer">
                        <div class="color-picker__alpha-pointer-box" tabindex="0" style="left: ${ this.alpha * 100 }%;" >
                            <div class="color-picker__alpha-pointer-handler"></div>
                        </div>
                    </div>
                </div>
           </div>
        `;

        this.$alpha = this.shadowRoot.querySelector('.color-picker__alpha');
        this.$color = this.shadowRoot.querySelector('.color-picker__alpha-color-bg');
        this.$pointer = this.shadowRoot.querySelector('.color-picker__alpha-pointer-box');

        this.$alpha.addEventListener('mousedown', this.onMouseDown);
        this.$alpha.addEventListener('mouseup', this.onMouseUp);
        this.$alpha.addEventListener('touchmove', this.onChange);
        this.$alpha.addEventListener('touchstart', this.onChange);
        this.$pointer.addEventListener('keydown', this.onKeyDown);

        document.addEventListener(CUSTOM_EVENT_COLOR_HSV_CHANGED, this.colorHsvChangedCustomEvent);
        document.addEventListener(CUSTOM_EVENT_COLOR_HUE_CHANGED, this.colorHueChangedCustomEvent);
        document.addEventListener(CUSTOM_EVENT_COLOR_ALPHA_CHANGED, this.colorAlphaChangedCustomEvent);
    }

    /**
     * when the custom element disconnected from DOM
     */
    disconnectedCallback(){
        this.$alpha.removeEventListener('mousedown', this.onMouseDown);
        this.$alpha.removeEventListener('mouseup', this.onMouseUp);
        this.$alpha.removeEventListener('touchmove', this.onChange);
        this.$alpha.removeEventListener('touchstart', this.onChange);
        this.$pointer.removeEventListener('keydown', this.onKeyDown);

        document.removeEventListener(CUSTOM_EVENT_COLOR_HSV_CHANGED, this.colorHsvChangedCustomEvent);
        document.removeEventListener(CUSTOM_EVENT_COLOR_HUE_CHANGED, this.colorHueChangedCustomEvent);
        document.removeEventListener(CUSTOM_EVENT_COLOR_ALPHA_CHANGED, this.colorAlphaChangedCustomEvent);
    }

    /**
     * when attributes change
     */
    attributeChangedCallback(){

        const color = parseColor(this.getAttribute('color'));
        const hsv = color.toHsv();

        this.alpha = hsv.a;
        this.hue = hsv.h;
        this.saturation = hsv.s;
        this.value = hsv.v;

        this.performUpdate();
    }
}

export default ColorPickerAlpha;