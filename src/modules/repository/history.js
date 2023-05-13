const dt = new Date();
dt.setFullYear(dt.getFullYear() - 1);

export const search = async (text) => {
  return await chrome.history.search({
    text,
    startTime: dt.getTime(),
    maxResults: 10 ** 8,
  });
};

export const deleteByDomain = async ({ domain }) => {
  const targets = await search(domain);
  targets?.forEach(async (t) => {
    chrome.history.deleteUrl({
      url: t.url,
    });
  });
};

export const trimHistory = async () => {
  const { domains } = await chrome.storage.local.get(null);
  if (!domains) {
    return;
  }
  domains.forEach(deleteByDomain);
};
