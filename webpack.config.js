/**
 * @file webpack配置
 * @author laomu1988<laomu1988@qq.com>
 */
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        client: './src/client.js'
    },
    output: {
        path: path.resolve(__dirname + '/dist'),
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
};
