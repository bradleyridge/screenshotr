"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = async browser => {
  if (!browser) return;
  const processInfo = await browser.process();
  if (processInfo.signalCode) browser.close();
};

exports.default = _default;
module.exports = exports.default;