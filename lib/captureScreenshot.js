import path from 'path';

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

const executeManipulation = async (manipulations, page) => {
  const { type, content } = manipulations.pop();
  log.debug(`\t- executing ${type}`);
  await page[type](content);
  if (manipulations.length > 0) executeManipulation(manipulations, page);
};

export default async (screenshot, page, destinationFolder) => {
  const { url, fullPage, name, viewport, before } = screenshot;

  try {
    log.debug(`- capturing "${url}"`);
    await page.goto(url, { timeout: 10000 });
    await setViewport(page, viewport);

    if (before && before.length >= 1) await executeManipulation(before, page);

    const filepath = path.join(destinationFolder, `${name}.png`);
    await page.screenshot({ path: filepath, fullPage });
    log.debug(`\t- saving to "${name}"`);

    return { ...screenshot, path: filepath };
  } catch (error) {
    log.error(`Screenshot "${url}" failed: ${error}`);
    return { error };
  }
};
