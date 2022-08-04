declare class ColorPickerPopup extends HTMLElement {
    private readonly cid;
    private popupPosition;
    private $popup;
    private color;
    static get observedAttributes(): string[];
    constructor();
    prevent(evt: MouseEvent): void;
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
    attributeChangedCallback(attrName: string, _oldVal: string, newVal: string): void;
}
export default ColorPickerPopup;
//# sourceMappingURL=popup.d.ts.map