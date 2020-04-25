const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
	entry: path.join(__dirname, './src/main.js'),
	output: {
		path: path.join(__dirname, './dist'),
		filename: 'bundle.js',
	},
	plugins:[
		new VueLoaderPlugin()
	],
	module: {
		rules: [
			{ test: /\.css$/, use: ['style-loader', 'css-loader'] },
			{
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: [
								require('autoprefixer')({
									overrideBrowserslist: [
										'>1%',
										'last 2 versions',
									],
								}),
							],
						},
					},
					'less-loader',
				],
			},
			{
				test: /\.(png|gif|bmp|jpg|jpeg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: '[name].[hash:4].[ext]',
							outputPath: 'assets/img',
							publicPath: '/dist/assets/img',
							limit: 5000,
						},
					},
				],
			},
			{
				test: /\.jsx?$/,
				use: 'babel-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.vue$/,
				use: 'vue-loader',
			},
		],
	},
}
