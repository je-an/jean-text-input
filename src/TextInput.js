define(
    [
        "DomElement",
        "DomUtil",
        "Inheritance",
        "TypeCheck",
        "Failure",
        "Merge",
        "css!textinput-css"
    ], function (DomElement, DomUtil, Inheritance, TypeCheck, Failure, Merge) {
        /**
         * Provides basic text input 
         * @alias TextInput 
         * @constructor
         * @param {Object} options - options object
         * @param {Function} [options.id] - Id of the text input
         * @param {Function} [options.onInputChanged] - Get's called when the text input changed
         */
        var TextInput = function (options) {
            var defaultOptions = {};
            Inheritance.inheritConstructor(DomElement, this, Merge({
                html: '<div class="jean-text-input"><input class="input" type="text" /></div>',
                id: TypeCheck.isString(options.id) ? options.id : "",
                onInputChanged: TypeCheck.isFunction(options.onInputChanged) ? options.onInputChanged : function () { }
            }, TypeCheck.isDefined(options) ? options : {}));
            this.input = DomUtil.getChildByClass(this.element, "input");
            this.input.addEventListener("input", this._onInputChanged.bind(this));
            this.element.setAttribute("id", this.options.id);
        };
        Inheritance.inheritPrototype(TextInput, DomElement);
        /** 
         * Sets the provided value 
         * @public
         * @param {Number|String} value - value to be set to text input
         */
        TextInput.prototype.setValue = function (value) {
            this.input.value = value;
        };
        /** 
         * Returns the value of the input
         * @public
         * @returns {String} value of the input
         */
        TextInput.prototype.getValue = function (id) {
            return this.input.value;
        };
        /** */
        TextInput.prototype._onInputChanged = function () {
            this.options.onInputChanged(this.input.value);
        };
        return TextInput;
    });