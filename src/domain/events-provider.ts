import tinycolor from 'tinycolor2';
import { IColorHsva } from '../interfaces';

export const CUSTOM_EVENT_COLOR_HSV_CHANGED = 'toolcool-color-hsv-changed';
export const CUSTOM_EVENT_COLOR_HUE_CHANGED = 'toolcool-color-hue-changed';
export const CUSTOM_EVENT_COLOR_ALPHA_CHANGED = 'toolcool-color-alpha-changed';

export const sendAlphaCustomEvent = (cid: string, a: number) => {

    if(!cid) return;

    document.dispatchEvent(new CustomEvent(CUSTOM_EVENT_COLOR_ALPHA_CHANGED, {
        detail: {
            a,
            cid,
        }
    }));
};

export const sendHsvCustomEvent = (cid: string, h: number, s: number, v: number) => {
    if(!cid) return;

    document.dispatchEvent(new CustomEvent(CUSTOM_EVENT_COLOR_HSV_CHANGED, {
        detail: {
            h,
            s,
            v,
            cid,
        }
    }));
};

export const sendHueCustomEvent = (cid: string, h: number) => {

    if(!cid) return;

    document.dispatchEvent(new CustomEvent(CUSTOM_EVENT_COLOR_HUE_CHANGED, {
        detail: {
            h,
            cid,
        }
    }));
};

