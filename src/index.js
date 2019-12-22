#!/usr/bin/env node

/**
 * srcDirectory - Represents source directory
 * componentDirectory - Represents component directory in src
 * argv - Array of passed options
 */

import { resolve } from 'path';
const srcDirectory = resolve(process.cwd(),'src');
const componentDirectory = resolve(srcDirectory,'components');
const [,,...argv] = process.argv;

let componentName;

//need fix : should only work for abc-abc and not abc-abc-abc...
const checkComponentName = name => RegExp('[a-zA-Z]+[-][a-zA-Z]+').test(name);

const getComponentName = name => {
    const nameArr = name.split('-');
    const first = nameArr[0].charAt(0).toUpperCase() + nameArr[0].slice(1);
    const second = nameArr[1].charAt(0).toUpperCase() + nameArr[1].slice(1);
    return `${first}${second}`;
}

const checkDirectory = directory => {

}

const _main = argv => {
    if(argv.length > 1){
        console.log('Error! I dont accept more than 1 parameter!')
    }else{
        if(checkComponentName(argv[0])){
            componentName = getComponentName(argv[0]);

        }else{
            console.log(`Use component name of format 'component-name'`)
        }
    }
}

_main(argv);