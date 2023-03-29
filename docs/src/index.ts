// highlight.static library for highlighting the SVG code
// https://highlightjs.readthedocs.io/en/latest/readme.html?highlight=import#es6-modules-import
import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/tokyo-night-dark.css';
import '../../src/index';
import ColorPicker from '../../src/app/color-picker';

const initHighlight = () => {
    if(!hljs) return;
    hljs.registerLanguage('css', css);
    hljs.registerLanguage('xml', xml);
    hljs.registerLanguage('javascript', javascript);
    hljs.highlightAll();
};

const initGetColorExample = () => {
    const $colorPicker = document.getElementById('get-color-picker') as ColorPicker;
    if(!$colorPicker) return;

    const $placeholder = document.getElementById('get-color-placeholder') as HTMLElement;
    if(!$placeholder) return;

    $placeholder.innerText = $colorPicker.rgba;

    $colorPicker.addEventListener('change', (evt: Event) => {
        const customEvent = evt as CustomEvent;
        $placeholder.innerText = customEvent.detail.rgba;
    });
};

const initChangeEventExample = () => {
    const $colorPicker = document.getElementById('change-event-color-picker') as ColorPicker;
    if(!$colorPicker) return;

    const $hex = document.getElementById('change-event-placeholder-hex') as HTMLElement;
    if(!$hex) return;
    
    $hex.innerText = $colorPicker.hex;

    const $hex8 = document.getElementById('change-event-placeholder-hex8') as HTMLElement;
    if(!$hex8) return;
    
    $hex8.innerText = $colorPicker.hex8;

    const $rgb = document.getElementById('change-event-placeholder-rgb') as HTMLElement;
    if(!$rgb) return;
    
    $rgb.innerText = $colorPicker.rgb;

    const $rgba = document.getElementById('change-event-placeholder-rgba') as HTMLElement;
    if(!$rgba) return;
    
    $rgba.innerText = $colorPicker.rgba;

    const $hsl = document.getElementById('change-event-placeholder-hsl') as HTMLElement;
    if(!$hsl) return;
    
    $hsl.innerText = $colorPicker.hsl;

    const $hsla = document.getElementById('change-event-placeholder-hsla') as HTMLElement;
    if(!$hsla) return;
    
    $hsla.innerText = $colorPicker.hsla;

    const $hsv = document.getElementById('change-event-placeholder-hsv') as HTMLElement;
    if(!$hsv) return;
    
    $hsv.innerText = $colorPicker.hsv;

    const $hsva = document.getElementById('change-event-placeholder-hsva') as HTMLElement;
    if(!$hsva) return;
    
    $hsva.innerText = $colorPicker.hsva;

    $colorPicker.addEventListener('change', (evt: Event) => {
        const customEvent = evt as CustomEvent;

        $hex.innerText = customEvent.detail.hex;
        $hex8.innerText = customEvent.detail.hex8;
        $rgb.innerText = customEvent.detail.rgb;
        $rgba.innerText = customEvent.detail.rgba;
        $hsl.innerText = customEvent.detail.hsl;
        $hsla.innerText = customEvent.detail.hsla;
        $hsv.innerText = customEvent.detail.hsv;
        $hsva.innerText = customEvent.detail.hsva;
    });
};

const initTogglePopupExample = () => {

    let isOpened = false;

    const $colorPicker = document.getElementById('toggle-popup-color-picker') as ColorPicker;
    if(!$colorPicker) return;

    const $btn = document.getElementById('toggle-popup-button');
    if(!$btn) return;

    $btn.addEventListener('click', (evt) => {
        evt.preventDefault();
        evt.stopPropagation();

        isOpened = !isOpened;

        $colorPicker.opened = isOpened;
    });
};

const init = () => {
    initHighlight();
    initGetColorExample();
    initChangeEventExample();
    initTogglePopupExample();
};

document.addEventListener('DOMContentLoaded', init, false);

export {};

