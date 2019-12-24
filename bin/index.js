#!/usr/bin/env node
/**
 * srcDirectory - Represents source directory
 * componentDirectory - Represents component directory in src
 * argv - Array of passed options
 */"use strict";require("regenerator-runtime/runtime");var _fs=require("fs"),_path=require("path");function _toArray(a){return _arrayWithHoles(a)||_iterableToArray(a)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArray(a){if(Symbol.iterator in Object(a)||"[object Arguments]"===Object.prototype.toString.call(a))return Array.from(a)}function _arrayWithHoles(a){if(Array.isArray(a))return a}var componentName,componentDirectory,componentNameCc,srcDirectory=(0,_path.resolve)(process.cwd(),"src"),componentsDirectory=(0,_path.resolve)(srcDirectory,"components"),_process$argv=_toArray(process.argv),argv=_process$argv.slice(2),checkComponentName=function(a){//RegExp('[a-zA-Z]+[-][a-zA-Z]+').test(name) doesn't work might do manual search!
if(a.lastIndexOf("-")!==a.indexOf("-"))return!1;var b=!0,c=!1,d=void 0;try{for(var e,f,g=a[Symbol.iterator]();!(b=(e=g.next()).done);b=!0)if(f=e.value,!1===isNaN(f))return!1}catch(a){c=!0,d=a}finally{try{b||null==g["return"]||g["return"]()}finally{if(c)throw d}}return!0},getComponentName=function(a){var b=a.split("-"),c=b[0].charAt(0).toUpperCase()+b[0].slice(1),d=b[1].charAt(0).toUpperCase()+b[1].slice(1);return"".concat(c).concat(d)},isDirectory=function(a){return new Promise(function(b,c){(0,_fs.stat)(a,function(d,e){return d&&c({code:4002,file:a}),void(e.isDirectory()?b(!0):c({code:4001,file:a}))})})},fileExists=function(a){return new Promise(function(b,c){(0,_fs.access)(a,function(d){d?c({code:4e3,file:a}):b(!0)})})},createDirectory=function(a){return new Promise(function(b,c){(0,_fs.mkdir)(a,function(d){d?c({code:4003,file:a}):b(!0)})})},_main=function(a){if(1<a.length)console.log("Error! I dont accept more than 1 parameter!");else if(componentName=a[0],checkComponentName(componentName)){componentNameCc=getComponentName(componentName),componentDirectory=(0,_path.resolve)(componentsDirectory,componentName);fileExists(componentsDirectory).then(function(a){return a&&console.log("/src exist!"),isDirectory(componentsDirectory)}).then(function(a){a&&console.log("Is directory")})["catch"](function(a){return 4e3===a.code?createDirectory(componentsDirectory):void(4001===a.code&&console.log("Cant go any further than this"))}).then(function(a){a&&console.log("Created new dir!")})["catch"](function(a){console.log(a)})}else console.log("Use component name of format 'component-name'")};_main(argv);
