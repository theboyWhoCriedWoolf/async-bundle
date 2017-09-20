const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'eval',
    entry: path.resolve(__dirname, 'examlpes/index.js'),
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader?cacheDirectory=true'
            },
            {
                test: /\.css$/,
                exclude: /(node_modules|bower_components|static)/,
                use: [
                    'style-loader',
                    'css-loader'
                ],
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: path.resolve(__dirname, 'examlpes/index.html')
        })
    ]
};
