module.exports = function override(config) {
  config.resolve.fallback = {
    fs: false,
    path: require.resolve('path-browserify'),
    stream: require.resolve('stream-browserify'),
    crypto: require.resolve('crypto-browserify')
  };

  // Allow bare specifiers without extensions in ESM modules (sdk-dapp 5.6+)
  config.module.rules.push({
    test: /\.m?js/,
    resolve: { fullySpecified: false }
  });

  // Transpile sdk-dapp-ui which ships raw .ts files
  config.module.rules.push({
    test: /\.tsx?$/,
    include: /node_modules\/@multiversx\/sdk-dapp-ui/,
    use: {
      loader: require.resolve('babel-loader'),
      options: {
        presets: [
          require.resolve('babel-preset-react-app')
        ]
      }
    }
  });

  return config;
};
