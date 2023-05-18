import {
  loadRegisteredDomains,
  registerDomain,
  deleteDomain,
  getDomainDetail,
} from "./modules/repository/domain.js";
import { search } from "./modules/repository/history.js";
import { isValidDomain } from "./modules/validator/domain.js";
import { openModal } from "./modules/modal/deletion-settings-modal.js";
import { alterFavicon } from "./modules/error/handle.js";

const NO_REFRESH = "no-refresh";

const handle = (callback) => {
  return async (e) => {
    if ((await callback(e)) !== NO_REFRESH) {
      await refresh();
    }
  };
};

const handleDeleteClick = handle(async (e) => {
  e.stopImmediatePropagation();
  const { domain } = $(e.currentTarget).data();
  await deleteDomain(domain);
});

const handleRegisterBtnClick = handle(async () => {
  const domain = $("input#domain").val();
  if (!domain) {
    return NO_REFRESH;
  }
  const isValid = await isValidDomain(domain);
  if (!isValid) {
    alert("Incorrect format of entered domain");
    return NO_REFRESH;
  }
  await registerDomain(domain.trim());
  $("input#domain").val("");
});

const suggestFromHistory = async (req, res) => {
  const result = await search(req.term);
  const set = new Set(result.map((v) => new URL(v.url).hostname));
  res([...set]);
};

const setEvent = () => {
  $("#domain").keyup((e) => {
    if (e.which === 13) $("#register-btn").click();
  });
  $(".delete-btn").click(handleDeleteClick);
  $("#register-btn").click(handleRegisterBtnClick);
  $(".favicon").on("error", alterFavicon);
  $("#domain").autocomplete({ source: suggestFromHistory });
  $(".domain-item").click(async (e) => {
    const { domain } = $(e.currentTarget).data();
    const domainDetail = await getDomainDetail(domain);
    openModal("#modal-bind", domainDetail);
  });
};

const refresh = async () => {
  await loadRegisteredDomains();
  setEvent();
};

$(refresh);
