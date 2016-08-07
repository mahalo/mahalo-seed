const UglifyJsPlugin = require('webpack').optimize.UglifyJsPlugin;
const webpackConfig = require('./webpack.config.js');
const outputPath = webpackConfig.output.path;
const styleTest = /\.(css|less)$/;
const styleLoader = 'style!css!less';
const styleLoaderDev = 'style' + '!css?sourceMap' + '!less?sourceMap&sourceMapBasepath=' + __dirname;

/**
 * Prepare the public path for starting the app
 * from the file system. For hosting solutions
 * please comment this out or remove it.
 * 
 * On windows systems the path starts with a drive letter
 * and has to be prefixed. Also backslashes need to be
 * converted.
 * 
 * Finally the protocol can be added.
 */
var publicPath = outputPath;

if (publicPath[0] !== '/') {
    publicPath = '/' + publicPath.replace(/\\/g, '/');
}

publicPath = encodeURI('file://' + publicPath);

/**
 * For hosting your app just provide your domain
 * as the public path.
 */
// const publicPath = 'http://www.example.com';

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    
    grunt.initConfig({
        clean: {
            build: [outputPath],
        },
        webpack: {
            options: webpackConfig,
            build: {
                output: {
                    publicPath: publicPath
                },
                plugins: [new UglifyJsPlugin()],
                module: {
                    loaders: [{test: styleTest, loader: styleLoader}]
                }
            }
        },
        'webpack-dev-server': {
            options: {
                webpack: webpackConfig,
                publicPath: webpackConfig.output.publicPath,
                contentBase: 'build/',
                host: 'localhost'
            },
            start: {
                inline: true,
                keepalive: true,
                webpack: {
                    module: {
                        loaders: [{test: styleTest, loader: styleLoaderDev}]
                    },
                    devtool: 'source-map'
                }
            }
        },
        karma: {
            run: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        }
    });
    
    grunt.registerTask('default', ['webpack-dev-server:start']);
    grunt.registerTask('build', ['clean:build', 'webpack:build']);
    grunt.registerTask('test', ['karma:run']);
};