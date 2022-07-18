# Tool Cool Picker

Tool Cool Color Picker is a  color picker library written in typescript and using web component technologies.

## Including in a browser

Download [toolcool-color-picker.min.js](https://github.com/toolcool-org/toolcool-color-picker/blob/main/dist/toolcool-color-picker.min.js)

Add the following html to the page:
```html
<toolcool-color-picker color="#e76ff1"></toolcool-color-picker>

<script type='text/javascript' src='toolcool-color-picker.min.js'></script>
```

## Usage
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
