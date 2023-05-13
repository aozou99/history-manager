const loadRegisteredDomains = async () => {
  const { domains } = await chrome.storage.local.get(null);
  $("#registerd-domains").loadTemplate(
    $("#template-domain"),
    domains,
  );
}
const registerDomain = async(domain) => {
  const { domains } = await chrome.storage.local.get("domains");
  if (domains && domains.findIndex((e) => e.domain === domain) > -1) {
    return;
  }
  await chrome.storage.local.set({
    domains: [...domains || [], {domain, favicon: `https://${domain}/favicon.ico`}]
  });
}
const deleteDomain = async(domain) => {
  const { domains } = await chrome.storage.local.get("domains");
  if (!domains) {
    return;
  }
  await chrome.storage.local.set({
    domains: domains.filter((d)=>d.domain !== domain)
  });
  await loadRegisteredDomains();
}

const isValidDomain = async(domain) => {
  try {
    new URL(`https://${domain}/`);
    return true;
  } catch (err) {
    return false;
  }
}

const handle = (callback) => {
  return async (e) => {
    await callback(e);
    await render();
  }
}
const handleDeleteClick = handle(async (e) => {
  const { domain } = $(e.currentTarget).data();
  await deleteDomain(domain);
})
const handleRegisterBtnClick = handle(async() => {
  const domain = $("input#domain").val();
  const isValid = await isValidDomain(domain);
  if (!isValid) {
    return alert("Incorrect format of entered domain")
  }
  await registerDomain(domain);
});
const alterFavicon = (e) => {
  $(e.currentTarget).attr("src", "/assets/no-favicon.png");
}


const setEvent = () => {
  $(".delete-btn").click(handleDeleteClick);
  $("#register-btn").click(handleRegisterBtnClick);
  $(".favicon").on("error", alterFavicon)
}

const render = async() => {
  await loadRegisteredDomains();
  setEvent();
}

$(render);