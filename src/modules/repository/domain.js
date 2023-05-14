export const getDomainDetail = async (domain) => {
  const { domains } = await chrome.storage.local.get("domains");
  if (!domains) {
    return null;
  }
  return domains.find((v) => v.domain === domain);
};
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
      {
        domain,
        favicon: `https://${domain}/favicon.ico`,
        settings: {
          history: true,
          cookie: false,
          cache: false,
        },
      },
    ],
  });
};

export const updateDomain = async (domainDetail) => {
  const { domains } = await chrome.storage.local.get("domains");
  if (!domains) {
    return;
  }
  await chrome.storage.local.set({
    domains: domains.map((v) =>
      v.domain == domainDetail.domain ? domainDetail : v
    ),
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
