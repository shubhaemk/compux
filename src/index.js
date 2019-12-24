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

const fileType = file => {
    return new Promise((resolve,reject)=>{
        stat(file,(err,stats)=>{
            if (err){
                reject({
                    code: 4002,
                    file: file
                });
            }
            if (stats.isDirectory()){
                resolve(true);
            }else{
                reject({
                    code: 4001,
                    file: file
                });
            }
            return;
        });
    });
};

const fileExists = file => {
    return new Promise((resolve,reject)=>{
        access(file,err => {
            if(err){
                reject({
                    code: 4000,
                    file: file
                });
            }else{
                resolve(true);
            }
        });
    });
};

const fileCreate = file => {
    return new Promise((resolve,reject) => {
        mkdir(file,{ recursive: true },err => {
            if(err){
                reject({
                    code: 4003,
                    file: file
                });
            }else{
                resolve(true);
            }
        })
    });
};

const componentCreatePromise = directory => {
    return new Promise((resolve,reject) => {
        fileExists(directory.name)
            .then(srcExist => {
                if (srcExist) {
                    console.log(`found - ${directory.name}`);
                }
                return fileType(directory.name);
            })
            .then(isDir => {
                console.log(`isDirectory? true - ${directory.name}`);
                resolve();
            })
            .catch(error => {
                if (error.code === 4000 && directory.create) {
                    console.log(`creating - ${directory.name}`);
                    return fileCreate(directory.name);
                }
                if (error.code === 4001) {
                    console.log(`isDirectory? false - ${directory.name}`);
                    reject(error);
                }
            })
            .then(success => {
                if (success) {
                    console.log(`created - ${directory.name}`);
                    resolve();
                }
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
};

const componentCreate = (listDir) => {
    return Promise.all(listDir.map(dir => componentCreatePromise(dir)));
}




const _main = async (argv) => {
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

            try{
                let x = componentCreate(listDir);
                if(x){
                    console.log('Done!');
                }
            }catch(error){
                console.log(error);
            }
            
        }else{
            console.log(`Use component name of format 'component-name'`)
        }
    }
}

_main(argv);