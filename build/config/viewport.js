"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mobile = exports.desktop = void 0;

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  defaultWidth,
  defaultHeight,
  defaultWidthMobile,
  defaultHeightMobile
} = _index.default;
const desktop = {
  deviceScaleFactor: 1,
  isMobile: false,
  width: defaultWidth,
  height: defaultHeight
};
exports.desktop = desktop;
const mobile = {
  deviceScaleFactor: 1.2,
  isMobile: true,
  width: defaultWidthMobile,
  height: defaultHeightMobile
};
exports.mobile = mobile;