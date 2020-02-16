import { access, stat, mkdir } from 'fs';

export const isDirectory = file =>
  new Promise((resolve, reject) => {
    stat(file, (error, stats) => {
      if (error) {
        reject({
          code: 4002,
          reason: file
        });
      }
      if (stats.isDirectory()) {
        resolve();
      } else {
        reject({
          code: 4001,
          reason: file
        });
      }
    });
  });

export const isAccessible = file =>
  new Promise((resolve, reject) => {
    access(file, error => {
      if (error) {
        //should not be handled
        reject({
          code: 4000,
          reason: file
        });
      } else {
        resolve();
      }
    });
  });

export const createDirectory = file =>
  new Promise((resolve, reject) => {
    mkdir(file, { recursive: true }, error => {
      if (error) {
        reject({
          code: 4003,
          reason: file
        });
      } else {
        resolve();
      }
    });
  });
