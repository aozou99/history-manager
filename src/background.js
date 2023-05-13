import { search } from "../src/modules/repository/history.js";

const deleteByDomain = async ({ domain }) => {
  const targets = await search(domain);
  targets?.forEach(async (t) => {
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
  domains.forEach(deleteByDomain);
};

main();
