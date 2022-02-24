let selectedYoutubeTab = false;
let selectedGithubTab = false;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ selectedYoutubeTab });
  chrome.storage.sync.set({ selectedGithubTab });
  console.log("selectedYoutubeTab: " + selectedYoutubeTab);
});

const timeline = {
  65: 19,
  249: 122,
  271: 128,
  291: 130,
  319: 133,
  344: 85,
  346: 95,
  356: 19,
  364: 93,
  377: 95,
  390: 94,
  414: 96,
  420: 103,
  427: 113,
  475: 112,
  534: 94,
};

let prevLine = null;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request.currVideoTime);
  let currTime = null,
    currLine = null;
  for (const [key, value] of Object.entries(timeline)) {
    if (key > request.currVideoTime) break;
    currTime = key;
    currLine = value;
  }
  if (currLine) {
    const line = currLine;
    if (currLine != prevLine) {
      console.log(line);
      chrome.storage.sync.get("githubTabId", (data) => {
        const tabId = data.githubTabId;
        chrome.tabs.get(tabId, async (tab) => {
          const newURL = tab.url.split("#")[0] + "#L" + line;
          chrome.tabs.update(tabId, { url: newURL });
          console.log(newURL);
        });
      });
    }
    prevLine = currLine;
  }
  sendResponse({ res: "sucess!" });
});
