import chalk from 'chalk';

const space = '  ';

const log = (message) => {
  // eslint-disable-next-line no-console
  console.log(message);
};

export const debug = (str) => {
  const message = chalk.grey(`${space}${space}${str}`);
  log(message);
};

export const warn = (str) => {
  const message = chalk.red(`${space}[warning]   `)
    + chalk.grey(`${str}`);
  log(message);
};

export const error = (str) => {
  const message = chalk.red(`\n${space}[error]     `)
    + chalk.grey(`${str}\n`);
  log(message);
};

export const succeed = (str) => {
  const message = chalk.green(`${space}[succeeded] `)
    + chalk.grey(`${str}`);
  log(message);
};

export const inform = (str) => {
  const message = chalk.yellow(`\n${space}${str}`);
  log(message);
};
