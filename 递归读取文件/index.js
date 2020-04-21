const fs = require('fs')
const path = require('path')

let filelist = [] //把读到的文件都放在这里

function readFile(dir, filelist) {
  const files = fs.readdirSync(dir)
	files.forEach((file) => {
		stat = fs.statSync(path.join(dir, file))
		if (stat.isDirectory()) {
			readFile(path.join(dir, file), filelist)
		} else {
			const filePath = path.join(dir, file)
			filelist.push(filePath)
		}
	})
}
readFile(path.join(__dirname,"../routes"),filelist)
console.log(filelist);