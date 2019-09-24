"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _puppeteer = _interopRequireDefault(require("puppeteer"));

var _utils = require("./utils");

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const launchBrowser = () => _puppeteer.default.launch({
  headless: _config.default.headless
});

var _default = async () => {
  _utils.log.debug(`- launching${_config.default.headless ? ' headless' : ''} browser`);

  try {
    const browser = await launchBrowser();
    return browser;
  } catch (err) {
    throw new Error(`Failed to launch browser: ${err}`);
  }
};

exports.default = _default;
module.exports = exports.default;