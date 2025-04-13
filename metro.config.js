const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts = ["js", "jsx", "ts", "tsx", "json", "env"]; // Add 'env'

module.exports = config;