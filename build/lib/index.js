"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _utils = require("./utils");

var _config = _interopRequireDefault(require("../config"));

var _launchBrowser = _interopRequireDefault(require("./launchBrowser"));

var _captureScreenshot = _interopRequireDefault(require("./captureScreenshot"));

var _tryToCloseBrowser = _interopRequireDefault(require("./tryToCloseBrowser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const captureScreenshots = async (screenshots, page, destinationFolder) => {
  const screenshot = screenshots.pop();
  const output = await (0, _captureScreenshot.default)(screenshot, page, destinationFolder);
  if (screenshots.length > 0) return [output, ...(await captureScreenshots(screenshots, page, destinationFolder))];
  return [output];
};

const validateDestinationDirectory = (destiationPath = _config.default.destination) => {
  _utils.log.debug(`- verifying destination folder exists\n\t- ${destiationPath}`);

  if (!_fs.default.existsSync(destiationPath)) _fs.default.mkdirSync(destiationPath);
};

var _default = async ({
  screenshots,
  destination
}) => {
  _utils.log.inform('Executing Screenshotr');

  let browser;
  validateDestinationDirectory(destination);

  try {
    browser = await (0, _launchBrowser.default)();

    _utils.log.debug('- opening new page');

    const page = await browser.newPage();
    const results = await captureScreenshots(screenshots, page, destination);

    _utils.log.debug('- closing browser');

    await browser.close();
    browser = null;
    const successfulResults = results.filter(result => !result.error);

    _utils.log.succeed(`Captured ${successfulResults.length} Screenshots with Screenshotr`);

    return results;
  } catch (error) {
    _utils.log.error(`Screenshotr Failed: ${error}`);
  }

  (0, _tryToCloseBrowser.default)(browser);
};

exports.default = _default;
module.exports = exports.default;