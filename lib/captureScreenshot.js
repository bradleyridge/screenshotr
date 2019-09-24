import { log } from './utils';

import { mobile, desktop } from '../config/viewport';

const getViewport = (opts) => {
  const { isMobile } = opts;
  const defaults = isMobile ? mobile : desktop;
  return { ...defaults, ...opts };
};

const setViewport = (page, viewportOptions = {}) => {
  const viewport = getViewport(viewportOptions);
  const { width, height, deviceScaleFactor } = viewport;
  log.debug(`\t- setting viewport to ${width}x${height} (${deviceScaleFactor})`);
  return page.setViewport(viewport);
};

export default async (screenshot, page) => {
  const { url, path, fullPage, viewport } = screenshot;

  try {
    log.debug(`- capturing "${url}"`);
    await page.goto(url, { timeout: 10000 });
    await setViewport(page, viewport);

    await page.screenshot({ path, fullPage });

    return screenshot;
  } catch (error) {
    log.error(`Screenshot "${url}" failed: ${error}`);
    return { error };
  }
};
