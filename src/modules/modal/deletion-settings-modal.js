import { Modal } from "flowbite";
import { updateDomain } from "../repository/domain";
import { alterFavicon } from "../error/handle";

const settingItems = [{ key: "history" }, { key: "cookie" }, { key: "cache" }];

export const openModal = (selector, domain) => {
  $(selector).loadTemplate(
    "/pages/templates/deletion-settings-modal.html",
    domain || {},
    {
      async: false,
    }
  );

  $("#setting-items").loadTemplate(
    "/pages/templates/setting-items.html",
    settingItems,
    {
      async: false,
    }
  );

  // set the modal menu element
  const $target = document.getElementById("deletion-settings-modal");

  // options with default values
  const options = {
    placement: "center",
    backdrop: "dynamic",
    backdropClasses:
      "bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40",
    closable: true,
  };

  const modal = new Modal($target, options);

  const { settings } = domain;
  settingItems.forEach(({ key }) => {
    if (settings[key]) {
      $(`#${key}`).click();
      $(`#${key}`).prop("checked", true);
    }
    $(`#${key}`).click(async () => {
      settings[key] = !settings[key];
      await updateDomain({ ...domain, settings });
      $(`#${key}`).prop("checked", settings[key]);
    });
  });
  $("#deletion-settings-modal-close-btn").click(() => {
    modal.hide();
  });
  $(".favicon").on("error", alterFavicon);

  modal.show();
};
