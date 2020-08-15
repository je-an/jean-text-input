define(
    [
        "DomElement",
        "DomUtil",
        "Inheritance",
        "TypeCheck",
        "Failure",
        "Merge",
        "text!textinput-html",
        "css!textinput-css"
    ], function (DomElement, DomUtil, Inheritance, TypeCheck, Failure, Merge, controlHtml) {
        /**
         * Provides basic text input 
         * @alias TextInput 
         * @constructor
         * @param {Object} options - options object
         */
        var TextInput = function(options) {
            var defaultOptions = {};
            Inheritance.inheritConstructor(DomElement, this, Merge({
                html: controlHtml,
            }, TypeCheck.isDefined(options) ? options : {}));

        };
        Inheritance.inheritPrototype(TextInput, DomElement);
        return TextInput;
    });