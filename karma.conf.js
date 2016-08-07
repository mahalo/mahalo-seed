const webpackConfig = require('./webpack.config.js');

module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],
        browsers: ['Chrome'],
        files: [
            'test/index.ts'
        ],
        preprocessors: {
            'test/index.ts': ['webpack']
        },
        webpack: {
            module: webpackConfig.module,
            resolve: webpackConfig.resolve,
            htmlLoader: webpackConfig.htmlLoader,
            devtool: 'source-map'
        }
    });
};