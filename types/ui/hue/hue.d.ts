declare class Hue extends HTMLElement {
    private cid;
    private $hue;
    private $pointer;
    private hue;
    static get observedAttributes(): string[];
    constructor();
    render(): void;
    hsvChanged(evt: CustomEvent): void;
    onChange(evt: any): void;
    onKeyDown(evt: KeyboardEvent): void;
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
export default Hue;
//# sourceMappingURL=hue.d.ts.map