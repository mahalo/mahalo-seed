const path = require('path');

module.exports = {
    entry: {
        index: './app'
    },
    output: {
        path: path.join(__dirname, 'build', 'assets'),
        publicPath: 'http://localhost:8080/assets/',
        filename: "[name].js",
        chunkFilename: "[chunkhash].js"
    },
    resolve: {
        extensions: ['', '.js', '.ts']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'babel',
                query: {presets: ['mahalo']}
            },
            {
                test: /\.mhml$/,
                loader: 'mahalo!html'
            },
            {
                test: /\.(svg|png|jpg|gif|woff|woff2|otf|ttf|eot)/,
                loader: 'file'
            }
        ]
    },
    htmlLoader: {
        root: __dirname,
        removeAttributeQuotes: false
    }
}