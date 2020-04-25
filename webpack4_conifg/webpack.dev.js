const {smart} = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")
module.exports = smart(webpackBaseConfig, {
	devtool:"eval-source-map",
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './src/index.html'),
			filename: 'index.html',
		}),
	]
})
