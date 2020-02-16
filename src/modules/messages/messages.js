const chalk = require('chalk');

export const printMessage = issue => {
  const { code, reason } = issue;
  const error = chalk.red.bold;
  const warning = chalk.yellow.bold;
  const success = chalk.green.bold;
  const normal = chalk.whiteBright.bold;

  if (code === 1000) {
    console.log(
      `${error(`[Error]`)} ${normal(
        `"${reason}" is of incorrect format. Please use naming format of "component-name".`
      )}`
    );
  }

  if (code === 1001) {
    console.log(
      `${error(`[Error]`)} ${normal(
        `"${reason}" is invalid option. Use "compux --help" for help.`
      )}`
    );
  }

  if (code === 3000) {
    console.log(
      `${error(`[Error]`)} ${normal(`Failed to create "${reason}".`)}`
    );
  }

  if (code === 4001) {
    console.log(
      `${error(`[Error]`)} ${normal(`"${reason}" is not a directory.`)}`
    );
  }

  if (code === 4002) {
    console.log(
      `${error(`[Error]`)} ${normal(`"${reason}" is not accessible.`)}`
    );
  }

  if (code === 4004) {
    console.log(`${error(`[Error]`)} ${normal(`"${reason}" already exists.`)}`);
  }

  if (code === 6000) {
    console.log(
      `${success(`[Success]`)} ${normal(
        `"${reason}" is created. Happy Hacking!`
      )}`
    );
  }
};
