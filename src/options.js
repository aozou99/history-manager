import {
  loadRegisteredDomains,
  registerDomain,
  deleteDomain,
} from "./modules/repository/domain.js";
import { search } from "./modules/repository/history.js";
import { isValidDomain } from "./modules/validator/domain.js";

const NO_REFRESH = "no-refresh";

const handle = (callback) => {
  return async (e) => {
    if ((await callback(e)) !== NO_REFRESH) {
      await refresh();
    }
  };
};

const handleDeleteClick = handle(async (e) => {
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
  await registerDomain(domain);
});

const alterFavicon = (e) => {
  $(e.currentTarget).attr("src", "/assets/no-favicon.png");
};

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
};

const refresh = async () => {
  await loadRegisteredDomains();
  setEvent();
};

$(refresh);
