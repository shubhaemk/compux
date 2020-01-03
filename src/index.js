#!/usr/bin/env node

import { checkComponentName, getListDirectory, getComponentName } from "./modules/string/name";
import { isDirectory, isAccessible, createDirectory } from './modules/fs/directory'

import "regenerator-runtime/runtime";

import { resolve } from 'path';

const srcDirectory = resolve(process.cwd(),'src');
const componentsDirectory = resolve(srcDirectory,'components');
const [,,...argv] = process.argv;

let componentName;
let componentDirectory;
let componentNameCc;


const componentCreatePromise = directory => {
    return new Promise(async (resolve,reject) => {
        try{
            await isAccessible(directory.name);
            if(directory.checkIfExist){
                reject({
                    code: 4004,
                    file: directory.name
                });
            }else{
                try {
                    await isDirectory(directory.name);
                    resolve();
                } catch (error) {
                    reject(error);
                }
            }
        }catch(error){
            if (error.code === 4000) {
                try{
                    await createDirectory(directory.name);
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
            const listDirectory = getListDirectory(srcDirectory,componentsDirectory,componentDirectory);
            try{
                await componentCreate(listDirectory);
                try{
                    //creates folder insead!
                    await createDirectory(resolve(componentDirectory,`${componentName}.component.jsx`));
                }catch(error){
                    console.log(error);
                }
            }catch(error){
                //do error handling
                console.log(error);
            }
            
        }else{
            console.log(`Use component name of format 'component-name'`)
        }
    }
};

_main(argv);