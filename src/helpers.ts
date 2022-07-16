import tinycolor from 'tinycolor2';
import { IColorHsva } from './interfaces';

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

export const getUniqueId = () => {
    return Math.random().toString(16).slice(2);
};

/**
 * returns a number in the range [0, 255]
 */
export const fixRGB = (updatedValue: any) => {
    let value = Number(updatedValue) || 0;
    value = Math.round(value);
    value = Math.max(0, value);
    value = Math.min(255, value);
    return value;
};

/**
 * returns a number in the range [0, 100]
 */
export const fixPercent = (updatedValue: any) => {
    let value = Number(updatedValue) || 100;
    value = Math.round(value);
    value = Math.max(0, value);
    value = Math.min(100, value);
    return value;
};
