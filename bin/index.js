#!/usr/bin/env node

/*
 * GOAL 1
 * 1. If src/components exist, create files by given component name
 * 2. If src/components !exist, create components and then add component
 * 3. Check for css/scss flag
 */
"use strict";

var path = require('path');

var appDirectory = process.cwd();
var srcDirectory = path.resolve(appDirectory, 'src');
var componentDirectory = path.resolve(srcDirectory, 'components');
/**
 * 1. file module - check, create component
 * 2. Path module - path resolve and various path related data
 * 3. Error handling module - printing a error is a task!
 */

var fs = require('fs');

fs.access(componentDirectory, fs.constants.W_OK, function (error) {
  if (error) {
    console.log('lol');
    console.log(error.message);
  } else {
    console.log('OK');
  }
});
