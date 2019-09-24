import path from 'path';

import screenshotr from '../build/lib';

const screenshots = [
  {
    url: 'https://www.trulicity.com',
    name: 'trulicity',
    fullPage: true,
    before: [
      {
        type: 'addScriptTag',
        content: { content: 'document.getElementsByClassName("patient gr__trulicity_com")[0].classList.add("isi--expand");' },
        // content: { content: 'alert("got here")' },
      },
    ],
  },
  // {
  //   url: 'https://www.trulicity.com',
  //   name: 'trulicity-mobile',
  //   fullPage: true,
  //   viewport: {
  //     isMobile: true,
  //   },
  // },
];

screenshotr({
  destination: path.join(__dirname, '..', '/.temp'),
  screenshots,
});
