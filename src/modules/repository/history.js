import { getDomains } from "./domain.js";

const dt = new Date();
dt.setFullYear(dt.getFullYear() - 1);

export const search = async (text) => {
  return await chrome.history.search({
    text,
    startTime: dt.getTime(),
    maxResults: 10 ** 8,
  });
};

export const deleteHistory = async ({ domain }) => {
  const targets = await search(domain);
  targets?.forEach(async (t) => {
    chrome.history.deleteUrl({
      url: t.url,
    });
  });
};

export const trimBrwoserData = async () => {
  const domains = await getDomains();
  domains.forEach(async (d) => {
    // In browsingData.remove, the origins specification is an error in history
    // Therefore, delete data other than history.
    const { history, ...otherSettings } = d.settings;
    chrome.browsingData.remove(
      {
        since: dt.getTime(),
        origins: [`https://${d.domain}`, `http://${d.domain}`],
      },
      otherSettings
    );
    if (history) {
      deleteHistory(d);
    }
  });
};
