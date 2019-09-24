import screenshotr from '../lib';

const screenshots = [
  {
    url: 'https://www.trulicity.com',
    path: 'trulicity.png',
    fullPage: true,
  },
  {
    url: 'https://www.trulicity.com',
    path: 'trulicity.png',
    fullPage: true,
    viewport: {
      isMobile: true,
    },
  },
];

screenshotr({ screenshots });
