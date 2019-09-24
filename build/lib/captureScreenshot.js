"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _utils = require("./utils");

var _viewport = require("../config/viewport");

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getViewport = opts => {
  const {
    isMobile
  } = opts;
  const defaults = isMobile ? _viewport.mobile : _viewport.desktop;
  return { ...defaults,
    ...opts
  };
};

const setViewport = (page, viewportOptions = {}) => {
  const viewport = getViewport(viewportOptions);
  const {
    width,
    height,
    deviceScaleFactor
  } = viewport;

  _utils.log.debug(`\t- setting viewport to ${width}x${height} (${deviceScaleFactor})`);

  return page.setViewport(viewport);
};

const executeManipulation = async (manipulations, page) => {
  const {
    type,
    content
  } = manipulations.pop();

  _utils.log.debug(`\t- executing ${type}`);

  await page[type](content);
  if (manipulations.length > 0) executeManipulation(manipulations, page);
};

var _default = async (screenshot, page, destinationFolder = _config.default.destination) => {
  const {
    url,
    fullPage,
    name,
    viewport,
    before
  } = screenshot;

  try {
    _utils.log.debug(`- capturing "${url}"`);

    await page.goto(url, {
      timeout: 10000
    });
    await setViewport(page, viewport);
    if (before && before.length >= 1) await executeManipulation(before, page);

    const filepath = _path.default.join(destinationFolder, `${name}.png`);

    await page.screenshot({
      path: filepath,
      fullPage
    });

    _utils.log.debug(`\t- saving to "${name}"`);

    return { ...screenshot,
      path: filepath
    };
  } catch (error) {
    _utils.log.error(`Screenshot "${url}" failed: ${error}`);

    return {
      error
    };
  }
};

exports.default = _default;
module.exports = exports.default;