import puppeteer from 'puppeteer';

import { log } from './utils';
import config from '../config';

const launchBrowser = () => puppeteer.launch({
  headless: config.headless,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
  ],
});

export default async () => {
  log.debug(`- launching${config.headless ? ' headless' : ''} browser`);
  try {
    const browser = await launchBrowser();
    return browser;
  } catch (err) { throw new Error(`Failed to launch browser: ${err}`); }
};
