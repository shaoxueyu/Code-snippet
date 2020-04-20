const fs = require('fs')
const path = require('path')

const mongoose = require('mongoose')

function load(dir, cb) {
	// 获取绝对路径(这里是文件夹)
	const url = path.resolve(__dirname, dir)
	const files = fs.readdirSync(url)
	if (files.length === 0) {
		console.error('没有js文件')
	}
	files.forEach((filename) => {
		filename = filename.replace('.js', '')
		const file = require(`${url}/${filename}`)
		cb(filename, file)
	})
}

const loadModel = (config) => (app) => {
	mongoose
		.connect('mongodb://localhost/name', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log('连接成功')
		})
		.catch((err) => {
			console.log('连接失败', err)
		})

	app.$model = {}

	load('../model', (filename, { schema }) => {
		console.log('load model' + filename, schema)
		app.$model[filename] = mongoose.model(filename, schema)
	})
}

module.exports = {
	loadModel,
}
