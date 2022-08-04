declare class Fields extends HTMLElement {
    private cid;
    private color;
    private $hex;
    private $r;
    private $g;
    private $b;
    private $a;
    private hex;
    private r;
    private g;
    private b;
    private a;
    static get observedAttributes(): string[];
    constructor();
    hueChanged(evt: CustomEvent): void;
    alphaChanged(evt: CustomEvent): void;
    hsvChanged(evt: CustomEvent): void;
    render(): void;
    onFieldKeyDown(evt: KeyboardEvent, type: string): void;
    onRedKeyDown(evt: KeyboardEvent): void;
    onGreenKeyDown(evt: KeyboardEvent): void;
    onBlueKeyDown(evt: KeyboardEvent): void;
    onAlphaKeyDown(evt: KeyboardEvent): void;
    onHexChange(evt: Event): void;
    onRedChange(evt: Event): void;
    onGreenChange(evt: Event): void;
    onBlueChange(evt: Event): void;
    onAlphaChange(evt: Event): void;
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
export default Fields;
//# sourceMappingURL=fields.d.ts.map