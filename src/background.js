import { trimBrwoserData } from "../src/modules/repository/history.js";

chrome.history.onVisited.addListener(trimBrwoserData);
chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});
