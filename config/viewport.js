import config from './index';

const { defaultWidth, defaultHeight, defaultWidthMobile, defaultHeightMobile } = config;

const desktop = {
  deviceScaleFactor: 1,
  isMobile: false,
  width: defaultWidth,
  height: defaultHeight,
};

const mobile = {
  deviceScaleFactor: 1.2,
  isMobile: true,
  width: defaultWidthMobile,
  height: defaultHeightMobile,
};

export {
  desktop,
  mobile,
};
