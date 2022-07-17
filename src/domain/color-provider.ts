export const SATURATION_STEP = 0.01;

/**
 * This hue background is used in saturation component.
 * The hsl color is supported in 99.5% browsers - https://caniuse.com/?search=hsl
 * @param {number} hue - [0, 360]
 */
export const getHueBackground = (hue: number) => {
    if(hue < 0){
        hue = 0;
    }
    if(hue > 360){
        hue = 360;
    }
    return `hsl(${ Math.round(hue) }, 100%, 50%)`;
};

/**
 * Saturation: get top position in % by value from hsv.
 * @param {number} value - [0, 1]
 */
export const getTopByValue = (value: number) => {
    if(value < 0){
        value = 0;
    }
    if(value > 1){
        value = 1;
    }
    const top = -(value * 100) + 100;
    return `${ top.toFixed(2) }%`;
};

/**
 * Saturation: get left position in % by saturation from hsv.
 * @param {number} saturation - [0, 1]
 */
export const getLeftBySaturation = (saturation: number) => {
    if(saturation < 0){
        saturation = 0;
    }
    if(saturation > 1){
        saturation = 1;
    }

    const top = saturation * 100;
    return `${ top.toFixed(2) }%`;
};

/**
 * Hue: get left position in % by hue from hsv.
 * @param {number} hue - [0, 360]
 */
export const getLeftByHue = (hue) => {
    if(hue < 0){
        hue = 0;
    }

    if(hue > 360){
        hue = 360;
    }
    const left = (hue * 100) / 360;
    let rounded = Math.round( left * 1e2 ) / 1e2; // round to 2 decimal places

    if(rounded < 0){
        rounded = 0;
    }

    if(rounded > 100){
        rounded = 100;
    }

    return rounded;
};

/**
 * Ig given left position in % ---> return the relevant hue.
 */
export const getHueByLeft = (left: number) => {
    return (360 * left) / 100;
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
