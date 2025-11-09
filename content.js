(function () {
  chrome.runtime.onMessage.addListener(async function (
    message,
    sender,
    callback
  ) {
    // 既存のpeacekeeperスタイルタグを削除
    const existingStyle = document.getElementById('peacekeeper-style');
    if (existingStyle) {
      existingStyle.remove();
    }

    if (message.type !== "notify") {
      return;
    }

    if (!message.hasOwnProperty("config")) {
      return;
    }

    let config = message.config;

    // alert
    if (config.alert) {
      alert(config.alert);
    }

    // style
    if(typeof config.style === 'object') {
      let body = document.querySelector("html body");
      Object.assign(body.style, config.style);
    } else if (typeof config.style === 'string') {
      const styleTag = document.createElement('style');
      styleTag.id = 'peacekeeper-style';
      let cssRules = '';
      if (config.style) {
        cssRules += `${config.style} !important;`;
      }
      styleTag.textContent = cssRules;
      document.head.appendChild(styleTag);
    }

    // favicon
    if (config.favicon) {
      document
        .querySelectorAll("link[rel=icon]")
        .forEach((element) => element.remove());
      let favicon;
      favicon = document.createElement("link");
      favicon.rel = config.favicon.rel;
      favicon.type = config.favicon.type;
      favicon.href = config.favicon.href;
      document.getElementsByTagName("head")[0].appendChild(favicon);
    }
  });
})();
