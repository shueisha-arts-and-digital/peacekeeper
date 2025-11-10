import { getDefaultConfigs } from './configs.js';

const getObjectFromLocalStorage = async function (key) {
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

const saveObjectInStorage = async function (obj) {
  return new Promise((resolve, reject) => {
    try {
      chrome.storage.sync.set(obj, function () {
        resolve();
      });
    } catch (ex) {
      reject(ex);
    }
  });
};

document.getElementById("saveConfigs").addEventListener(
  "click",
  async function (e) {
    if (document.getElementById("textareaConfigs").value) {
      try {
        let jsonConfigs = JSON.parse(
          document.getElementById("textareaConfigs").value
        );
        await saveObjectInStorage({ configs: jsonConfigs });
        alert("Configs are saved.");
      } catch (error) {
        alert(error.message);
      }
    }
  },
  false
);

(async function () {
  // set sample on #textareaSample
  document.getElementById("textareaSample").innerHTML = JSON.stringify(
    getDefaultConfigs(),
    null,
    2
  );

  // get configs from storage
  let configs = await getObjectFromLocalStorage("configs");
  if (configs) {
    // set user's configs on #textareaConfigs
    return (document.getElementById("textareaConfigs").innerHTML =
      JSON.stringify(configs, null, 2));
  }

  // save & set default configs on #textareaConfigs
  configs = getDefaultConfigs();
  await saveObjectInStorage({ configs: configs });
  return (document.getElementById("textareaConfigs").innerHTML = JSON.stringify(
    configs,
    null,
    2
  ));
})();
