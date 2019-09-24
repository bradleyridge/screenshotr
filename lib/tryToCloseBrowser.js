export default async (browser) => {
  if (!browser) return;
  const processInfo = await browser.process();
  if (processInfo.signalCode) browser.close();
};
