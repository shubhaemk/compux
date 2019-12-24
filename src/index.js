#!/usr/bin/env node

/**
 * srcDirectory - Represents source directory
 * componentDirectory - Represents component directory in src
 * argv - Array of passed options
 */
import "regenerator-runtime/runtime";
import { access, stat, mkdir } from 'fs';
import { resolve } from 'path';
const srcDirectory = resolve(process.cwd(),'src');
const componentsDirectory = resolve(srcDirectory,'components');
const [,,...argv] = process.argv;

let componentName;
let componentDirectory;
let componentNameCc;

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

const isDirectory = directory => {
    return new Promise((resolve,reject)=>{
        stat(directory,(err,stats)=>{
            if (err){
                reject({
                    code: 4002,
                    file: directory
                });
            }
            if (stats.isDirectory()){
                resolve(true);
            }else{
                reject({
                    code: 4001,
                    file: directory
                });
            }
            return;
        });
    });
};

const fileExists = directory => {
    return new Promise((resolve,reject)=>{
        access(directory,err => {
            if(err){
                reject({
                    code: 4000,
                    file: directory
                });
            }else{
                resolve(true);
            }
        });
    });
};

const createDirectory = directory => {
    return new Promise((resolve,reject) => {
        mkdir(directory,err => {
            if(err){
                reject({
                    code: 4003,
                    file: directory
                });
            }else{
                resolve(true);
            }
        })
    });
};





const _main = (argv) => {
    if(argv.length > 1){
        console.log('Error! I dont accept more than 1 parameter!')
    }else{
        componentName = argv[0];
        if(checkComponentName(componentName)){
            componentNameCc = getComponentName(componentName);
            componentDirectory = resolve(componentsDirectory,componentName);

            const listDir = [
                {
                    name: srcDirectory,
                    create: false
                },
                {
                    name: componentsDirectory,
                    create: false
                },
                {
                    name: componentDirectory,
                    create: true
                }
            ];

            fileExists(componentsDirectory)
            .then(srcExist => {
                if(srcExist){
                    console.log('/src exist!');
                }
                return isDirectory(componentsDirectory);
            })
            .then(isDir => {
                if (isDir) {
                    console.log('Is directory');
                }
            })
            .catch(error => {
                if(error.code === 4000){
                    return createDirectory(componentsDirectory);
                }
                if(error.code === 4001){
                    console.log('Cant go any further than this');
                }
            })
            .then(success => {
                if(success){
                    console.log('Created new dir!')
                }
            })
            .catch(error => {
                console.log(error);
            });
            
        }else{
            console.log(`Use component name of format 'component-name'`)
        }
    }
}

_main(argv);