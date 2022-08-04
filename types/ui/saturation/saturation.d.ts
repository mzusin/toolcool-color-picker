declare class Saturation extends HTMLElement {
    private cid;
    private $saturation;
    private $color;
    private $pointer;
    private hue;
    private saturation;
    private value;
    static get observedAttributes(): string[];
    constructor();
    render(sendEvent?: boolean): void;
    onChange(evt: any): void;
    onPointerKeyDown(evt: KeyboardEvent): void;
    onMouseDown(evt: MouseEvent): void;
    onMouseUp(): void;
    hsvChanged(evt: CustomEvent): void;
    hueChanged(evt: CustomEvent): void;
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
    attributeChangedCallback(_attrName: string, _oldVal: string, newVal: string): void;
}
export default Saturation;
//# sourceMappingURL=saturation.d.ts.map