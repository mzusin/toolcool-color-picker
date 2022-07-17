// @ts-ignore: esbuild custom loader
import styles from './hue.pcss';
import { CUSTOM_EVENT_COLOR_HSV_CHANGED, sendHueCustomEvent } from '../../domain/events-provider';
import tinycolor from 'tinycolor2';
import { getHueByLeft, getLeftByHue } from '../../domain/color-provider';

/*
 Usage:
 ------
 <toolcool-color-picker-hue color="#000" cid="..."></toolcool-color-picker-hue>
 */
class ColorPickerHue extends HTMLElement {

    // this id attribute is used for custom events
    private cid: string;

    private $hue: HTMLElement;
    private $pointer: HTMLElement;

    private hue: number = 0; // [0, 360]

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
    }

    performUpdate() {
        this.$pointer.style.left = `${ getLeftByHue(this.hue) }%`;

        // update outer color to change the button, and
        // send the updated color to the user
        sendHueCustomEvent(this.cid, this.hue);
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

        if(changed){
            this.performUpdate();
        }
    }

    onChange(evt: any) {
        if(!this.$hue) return;

        const { width: boxWidth, left: boxLeft } = this.$hue.getBoundingClientRect();
        if(boxWidth === 0) return;

        const mouseX = typeof evt.clientX === 'number' ? evt.clientX : evt.touches[0].clientX;

        const left = Math.min(Math.max(0, mouseX - boxLeft), boxWidth);
        const percent = Math.min(Math.max(0, Math.round((left * 100) / boxWidth)), 100);

        this.hue = getHueByLeft(percent);
        this.performUpdate();
    }

    onKeyDown(evt: KeyboardEvent) {

        this.$pointer.focus();

        switch (evt.key){
            case 'ArrowLeft': {
                let percent = getLeftByHue(this.hue);
                percent = Math.max(0, percent - 1);
                this.hue = getHueByLeft(percent);
                this.performUpdate();
                break;
            }

            case 'ArrowRight': {
                let percent = getLeftByHue(this.hue);
                percent = Math.min(100, percent + 1);
                this.hue = getHueByLeft(percent);
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

    /**
     * when the custom element connected to DOM
     */
    connectedCallback(){

        this.cid = this.getAttribute('cid');

        const color = tinycolor(this.getAttribute('color') || '#000');
        this.hue = color.toHsv().h;

        this.shadowRoot.innerHTML = `
           <style>${ styles }</style>
           <div class="color-picker__hue">
                <div class="color-picker__hue-box">
                    <div class="color-picker__hue-v">
                        <div class="color-picker__hue-h"></div>
                    </div>
                    
                    <div class="color-picker__hue-pointer">
                        <div class="color-picker__hue-pointer-box" tabindex="0" style="left: ${ getLeftByHue(this.hue) }%">
                            <div class="color-picker__hue-pointer-handler"></div>
                        </div>
                    </div>
                </div>
           </div>
        `;

        this.$hue = this.shadowRoot.querySelector('.color-picker__hue');
        this.$pointer = this.shadowRoot.querySelector('.color-picker__hue-pointer-box');

        this.$hue.addEventListener('mousedown', this.onMouseDown);
        this.$hue.addEventListener('mouseup', this.onMouseUp);
        this.$hue.addEventListener('touchmove', this.onChange);
        this.$hue.addEventListener('touchstart', this.onChange);

        this.$pointer.addEventListener('keydown', this.onKeyDown);
        document.addEventListener(CUSTOM_EVENT_COLOR_HSV_CHANGED, this.colorHsvChangedCustomEvent);
    }

    /**
     * when the custom element disconnected from DOM
     */
    disconnectedCallback(){

        this.$hue.removeEventListener('mousedown', this.onMouseDown);
        this.$hue.removeEventListener('mouseup', this.onMouseUp);
        this.$hue.removeEventListener('touchmove', this.onChange);
        this.$hue.removeEventListener('touchstart', this.onChange);
        this.$pointer.removeEventListener('keydown', this.onKeyDown);

        document.removeEventListener(CUSTOM_EVENT_COLOR_HSV_CHANGED, this.colorHsvChangedCustomEvent);
    }

    /**
     * when attributes change
     */
    attributeChangedCallback(){

        const color = tinycolor(this.getAttribute('color') || '#000');
        const hsv = color.toHsv();

        this.hue = hsv.h;
        this.performUpdate();
    }
}

export default ColorPickerHue;