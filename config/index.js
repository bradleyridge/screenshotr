import config from '12factor-config';

export default config({
  nodeEnv: {
    env: 'NODE_ENV',
    required: false,
    default: 'development',
  },
  debugLevel: {
    env: 'SCREENSHOTR_DEBUG_LEVEL',
    required: false,
    default: process.env.DEBUG_LEVEL || 2,
  },
  headless: {
    env: 'SCREENSHOTR_HEADLESS',
    type: 'boolean',
    required: false,
    default: !process.argv.includes('noheadless'),
  },
  folderPath: {
    env: 'SCREENSHOTR_FOLDER_PATH',
    required: false,
    default: '/temp',
  },
  defaultWidth: {
    env: 'SCREENSHOTR_DEFAULT_WIDTH',
    required: false,
    default: 1200,
  },
  defaultHeight: {
    env: 'SCREENSHOTR_DEFAULT_HEIGHT',
    required: false,
    default: 1280,
  },
  defaultWidthMobile: {
    env: 'SCREENSHOTR_DEFAULT_WIDTH_MOBILE',
    required: false,
    default: 375, // iPhone X
  },
  defaultHeightMobile: {
    env: 'SCREENSHOTR_DEFAULT_HEIGHT_MOBILE',
    required: false,
    default: 812, // iPhone X
  },

});
