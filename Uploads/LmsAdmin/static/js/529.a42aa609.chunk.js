(self.webpackChunklead_management_system_dashboard=self.webpackChunklead_management_system_dashboard||[]).push([[529],{54406:function(e,t,r){"use strict";var n=r(64836);t.Z=void 0;var o=n(r(45045)),a=r(46417),i=(0,o.default)((0,a.jsx)("path",{d:"m7 10 5 5 5-5z"}),"ArrowDropDown");t.Z=i},12751:function(e,t,r){"use strict";var n=r(64836);t.Z=void 0;var o=n(r(45045)),a=r(46417),i=(0,o.default)((0,a.jsx)("path",{d:"m7 14 5-5 5 5z"}),"ArrowDropUp");t.Z=i},42042:function(e,t,r){"use strict";var n=r(64836);t.Z=void 0;var o=n(r(45045)),a=r(46417),i=(0,o.default)([(0,a.jsx)("path",{d:"M8 7h11v14H8z",opacity:".3"},"0"),(0,a.jsx)("path",{d:"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"},"1")],"ContentCopyTwoTone");t.Z=i},65954:function(e,t,r){"use strict";var n=r(64836);t.Z=void 0;var o=n(r(45045)),a=r(46417),i=(0,o.default)((0,a.jsx)("path",{d:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"}),"Edit");t.Z=i},29428:function(e,t,r){"use strict";var n=r(64836);t.Z=void 0;var o=n(r(45045)),a=r(46417),i=(0,o.default)((0,a.jsx)("path",{d:"M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"}),"KeyboardArrowDown");t.Z=i},3665:function(e,t,r){"use strict";var n=r(64836);t.Z=void 0;var o=n(r(45045)),a=r(46417),i=(0,o.default)((0,a.jsx)("path",{d:"M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"}),"KeyboardArrowUp");t.Z=i},36114:function(e,t,r){"use strict";var n=r(64836);t.Z=void 0;var o=n(r(45045)),a=r(46417),i=(0,o.default)([(0,a.jsx)("circle",{cx:"12",cy:"8",r:"2.1",opacity:".3"},"0"),(0,a.jsx)("path",{d:"M12 14.9c-2.97 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1z",opacity:".3"},"1"),(0,a.jsx)("path",{d:"M12 13c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6.1 5.1H5.9V17c0-.64 3.13-2.1 6.1-2.1s6.1 1.46 6.1 2.1v1.1zM12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6.1c1.16 0 2.1.94 2.1 2.1 0 1.16-.94 2.1-2.1 2.1S9.9 9.16 9.9 8c0-1.16.94-2.1 2.1-2.1z"},"2")],"PersonOutlineTwoTone");t.Z=i},92229:function(e,t,r){"use strict";var n=r(43071),o={"text/plain":"Text","text/html":"Url",default:"Text"};e.exports=function(e,t){var r,a,i,c,u,l,f=!1;t||(t={}),r=t.debug||!1;try{if(i=n(),c=document.createRange(),u=document.getSelection(),(l=document.createElement("span")).textContent=e,l.ariaHidden="true",l.style.all="unset",l.style.position="fixed",l.style.top=0,l.style.clip="rect(0, 0, 0, 0)",l.style.whiteSpace="pre",l.style.webkitUserSelect="text",l.style.MozUserSelect="text",l.style.msUserSelect="text",l.style.userSelect="text",l.addEventListener("copy",(function(n){if(n.stopPropagation(),t.format)if(n.preventDefault(),"undefined"===typeof n.clipboardData){r&&console.warn("unable to use e.clipboardData"),r&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var a=o[t.format]||o.default;window.clipboardData.setData(a,e)}else n.clipboardData.clearData(),n.clipboardData.setData(t.format,e);t.onCopy&&(n.preventDefault(),t.onCopy(n.clipboardData))})),document.body.appendChild(l),c.selectNodeContents(l),u.addRange(c),!document.execCommand("copy"))throw new Error("copy command was unsuccessful");f=!0}catch(s){r&&console.error("unable to copy using execCommand: ",s),r&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),t.onCopy&&t.onCopy(window.clipboardData),f=!0}catch(s){r&&console.error("unable to copy using clipboardData: ",s),r&&console.error("falling back to prompt"),a=function(e){var t=(/mac os x/i.test(navigator.userAgent)?"\u2318":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,t)}("message"in t?t.message:"Copy to clipboard: #{key}, Enter"),window.prompt(a,e)}}finally{u&&("function"==typeof u.removeRange?u.removeRange(c):u.removeAllRanges()),l&&document.body.removeChild(l),i()}return f}},68904:function(e,t,r){"use strict";function n(e){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},n(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.CopyToClipboard=void 0;var o=c(r(47313)),a=c(r(92229)),i=["text","onCopy","options","children"];function c(e){return e&&e.__esModule?e:{default:e}}function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){m(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function f(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function p(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function d(e,t){return d=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},d(e,t)}function y(e){var t=function(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var r,n=h(e);if(t){var o=h(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return b(this,r)}}function b(e,t){if(t&&("object"===n(t)||"function"===typeof t))return t;if(void 0!==t)throw new TypeError("Derived constructors may only return object or undefined");return v(e)}function v(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function h(e){return h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},h(e)}function m(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var g=function(e){!function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&d(e,t)}(u,e);var t,r,n,c=y(u);function u(){var e;s(this,u);for(var t=arguments.length,r=new Array(t),n=0;n<t;n++)r[n]=arguments[n];return m(v(e=c.call.apply(c,[this].concat(r))),"onClick",(function(t){var r=e.props,n=r.text,i=r.onCopy,c=r.children,u=r.options,l=o.default.Children.only(c),f=(0,a.default)(n,u);i&&i(n,f),l&&l.props&&"function"===typeof l.props.onClick&&l.props.onClick(t)})),e}return t=u,(r=[{key:"render",value:function(){var e=this.props,t=(e.text,e.onCopy,e.options,e.children),r=f(e,i),n=o.default.Children.only(t);return o.default.cloneElement(n,l(l({},r),{},{onClick:this.onClick}))}}])&&p(t.prototype,r),n&&p(t,n),Object.defineProperty(t,"prototype",{writable:!1}),u}(o.default.PureComponent);t.CopyToClipboard=g,m(g,"defaultProps",{onCopy:void 0,options:void 0})},33538:function(e,t,r){"use strict";var n=r(68904).CopyToClipboard;n.CopyToClipboard=n,e.exports=n},53245:function(e,t,r){r(47020)},26193:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),a=r(47313),i=(n=a)&&n.__esModule?n:{default:n},c=r(22824),u=r(67334);var l=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.state={},r}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),o(t,[{key:"buildURI",value:function(){return c.buildURI.apply(void 0,arguments)}},{key:"componentDidMount",value:function(){var e=this.props,t=e.data,r=e.headers,n=e.separator,o=e.enclosingCharacter,a=e.uFEFF,i=e.target,c=e.specs,u=e.replace;this.state.page=window.open(this.buildURI(t,a,r,n,o),i,c,u)}},{key:"getWindow",value:function(){return this.state.page}},{key:"render",value:function(){return null}}]),t}(i.default.Component);l.defaultProps=Object.assign(u.defaultProps,{target:"_blank"}),l.propTypes=u.propTypes,t.default=l},92332:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,o=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},a=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=r(47313),c=(n=i)&&n.__esModule?n:{default:n},u=r(22824),l=r(67334);var f=function(e){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.buildURI=r.buildURI.bind(r),r}return function(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),a(t,[{key:"buildURI",value:function(){return u.buildURI.apply(void 0,arguments)}},{key:"handleLegacy",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];if(window.navigator.msSaveOrOpenBlob){e.preventDefault();var r=this.props,n=r.data,o=r.headers,a=r.separator,i=r.filename,c=r.enclosingCharacter,l=r.uFEFF,f=t&&"function"===typeof n?n():n,s=new Blob([l?"\ufeff":"",(0,u.toCSV)(f,o,a,c)]);return window.navigator.msSaveBlob(s,i),!1}}},{key:"handleAsyncClick",value:function(e){var t=this;this.props.onClick(e,(function(r){!1!==r?t.handleLegacy(e,!0):e.preventDefault()}))}},{key:"handleSyncClick",value:function(e){!1===this.props.onClick(e)?e.preventDefault():this.handleLegacy(e)}},{key:"handleClick",value:function(){var e=this;return function(t){if("function"===typeof e.props.onClick)return e.props.asyncOnClick?e.handleAsyncClick(t):e.handleSyncClick(t);e.handleLegacy(t)}}},{key:"render",value:function(){var e=this,t=this.props,r=t.data,n=t.headers,a=t.separator,i=t.filename,u=t.uFEFF,l=t.children,f=(t.onClick,t.asyncOnClick,t.enclosingCharacter),s=function(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r}(t,["data","headers","separator","filename","uFEFF","children","onClick","asyncOnClick","enclosingCharacter"]),p="undefined"===typeof window?"":this.buildURI(r,u,n,a,f);return c.default.createElement("a",o({download:i},s,{ref:function(t){return e.link=t},target:"_self",href:p,onClick:this.handleClick()}),l)}}]),t}(c.default.Component);f.defaultProps=l.defaultProps,f.propTypes=l.propTypes,t.default=f},22824:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function n(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}var o=t.isSafari=function(){return/^((?!chrome|android).)*safari/i.test(navigator.userAgent)},a=t.isJsons=function(e){return Array.isArray(e)&&e.every((function(e){return"object"===("undefined"===typeof e?"undefined":r(e))&&!(e instanceof Array)}))},i=t.isArrays=function(e){return Array.isArray(e)&&e.every((function(e){return Array.isArray(e)}))},c=t.jsonsHeaders=function(e){return Array.from(e.map((function(e){return Object.keys(e)})).reduce((function(e,t){return new Set([].concat(n(e),n(t)))}),[]))},u=t.jsons2arrays=function(e,t){var r=t=t||c(e),o=t;a(t)&&(r=t.map((function(e){return e.label})),o=t.map((function(e){return e.key})));var i=e.map((function(e){return o.map((function(t){return l(t,e)}))}));return[r].concat(n(i))},l=t.getHeaderValue=function(e,t){var r=e.replace(/\[([^\]]+)]/g,".$1").split(".").reduce((function(e,t,r,n){var o=e[t];if(void 0!==o&&null!==o)return o;n.splice(1)}),t);return void 0===r?e in t?t[e]:"":r},f=t.elementOrEmpty=function(e){return"undefined"===typeof e||null===e?"":e},s=t.joiner=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:",",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:'"';return e.filter((function(e){return e})).map((function(e){return e.map((function(e){return f(e)})).map((function(e){return""+r+e+r})).join(t)})).join("\n")},p=t.arrays2csv=function(e,t,r,o){return s(t?[t].concat(n(e)):e,r,o)},d=t.jsons2csv=function(e,t,r,n){return s(u(e,t),r,n)},y=t.string2csv=function(e,t,r,n){return t?t.join(r)+"\n"+e:e.replace(/"/g,'""')},b=t.toCSV=function(e,t,r,n){if(a(e))return d(e,t,r,n);if(i(e))return p(e,t,r,n);if("string"===typeof e)return y(e,t,r);throw new TypeError('Data should be a "String", "Array of arrays" OR "Array of objects" ')};t.buildURI=function(e,t,r,n,a){var i=b(e,r,n,a),c=o()?"application/csv":"text/csv",u=new Blob([t?"\ufeff":"",i],{type:c}),l="data:"+c+";charset=utf-8,"+(t?"\ufeff":"")+i,f=window.URL||window.webkitURL;return"undefined"===typeof f.createObjectURL?l:f.createObjectURL(u)}},47020:function(e,t,r){"use strict";var n=a(r(26193)),o=a(r(92332));function a(e){return e&&e.__esModule?e:{default:e}}n.default,o.default},67334:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PropsNotForwarded=t.defaultProps=t.propTypes=void 0;var n,o=r(47313),a=((n=o)&&n.__esModule,r(75192));t.propTypes={data:(0,a.oneOfType)([a.string,a.array,a.func]).isRequired,headers:a.array,target:a.string,separator:a.string,filename:a.string,uFEFF:a.bool,onClick:a.func,asyncOnClick:a.bool,enclosingCharacter:a.string},t.defaultProps={separator:",",filename:"generatedBy_react-csv.csv",uFEFF:!0,asyncOnClick:!1,enclosingCharacter:'"'},t.PropsNotForwarded=["data","headers"]},43071:function(e){e.exports=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,r=[],n=0;n<e.rangeCount;n++)r.push(e.getRangeAt(n));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null}return e.removeAllRanges(),function(){"Caret"===e.type&&e.removeAllRanges(),e.rangeCount||r.forEach((function(t){e.addRange(t)})),t&&t.focus()}}}}]);