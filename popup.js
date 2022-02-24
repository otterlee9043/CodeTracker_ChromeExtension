const selectYoutubeTab = document.getElementById("youtubeTab");
const selectGithubTab = document.getElementById("githubTab");

chrome.storage.sync.get("selectedYoutubeTab", ({ selectedYoutubeTab }) => {
  if (selectedYoutubeTab) {
    selectYoutubeTab.style.backgroundColor = "tomato";
  }
});

chrome.storage.sync.get("selectedGithubTab", ({ selectedGithubTab }) => {
  if (selectedGithubTab) {
    selectGithubTab.style.backgroundColor = "green";
  }
});

selectYoutubeTab.onclick = function (element) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = new URL(tabs[0].url);
    console.log(url.hostname);
    if (url.hostname == "www.youtube.com") {
      let selectedYoutubeTab = true;
      chrome.storage.sync.set({ selectedYoutubeTab });

      chrome.tabs.executeScript(tabs[0].id, { file: "sender.js" });
      selectYoutubeTab.style.backgroundColor = "tomato";
    } else {
      alert("It is not youtube page!");
    }
  });
};

selectGithubTab.onclick = function (element) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const url = new URL(tabs[0].url);
    console.log(url.hostname);
    if (url.hostname == "github.com") {
      let selectedGithubTab = true;
      chrome.storage.sync.set({ selectedGithubTab });

      selectGithubTab.style.backgroundColor = "green";
      const githubTabId = tabs[0].id;
      chrome.storage.sync.set({ githubTabId });
      chrome.tabs.executeScript(tabs[0].id, { file: "github.js" });
    } else {
      alert("It is not github page!");
    }
  });
};
