import { ColorInput } from '@ctrl/tinycolor/dist';
declare class ColorPicker extends HTMLElement {
    static get observedAttributes(): string[];
    /**
     * set any color that TinyColor accepts
     */
    set color(userColor: ColorInput);
    /**
     * returns TinyColor object
     */
    get color(): ColorInput;
    /**
     * hex format getter
     */
    get hex(): string;
    /**
     * hex with alpha format getter
     */
    get hex8(): string;
    /**
     * rgb format getter
     */
    get rgb(): string;
    /**
     * rgba format getter
     */
    get rgba(): string;
    /**
     * hsl format getter
     */
    get hsl(): string;
    /**
     * hsla format getter
     */
    get hsla(): string;
    /**
     * hsv format getter
     */
    get hsv(): string;
    /**
     * hsva format getter
     */
    get hsva(): string;
    get opened(): boolean;
    set opened(isOpened: boolean);
    readonly cid: string;
    private $button;
    private $buttonColor;
    private $popupBox;
    private stateDefaults;
    private state;
    constructor();
    initState(): void;
    onPopupVisibilityChange(): void;
    onPopupPosChange(): void;
    onInitialColorChange(): void;
    setButtonSize(): void;
    onColorChange(): void;
    hsvChanged(evt: CustomEvent): void;
    hueChanged(evt: CustomEvent): void;
    alphaChanged(evt: CustomEvent): void;
    /**
     * when button clicked ---> close all other color pickers
     */
    buttonClicked(evt: CustomEvent): void;
    clickedOutside(): void;
    toggle(): void;
    onKeyDown(evt: KeyboardEvent): void;
    stopPropagation(evt: MouseEvent): void;
    /**
     * button can accept predefined width and height lik sm, lg, etc.
     * and also it can accept any css sizes like 1rem, 50px, etc.
     */
    formatButtonSize(size: string): string;
    /**
     * when the custom element connected to DOM
     */
    connectedCallback(): void;
    /**
     * when the custom element disconnected from DOM
     */
    disconnectedCallback(): void;
    /**
     * when attributes change
     */
    attributeChangedCallback(attrName: string): void;
}
export default ColorPicker;
//# sourceMappingURL=color-picker.d.ts.map