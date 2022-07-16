export const SATURATION_STEP = 0.01;

/**
 * This hue background is used in saturation component.
 * The hsl color is supported in 99.5% browsers - https://caniuse.com/?search=hsl
 * @param {number} hue - [0, 360]
 */
export const getHueBackground = (hue: number) => {
    return `hsl(${ Math.round(hue) }, 100%, 50%)`;
};

/**
 * Saturation: get top position in % by value from hsv.
 */
export const getTopByValue = (value: number) => {
    const top = -(value * 100) + 100;
    return `${ top.toFixed(2) }%`;
};

/**
 * Saturation: get left position in % by saturation from hsv.
 */
export const getLeftBySaturation = (saturation: number) => {
    const top = saturation * 100;
    return `${ top.toFixed(2) }%`;
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
