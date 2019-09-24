import { log } from './utils';

import launchBrowser from './launchBrowser';
import captureScreenshot from './captureScreenshot';
import tryToKillBrowser from './tryToCloseBrowser';

const captureScreenshots = async (screenshots, page) => {
  const screenshot = screenshots.pop();
  const output = await captureScreenshot(screenshot, page);
  if (screenshots.length > 0) return captureScreenshots(screenshots, page);
  return [output];
};

export default async ({ screenshots }) => {
  log.inform('Executing Screenshotr');

  let browser;

  try {
    browser = await launchBrowser();

    log.debug('- opening new page');
    const page = await browser.newPage();

    await captureScreenshots(screenshots, page);

    log.debug('- closing browser');
    await browser.close();
    browser = null;
  } catch (error) { log.error(`Screenshotr Failed: ${error}`); }

  tryToKillBrowser(browser);
  log.succeed(`Captured ${screenshots.length} Screenshots with Screenshotr`);
};
