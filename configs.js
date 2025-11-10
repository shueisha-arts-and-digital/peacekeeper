export function getMatchedConfig(url, configs) {
  const urlObj = new URL(url);

  return configs.find((config) => {
    // Build match target based on config options
    let matchTarget = urlObj.origin + urlObj.pathname;

    if (config.includeQueryParams) {
      matchTarget += urlObj.search;
    }

    if (config.includeHash) {
      matchTarget += urlObj.hash;
    }

    return matchTarget.match(new RegExp(config.url));
  });
}

export function getDefaultConfigs() {
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
        backgroundColor: "rgba(99, 187, 253, 0.5)",
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
        backgroundColor: "rgba(253, 129, 122, 0.5)",
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
    // S3 (params)
    {
      name: "development",
      alert: false,
      favicon: false,
      style: "#app > div > div > div > section { background-color: rgba(99, 187, 253, 1) !important; }",
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
      style: "#app > div > div > div > section { background-color: rgba(253, 129, 122, 1) !important; }",
      url: "^https://.*\\.console\\.aws\\.amazon\\.com/s3/.*\\?.*prefix=prod(%2F|/)",
      includeQueryParams: true,
    },
    // S3 (bucket name)
    {
      name: "development",
      alert: false,
      favicon: false,
      style: "#app > div > div > div > section { background-color: rgba(99, 187, 253, 1) !important; }",
      url: "^https://.*\\.console\\.aws\\.amazon\\.com/s3/.*(dev).*",
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
      url: "^https://.*\\.console\\.aws\\.amazon\\.com/s3/.*(stg|stage|staging).*",
    },
    {
      name: "production",
      alert: false,
      favicon: {
        rel: "icon",
        type: "image/svg+xml",
        href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='16' height='16'%3E%3Cpath d='M8 1 L15 14 L1 14 Z' fill='%23F44336' stroke='%23B71C1C' stroke-width='0.5'/%3E%3C/svg%3E",
      },
      style: "#app > div > div > div > section { background-color: rgba(253, 129, 122, 1) !important; }",
      url: "^https://.*\\.console\\.aws\\.amazon\\.com/s3/.*(prd|prod).*",
    },
    // ECS
    {
      name: "development",
      alert: false,
      favicon: false,
      style: "#app > div > div > div > div > div > div > section { background-color: rgba(99, 187, 253, 1) !important; }",
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
      style: "#app > div > div > div > div > div > div > section { background-color: rgba(255,214,10,1) !important; }",
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
      style: "#app > div > div > div > div > div > div > section { background-color: rgba(253, 129, 122, 1) !important; }",
      url: "^https://.*\\.console\\.aws\\.amazon\\.com/ecs/.*(prd|prod).*",
    },
    // ElastiCache, RDS, OpenSearch, Lambda
    {
      name: "development",
      alert: false,
      favicon: false,
      style: "#app > div > div > div > section { background-color: rgba(99, 187, 253, 1) !important; }",
      url: "^https://.*\\.console\\.aws\\.amazon\\.com/(elasticache|rds|aos|lambda)/.*(dev).*",
      includeHash: true,
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
      url: "^https://.*\\.console\\.aws\\.amazon\\.com/(elasticache|rds|aos|lambda)/.*(stg|stage|staging).*",
      includeHash: true,
    },
    {
      name: "production",
      alert: false,
      favicon: {
        rel: "icon",
        type: "image/svg+xml",
        href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='16' height='16'%3E%3Cpath d='M8 1 L15 14 L1 14 Z' fill='%23F44336' stroke='%23B71C1C' stroke-width='0.5'/%3E%3C/svg%3E",
      },
      style: "#app > div > div > div > section { background-color: rgba(253, 129, 122, 1) !important; }",
      url: "^https://.*\\.console\\.aws\\.amazon\\.com/(elasticache|rds|aos|lambda)/.*(prd|prod).*",
      includeHash: true,
    },
  ];
}
