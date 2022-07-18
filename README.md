# Tool Cool Color Picker

Tool Cool Color Picker is a  color picker library written in typescript and using web component technologies.

![Tool Cool Color Picker](https://github.com/toolcool-org/toolcool-color-picker/blob/main/examples/img/preview/preview-1.png?raw=true)

## Basic usage in a browser

Download [toolcool-color-picker.min.js](https://github.com/toolcool-org/toolcool-color-picker/blob/main/dist/toolcool-color-picker.min.js)

Add the following html to the page:
```html
<toolcool-color-picker color="#e76ff1"></toolcool-color-picker>

<script type='text/javascript' src='toolcool-color-picker.min.js'></script>
```

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
