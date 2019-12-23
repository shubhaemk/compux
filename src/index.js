#!/usr/bin/env node

/**
 * srcDirectory - Represents source directory
 * componentDirectory - Represents component directory in src
 * argv - Array of passed options
 */
import "regenerator-runtime/runtime";
import { access, stat } from 'fs';
import { resolve } from 'path';
const srcDirectory = resolve(process.cwd(),'src');
const componentsDirectory = resolve(srcDirectory,'components');
const [,,...argv] = process.argv;

let componentName;
let componentNameCc;

//need fix : should only work for abc-abc and not abc-abc-abc...
const checkComponentName = name => {
    //RegExp('[a-zA-Z]+[-][a-zA-Z]+').test(name) doesn't work might do manual search!
    
    if(name.lastIndexOf('-') !== name.indexOf('-'))
    return false;

    for(let char of name){
        if(isNaN(char) === false)
        return false;
    }

    return true;
}

const getComponentName = name => {
    const nameArr = name.split('-');
    const first = nameArr[0].charAt(0).toUpperCase() + nameArr[0].slice(1);
    const second = nameArr[1].charAt(0).toUpperCase() + nameArr[1].slice(1);
    return `${first}${second}`
}

const checkDirectory = directory => {
    return new Promise();
}

const checkExist = async (directory) => {
    return new Promise((resolve,reject)=>{
        access(directory,err => {
            if(err){
                reject(false);
            }
            try{
                await checkDirectory(directory);
                resolve(true);
            }catch(err){
                reject(false);
            }
        });
    });
}

const createDirectory = directory => {
    console.log(`Creating ${directory} ...`)
}

const _main = async (argv) => {
    if(argv.length > 1){
        console.log('Error! I dont accept more than 1 parameter!')
    }else{
        componentName = argv[0];
        if(checkComponentName(componentName)){
            componentNameCc = getComponentName(componentName);

            try{
                let srcDirExist = await checkExist(srcDirectory);
                if(srcDirExist){
                    console.log('/src does exist!');
                }
            }catch(err){
                console.log('/src does not exist!');
                console.log('Creating /src for you!');
                createDirectory(srcDirectory);
            }
            
            try {
                let componentsDirExist = await checkExist(componentsDirectory);
                if (componentsDirExist) {
                    console.log('/component does exist!');
                }
            } catch (err) {
                console.log('/components does not exist!');
                console.log('Creating /components for you!');
                createDirectory(componentsDirectory);
            }

            try {
                let componentDirExist = await checkExist(componentsDirectory,componentName);
                if (componentDirExist) {
                    console.log(`${componentName} already exists!`);
                }
            } catch (err) {
                console.log(`/${componentName} does not exist!`);
                console.log(`Creating /${componentName} for you!`);
                createDirectory(resolve(componentsDirectory,componentName));
            }
            
        }else{
            console.log(`Use component name of format 'component-name'`)
        }
    }
}

_main(argv);