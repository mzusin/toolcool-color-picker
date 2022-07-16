/**
 * This hue background is used in saturation component.
 * The hsl color is supported in 99.5% browsers - https://caniuse.com/?search=hsl
 * @param {number} hue - [0, 360]
 */
export const getHueBackground = (hue: number) => {
    return `hsl(${ Math.round(hue) }, 100%, 50%)`;
};