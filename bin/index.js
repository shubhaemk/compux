#!/usr/bin/env node
/**
 * srcDirectory - Represents source directory
 * componentDirectory - Represents component directory in src
 * argv - Array of passed options
 */"use strict";require("regenerator-runtime/runtime");var _fs=require("fs"),_path=require("path");function asyncGeneratorStep(a,b,c,d,e,f,g){try{var h=a[f](g),i=h.value}catch(a){return void c(a)}h.done?b(i):Promise.resolve(i).then(d,e)}function _asyncToGenerator(a){return function(){var b=this,c=arguments;return new Promise(function(d,e){function f(a){asyncGeneratorStep(h,d,e,f,g,"next",a)}function g(a){asyncGeneratorStep(h,d,e,f,g,"throw",a)}var h=a.apply(b,c);f(void 0)})}}function _toArray(a){return _arrayWithHoles(a)||_iterableToArray(a)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArray(a){if(Symbol.iterator in Object(a)||"[object Arguments]"===Object.prototype.toString.call(a))return Array.from(a)}function _arrayWithHoles(a){if(Array.isArray(a))return a}var componentName,componentNameCc,srcDirectory=(0,_path.resolve)(process.cwd(),"src"),componentsDirectory=(0,_path.resolve)(srcDirectory,"components"),_process$argv=_toArray(process.argv),argv=_process$argv.slice(2),checkComponentName=function(a){//RegExp('[a-zA-Z]+[-][a-zA-Z]+').test(name) doesn't work might do manual search!
if(a.lastIndexOf("-")!==a.indexOf("-"))return!1;var b=!0,c=!1,d=void 0;try{for(var e,f,g=a[Symbol.iterator]();!(b=(e=g.next()).done);b=!0)if(f=e.value,!1===isNaN(f))return!1}catch(a){c=!0,d=a}finally{try{b||null==g["return"]||g["return"]()}finally{if(c)throw d}}return!0},getComponentName=function(a){var b=a.split("-"),c=b[0].charAt(0).toUpperCase()+b[0].slice(1),d=b[1].charAt(0).toUpperCase()+b[1].slice(1);return"".concat(c).concat(d)},checkDirectory=function(a){return new Promise(function(b,c){(0,_fs.stat)(a,function(a,d){return a?void c(!1):d.isDirectory()?void b(!0):void c(!1)})})},checkExist=function(a){return new Promise(function(b,c){(0,_fs.access)(a,function(d){d&&c(!1);try{var e=checkDirectory(a);e&&b(!0)}catch(a){console.log("\n                    -------------".concat(a,"-----------\n                ")),b(!1)}})})},createDirectory=function(a){console.log("Creating ".concat(a," ..."))},_main=/*#__PURE__*/function(){var a=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function a(b){var c,d;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:if(!(1<b.length)){a.next=4;break}console.log("Error! I dont accept more than 1 parameter!"),a.next=34;break;case 4:if(componentName=b[0],!checkComponentName(componentName)){a.next=33;break}return componentNameCc=getComponentName(componentName),a.prev=7,a.next=10,checkExist(srcDirectory);case 10:c=a.sent,c&&console.log("/src does exist!"),a.next=19;break;case 14:a.prev=14,a.t0=a["catch"](7),console.log("/src does not exist!"),console.log("Creating /src for you!"),createDirectory(srcDirectory);case 19:return a.prev=19,a.next=22,checkExist(componentsDirectory);case 22:d=a.sent,d&&console.log("/component does exist!"),a.next=31;break;case 26:a.prev=26,a.t1=a["catch"](19),console.log("/components does not exist!"),console.log("Creating /components for you!"),createDirectory(componentsDirectory);case 31:a.next=34;break;case 33:console.log("Use component name of format 'component-name'");case 34:case"end":return a.stop();}},a,null,[[7,14],[19,26]])}));return function(){return a.apply(this,arguments)}}();_main(argv);
