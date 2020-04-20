const Koa = require("Koa")
const app = new Koa()

const dbconfig = require("./config/conf")
const {loadModel} = require("./framework/loader")

loadModel(dbconfig)(app)
const port = 8000
app.listen(port, () => {
	console.log(`app start on ${port}`)
})
