declare class Alpha extends HTMLElement {
    static get observedAttributes(): string[];
    private cid;
    private $alpha;
    private $color;
    private $pointer;
    private alpha;
    private hue;
    private saturation;
    private value;
    constructor();
    render(sendEvent?: boolean): void;
    onChange(evt: any): void;
    onKeyDown(evt: KeyboardEvent): void;
    hsvChanged(evt: CustomEvent): void;
    hueChanged(evt: CustomEvent): void;
    alphaChanged(evt: CustomEvent): void;
    onMouseDown(evt: MouseEvent): void;
    onMouseUp(): void;
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
export default Alpha;
//# sourceMappingURL=alpha.d.ts.map