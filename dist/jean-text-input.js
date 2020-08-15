!function(t,e){"function"==typeof define&&define.amd?define([],e):(t.TextInput=t.TextInput||{},t.TextInput=e())}(this,function(){var t,e;return function(n){function r(t){for(var e=0,n=[];e<t.length;e++){var r=s.resolved[t[e]];r&&n.push(r)}return n}function i(){for(var t in s.unresolved){var e=s.unresolved[t],n=r(e.dependencies);o(t,e.factory,e.dependencies,n,!1)}}function o(t,e,n,r,i){if(r.length===n.length){var o=e.apply(e,r);s.resolved[t]=o||{}}else i&&(s.unresolved[t]={dependencies:n,factory:e})}var s={resolved:{},unresolved:{}};e=function(t,e,n){return s.resolved[t]?void console.warn("There is already a module with id <"+t+"> defined. Therefore this module will be ignored"):"string"==typeof t&&Array.isArray(e)&&"function"==typeof n?(0===e.length?o(t,n,e,[],!1):o(t,n,e,r(e),!0),void i()):void console.warn("Passed arguments for module are invalid")},e.amd={},t=function(t,e){t=Array.isArray(t)?t:[t];var n=r(t);if(1===n.length&&!e)return n[0];if(n.length!==t.length||!e)throw new Error("Not all modules are resolved");e.apply(e,n)}}(),e("node_modules/jean-amd/dist/jean-amd",function(){}),e("TypeCheck",[],function(){return{isString:function(t){return"string"==typeof t},isBoolean:function(t){return"boolean"==typeof t},isNumber:function(t){return"number"==typeof t},isObject:function(t){return!this.isArray(t)&&null!==t&&"object"==typeof t},isEmptyObject:function(t){var e=!1;return this.isObject(t)&&0===Object.keys(t).length&&(e=!0),e},isFunction:function(t){return"function"==typeof t},isDefined:function(t){return void 0!==t&&null!=t},isArray:function(t){return Array.isArray(t)},isEmptyArray:function(t){return this.isArray(t)&&0===t.length},isArrayTypeOf:function(t,e){var n=!0;if(!this.isString(e))throw new TypeError("options.type is not a string");if(!Array.isArray(t))throw new TypeError("options.array is not an array");0===t.length&&(n=!1);for(var r=0,i=t.length;r<i;r++){if(typeof t[r]!==e){n=!1;break}}return n},areObjectsInstanceOf:function(t,e){if(!this.isArray(t))throw new TypeError("array is not an array");if(!this.isFunction(e))throw new TypeError("fn is not a function");var n,r,i=t.length,o=!0;for(n=0;n<i;n++)if(r=t[n],!this.isObject(r)||!this.isInstanceOf(r,e)){o=!1;break}return o},areObjectsInstancesOf:function(t,e){var n,r,i,o,s=t.length,a=e.length,u=!0;if(!this.isArray(t))throw new TypeError("objects is not an array");if(!this.isArray(e))throw new TypeError("constructors is not an array");if(!this.isArrayTypeOf(e,"function"))throw new TypeError("constructors is not an array of constructor functions");for(n=0;n<s;n++){for(i=t[n],o=!0,r=0;r<a&&this.isObject(i);r++)if(this.isInstanceOf(i,e[r])){o=!1;break}if(!0===o){u=!1;break}}return u},isInstanceOf:function(t,e){if(!this.isObject(t))throw new TypeError("child is not an object");if(!this.isFunction(e))throw new TypeError("parent is not a function");return t instanceof e},isEnumValue:function(t,e){if(!this.isDefined(t))return!1;if(!this.isString(t)&&!this.isNumber(t))throw new TypeError("value must be a String or a Number");if(!this.isObject(e))throw new TypeError("o is not an object");var n,r=Object.keys(e),i=r.length,o=!1;for(n=0;n<i;n++)if(e[r[n]]===t){o=!0;break}return o}}}),e("Failure",[],function(){return{throwError:function(t){throw new Error(t)},throwTypeError:function(t){throw new TypeError(t)}}}),e("DomUtil",["TypeCheck","Failure"],function(t,e){return{createElementFromMarkup:function(n){t.isString(n)||e.throwTypeError("html is not a string");var r=document.createElement("div");return r.innerHTML=n.trim(),r.firstChild},isInViewPort:function(n){t.isInstanceOf(n,HTMLElement)||e.throwTypeError("element is not an instance of HTMLElement");var r=n.getBoundingClientRect();return r.top+r.height>0&&r.top<window.innerHeight},getChildById:function(n,r){t.isInstanceOf(n,HTMLElement)||e.throwTypeError("element is no instance of HTMLElement"),t.isString(r)||e.throwTypeError("id is not a string");var i,o,s=n.children,a=s.length,u=null;for(i=0;i<a;i++)if(o=s[i],o.id===r)return o;for(i=0;i<a;i++)if(u=this.getChildById(s[i],r),t.isDefined(u))return u;return null},getChildByClass:function(n,r){t.isInstanceOf(n,HTMLElement)||e.throwTypeError("element is no instance of HTMLElement"),t.isString(r)||e.throwTypeError("className is not a string");var i,o,s=n.children,a=s.length,u=null;for(i=0;i<a;i++)if(o=s[i],o.classList.contains(r))return o;for(i=0;i<a;i++)if(u=this.getChildByClass(s[i],r),t.isDefined(u))return u;return null},getAncestorById:function(n,r){return t.isInstanceOf(n,HTMLElement)||e.throwTypeError("element is no instance of HTMLElement"),t.isString(r)||e.throwTypeError("id is not a string"),t.isDefined(n.parentElement)?n.parentElement.id===r?n.parentElement:this.getAncestorById(n.parentElement,r):null},getAncestorByClass:function(n,r){return t.isInstanceOf(n,HTMLElement)||e.throwTypeError("element is no instance of HTMLElement"),t.isString(r)||e.throwTypeError("className is not a string"),t.isDefined(n.parentElement)?n.parentElement.classList.contains(r)?n.parentElement:this.getAncestorByClass(n.parentElement,r):null},getElementCoordinates:function(n){t.isInstanceOf(n,HTMLElement)||e.throwTypeError("element is no instance of HTMLElement");var r=n.getBoundingClientRect(),i=document.body,o=document.documentElement,s=window.pageYOffset||o.scrollTop||i.scrollTop,a=window.pageXOffset||o.scrollLeft||i.scrollLeft,u=o.clientTop||i.clientTop||0,c=o.clientLeft||i.clientLeft||0,l=r.top+s-u,f=r.left+a-c,h=document.clientWidth,p=document.clientHeight,d=n.clientWidth,f=f+d+2,y=h-f+d+2,m=p-r.bottom;return{top:Math.round(l),right:Math.round(y),bottom:Math.round(m),left:Math.round(f)}}}}),e("DomElement",["TypeCheck","Failure","DomUtil"],function(t,e,n){var r=function(r){this.options=t.isDefined(r)?r:e.throwTypeError("options is undefined"),this.element=t.isString(r.html)?n.createElementFromMarkup(r.html):e.throwTypeError("options.html is not a string")};return r.prototype.attachToDom=function(){return this.element.style.display="block",!0},r.prototype.detachFromDom=function(){return this.element.style.display="none",!0},r}),e("Inheritance",["TypeCheck"],function(t){return{inheritConstructor:function(e,n,r){var i=!1,r=r||{};return t.isFunction(e)&&t.isObject(n)&&(Array.isArray(r)?e.apply(n,r):e.apply(n,[r]),i=!0),i},inheritPrototype:function(e,n){var r=!1;return t.isFunction(e)&&t.isFunction(n)&&(e.prototype=Object.create(n.prototype),e.prototype.constructor=e,r=!0),r}}}),e("Merge",["TypeCheck","Failure"],function(t,e){return function(n,r){t.isObject(n)&&t.isObject(r)||e.throwTypeError("defaultOptions or options is not an object");var i,o,s={},a=Object.keys(r),u=a.length,c=Object.keys(n),l=c.length;for(i=0;i<l;i++)o=c[i],s[o]=n[o];for(i=0;i<u;i++)o=a[i],s[o]=r[o];return s}}),e("normalize",[],function(){function t(t,r,i){if(t.match(a)||t.match(s))return t;t=o(t);var u=i.match(s),c=r.match(s);return!c||u&&u[1]==c[1]&&u[2]==c[2]?n(e(t,r),i):e(t,r)}function e(t,e){if("./"==t.substr(0,2)&&(t=t.substr(2)),t.match(a)||t.match(s))return t;var n=e.split("/"),r=t.split("/");for(n.pop();curPart=r.shift();)".."==curPart?n.pop():n.push(curPart);return n.join("/")}function n(t,e){var n=e.split("/");for(n.pop(),e=n.join("/")+"/",i=0;e.substr(i,1)==t.substr(i,1);)i++;for(;"/"!=e.substr(i,1);)i--;e=e.substr(i+1),t=t.substr(i+1),n=e.split("/");var r=t.split("/");for(out="";n.shift();)out+="../";for(;curPart=r.shift();)out+=curPart+"/";return out.substr(0,out.length-1)}var r=/([^:])\/+/g,o=function(t){return t.replace(r,"$1/")},s=/[^\:\/]*:\/\/([^\/])*/,a=/^(\/|data:)/,u=function(e,n,r){n=o(n),r=o(r);for(var i,s,e,a=/@import\s*("([^"]*)"|'([^']*)')|url\s*\((?!#)\s*(\s*"([^"]*)"|'([^']*)'|[^\)]*\s*)\s*\)/gi;i=a.exec(e);){s=i[3]||i[2]||i[5]||i[6]||i[4];var u;u=t(s,n,r);var c=i[5]||i[6]?1:0;e=e.substr(0,a.lastIndex-s.length-c-1)+u+e.substr(a.lastIndex-c-1),a.lastIndex=a.lastIndex+(u.length-s.length)}return e};return u.convertURIBase=t,u.absoluteURI=e,u.relativeURI=n,u}),e("css",[],function(){if("undefined"==typeof window)return{load:function(t,e,n){n()}};var t=document.getElementsByTagName("head")[0],e=window.navigator.userAgent.match(/Trident\/([^ ;]*)|AppleWebKit\/([^ ;]*)|Opera\/([^ ;]*)|rv\:([^ ;]*)(.*?)Gecko\/([^ ;]*)|MSIE\s([^ ;]*)|AndroidWebKit\/([^ ;]*)/)||0,n=!1,r=!0;e[1]||e[7]?n=parseInt(e[1])<6||parseInt(e[7])<=9:e[2]||e[8]||"WebkitAppearance"in document.documentElement.style?r=!1:e[4]&&(n=parseInt(e[4])<18);var i={};i.pluginBuilder="./css-builder";var o,s,a,u=function(){o=document.createElement("style"),t.appendChild(o),s=o.styleSheet||o.sheet},c=0,l=[],f=function(t){s.addImport(t),o.onload=function(){h()},31==++c&&(u(),c=0)},h=function(){a();var t=l.shift();if(!t)return void(a=null);a=t[1],f(t[0])},p=function(t,e){if(s&&s.addImport||u(),s&&s.addImport)a?l.push([t,e]):(f(t),a=e);else{o.textContent='@import "'+t+'";';var n=setInterval(function(){try{o.sheet.cssRules,clearInterval(n),e()}catch(t){}},10)}},d=function(e,n){var i=document.createElement("link");if(i.type="text/css",i.rel="stylesheet",r)i.onload=function(){i.onload=function(){},setTimeout(n,7)};else var o=setInterval(function(){for(var t=0;t<document.styleSheets.length;t++){if(document.styleSheets[t].href==i.href)return clearInterval(o),n()}},10);i.href=e,t.appendChild(i)};return i.normalize=function(t,e){return".css"==t.substr(t.length-4,4)&&(t=t.substr(0,t.length-4)),e(t)},i.load=function(t,e,r,i){(n?p:d)(e.toUrl(t+".css"),r)},i}),e("css!textinput-css",[],function(){}),e("src/TextInput",["DomElement","DomUtil","Inheritance","TypeCheck","Failure","Merge","css!textinput-css"],function(t,e,n,r,i,o){var s=function(i){n.inheritConstructor(t,this,o({html:'<div class="jean-text-input"><input class="input" type="text" /></div>',id:r.isString(i.id)?i.id:"",onValueChanged:r.isFunction(i.onValueChanged)?i.onValueChanged:function(){}},r.isDefined(i)?i:{})),this.input=e.getChildByClass(this.element,"input"),this.input.addEventListener("input",this._onValueChanged.bind(this)),this.element.setAttribute("id",this.options.id)};return n.inheritPrototype(s,t),s.prototype.setValue=function(t){this.input.value=t},s.prototype.getValue=function(t){return this.input.value},s.prototype.removeValue=function(){this.input.value=""},s.prototype._onValueChanged=function(){this.options.onValueChanged(this.input.value)},s}),function(t){var e=document,n="appendChild",r="styleSheet",i=e.createElement("style");i.type="text/css",e.getElementsByTagName("head")[0][n](i),i[r]?i[r].cssText=t:i[n](e.createTextNode(t))}(".jean-text-input {\n  padding: 5px;\n}\n.jean-text-input input {\n  color: white;\n  border-radius: 5px;\n  border: 1px solid white;\n  background: transparent;\n  width: 100%;\n}\n"),t("src/TextInput")});