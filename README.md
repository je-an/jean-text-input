## Description

Provides basic text input

## Support
Supports AMD eco system. If there is no loader, TextInput is registered as a browser variable.

## Code Example
- Use it as browser variable
```js
 var input = new TextInput({
    id: "InputID",
    onInputChanged: function (value){
        console.log(value);
    }
});
document.getElementById("jean-text-input-container").appendChild(input.element);
// Set a value to the input 
 control.setValue("hello world");
// Get the value from the control 
 var value = control.getValue();
```
- Use it with require.js
```js
require(["path/to/TextInput"], function(TextInput){
    // Work with TextInput
     
});
```

## Style
- The control comes with build-in styles, which will programmatically be injected into the page head as style tag. 
- For custom styling add own styles to the end of the body.

## Installation

`npm install jean-text-input --save --legacy-bundling`

## API Reference

### TextInput Constructor

**Options**
- **id**: `String` - `optional` - Id of the text input
- **onValueChanged**: `Function` - `optional` - Get's called if the value changes


### TextInput.setValue(value) 

Sets the provided value 

**Parameters**
- **value**: `Number|String` -  value to be set to text input


### TextInput.getValue() 

Returns the value of the input

**Returns**
- `String` - value of the input


## Tests

- Open spec/spec-runner.html in browser to see the test cases.
- Open example/index.html in your web browser for an example implementation.

## License

MIT