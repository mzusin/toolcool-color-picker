// @ts-ignore: esbuild custom loader
import styles from './fields.pcss';
import {
    CUSTOM_EVENT_COLOR_ALPHA_CHANGED,
    CUSTOM_EVENT_COLOR_HSV_CHANGED,
    CUSTOM_EVENT_COLOR_HUE_CHANGED,
    sendAlphaCustomEvent, sendHsvCustomEvent
} from '../../domain/events-provider';
import tinycolor from 'tinycolor2';
import { fixPercent, fixRGB } from '../../domain/color-provider';
import { getUniqueId } from '../../domain/common-provider';

/*
 Usage:
 ------
 <toolcool-color-picker-fields color="#000" cid="..."></toolcool-color-picker-fields>
 */
class ColorPickerFields extends HTMLElement {

    // this id attribute is used for custom events
    private cid: string;
    private initialColor: tinycolor.Instance = tinycolor('#000');

    private $fields: HTMLElement;
    private $hex: HTMLInputElement;
    private $r: HTMLInputElement;
    private $g: HTMLInputElement;
    private $b: HTMLInputElement;
    private $a: HTMLInputElement;

    private hex: string = '';
    private r: number = 0;
    private g: number = 0;
    private b: number = 0;
    private a: number = 1;

    constructor() {
        super();

        this.attachShadow({
            mode: 'open', // 'closed', 'open',
        });

        this.colorHsvChangedCustomEvent = this.colorHsvChangedCustomEvent.bind(this);
        this.colorHueChangedCustomEvent = this.colorHueChangedCustomEvent.bind(this);
        this.colorAlphaChangedCustomEvent = this.colorAlphaChangedCustomEvent.bind(this);

        this.onHexChange = this.onHexChange.bind(this);
        this.performUpdate = this.performUpdate.bind(this);
        this.onRedChange = this.onRedChange.bind(this);
        this.onGreenChange = this.onGreenChange.bind(this);
        this.onBlueChange = this.onBlueChange.bind(this);
        this.onAlphaChange = this.onAlphaChange.bind(this);
        this.onRedKeyDown = this.onRedKeyDown.bind(this);
        this.onBlueKeyDown = this.onBlueKeyDown.bind(this);
        this.onGreenKeyDown = this.onGreenKeyDown.bind(this);
        this.onAlphaKeyDown = this.onAlphaKeyDown.bind(this);
    }

    colorHueChangedCustomEvent(evt: CustomEvent) {

        if(!evt || !evt.detail || !evt.detail.cid) return;

        // handle only current instance
        if(evt.detail.cid !== this.cid) return;

        const hsv = this.initialColor.toHsv();

        this.initialColor = tinycolor.fromRatio({
            h: evt.detail.h,
            s: hsv.s,
            v: hsv.v,
            a: hsv.a,
        });
        this.performUpdate();
    }

    colorAlphaChangedCustomEvent(evt: CustomEvent) {

        if(!evt || !evt.detail || !evt.detail.cid) return;

        // handle only current instance
        if(evt.detail.cid !== this.cid) return;

        const rgba = this.initialColor.toRgb();
        rgba.a = evt.detail.a;

        this.initialColor = tinycolor(rgba);
        this.performUpdate();
    }

    colorHsvChangedCustomEvent(evt: CustomEvent) {
        if(!evt || !evt.detail || !evt.detail.cid) return;

        // handle only current instance
        if(evt.detail.cid !== this.cid) return;

        this.initialColor = tinycolor.fromRatio({
            h: evt.detail.h,
            s: evt.detail.s,
            v: evt.detail.v,
            a: this.initialColor.toHsv().a,
        });

        this.performUpdate();
    }

    performUpdate() {
        const rgba = this.initialColor.toRgb();
        this.r = rgba.r;
        this.g = rgba.g;
        this.b = rgba.b;
        this.a = rgba.a;
        this.hex = this.initialColor.toHex();

        if(this.shadowRoot.activeElement !== this.$hex){
            this.$hex.value = this.hex.toUpperCase();
        }

        if(this.shadowRoot.activeElement !== this.$r){
            this.$r.value = this.r.toString();
        }

        if(this.shadowRoot.activeElement !== this.$g){
            this.$g.value = this.g.toString();
        }

        if(this.shadowRoot.activeElement !== this.$b){
            this.$b.value = this.b.toString();
        }

        if(this.shadowRoot.activeElement !== this.$a){
            this.$a.value = Math.round(this.a * 100).toString();
        }
    }

    onFieldKeyDown(evt: KeyboardEvent, type: string) {
        const rgba = this.initialColor.toRgb();

        switch (evt.key){
            case 'ArrowUp': {
                if(type === 'r'){
                    this.r = Math.min(255, rgba.r + 1);
                    rgba.r = this.r;
                    const hsv = tinycolor(rgba).toHsv();
                    sendHsvCustomEvent(this.cid, hsv.h, hsv.s, hsv.v);
                    this.$r.value = this.r.toString();
                    this.performUpdate();
                }
                if(type === 'g'){
                    this.g = Math.min(255, rgba.g + 1);
                    rgba.g = this.g;

                    const hsv = tinycolor(rgba).toHsv();
                    sendHsvCustomEvent(this.cid, hsv.h, hsv.s, hsv.v);
                    this.$g.value = this.g.toString();
                    this.performUpdate();
                }
                if(type === 'b'){
                    this.b = Math.min(255, rgba.b + 1);
                    rgba.b = this.b
                    const hsv = tinycolor(rgba).toHsv();
                    sendHsvCustomEvent(this.cid, hsv.h, hsv.s, hsv.v);
                    this.$b.value = this.b.toString();
                    this.performUpdate();
                }
                if(type === 'a'){
                    this.a = Math.min(100, this.a + 0.01);
                    this.$a.value = Math.round(this.a * 100).toString();

                    const rgba = this.initialColor.toRgb();
                    rgba.a = this.a;
                    this.initialColor = tinycolor(rgba);

                    this.performUpdate();
                    sendAlphaCustomEvent(this.cid, this.a);
                }
                break;
            }
            case 'ArrowDown': {
                if(type === 'r'){
                    this.r = Math.max(0, rgba.r - 1);
                    rgba.r = this.r;
                    const hsv = tinycolor(rgba).toHsv();
                    sendHsvCustomEvent(this.cid, hsv.h, hsv.s, hsv.v);
                    this.$r.value = this.r.toString();
                    this.performUpdate();
                }
                if(type === 'g'){
                    this.g = Math.max(0, rgba.g - 1);
                    rgba.g = this.g;

                    const hsv = tinycolor(rgba).toHsv();
                    sendHsvCustomEvent(this.cid, hsv.h, hsv.s, hsv.v);
                    this.$g.value = this.g.toString();
                    this.performUpdate();
                }
                if(type === 'b'){
                    this.b = Math.max(0, rgba.b - 1);
                    rgba.b = this.b
                    const hsv = tinycolor(rgba).toHsv();
                    sendHsvCustomEvent(this.cid, hsv.h, hsv.s, hsv.v);
                    this.$b.value = this.b.toString();
                    this.performUpdate();
                }
                if(type === 'a'){
                    this.a = Math.max(0, this.a - 0.01);
                    this.$a.value = Math.round(this.a * 100).toString();

                    const rgba = this.initialColor.toRgb();
                    rgba.a = this.a;
                    this.initialColor = tinycolor(rgba);

                    this.performUpdate();
                    sendAlphaCustomEvent(this.cid, this.a);
                }
                break;
            }
            case 'Escape': {
                if(this.shadowRoot.activeElement){
                    const $el = this.shadowRoot.activeElement as HTMLElement;
                    $el.blur();
                }

                this.performUpdate();
                break;
            }
            case 'Enter': {
                if(this.shadowRoot.activeElement){
                    const $el = this.shadowRoot.activeElement as HTMLElement;
                    $el.blur();
                }

                this.performUpdate();
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
        if($target.value.length !== 6) return;

        const updatedColor = tinycolor(`#${ $target.value }`);

        if(updatedColor.isValid()){
            this.initialColor = updatedColor;

            const hsv = this.initialColor.toHsv();

            // update outer color to change the button, and
            // send the updated color to the user
            sendHsvCustomEvent(this.cid, hsv.h, hsv.s, hsv.v);
        }
    }

    onRedChange(evt: Event) {
        const $target = evt.target as HTMLInputElement;
        const fixedValue = fixRGB($target.value);

        if(fixedValue.toString() === $target.value){
            const rgba = this.initialColor.toRgb();
            rgba.r = fixedValue;
            const hsv = tinycolor(rgba).toHsv();

            // update outer color to change the button, and
            // send the updated color to the user
            sendHsvCustomEvent(this.cid, hsv.h, hsv.s, hsv.v);
        }
    }

    onGreenChange(evt: Event) {
        const $target = evt.target as HTMLInputElement;
        const fixedValue = fixRGB($target.value);

        if(fixedValue.toString() === $target.value){
            const rgba = this.initialColor.toRgb();
            rgba.g = fixedValue;
            const hsv = tinycolor(rgba).toHsv();

            // update outer color to change the button, and
            // send the updated color to the user
            sendHsvCustomEvent(this.cid, hsv.h, hsv.s, hsv.v);
        }
    }

    onBlueChange(evt: Event) {
        const $target = evt.target as HTMLInputElement;
        const fixedValue = fixRGB($target.value);

        if(fixedValue.toString() === $target.value){
            const rgba = this.initialColor.toRgb();
            rgba.b = fixedValue;
            const hsv = tinycolor(rgba).toHsv();

            // update outer color to change the button, and
            // send the updated color to the user
            sendHsvCustomEvent(this.cid, hsv.h, hsv.s, hsv.v);
        }
    }

    onAlphaChange(evt: Event) {
        const $target = evt.target as HTMLInputElement;
        const fixedValue = fixPercent($target.value);

        if(fixedValue.toString() === $target.value){
            sendAlphaCustomEvent(this.cid, fixedValue / 100);
        }
    }

    /**
     * when the custom element connected to DOM
     */
    connectedCallback(){

        this.cid = this.getAttribute('cid');
        this.initialColor = tinycolor(this.getAttribute('color') || '#000');

        const rgba = this.initialColor.toRgb();
        this.r = rgba.r;
        this.g = rgba.g;
        this.b = rgba.b;
        this.a = rgba.a;
        this.hex = this.initialColor.toHex();

        const hexId = getUniqueId();
        const rId = getUniqueId();
        const gId = getUniqueId();
        const bId = getUniqueId();
        const aId = getUniqueId();

        this.shadowRoot.innerHTML = `
           <style>${ styles }</style>
           <div class="color-picker__fields">
               <input id="hex-${ hexId }" type="text" value="${ this.hex.toUpperCase() }" />
               <input id="r-${ rId }" type="text" value="${ this.r }" />
               <input id="g-${ gId }" type="text" value="${ this.g }" />
               <input id="b-${ bId }" type="text" value="${ this.b }" />
               <input id="a-${ aId }" type="text" value="${ Math.round(this.a * 100) }" />
               
               <label for="hex-${ hexId }">Hex</label>
               <label for="r-${ rId }">R</label>
               <label for="g-${ gId }">G</label>
               <label for="b-${ bId }">B</label>
               <label for="a-${ aId }">A</label>
           </div>
        `;

        this.$fields = this.shadowRoot.querySelector('.color-picker__fields');
        this.$hex = this.shadowRoot.getElementById(`hex-${ hexId }`) as HTMLInputElement;
        this.$r = this.shadowRoot.getElementById(`r-${ rId }`) as HTMLInputElement;
        this.$g = this.shadowRoot.getElementById(`g-${ gId }`) as HTMLInputElement;
        this.$b = this.shadowRoot.getElementById(`b-${ bId }`) as HTMLInputElement;
        this.$a = this.shadowRoot.getElementById(`a-${ aId }`) as HTMLInputElement;

        // custom event from other parts of the app
        document.addEventListener(CUSTOM_EVENT_COLOR_HSV_CHANGED, this.colorHsvChangedCustomEvent);
        document.addEventListener(CUSTOM_EVENT_COLOR_HUE_CHANGED, this.colorHueChangedCustomEvent);
        document.addEventListener(CUSTOM_EVENT_COLOR_ALPHA_CHANGED, this.colorAlphaChangedCustomEvent);

        this.$hex.addEventListener('input', this.onHexChange);
        this.$r.addEventListener('input', this.onRedChange);
        this.$g.addEventListener('input', this.onGreenChange);
        this.$b.addEventListener('input', this.onBlueChange);
        this.$a.addEventListener('input', this.onAlphaChange);

        this.$hex.addEventListener('blur', this.performUpdate);
        this.$r.addEventListener('blur', this.performUpdate);
        this.$g.addEventListener('blur', this.performUpdate);
        this.$b.addEventListener('blur', this.performUpdate);
        this.$a.addEventListener('blur', this.performUpdate);

        this.$r.addEventListener('keydown', this.onRedKeyDown);
        this.$g.addEventListener('keydown', this.onGreenKeyDown);
        this.$b.addEventListener('keydown', this.onBlueKeyDown);
        this.$a.addEventListener('keydown', this.onAlphaKeyDown);
    }

    /**
     * when the custom element disconnected from DOM
     */
    disconnectedCallback(){
        document.removeEventListener(CUSTOM_EVENT_COLOR_HSV_CHANGED, this.colorHsvChangedCustomEvent);
        document.removeEventListener(CUSTOM_EVENT_COLOR_HUE_CHANGED, this.colorHueChangedCustomEvent);
        document.removeEventListener(CUSTOM_EVENT_COLOR_ALPHA_CHANGED, this.colorAlphaChangedCustomEvent);

        this.$hex.removeEventListener('input', this.onHexChange);
        this.$r.removeEventListener('input', this.onRedChange);
        this.$g.removeEventListener('input', this.onGreenChange);
        this.$b.removeEventListener('input', this.onBlueChange);
        this.$a.removeEventListener('input', this.onAlphaChange);

        this.$hex.removeEventListener('blur', this.performUpdate);
        this.$r.removeEventListener('blur', this.performUpdate);
        this.$g.removeEventListener('blur', this.performUpdate);
        this.$b.removeEventListener('blur', this.performUpdate);
        this.$a.removeEventListener('blur', this.performUpdate);

        this.$r.removeEventListener('keydown', this.onRedKeyDown);
        this.$g.removeEventListener('keydown', this.onGreenKeyDown);
        this.$b.removeEventListener('keydown', this.onBlueKeyDown);
        this.$a.removeEventListener('keydown', this.onAlphaKeyDown);
    }

    /**
     * when attributes change
     */
    attributeChangedCallback(){
        this.initialColor = tinycolor(this.getAttribute('color') || '#000');
        this.performUpdate();
    }
}

export default ColorPickerFields;