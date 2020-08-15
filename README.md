## Description

Provides basic text input

## Support
Supports AMD eco system. If there is no loader, TextInput is registered as a browser variable.

## Code Example
- Use it as browser variable
```js
var obj = new TextInput();


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
- **placeholder**: `String` - `mandatory` - description


## Tests

- Open spec/spec-runner.html in browser to see the test cases.
- Open example/index.html in your web browser for an example implementation.

## License

MIT