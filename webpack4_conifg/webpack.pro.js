// 单页面应用中使用import（"./test.js）.then(res => {sdsd})
const { smart } = require('webpack-merge')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackBaseConfig = require('./webpack.base')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
//压缩单独打包出来的css
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
  
module.exports = smart(webpackBaseConfig, {
	entry: {
		app: path.join(__dirname, './src/main.js'),
	},
	output: {
		path: path.join(__dirname, './dist'),
		filename: '[hash:4][name].bundle.js',
	},
	mode: 'production',
	module: {
		rules: [
			{
				test: /\.less$/,
				use: ExtractTextWebpackPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'less-loader'],
				}),
			},
		],
	},
	plugins: [
		new OptimizeCssAssetsWebpackPlugin(),
		new ExtractTextWebpackPlugin('css/style.css'),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './src/index.html'),
			filename: 'index.html',
			minify: {
				collapseWhitespace: true, //删除空格
				removeComments: true, //删除注释
				removeAttributeQuotes: true, // 移除 属性上的双引号
			},
		}),
	],
	optimization: {
		splitChunks: {
			name: true, // 打包生成的js有入口所设置的文件名 vendors。。
			chunks: 'all',
			/* cacheGroups: /test.js/ //用于多页面，把多页面中共同引用的模块，单独拿出来，与原本生成的一个js分离开 */
		},
		runtimeChunk: true, //将webpack vue 配置文件打包一个成单独的js文件
	},
})
