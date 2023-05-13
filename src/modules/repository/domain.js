export const loadRegisteredDomains = async () => {
  const { domains } = await chrome.storage.local.get(null);
  $("#registerd-domains").loadTemplate(
    "/pages/templates/domain-items.html",
    domains || [],
    {
      async: false,
    }
  );
};
export const registerDomain = async (domain) => {
  const { domains } = await chrome.storage.local.get("domains");
  if (domains && domains.findIndex((e) => e.domain === domain) > -1) {
    return;
  }
  await chrome.storage.local.set({
    domains: [
      ...(domains || []),
      { domain, favicon: `https://${domain}/favicon.ico` },
    ],
  });
};
export const deleteDomain = async (domain) => {
  const { domains } = await chrome.storage.local.get("domains");
  if (!domains) {
    return;
  }
  await chrome.storage.local.set({
    domains: domains.filter((d) => d.domain !== domain),
  });
  await loadRegisteredDomains();
};
