import { access, stat, mkdir } from 'fs';

export const isDirectory = file => {
    return new Promise((resolve, reject) => {
        stat(file, (error, stats) => {
            if (error) {
                reject({
                    code: 4002,
                    file: file
                });
            }
            if (stats.isDirectory()) {
                resolve();
            } else {
                reject({
                    code: 4001,
                    file: file
                });
            }
        });
    });
};

export const isAccessible = file => {
    return new Promise((resolve, reject) => {
        access(file, error => {
            if (error) {
                reject({
                    code: 4000,
                    file: file
                });
            } else {
                resolve();
            }
        });
    });
};

export const createDirectory = file => {
    return new Promise((resolve, reject) => {
        mkdir(file, { recursive: true }, error => {
            if (error) {
                reject({
                    code: 4003,
                    file: file
                });
            } else {
                resolve();
            }
        })
    });
};
