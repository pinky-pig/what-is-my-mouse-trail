export const DEFAULT_COLOR = '#000000'

chrome.runtime.onInstalled.addListener(async () => {
  try {
    await chrome.storage.local.set({ color: DEFAULT_COLOR });
  } catch (err) {
    console.warn(err);
  }
})
