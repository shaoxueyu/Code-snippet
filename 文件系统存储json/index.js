const fs = require('fs')
const path = require('path')
function get(key) {
	fs.readFile(path.join(__dirname, './db.json'),"utf-8", (err, data) => {
    const json = JSON.parse(data)
    console.log(json[key]);
	})
}

function set(key, value) {
	fs.readFile(path.join(__dirname, './db.json'),"utf-8", (err, data) => {
		const json = data ? JSON.parse(data) : {}
		json[key] = value
		fs.writeFile(
			path.join(__dirname, './db.json'),
			JSON.stringify(json),
			(err) => {
				if (err) console.log(err)
				console.log('写入成功')
			}
		)
	})
}

//命令行方式
const readline = require('readline')

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
})

rl.on('line', function (input) {
	const [op, key, value] = input.split(' ')
	if (op === 'get') {
		get(key)
	} else if (op === 'set') {
		set(key, value)
	} else if (op === 'quit') {
		rl.close()
	} else {
		console.log('没有操作')
	}
})
rl.on('close', function () {
	process.exit(0)
})
