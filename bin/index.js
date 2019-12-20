#!/usr/bin/env node
"use strict";var _path=require("path");function _toArray(a){return _arrayWithHoles(a)||_iterableToArray(a)||_nonIterableRest()}function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function _iterableToArray(a){if(Symbol.iterator in Object(a)||"[object Arguments]"===Object.prototype.toString.call(a))return Array.from(a)}function _arrayWithHoles(a){if(Array.isArray(a))return a}/**
 * srcDirectory - Represents source directory
 * componentDirectory - Represents component directory in src
 * argv - Array of passed options
 */var srcDirectory=(0,_path.resolve)(process.cwd(),"src"),componentDirectory=(0,_path.resolve)(srcDirectory,"components"),_process$argv=_toArray(process.argv),argv=_process$argv.slice(2),_main=function(a){1<a.length&&console.log("Error! I dont accept more than 1 parameter!")};_main(argv);
