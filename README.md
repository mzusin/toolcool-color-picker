# Tool Cool Color Picker

Tool Cool Color Picker is a color picker library written in typescript and using web component technologies.

![Tool Cool Color Picker](https://github.com/toolcool-org/toolcool-color-picker/blob/main/examples/img/preview/preview-1.png?raw=true)

## Basic usage in a browser

Download [toolcool-color-picker.min.js](https://github.com/toolcool-org/toolcool-color-picker/blob/main/dist/toolcool-color-picker.min.js)

Add the following html to the page:
```html
<toolcool-color-picker color="#e76ff1"></toolcool-color-picker>

<script type='text/javascript' src='toolcool-color-picker.min.js'></script>
```

Or with other color formats:

```html
<toolcool-color-picker color="rgb(96, 245, 66)"></toolcool-color-picker>
<toolcool-color-picker color="rgba(96, 245, 66, 1)"></toolcool-color-picker>
<toolcool-color-picker color="hsv(110, 73%, 96%)"></toolcool-color-picker>
<toolcool-color-picker color="hsva(110, 73%, 96%, 1)"></toolcool-color-picker>
<toolcool-color-picker color="hsl(110, 90%, 61%)"></toolcool-color-picker>
<toolcool-color-picker color="hsla(110, 90%, 61%, 1)"></toolcool-color-picker>

<script type='text/javascript' src='toolcool-color-picker.min.js'></script>
```

Color picker popup can be aligned to the right:

```html
<toolcool-color-picker color="rgb(255, 200, 10)" popup-position="right"></toolcool-color-picker>
```

## Node.js usage

Color picker may also be included as a [node](http://nodejs.org/) module like this:

`npm i toolcool-color-picker`

Then it can be used in your application like this:

```js
var tinycolor = require("tinycolor2");
var color = tinycolor("red");
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

Open cor close color picker popup with the following API:

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

