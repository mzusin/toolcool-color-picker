import { TinyColor } from '@ctrl/tinycolor';
export declare const SATURATION_STEP = 0.01;
/**
 * This hue background is used in saturation component.
 * The hsl color is supported in 99.5% browsers - https://caniuse.com/?search=hsl
 * @param {number} hue - [0, 360]
 */
export declare const getHueBackground: (hue: number) => string;
/**
 * This alpha color background is used in the alpha component.
 * The hsl color is supported in 99.5% browsers - https://caniuse.com/?search=rgba
 */
export declare const getAlphaColorBackground: (color: TinyColor) => string;
export declare const rgbaToString: (color: TinyColor) => string;
export declare const hslaToString: (color: TinyColor) => string;
export declare const hsvaToString: (color: TinyColor) => string;
/**
 * Saturation: get top position in % by value from hsv.
 * @param {number} value - [0, 1]
 */
export declare const getTopByValue: (value: number) => string;
/**
 * Saturation: get left position in % by saturation from hsv.
 * @param {number} saturation - [0, 1]
 */
export declare const getLeftBySaturation: (saturation: number) => string;
/**
 * Hue: get left position in % by hue from hsv.
 * @param {number} hue - [0, 360]
 */
export declare const getLeftByHue: (hue: number) => number;
/**
 * Ig given left position in % ---> return the relevant hue.
 */
export declare const getHueByLeft: (left: number) => number;
/**
 * returns a number in the range [0, 255]
 */
export declare const fixRGB: (updatedValue: string | number) => number;
/**
 * returns a number in the range [0, 100]
 */
export declare const fixPercent: (updatedValue: string | number) => number;
export declare const parseColor: (colorString: string | null) => TinyColor;
//# sourceMappingURL=color-provider.d.ts.map