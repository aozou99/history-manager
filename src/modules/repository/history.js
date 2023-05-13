const dt = new Date();
dt.setFullYear(dt.getFullYear() - 1);

export const search = async (text) => {
  return await chrome.history.search({
    text,
    startTime: dt.getTime(),
    maxResults: 10 ** 8,
  });
};
