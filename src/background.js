import { trimHistory } from "../src/modules/repository/history.js";

chrome.history.onVisited.addListener(trimHistory);
chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});
