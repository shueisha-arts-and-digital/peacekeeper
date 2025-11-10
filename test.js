import { getMatchedConfig, getDefaultConfigs } from './configs.js';

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

// includeQueryParams tests (S3 prefix tests)
testUrl("development", "https://ap-northeast-1.console.aws.amazon.com/s3/buckets/foo-bar?region=ap-northeast-1&prefix=dev/&showversions=false");
testUrl("development", "https://us-east-1.console.aws.amazon.com/s3/buckets/foo-bar?region=us-east-1&prefix=dev/foo/bar&showversions=false");
testUrl("development", "https://ap-northeast-1.console.aws.amazon.com/s3/buckets/foo-bar?prefix=dev%2F&region=ap-northeast-1&tab=objects");
testUrl("development", "https://ap-northeast-1.console.aws.amazon.com/s3/buckets/foo-bar?region=ap-northeast-1&prefix=dev%2Fecs%2F&showversions=false&tab=objects");
testUrl("staging", "https://ap-northeast-1.console.aws.amazon.com/s3/buckets/foo-bar?region=ap-northeast-1&prefix=stage/&showversions=false");
testUrl("staging", "https://us-east-1.console.aws.amazon.com/s3/buckets/test-bucket?region=us-east-1&prefix=stage%2Fapp%2F&showversions=false");
testUrl("production", "https://ap-northeast-1.console.aws.amazon.com/s3/buckets/foo-bar?prefix=prod/&region=ap-northeast-1");
testUrl("production", "https://eu-west-1.console.aws.amazon.com/s3/buckets/foo-bar?prefix=prod%2Fdata%2F&region=eu-west-1");
testUrl("unknown", "https://ap-northeast-1.console.aws.amazon.com/s3/buckets/foo-bar?region=ap-northeast-1&tab=objects");

// S3 bucket name tests
testUrl("staging", "https://ap-northeast-1.console.aws.amazon.com/s3/buckets/stg-bucket?region=ap-northeast-1&tab=objects");
testUrl("production", "https://ap-northeast-1.console.aws.amazon.com/s3/buckets/prd-bucket?region=ap-northeast-1&tab=objects");

// ECS
testUrl("unknown", "https://ap-northeast-1.console.aws.amazon.com/ecs/v2/clusters/foo/services/?region=ap-northeast-1");
testUrl("development", "https://ap-northeast-1.console.aws.amazon.com/ecs/v2/clusters/dev-foo/services/?region=ap-northeast-1");
testUrl("staging", "https://ap-northeast-1.console.aws.amazon.com/ecs/v2/clusters/stg-foo/services/?region=ap-northeast-1");
testUrl("production", "https://ap-northeast-1.console.aws.amazon.com/ecs/v2/clusters/prd-foo/services/?region=ap-northeast-1");

// includeHash tests(ElastiCache,RDS,OpenSearch,Lambda)
testUrl("production", "https://ap-northeast-1.console.aws.amazon.com/elasticache/home?region=ap-northeast-1#/valkey/prd-cache-cluster");
testUrl("production", "https://ap-northeast-1.console.aws.amazon.com/rds/home?region=ap-northeast-1#database:id=prd-db-cluster;is-cluster=true");
testUrl("production", "https://ap-northeast-1.console.aws.amazon.com/rds/home?region=ap-northeast-1#database:id=prd-db-1;is-cluster=false");
testUrl("production", "https://ap-northeast-1.console.aws.amazon.com/aos/home?region=ap-northeast-1#opensearch/domains/foo-prod")
testUrl("staging", "https://ap-northeast-1.console.aws.amazon.com/lambda/home?region=ap-northeast-1#/functions/foo-stg-function?tab=code");
testUrl("staging", "https://ap-northeast-1.console.aws.amazon.com/lambda/home?region=ap-northeast-1#/applications/foo-stg-application");
testUrl("staging", "https://ap-northeast-1.console.aws.amazon.com/lambda/home?region=ap-northeast-1#/statemachines/foo-stg-statemachine");
