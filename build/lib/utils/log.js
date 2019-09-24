"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inform = exports.succeed = exports.error = exports.warn = exports.debug = void 0;

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const space = '  ';

const log = message => {
  // eslint-disable-next-line no-console
  console.log(message);
};

const debug = str => {
  const message = _chalk.default.grey(`${space}${space}${str}`);

  log(message);
};

exports.debug = debug;

const warn = str => {
  const message = _chalk.default.red(`${space}[warning]   `) + _chalk.default.grey(`${str}`);

  log(message);
};

exports.warn = warn;

const error = str => {
  const message = _chalk.default.red(`\n${space}[error]     `) + _chalk.default.grey(`${str}\n`);

  log(message);
};

exports.error = error;

const succeed = str => {
  const message = _chalk.default.green(`${space}[succeeded] `) + _chalk.default.grey(`${str}`);

  log(message);
};

exports.succeed = succeed;

const inform = str => {
  const message = _chalk.default.yellow(`\n${space}${str}`);

  log(message);
};

exports.inform = inform;