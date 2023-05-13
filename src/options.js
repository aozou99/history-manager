import {
  loadRegisteredDomains,
  registerDomain,
  deleteDomain,
} from "./modules/repository/domain.js";

const isValidDomain = async (domain) => {
  try {
    new URL(`https://${domain}/`);
    return true;
  } catch (err) {
    return false;
  }
};

const handle = (callback) => {
  return async (e) => {
    await callback(e);
    await render();
  };
};
const handleDeleteClick = handle(async (e) => {
  const { domain } = $(e.currentTarget).data();
  await deleteDomain(domain);
});
const handleRegisterBtnClick = handle(async () => {
  const domain = $("input#domain").val();
  const isValid = await isValidDomain(domain);
  if (!isValid) {
    return alert("Incorrect format of entered domain");
  }
  await registerDomain(domain);
});
const alterFavicon = (e) => {
  $(e.currentTarget).attr("src", "/assets/no-favicon.png");
};

const setEvent = () => {
  $(".delete-btn").click(handleDeleteClick);
  $("#register-btn").click(handleRegisterBtnClick);
  $(".favicon").on("error", alterFavicon);
};

const render = async () => {
  await loadRegisteredDomains();
  setEvent();
};

$(render);
