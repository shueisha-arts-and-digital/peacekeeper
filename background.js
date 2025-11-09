chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
  if (!tab.url) return;

  let configs = await getObjectFromStorage("configs");
  if (!configs) return;

  let matchedConfig = getMatchedConfig(tab.url, configs);
  chrome.tabs.sendMessage(
    tabId,
    { type: "notify", config: matchedConfig },
    function (response) {
      if (chrome.runtime.lastError) {
        // エラーを無視(Content scriptがまだ読み込まれていない場合など)
        console.log("[Peacekeeper] Message not received:", chrome.runtime.lastError.message);
      }
    }
  );
});

// URL変更を検出
chrome.webNavigation.onHistoryStateUpdated.addListener(async function (details) {
  let configs = await getObjectFromStorage("configs");
  if (!configs) return;

  let matchedConfig = getMatchedConfig(details.url, configs);
  chrome.tabs.sendMessage(
    details.tabId,
    { type: "notify", config: matchedConfig },
    function (response) {
      if (chrome.runtime.lastError) {
        // エラーを無視(Content scriptがまだ読み込まれていない場合など)
        console.log("[Peacekeeper] Message not received:", chrome.runtime.lastError.message);
      }
    }
  );
});

function getMatchedConfig(url, configs) {
  const urlObj = new URL(url);
  return configs.find((config) => {
    const matchTarget = config.includeQueryParams
      ? urlObj.origin + urlObj.pathname + urlObj.search
      : urlObj.origin + urlObj.pathname;

    return matchTarget.match(new RegExp(config.url));
  });
}

chrome.action.onClicked.addListener(function (tab) {
  chrome.tabs.create({ url: "options.html" });
});

chrome.runtime.onInstalled.addListener(function (details) {
  if (details.reason == "install") {
    chrome.runtime.openOptionsPage();
  }
});

const getObjectFromStorage = async function (key) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.get(key, function (value) {
        resolve(value[key]);
      });
    } catch (ex) {
      reject(ex);
    }
  });
};
