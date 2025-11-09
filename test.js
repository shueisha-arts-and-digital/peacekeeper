function getDefaultConfigs() {
  return [
    {
      name: "localhost",
      alert: false,
      favicon: false,
      style: {
        backgroundColor: "rgba(48,209,88,0.5)",
      },
      url: "^https?://(127.0.0.1|localhost):(.+83|8080)",
    },
    {
      name: "development",
      alert: false,
      favicon: false,
      style: {
        backgroundColor: "rgba(10,132,255,0.5)",
      },
      url: "^https?://dev-.+-admin.+",
    },
    {
      name: "staging",
      alert: false,
      favicon: {
        rel: "icon",
        type: "image/svg+xml",
        href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='16' height='16'%3E%3Cpath d='M8 1 L15 14 L1 14 Z' fill='%23FFC107' stroke='%23F57F17' stroke-width='0.5'/%3E%3C/svg%3E"
      },
      style: {
        backgroundColor: "rgba(255,214,10,0.5)",
      },
      url: "^https?://[^/]*stage-admin.+|^https?://admin-.+stage.+|^https?://stg-admin.+|^https?://stage-.+",
    },
    {
      name: "production",
      alert: false,
      favicon: {
        rel: "icon",
        type: "image/svg+xml",
        href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='16' height='16'%3E%3Cpath d='M8 1 L15 14 L1 14 Z' fill='%23F44336' stroke='%23B71C1C' stroke-width='0.5'/%3E%3C/svg%3E"
      },
      style: {
        backgroundColor: "rgba(255,69,58,0.5)",
      },
      url: "^https?://[^/]*admin.+|^https?://t.-i......\.s.......\.c.\.j.",
    },
    {
      name: "repositories",
      alert: false,
      style: {
        background: "linear-gradient(to right, rgba(255,214,10,0.5), rgba(255,69,58,0.5))",
      },
      url: "^https://github.com/shueisha-arts-and-digital/(backlog-mcp-server|composer-aws-assume-role-plugin|dbdb|docbase-mcp-server|github-backlog-sync|image|ms-teams-notify-orb|peacekeeper|Pj8.SentryModule|qiq-vscode-extension|sssh|vscode-bear-goto|vscode-twig-goto)",
    },
    {
      name: "development",
      alert: false,
      favicon: false,
      style: "#app > div > div > div > section { background-color: rgba(10,132,255,1) !important; }",
      url: "^https://.*\\.console\\.aws\\.amazon\\.com/s3/.*\\?.*prefix=dev(%2F|/)",
      includeQueryParams: true,
    },
    {
      name: "staging",
      alert: false,
      favicon: {
        rel: "icon",
        type: "image/svg+xml",
        href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='16' height='16'%3E%3Cpath d='M8 1 L15 14 L1 14 Z' fill='%23FFC107' stroke='%23F57F17' stroke-width='0.5'/%3E%3C/svg%3E",
      },
      style: "#app > div > div > div > section { background-color: rgba(255,214,10,1) !important; }",
      url: "^https://.*\\.console\\.aws\\.amazon\\.com/s3/.*\\?.*prefix=stage(%2F|/)",
      includeQueryParams: true,
    },
    {
      name: "production",
      alert: false,
      favicon: {
        rel: "icon",
        type: "image/svg+xml",
        href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='16' height='16'%3E%3Cpath d='M8 1 L15 14 L1 14 Z' fill='%23F44336' stroke='%23B71C1C' stroke-width='0.5'/%3E%3C/svg%3E",
      },
      style: "#app > div > div > div > section { background-color: rgba(255,69,58,1) !important; }",
      url: "^https://.*\\.console\\.aws\\.amazon\\.com/s3/.*\\?.*prefix=prod(%2F|/)",
      includeQueryParams: true,
    },
    {
      name: "development",
      alert: false,
      favicon: false,
      style: "#app > div > div > div > div > div > div > section { background-color: rgba(10,132,255,0.5) !important; }",
      url: "^https://.*\\.console\\.aws\\.amazon\\.com/ecs/.*(dev).*",
    },
    {
      name: "staging",
      alert: false,
      favicon: {
        rel: "icon",
        type: "image/svg+xml",
        href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='16' height='16'%3E%3Cpath d='M8 1 L15 14 L1 14 Z' fill='%23FFC107' stroke='%23F57F17' stroke-width='0.5'/%3E%3C/svg%3E",
      },
      style: "#app > div > div > div > div > div > div > section { background-color: rgba(255,214,10,0.5) !important; }",
      url: "^https://.*\\.console\\.aws\\.amazon\\.com/ecs/.*(stg|stage|staging).*",
    },
    {
      name: "production",
      alert: false,
      favicon: {
        rel: "icon",
        type: "image/svg+xml",
        href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='16' height='16'%3E%3Cpath d='M8 1 L15 14 L1 14 Z' fill='%23F44336' stroke='%23B71C1C' stroke-width='0.5'/%3E%3C/svg%3E",
      },
      style: "#app > div > div > div > div > div > div > section { background-color: rgba(255,69,58,0.5) !important; }",
      url: "^https://.*\\.console\\.aws\\.amazon\\.com/ecs/.*(prd|prod).*",
    },
  ];
}

function getMatchedConfig(url, configs) {
  const urlObj = new URL(url);

  return configs.find((config) => {
    // Use query params if config specifies it
    const matchTarget = config.includeQueryParams
      ? urlObj.origin + urlObj.pathname + urlObj.search
      : urlObj.origin + urlObj.pathname;

    return matchTarget.match(new RegExp(config.url));
  });
}

function testUrl(expect, url) {
  let configs = getDefaultConfigs();
  let result = getMatchedConfig(url, configs);

  if (!result) {
    result = { name: "unknown" };
  }

  console.assert(
    expect === result.name,
    url + " should be match as " + expect + ", but matched " + result.name
  );

  if (expect === result.name) {
    console.log("- [x] " + url + " matched as " + expect);
  }
}

testUrl("localhost", "http://localhost:8080");
testUrl("localhost", "http://localhost:8083");
testUrl("localhost", "http://localhost:8083/");
testUrl("localhost", "http://localhost:8083/path");
testUrl("development", "https://dev-foo-bar-admin-hoge.foo-bar.hoge.test");
testUrl("development", "https://dev-foo-bar-admin-hoge.foo-bar.hoge.test/");
testUrl("development", "https://dev-foo-bar-admin-hoge.foo-bar.hoge.test/path");
testUrl("staging", "https://stage-admin-foo.bar.test");
testUrl("staging", "https://stage-admin-foo.bar.test/");
testUrl("staging", "https://stage-admin-foo.bar.test/path");
testUrl("staging", "https://admin-feature-stage-foo.bar.test");
testUrl("staging", "https://admin-feature-stage-foo.bar.test/");
testUrl("staging", "https://admin-feature-stage-foo.bar.test/login");
testUrl("staging", "https://stg-admin.bar.test");
testUrl("staging", "https://stg-admin.bar.test/");
testUrl("staging", "https://stg-admin.bar.test/path");
testUrl("staging", "https://stage-foo-bar.foo.bar.test");
testUrl("production", "https://admin-feature-foo.bar.test");
testUrl("production", "https://admin-feature-foo.bar.test/");
testUrl("production", "https://admin-feature-foo.bar.test/path");
testUrl("production", "https://foo-admin-bar.foo.test");
testUrl("production", "https://foo-admin-bar.foo.test/");
testUrl("production", "https://foo-admin-bar.foo.test/path");
testUrl("production", "https://tx-ixxxxxx.sxxxxxxx.cx.jx");
testUrl("unknown", "https://foo.test");
testUrl("unknown", "https://foo.test/?q=stage-admin-feature-foo.bar.test");
testUrl("unknown", "https://foo.test/foo?q=admin-feature-foo.bar.test");
testUrl("unknown", "https://manage.test/dashboard/dev-admin/x");
testUrl("unknown", "https://manage.test/dashboard/stage-admin/x");
testUrl("unknown", "https://manage.test/dashboard/admin/x");
testUrl("unknown", "https://github.com/shueisha-arts-and-digital/.github");

// repositories tests
testUrl("repositories", "https://github.com/shueisha-arts-and-digital/backlog-mcp-server");
testUrl("repositories", "https://github.com/shueisha-arts-and-digital/composer-aws-assume-role-plugin");
testUrl("repositories", "https://github.com/shueisha-arts-and-digital/dbdb");
testUrl("repositories", "https://github.com/shueisha-arts-and-digital/docbase-mcp-server");
testUrl("repositories", "https://github.com/shueisha-arts-and-digital/github-backlog-sync");
testUrl("repositories", "https://github.com/shueisha-arts-and-digital/image");
testUrl("repositories", "https://github.com/shueisha-arts-and-digital/ms-teams-notify-orb");
testUrl("repositories", "https://github.com/shueisha-arts-and-digital/peacekeeper");
testUrl("repositories", "https://github.com/shueisha-arts-and-digital/Pj8.SentryModule");
testUrl("repositories", "https://github.com/shueisha-arts-and-digital/qiq-vscode-extension");
testUrl("repositories", "https://github.com/shueisha-arts-and-digital/sssh");
testUrl("repositories", "https://github.com/shueisha-arts-and-digital/vscode-bear-goto");
testUrl("repositories", "https://github.com/shueisha-arts-and-digital/vscode-twig-goto");

// includeQueryParams tests
testUrl("development", "https://ap-northeast-1.console.aws.amazon.com/s3/buckets/foo-bar?region=ap-northeast-1&prefix=dev/&showversions=false");
testUrl("development", "https://us-east-1.console.aws.amazon.com/s3/buckets/foo-bar?region=us-east-1&prefix=dev/foo/bar&showversions=false");
testUrl("development", "https://ap-northeast-1.console.aws.amazon.com/s3/buckets/foo-bar?prefix=dev%2F&region=ap-northeast-1&tab=objects");
testUrl("development", "https://ap-northeast-1.console.aws.amazon.com/s3/buckets/foo-bar?region=ap-northeast-1&prefix=dev%2Fecs%2F&showversions=false&tab=objects");
testUrl("staging", "https://ap-northeast-1.console.aws.amazon.com/s3/buckets/foo-bar?region=ap-northeast-1&prefix=stage/&showversions=false");
testUrl("staging", "https://us-east-1.console.aws.amazon.com/s3/buckets/test-bucket?region=us-east-1&prefix=stage%2Fapp%2F&showversions=false");
testUrl("production", "https://ap-northeast-1.console.aws.amazon.com/s3/buckets/foo-bar?prefix=prod/&region=ap-northeast-1");
testUrl("production", "https://eu-west-1.console.aws.amazon.com/s3/buckets/foo-bar?prefix=prod%2Fdata%2F&region=eu-west-1");
testUrl("unknown", "https://ap-northeast-1.console.aws.amazon.com/s3/buckets/foo-bar?region=ap-northeast-1&tab=objects");

// ECS
testUrl("unknown", "https://ap-northeast-1.console.aws.amazon.com/ecs/v2/clusters/foo/services/?region=ap-northeast-1");
testUrl("development", "https://ap-northeast-1.console.aws.amazon.com/ecs/v2/clusters/dev-foo/services/?region=ap-northeast-1");
testUrl("staging", "https://ap-northeast-1.console.aws.amazon.com/ecs/v2/clusters/stg-foo/services/?region=ap-northeast-1");
testUrl("production", "https://ap-northeast-1.console.aws.amazon.com/ecs/v2/clusters/prd-foo/services/?region=ap-northeast-1");
