const dt = new Date();
dt.setFullYear(dt.getFullYear() - 1);

const deleteByKeyword = async ({ domain }) => {
  const targets = await chrome.history.search({
    text: domain,
    startTime: dt.getTime(),
    maxResults: 10 ** 8,
  });
  targets.forEach(async (t) => {
    chrome.history.deleteUrl({
      url: t.url,
    });
  });
};

const main = async () => {
  const { domains } = await chrome.storage.local.get(null);
  if (!domains) {
    return;
  }
  domains.forEach(deleteByKeyword);
};

main();
