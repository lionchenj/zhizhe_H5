const tsImportPluginFactory = require('ts-import-plugin')
const { getLoader } = require("react-app-rewired");
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  const tsLoader = getLoader(
    config.module.rules,
    rule =>
      rule.loader &&
      typeof rule.loader === 'string' &&
      rule.loader.includes('ts-loader')
  );

  tsLoader.options = {
    getCustomTransformers: () => ({
      before: [ tsImportPluginFactory({
        libraryDirectory: 'es',
        libraryName: 'antd-mobile',
        style: true,
      }) ]
    })
  };

  config = rewireLess.withLoaderOptions({
        modifyVars: { 
          "@brand-primary": "#3296FA",
          "@color-text-base": "#333333",
          "@color-text-base-inverse": "#ffffff",
          "@color-text-placeholder": "#B2B5C0",
          // "@toast-fill": "#000"
        },
        javascriptEnabled: true,
    })(config, env);

  return config;
}