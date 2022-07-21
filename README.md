# Tool Cool Color Picker

[![GitHub license](https://img.shields.io/github/license/toolcool-org/toolcool-color-picker)](https://github.com/toolcool-org/toolcool-color-picker/blob/main/LICENSE) 
![GitHub package.json version](https://img.shields.io/github/package-json/v/toolcool-org/toolcool-color-picker)
[![NPM](https://img.shields.io/badge/npm-color_picker-brightgreen)](https://www.npmjs.com/package/toolcool-color-picker)
[![Twitter](https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2Ftoolcool-org%2Ftoolcool-color-picker)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Ftoolcool-org%2Ftoolcool-color-picker)


Tool Cool Color Picker is a color picker library written in typescript and using web component technologies. [Check out the demo at https://toolcool.org/toolcool-color-picker/](https://toolcool.org/toolcool-color-picker/)

![Tool Cool Color Picker](https://github.com/toolcool-org/toolcool-color-picker/blob/main/examples/img/preview/preview-1.png?raw=true)

## Basic usage in a browser

Download the latest [toolcool-color-picker.min.js](https://github.com/toolcool-org/toolcool-color-picker/blob/main/dist/toolcool-color-picker.min.js) script:

Add the following html to the page:
```html
<toolcool-color-picker color="#e76ff1"></toolcool-color-picker>

<script type="text/javascript" src="toolcool-color-picker.min.js"></script>
```

Or with other color formats:

```html
<toolcool-color-picker color="rgb(96, 245, 66)"></toolcool-color-picker>
<toolcool-color-picker color="rgba(96, 245, 66, 1)"></toolcool-color-picker>
<toolcool-color-picker color="hsv(110, 73%, 96%)"></toolcool-color-picker>
<toolcool-color-picker color="hsva(110, 73%, 96%, 1)"></toolcool-color-picker>
<toolcool-color-picker color="hsl(110, 90%, 61%)"></toolcool-color-picker>
<toolcool-color-picker color="hsla(110, 90%, 61%, 1)"></toolcool-color-picker>

<script type="text/javascript" src="toolcool-color-picker.min.js"></script>
```

Color picker popup can be aligned to the right:

```html
<toolcool-color-picker color="rgb(255, 200, 10)" popup-position="right"></toolcool-color-picker>
```

## CDN
[![](https://data.jsdelivr.com/v1/package/npm/toolcool-color-picker/badge?style=rounded)](https://www.jsdelivr.com/package/npm/toolcool-color-picker)

The ToolCool Color Picker is also available in the [jsDelivr CND](https://www.jsdelivr.com/package/npm/toolcool-color-picker): 

```html
<toolcool-color-picker color="#e76ff1"></toolcool-color-picker>

<script src="https://cdn.jsdelivr.net/npm/toolcool-color-picker/dist/toolcool-color-picker.min.js"></script>
```

## Node.js usage

Color picker may also be included as a [node module](https://www.npmjs.com/package/toolcool-color-picker) like this:

`npm i toolcool-color-picker`

And then you can include it in your application like this:

```js
import 'toolcool-color-picker';
```

NPM package can fe found [here](https://www.npmjs.com/package/toolcool-color-picker).

## APIs
You can control the color picker by referencing the `toolcool-color-picker` HTML tag.

```html
<toolcool-color-picker color="#e76ff1" id="color-picker-1"></toolcool-color-picker>

<script type='text/javascript' src='toolcool-color-picker.min.js'></script>
<script>
    // get the reference
    const $colorPicker = document.getElementById('color-picker-1');
    
    // change color
    $colorPicker.color = '#60f542';
    
    // get color
    console.log($colorPicker.rgba);
</script>
```

## APIs: Listen to the change event

```js
// listen to the color change event
const $colorPicker = document.getElementById('color-picker');

// @param {evt} CustomEvent
$colorPicker.addEventListener('change', (evt) => {
    
    console.log(evt.detail.hex);
    console.log(evt.detail.hex8);
    console.log(evt.detail.rgb);
    console.log(evt.detail.rgba);
    console.log(evt.detail.hsl);
    console.log(evt.detail.hsla);
    console.log(evt.detail.hsv);
    console.log(evt.detail.hsva);
    console.log(evt.detail.color);
});
```

## APIs: Change Color
The color picker uses the awesome [TinyColor library](https://github.com/scttcper/tinycolor) for color manipulation. Each color format supported by the TinyColor library can be passed in a color property:

```js
const $colorPicker = document.getElementById('color-picker');

// HEX format
$colorPicker.color = '#60f542';

// OR HEX with opacity
$colorPicker.color = '#60f542ff';

// OR rgb
$colorPicker.color = 'rgb(96, 245, 66)';

// OR rgb with opacity
$colorPicker.color = 'rgba(96, 245, 66, 1)';

// OR hsv
$colorPicker.color = 'hsv(110, 73%, 96%)';

// OR hsv with opacity
$colorPicker.color = 'hsva(110, 73%, 96%, 1)';

// OR hsl
$colorPicker.color = 'hsl(110, 90%, 61%)';

// OR hsl with opacity
$colorPicker.color = 'hsla(110, 90%, 61%, 1)';
```

## APIs: Get current color in different formats

```js
const $colorPicker = document.getElementById('color-picker');
$colorPicker.color = '#367E95';

console.log($colorPicker.hex); // #367E95

console.log($colorPicker.hex8); // #367E95FF

console.log($colorPicker.rgb); // rgb(54, 126, 149)

console.log($colorPicker.rgba); // rgba(54, 126, 149, 1)

console.log($colorPicker.hsl); // hsl(195, 47%, 40%)

console.log($colorPicker.hsla); // hsla(195, 47%, 40%, 1)

console.log($colorPicker.hsv); // hsv(195, 64%, 58%)

console.log($colorPicker.hsva); // hsva(195, 64%, 58%, 1)
```

You can also access the color object of the [TinyColor library](https://github.com/scttcper/tinycolor). It should only be used to get color values and should not be modified directly.

```js
console.log($colorPicker.color); 
```

## APIs: Popup

Open or close color picker popup with the following API:

```html
<toolcool-color-picker color="#e76ff1" id="color-picker"></toolcool-color-picker>
<script src="js/toolcool-color-picker.min.js"></script>

<script>
    const $colorPicker = document.getElementById('color-picker');

    // open color picker popup
    $colorPicker.opened = true;

    // close color picker popup
    $colorPicker.opened = false;
</script>
```

## Styles
It's possible to control color picker styles through CSS variables:

```css
:root{
    /* button */
    --tool-cool-color-picker-btn-bg: #b9b9b9;
    --tool-cool-color-picker-btn-border-color: #000;
    --tool-cool-color-picker-btn-border-color-inner: #363636;
    --tool-cool-color-picker-btn-border-radius: 1rem;
    --tool-cool-color-picker-btn-border-radius-inner: 1rem;

    /* popup */
    --tool-cool-color-picker-popup-bg: #b9b9b9;
    --tool-cool-color-picker-popup-border-color: #000;

    /* fields */
    --tool-cool-color-picker-field-border-color: #363636;
    --tool-cool-color-picker-field-label-color: #1a3c6e;
}
```

It's also possible to use CSS variables as inline styles in the following way:

```html
<toolcool-color-picker 
        color="rgb(255, 200, 10)" 
        style="--tool-cool-color-picker-btn-bg: #fff"></toolcool-color-picker>
```


## TypeScript Usage

```typescript
import 'toolcool-color-picker';
import ColorPicker from 'toolcool-color-picker/src/app/color-picker';

// ...

const $colorPicker = document.getElementById('get-color-picker') as ColorPicker;

$colorPicker.addEventListener('change', (evt: Event) => {
    const customEvent = evt as CustomEvent;
    console.log(customEvent.detail.rgba);
});

$colorPicker.hex = '#fefefe';
```

## Usage with React and TypeScript

```typescript
import 'toolcool-color-picker';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'toolcool-color-picker': any;
        }
    }
}

const ColorPickerExample = () => {

    const colorPickerRef = useRef<HTMLElement>();

    useEffect(() => {

        const colorPicker = colorPickerRef.current;

        const onColorChange = (evt: Event) => {
            const customEvent = evt as CustomEvent;
            console.log(customEvent.detail.rgba);
        };

        colorPicker?.addEventListener('change', onColorChange);

        return () => {
            colorPicker?.removeEventListener('change', onColorChange);
        };
    }, []);

    return (
        &lt;toolcool-color-picker ref={ colorPickerRef }  color="#efefef" /&gt;
    )
};

export default ColorPickerExample;
```

## Credits
An awesome [TinyColor Library](https://github.com/scttcper/tinycolor)

## License

[MIT license](https://github.com/toolcool-org/toolcool-color-picker/blob/main/LICENSE)