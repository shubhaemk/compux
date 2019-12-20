#!/usr/bin/env node


import { resolve } from 'path';

/**
 * srcDirectory - Represents source directory
 * componentDirectory - Represents component directory in src
 * argv - Array of passed options
 */
const srcDirectory = resolve(process.cwd(),'src');
const componentDirectory = resolve(srcDirectory,'components');
const [,,...argv] = process.argv;

const _main = ( argv ) => {
    if(argv.length > 1){
        console.log('Error! I dont accept more than 1 parameter!')
    }
}

_main(argv);

