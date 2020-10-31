const withImages = require('next-images');

module.exports = withImages({
  basePath: process.env.TARGET_PATH
    ? `/${process.env.TARGET_PATH.replace(/\/$/g, '')}`
    : undefined,
});
