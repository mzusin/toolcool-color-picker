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