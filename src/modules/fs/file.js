import { writeFile } from 'fs';
import { join } from 'path';
import { getClassTemplate, getFunctionTemplate } from '../string/template';
import { componentTypeResolve } from '../string/name';

export const componentFileCreate = (path, componentNameCc, componentType) => {
  const file = join(path, `${componentNameCc}.jsx`);
  const template =
    componentTypeResolve(componentType) === 'class'
      ? getClassTemplate(componentNameCc)
      : getFunctionTemplate(componentNameCc);
  return new Promise((resolve, reject) => {
    writeFile(file, template, error => {
      if (error) {
        reject({
          code: 3000,
          reason: file
        });
      }
      resolve();
    });
  });
};
