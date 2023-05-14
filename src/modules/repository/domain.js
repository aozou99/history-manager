export const getDomains = async () => {
  const { domains } = await chrome.storage.local.get("domains");
  return domains || [];
};

export const getDomainDetail = async (domain) => {
  const domains = await getDomains();
  return domains.find((v) => v.domain === domain);
};

export const loadRegisteredDomains = async () => {
  const domains = await getDomains();
  $("#registerd-domains").loadTemplate(
    "/pages/templates/domain-items.html",
    domains || [],
    {
      async: false,
    }
  );
};

export const registerDomain = async (domain) => {
  const domains = await getDomains();
  if (domains.findIndex((e) => e.domain === domain) > -1) {
    return;
  }
  await chrome.storage.local.set({
    domains: [
      ...domains,
      {
        domain,
        favicon: `https://${domain}/favicon.ico`,
        settings: {
          history: true,
          cookies: false,
          cache: false,
        },
      },
    ],
  });
};

export const updateDomain = async (domainDetail) => {
  const domains = await getDomains();
  await chrome.storage.local.set({
    domains: domains.map((v) =>
      v.domain == domainDetail.domain ? domainDetail : v
    ),
  });
};

export const deleteDomain = async (domain) => {
  const domains = await getDomains();
  await chrome.storage.local.set({
    domains: domains.filter((d) => d.domain !== domain),
  });
  await loadRegisteredDomains();
};
