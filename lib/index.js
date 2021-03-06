import fs from 'fs';

import { log } from './utils';
import config from '../config';

import launchBrowser from './launchBrowser';
import captureScreenshot from './captureScreenshot';
import tryToKillBrowser from './tryToCloseBrowser';

const captureScreenshots = async (screenshots, page, destinationFolder) => {
  const screenshot = screenshots.pop();
  const output = await captureScreenshot(screenshot, page, destinationFolder);
  if (screenshots.length > 0) return [output, ...await captureScreenshots(screenshots, page, destinationFolder)];
  return [output];
};

const validateDestinationDirectory = (destiationPath = config.destination) => {
  log.debug(`- verifying destination folder exists\n\t- ${destiationPath}`);
  if (!fs.existsSync(destiationPath)) fs.mkdirSync(destiationPath);
};

export default async ({ screenshots, destination = config.destination }) => {
  log.inform('Executing Screenshotr');

  let browser;

  validateDestinationDirectory(destination);

  try {
    browser = await launchBrowser();

    log.debug('- opening new page');
    const page = await browser.newPage();

    const results = await captureScreenshots(screenshots, page, destination);

    log.debug('- closing browser');
    await browser.close();
    browser = null;

    const successfulResults = results.filter((result) => !result.error);
    const errors = results.filter((result) => !!result.error);

    log.succeed(`Captured ${successfulResults.length} Screenshots with Screenshotr`);
    return { errors, screenshots: successfulResults, destination };
  } catch (error) { log.error(`Screenshotr Failed: ${error}`); }

  tryToKillBrowser(browser);
};
