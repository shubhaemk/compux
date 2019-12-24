#!/usr/bin/env node

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
        stat(file,(error,stats)=>{
            if (error){
                reject({
                    code: 4002,
                    file: file
                });
            }
            if (stats.isDirectory()){
                resolve();
            }else{
                reject({
                    code: 4001,
                    file: file
                });
            }
        });
    });
};

const fileExists = file => {
    return new Promise((resolve,reject)=>{
        access(file,error => {
            if(error){
                reject({
                    code: 4000,
                    file: file
                });
            }else{
                resolve();
            }
        });
    });
};

const fileCreate = file => {
    return new Promise((resolve,reject) => {
        mkdir(file,{ recursive: true },error => {
            if(error){
                reject({
                    code: 4003,
                    file: file
                });
            }else{
                resolve();
            }
        })
    });
};

const componentCreatePromise = directory => {
    return new Promise(async (resolve,reject) => {
        try{
            await fileExists(directory.name);
            if(directory.checkIfExist){
                reject({
                    code: 4004,
                    file: directory.name
                });
            }else{
                try {
                    await fileType(directory.name);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            }
        }catch(error){
            if (error.code === 4000) {
                try{
                    await fileCreate(directory.name);
                    resolve();
                }catch(error){
                    reject(error);
                }
            }
            reject(error);
        }
    });
};

const componentCreate = async (listDir) => {
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

            const listDirectory = [
                {
                    name: srcDirectory,
                    checkIfExist: false
                },
                {
                    name: componentsDirectory,
                    checkIfExist: false
                },
                {
                    name: componentDirectory,
                    checkIfExist: true
                }
            ];

            try{
                await componentCreate(listDirectory);
                
            }catch(error){
                //do error handling
                console.log(error);
            }
            
        }else{
            console.log(`Use component name of format 'component-name'`)
        }
    }
}

_main(argv);