#!/usr/bin/env node

import {
  checkComponentName,
  getListDirectory,
  getComponentName,
  checkComponentType
} from './modules/string/name';
import {
  isDirectory,
  isAccessible,
  createDirectory
} from './modules/fs/directory';

import { printMessage } from './modules/messages/messages';

import { componentFileCreate } from './modules/fs/file';

import 'regenerator-runtime/runtime';

import { resolve } from 'path';

const srcDirectory = resolve(process.cwd(), 'src');
const componentsDirectory = resolve(srcDirectory, 'components');
const [, , ...argv] = process.argv;

const componentCreatePromise = directory => {
  return new Promise(async (resolve, reject) => {
    try {
      await isAccessible(directory.name);
      if (directory.checkIfExist) {
        reject({
          code: 4004,
          reason: directory.name
        });
      } else {
        try {
          await isDirectory(directory.name);
          resolve();
        } catch (error) {
          reject(error);
        }
      }
    } catch (error) {
      if (error.code === 4000) {
        try {
          await createDirectory(directory.name);
          resolve();
        } catch (error) {
          reject(error);
        }
      }
      reject(error);
    }
  });
};

const componentDirCreate = async listDir => {
  return Promise.all(listDir.map(dir => componentCreatePromise(dir)));
};

const _main = async argv => {
  if (argv.length > 2) {
    console.log('Error! I do not accept more than 2 parameter!');
  } else {
    let componentName = argv[0];
    let componentType = argv[1];
    if (checkComponentName(componentName)) {
      if (checkComponentType(componentType)) {
        let componentNameCc = getComponentName(componentName);
        let componentDirectory = resolve(componentsDirectory, componentName);
        const listDirectory = getListDirectory(
          srcDirectory,
          componentsDirectory,
          componentDirectory
        );
        try {
          await componentDirCreate(listDirectory);
          try {
            await componentFileCreate(
              listDirectory.pop()[`name`],
              componentNameCc,
              componentType
            );
            printMessage({ code: 6000, reason: componentName });
          } catch (error) {
            printMessage(error);
          }
        } catch (error) {
          printMessage(error);
        }
      } else {
        printMessage({ code: 1001, reason: componentType });
      }
    } else {
      printMessage({ code: 1000, reason: componentName });
    }
  }
};

_main(argv);
