(function (root, factory) { 
 	 if (typeof define === 'function' && define.amd) { 
	 	 define([], factory); 
	} else { 
	 	root.TextInput = root.TextInput || {}; 
	 	root.TextInput = factory();
	}
}(this, function() {
var require, define;
(function (window) {
    var modules = { resolved: {}, unresolved: {} };
    function getResolvedModules(dependencies) {
        for (var i = 0, resolvedModules = []; i < dependencies.length; i++) {
            var resolvedModule = modules.resolved[dependencies[i]];
            if (resolvedModule) {
                resolvedModules.push(resolvedModule);
            }
        }
        return resolvedModules;
    }
    function checkUnresolved() {
        for (var id in modules.unresolved) {
            var module = modules.unresolved[id];
            var resolvedModules = getResolvedModules(module.dependencies);
            resolve(id, module.factory, module.dependencies, resolvedModules, false);
        }
    }
    function resolve(id, factory, dependencies, resolvedModules, saveUnresolved) {
        if (resolvedModules.length === dependencies.length) {
            var mod = factory.apply(factory, resolvedModules);
            modules.resolved[id] = mod ? mod : {};
        } else if (saveUnresolved) {
            modules.unresolved[id] = {
                dependencies: dependencies,
                factory: factory
            }
        }
    }
    define = function (id, dependencies, factory) {
        if (modules.resolved[id]) {
            console.warn("There is already a module with id <" + id + "> defined. Therefore this module will be ignored");
            return;
        } else if ((typeof id !== "string") || (!Array.isArray(dependencies)) || (typeof factory !== "function")) {
            console.warn("Passed arguments for module are invalid");
            return;
        }
        if (dependencies.length === 0) {
            resolve(id, factory, dependencies, [], false);
        } else {
            resolve(id, factory, dependencies, getResolvedModules(dependencies), true);
        }
        checkUnresolved();
    };
    define.amd = {}; 
    require = function (dependencies, factory) {
        dependencies = Array.isArray(dependencies) ? dependencies : [dependencies];
        var resolvedModules = getResolvedModules(dependencies);
        if(resolvedModules.length === 1 && !factory){
            return resolvedModules[0];
        }
        if (resolvedModules.length === dependencies.length && factory) {
            factory.apply(factory, resolvedModules);
        } else {
            throw new Error("Not all modules are resolved");
        }
    };
})();
define("node_modules/jean-amd/dist/jean-amd", function(){});

define('TypeCheck',[], function () {
    return {
        /**
         * Checks if provided element type is string
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element type is string, false otherwise
         */
        isString: function (o) {
            return (typeof o === "string") ? true : false;
        },
        /** 
         * Checks if provided element type is boolean
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element type is boolean, false otherwise
         */
        isBoolean: function (o) {
            return (typeof o === "boolean") ? true : false;
        },
        /**
         * Checks if provided element type is boolean
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element type is boolean, false otherwise
         */
        isNumber: function (o) {
            return (typeof o === "number") ? true : false;
        },
        /**
         * Checks if provided element is an object
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element is empty, false otherwise
         */
        isObject: function (o) {
            return !this.isArray(o) && o !== null && typeof o === 'object';
        },
        /**
         * Checks if provided element is an empty object
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element is empty, false otherwise
         */
        isEmptyObject: function (o) {
            var isEmpty = false;
            if (this.isObject(o) && Object.keys(o).length === 0) {
                isEmpty = true;
            }
            return isEmpty;
        },
        /**
        * Checks if provided element is a function
        * @public
        * @memberof TypeCheck
        * @param {Any} o - element to be checked
        * @returns {Boolean} True, if element is a function, false otherwise
        */
        isFunction: function (o) {
            return (typeof o === "function") ? true : false;
        },
        /**
         * Checks if provided element is defined
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} True, if element is defined, false otherwise
         */
        isDefined: function (o) {
            return (o !== undefined && o != null);
        },
        /**
         * Checks if provided element is an array
         * @public 
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} - true if o is an array, false otherwise
         */
        isArray: function (o) {
            return Array.isArray(o);
        },
        /**
         * Check id provided element is an empty array
         * @public
         * @memberof TypeCheck
         * @param {Any} o - element to be checked
         * @returns {Boolean} - True if o is an empty array, false otherwise
         */
        isEmptyArray: function (o) {
            return this.isArray(o) && (o.length === 0);
        },
        /**
         * Checks if all elements in this array have the same type
         * @public
         * @memberof TypeCheck
         * @throws {TypeError} - If options.type is not a string
         * @throws {TypeError} - If options.array is not a string
         * @param {Any[]} array - Array to be checked
         * @param {String} type - Type of elements in this array. Valid values are all which matches 
         *                        to the typeof operator
         * @returns {Boolean} - true if all elements in the array have the same type, false otherwise
         */
        isArrayTypeOf: function (array, type) {
            var isTypeOf = true;
            if (!this.isString(type)) {
                throw new TypeError("options.type is not a string");
            }
            if (!Array.isArray(array)) {
                throw new TypeError("options.array is not an array");
            }
            if (array.length === 0) {
                isTypeOf = false;
            }
            for (var i = 0, length = array.length; i < length; i++) {
                var o = array[i];
                if (typeof o !== type) {
                    isTypeOf = false;
                    break;
                }
            }
            return isTypeOf;
        },
        /**
          * Checks if all objects within array have the same instance
          * @public
          * @memberof TypeCheck
          * @throws {TypeError} - If array is not an array
          * @throws {TypeError} - If constructor is not a function
          * @param {Object[]} array - The array which objects shall be checked
          * @param {Function} fn - the constructor function
          * @returns {Boolean} - True if all elements have the same instance, false otherwise
          */
        areObjectsInstanceOf: function (array, fn) {
            if (!this.isArray(array)) {
                throw new TypeError("array is not an array");
            }
            if (!this.isFunction(fn)) {
                throw new TypeError("fn is not a function");
            }
            var i, o, length = array.length, result = true;
            for (i = 0; i < length; i++) {
                o = array[i];
                if (!this.isObject(o) || !this.isInstanceOf(o, fn)) {
                    result = false;
                    break;
                }
            }
            return result;
        },
        /**
         * Checks if the objects have are instances of the provided constructors
         * @public
         * @memberof TypeCheck
         * @throws {TypeError} - If array is not an array
         * @throws {TypeError} - If constructors is not an array
         * @param {Object[]} objects - The array which objects shall be checked
         * @param {Function[]} constructors - An array of constructor functions
         * @returns {Boolean} - True if all elements have the same instance, false otherwise
         */
        areObjectsInstancesOf: function (objects, constructors) {
            var i, j, o, length = objects.length, constructorLength = constructors.length, result = true, noConstructorMatched;
            if (!this.isArray(objects)) {
                throw new TypeError("objects is not an array");
            }
            if (!this.isArray(constructors)) {
                throw new TypeError("constructors is not an array");
            }
            if (!this.isArrayTypeOf(constructors, "function")) {
                throw new TypeError("constructors is not an array of constructor functions");
            }
            for (i = 0; i < length; i++) {
                o = objects[i];
                noConstructorMatched = true;
                for (j = 0; j < constructorLength; j++) {
                    if (!this.isObject(o)) {
                        break;
                    }
                    if (this.isInstanceOf(o, constructors[j])) {
                        noConstructorMatched = false;
                        break;
                    }
                }
                if (noConstructorMatched === true) {
                    result = false;
                    break;
                }
            }
            return result;
        },
        /**
         * Checks if child is an instance of parent
         * @public
         * @memberof TypeCheck
         * @throws {TypeError} - If child is not an object
         * @throws {TypeError} - If parent is not a function
         * @param {Object} child - The object which shall be checked
         * @param {Function} parent - The function which shall be the constructor
         * @returns {Boolean} - True if child is an instance of parent, false otherwise
         */
        isInstanceOf: function (child, parent) {
            if (!this.isObject(child)) {
                throw new TypeError("child is not an object");
            }
            if (!this.isFunction(parent)) {
                throw new TypeError("parent is not a function");
            }
            return child instanceof parent;
        },
        /**
         * Checks if the provided value is a value of the provided object which is used as an enum
         * @throws {TypeError} - If value is not a string or a number
         * @throws {TypeError} - If o is not an object
         * @param {String|Number} value - the value
         * @param {Object} o - the object which shall be checked
         * @returns {Boolean} - True if value is part of o, false otherwise
         */
        isEnumValue: function (value, o) {
            if (!this.isDefined(value)) {
                return false;
            }
            if (!this.isString(value) && !this.isNumber(value)) {
                throw new TypeError("value must be a String or a Number");
            }
            if (!this.isObject(o)) {
                throw new TypeError("o is not an object");
            }
            var keys = Object.keys(o), length = keys.length, i, isValue = false;
            for (i = 0; i < length; i++) {
                if (o[keys[i]] === value) {
                    isValue = true;
                    break;
                }
            }
            return isValue;
        }
    };
});
define('Failure',[], function () {
    /**
     * Provides error throwing functionality 
     * @alias Failure 
     */
    return {
        /**
         * Throws an Error with the provided errorMessage
         * @throws {Error}
         * @param {String} [errorMessage=String.Empty] - Message which shall be displayed for this Error
         */
        throwError: function (errorMessage) {
            throw new Error(errorMessage);
        },
        /**
         * Throws an TypeError with the provided errorMessage
         * @throws {TypeError}
         * @param {String} [errorMessage=String.Empty] - Message which shall be displayed for this TypeError
         */
        throwTypeError: function (errorMessage) {
            throw new TypeError(errorMessage);
        }
    };
});
define('DomUtil',["TypeCheck", "Failure"], function (TypeCheck, Failure) {
    /**
     * Provides utility functions for DOM elements 
     * @alias DomUtil 
     */
    return {
        /**
        * @throws {TypeError} - if html is not a string
        * @param {String} html - the html markup 
        * @returns {HTMLElement} - the created DOM element
        */
        createElementFromMarkup: function (html) {
            if (!TypeCheck.isString(html)) {
                Failure.throwTypeError("html is not a string");
            }
            var div = document.createElement('div');
            div.innerHTML = html.trim();
            return div.firstChild;
        },
        /**
         * @param {HTMLElement} element - the element which shall be checked
         * @returns {Boolean} - True if element is within the viewport, false otherwise
         */
        isInViewPort: function (element) {
            if (!TypeCheck.isInstanceOf(element, HTMLElement)) {
                Failure.throwTypeError("element is not an instance of HTMLElement");
            }
            var bounds = element.getBoundingClientRect(), isInViewPort = ((bounds.top + bounds.height) > 0) && bounds.top < window.innerHeight;
            return isInViewPort;
        },
        /**
         * gets the child for the matched id
         * @param {HTMLElement} element - the element which childs shall be searched
         * @param {String} id - the id of the child which shall be found
         * @returns {HTMLElement|null} - the matched element or null if no element is found for the
         *                               provided id 
         */
        getChildById: function (element, id) {
            if (!TypeCheck.isInstanceOf(element, HTMLElement)) {
                Failure.throwTypeError("element is no instance of HTMLElement");
            }
            if (!TypeCheck.isString(id)) {
                Failure.throwTypeError("id is not a string");
            }
            var i, childs = element.children, length = childs.length, child, result = null;
            for (i = 0; i < length; i++) {
                child = childs[i];
                if (child.id === id) {
                    return child;
                }
            }
            for (i = 0; i < length; i++) {
                result = this.getChildById(childs[i], id);
                if (TypeCheck.isDefined(result)) {
                    return result;
                }
            }
            return null;
        },
        /**
         * Gets the first child for the matched class
         * @param {HTMLElement} element - the element which childs shall be searched
         * @param {String} className - the class name of the child which shall be found
         * @returns {HTMLElement|null} - the matched element or null if not element is found
         *                               for the provided class name
         */
        getChildByClass: function (element, className) {
            if (!TypeCheck.isInstanceOf(element, HTMLElement)) {
                Failure.throwTypeError("element is no instance of HTMLElement");
            }
            if (!TypeCheck.isString(className)) {
                Failure.throwTypeError("className is not a string");
            }
            var i, childs = element.children, length = childs.length, child, result = null;
            for (i = 0; i < length; i++) {
                child = childs[i];
                if (child.classList.contains(className)) {
                    return child;
                }
            }
            for (i = 0; i < length; i++) {
                result = this.getChildByClass(childs[i], className);
                if (TypeCheck.isDefined(result)) {
                    return result;
                }
            }
            return null;
        },
        /**
         * Gets the first ancestor for the matched id
         * @param {HTMLElement} element - the element which ancestors shall be searched
         * @param {String} id - the id of the ancestor which shall be found
         * @returns {HTMLElement|null} - the matched element or null if no element is found for the
         *                               provided id 
         */
        getAncestorById: function (element, id) {
            if (!TypeCheck.isInstanceOf(element, HTMLElement)) {
                Failure.throwTypeError("element is no instance of HTMLElement");
            }
            if (!TypeCheck.isString(id)) {
                Failure.throwTypeError("id is not a string");
            }
            if (!TypeCheck.isDefined(element.parentElement)) {
                return null;
            }
            if (element.parentElement.id === id) {
                return element.parentElement;
            } else {
                return this.getAncestorById(element.parentElement, id);
            }
        },
        /**
         * Gets the first ancestor for the matched class
         * @param {HTMLElement} element - the element which ancestors shall be searched
         * @param {String} className - the class name of the ancestor which shall be found
         * @returns {HTMLElement|null} - the matched element or null if not element is found
         *                               for the provided class name
         */
        getAncestorByClass: function (element, className) {
            if (!TypeCheck.isInstanceOf(element, HTMLElement)) {
                Failure.throwTypeError("element is no instance of HTMLElement");
            }
            if (!TypeCheck.isString(className)) {
                Failure.throwTypeError("className is not a string");
            }
            if (!TypeCheck.isDefined(element.parentElement)) {
                return null;
            }
            if (element.parentElement.classList.contains(className)) {
                return element.parentElement;
            } else {
                return this.getAncestorByClass(element.parentElement, className);
            }
        },
        /**
         * Gets the coordinates of plain html element
         * @param {HTMLElement} element - plain html element object
         * @returns {Object} - { top: Number, right: Number, bottom: Number, left: Number }
         */
        getElementCoordinates: function (element) {
            if (!TypeCheck.isInstanceOf(element, HTMLElement)) {
                Failure.throwTypeError("element is no instance of HTMLElement");
            }

            var box = element.getBoundingClientRect(),
                body = document.body,
                docEl = document.documentElement,
                scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop,
                scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft,
                clientTop = docEl.clientTop || body.clientTop || 0,
                clientLeft = docEl.clientLeft || body.clientLeft || 0,
                top = box.top + scrollTop - clientTop,
                left = box.left + scrollLeft - clientLeft;

            var docWidth = document.clientWidth,
                docHeight = document.clientHeight,
                elementWidth = element.clientWidth,
                borderWidth = 1 * 2,
                left = left + elementWidth + borderWidth,
                right = docWidth - left + elementWidth + borderWidth,
                bottom = docHeight - box.bottom;

            return { top: Math.round(top), right: Math.round(right), bottom: Math.round(bottom), left: Math.round(left) };
        },
    };
});
define('DomElement',[
    "TypeCheck",
    "Failure",
    "DomUtil"
], function (
    TypeCheck,
    Failure,
    DomUtil
) {
        /**
         * Abstract class for all control with native dom elements 
         * within jean environment 
         * @alias DomElement 
         * @abstract
         * @constructor
         * @throws {TypeError} - if options are undefined
         * @throws {TypeError} - if options.html is not a string
         * @param {Object} options - options object
         * @param {String} options.html - html markup of this element
         */
        var DomElement = function (options) {
            this.options = TypeCheck.isDefined(options) ? options : Failure.throwTypeError("options is undefined");
            this.element = TypeCheck.isString(options.html) ? DomUtil.createElementFromMarkup(options.html) : Failure.throwTypeError("options.html is not a string");
        };
        /** @returns {Boolean} - True if element is attached to DOM */
        DomElement.prototype.attachToDom = function () {
            this.element.style.display = "block";
            return true;
        };
        /** @returns {Boolean} - True if element is detached from DOM */
        DomElement.prototype.detachFromDom = function () {
            this.element.style.display = "none";
            return true;
        };
        return DomElement;
    });
define('Inheritance',["TypeCheck"], function (TypeCheck) {
    return {
        /**
         * Inherits constructor values
         * @param {Function} testator - Testator constructor which must be called for inheritance
         * @param {Object} instance - Instance of the inheritor
         * @param {Any[]|Object} options - Options, which will be passed to the testator
         * @returns {Boolean} - True if constructor values are inherited, false otherwise
         */
        inheritConstructor: function (testator, instance, options) {
            var isInherited = false, options = options ? options : {};
            if (TypeCheck.isFunction(testator) && TypeCheck.isObject(instance)) {
                if (Array.isArray(options)) {
                    testator.apply(instance, options);
                } else {
                    testator.apply(instance, [options]);
                }
                isInherited = true;
            }
            return isInherited;
        },
        /**
         * Inherits prototype from testator to inheritor
         * @param {Function} inheritor - The method which will be inherited from testator
         * @param {Function} testator - The method which pass its prototype to inheritor
         * @returns {Boolean} - True if prototype values are inherited, false otherwise
         */
        inheritPrototype: function (inheritor, testator) {
            var isInherited = false;
            if (TypeCheck.isFunction(inheritor) && TypeCheck.isFunction(testator)) {
                inheritor.prototype = Object.create(testator.prototype);
                inheritor.prototype.constructor = inheritor;
                isInherited = true;
            }
            return isInherited;
        }
    }
});
define('Merge',["TypeCheck", "Failure"], function (TypeCheck, Failure) {
    /**
     * Merges two objects into one 
     * Only able to merge flat objects - no deep copy
     * @throws {TypeError} - defaultOptions or options is not an object
     * @param {Object} defaultOptions - default options provided by system
     * @param {Object} options - options provided by user
     * @returns {Object} - an object with the merged values
     */
    return function merge(defaultOptions, options) {
        if (!TypeCheck.isObject(defaultOptions) || !TypeCheck.isObject(options)) {
            Failure.throwTypeError("defaultOptions or options is not an object");
        }
        var result = {}, i, key,
            optionsKeys = Object.keys(options), optionsLength = optionsKeys.length,
            defaultOptionsKeys = Object.keys(defaultOptions), defaultOptionsLength = defaultOptionsKeys.length;
        for (i = 0; i < defaultOptionsLength; i++) {
            key = defaultOptionsKeys[i];
            result[key] = defaultOptions[key];
        }
        for (i = 0; i < optionsLength; i++) {
            key = optionsKeys[i];
            result[key] = options[key];
        }
        return result;
    }
});
/*
 * css.normalize.js
 *
 * CSS Normalization
 *
 * CSS paths are normalized based on an optional basePath and the RequireJS config
 *
 * Usage:
 *   normalize(css, fromBasePath, toBasePath);
 *
 * css: the stylesheet content to normalize
 * fromBasePath: the absolute base path of the css relative to any root (but without ../ backtracking)
 * toBasePath: the absolute new base path of the css relative to the same root
 * 
 * Absolute dependencies are left untouched.
 *
 * Urls in the CSS are picked up by regular expressions.
 * These will catch all statements of the form:
 *
 * url(*)
 * url('*')
 * url("*")
 * 
 * @import '*'
 * @import "*"
 *
 * (and so also @import url(*) variations)
 *
 * For urls needing normalization
 *
 */

define('normalize',[],function() {
  
  // regular expression for removing double slashes
  // eg http://www.example.com//my///url/here -> http://www.example.com/my/url/here
  var slashes = /([^:])\/+/g
  var removeDoubleSlashes = function(uri) {
    return uri.replace(slashes, '$1/');
  }

  // given a relative URI, and two absolute base URIs, convert it from one base to another
  var protocolRegEx = /[^\:\/]*:\/\/([^\/])*/;
  var absUrlRegEx = /^(\/|data:)/;
  function convertURIBase(uri, fromBase, toBase) {
    if (uri.match(absUrlRegEx) || uri.match(protocolRegEx))
      return uri;
    uri = removeDoubleSlashes(uri);
    // if toBase specifies a protocol path, ensure this is the same protocol as fromBase, if not
    // use absolute path at fromBase
    var toBaseProtocol = toBase.match(protocolRegEx);
    var fromBaseProtocol = fromBase.match(protocolRegEx);
    if (fromBaseProtocol && (!toBaseProtocol || toBaseProtocol[1] != fromBaseProtocol[1] || toBaseProtocol[2] != fromBaseProtocol[2]))
      return absoluteURI(uri, fromBase);
    
    else {
      return relativeURI(absoluteURI(uri, fromBase), toBase);
    }
  };
  
  // given a relative URI, calculate the absolute URI
  function absoluteURI(uri, base) {
    if (uri.substr(0, 2) == './')
      uri = uri.substr(2);

    // absolute urls are left in tact
    if (uri.match(absUrlRegEx) || uri.match(protocolRegEx))
      return uri;
    
    var baseParts = base.split('/');
    var uriParts = uri.split('/');
    
    baseParts.pop();
    
    while (curPart = uriParts.shift())
      if (curPart == '..')
        baseParts.pop();
      else
        baseParts.push(curPart);
    
    return baseParts.join('/');
  };


  // given an absolute URI, calculate the relative URI
  function relativeURI(uri, base) {
    
    // reduce base and uri strings to just their difference string
    var baseParts = base.split('/');
    baseParts.pop();
    base = baseParts.join('/') + '/';
    i = 0;
    while (base.substr(i, 1) == uri.substr(i, 1))
      i++;
    while (base.substr(i, 1) != '/')
      i--;
    base = base.substr(i + 1);
    uri = uri.substr(i + 1);

    // each base folder difference is thus a backtrack
    baseParts = base.split('/');
    var uriParts = uri.split('/');
    out = '';
    while (baseParts.shift())
      out += '../';
    
    // finally add uri parts
    while (curPart = uriParts.shift())
      out += curPart + '/';
    
    return out.substr(0, out.length - 1);
  };
  
  var normalizeCSS = function(source, fromBase, toBase) {

    fromBase = removeDoubleSlashes(fromBase);
    toBase = removeDoubleSlashes(toBase);

    var urlRegEx = /@import\s*("([^"]*)"|'([^']*)')|url\s*\((?!#)\s*(\s*"([^"]*)"|'([^']*)'|[^\)]*\s*)\s*\)/ig;
    var result, url, source;

    while (result = urlRegEx.exec(source)) {
      url = result[3] || result[2] || result[5] || result[6] || result[4];
      var newUrl;
      newUrl = convertURIBase(url, fromBase, toBase);
      var quoteLen = result[5] || result[6] ? 1 : 0;
      source = source.substr(0, urlRegEx.lastIndex - url.length - quoteLen - 1) + newUrl + source.substr(urlRegEx.lastIndex - quoteLen - 1);
      urlRegEx.lastIndex = urlRegEx.lastIndex + (newUrl.length - url.length);
    }
    
    return source;
  };
  
  normalizeCSS.convertURIBase = convertURIBase;
  normalizeCSS.absoluteURI = absoluteURI;
  normalizeCSS.relativeURI = relativeURI;
  
  return normalizeCSS;
});
;
/*
 * Require-CSS RequireJS css! loader plugin
 * 0.1.10
 * Guy Bedford 2014
 * MIT
 */

/*
 *
 * Usage:
 *  require(['css!./mycssFile']);
 *
 * Tested and working in (up to latest versions as of March 2013):
 * Android
 * iOS 6
 * IE 6 - 10
 * Chrome 3 - 26
 * Firefox 3.5 - 19
 * Opera 10 - 12
 * 
 * browserling.com used for virtual testing environment
 *
 * Credit to B Cavalier & J Hann for the IE 6 - 9 method,
 * refined with help from Martin Cermak
 * 
 * Sources that helped along the way:
 * - https://developer.mozilla.org/en-US/docs/Browser_detection_using_the_user_agent
 * - http://www.phpied.com/when-is-a-stylesheet-really-loaded/
 * - https://github.com/cujojs/curl/blob/master/src/curl/plugin/css.js
 *
 */

define('css',[],function() {
  if (typeof window == 'undefined')
    return { load: function(n, r, load){ load() } };

  var head = document.getElementsByTagName('head')[0];

  var engine = window.navigator.userAgent.match(/Trident\/([^ ;]*)|AppleWebKit\/([^ ;]*)|Opera\/([^ ;]*)|rv\:([^ ;]*)(.*?)Gecko\/([^ ;]*)|MSIE\s([^ ;]*)|AndroidWebKit\/([^ ;]*)/) || 0;

  // use <style> @import load method (IE < 9, Firefox < 18)
  var useImportLoad = false;
  
  // set to false for explicit <link> load checking when onload doesn't work perfectly (webkit)
  var useOnload = true;

  // trident / msie
  if (engine[1] || engine[7])
    useImportLoad = parseInt(engine[1]) < 6 || parseInt(engine[7]) <= 9;
  // webkit
  else if (engine[2] || engine[8] || 'WebkitAppearance' in document.documentElement.style)
    useOnload = false;
  // gecko
  else if (engine[4])
    useImportLoad = parseInt(engine[4]) < 18;

  //main api object
  var cssAPI = {};

  cssAPI.pluginBuilder = './css-builder';

  // <style> @import load method
  var curStyle, curSheet;
  var createStyle = function () {
    curStyle = document.createElement('style');
    head.appendChild(curStyle);
    curSheet = curStyle.styleSheet || curStyle.sheet;
  }
  var ieCnt = 0;
  var ieLoads = [];
  var ieCurCallback;
  
  var createIeLoad = function(url) {
    curSheet.addImport(url);
    curStyle.onload = function(){ processIeLoad() };
    
    ieCnt++;
    if (ieCnt == 31) {
      createStyle();
      ieCnt = 0;
    }
  }
  var processIeLoad = function() {
    ieCurCallback();
 
    var nextLoad = ieLoads.shift();
 
    if (!nextLoad) {
      ieCurCallback = null;
      return;
    }
 
    ieCurCallback = nextLoad[1];
    createIeLoad(nextLoad[0]);
  }
  var importLoad = function(url, callback) {
    if (!curSheet || !curSheet.addImport)
      createStyle();

    if (curSheet && curSheet.addImport) {
      // old IE
      if (ieCurCallback) {
        ieLoads.push([url, callback]);
      }
      else {
        createIeLoad(url);
        ieCurCallback = callback;
      }
    }
    else {
      // old Firefox
      curStyle.textContent = '@import "' + url + '";';

      var loadInterval = setInterval(function() {
        try {
          curStyle.sheet.cssRules;
          clearInterval(loadInterval);
          callback();
        } catch(e) {}
      }, 10);
    }
  }

  // <link> load method
  var linkLoad = function(url, callback) {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    if (useOnload)
      link.onload = function() {
        link.onload = function() {};
        // for style dimensions queries, a short delay can still be necessary
        setTimeout(callback, 7);
      }
    else
      var loadInterval = setInterval(function() {
        for (var i = 0; i < document.styleSheets.length; i++) {
          var sheet = document.styleSheets[i];
          if (sheet.href == link.href) {
            clearInterval(loadInterval);
            return callback();
          }
        }
      }, 10);
    link.href = url;
    head.appendChild(link);
  }

  cssAPI.normalize = function(name, normalize) {
    if (name.substr(name.length - 4, 4) == '.css')
      name = name.substr(0, name.length - 4);

    return normalize(name);
  }

  cssAPI.load = function(cssId, req, load, config) {

    (useImportLoad ? importLoad : linkLoad)(req.toUrl(cssId + '.css'), load);

  }

  return cssAPI;
});


define('css!textinput-css',[],function(){});
define(
    'src/TextInput',[
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

(function(c){var d=document,a='appendChild',i='styleSheet',s=d.createElement('style');s.type='text/css';d.getElementsByTagName('head')[0][a](s);s[i]?s[i].cssText=c:s[a](d.createTextNode(c));})
('.jean-text-input {\n  padding: 5px;\n}\n.jean-text-input input {\n  color: white;\n  border-radius: 5px;\n  border: 1px solid white;\n  background: transparent;\n  width: 100%;\n}\n');

 	 return require('src/TextInput'); 
}));
