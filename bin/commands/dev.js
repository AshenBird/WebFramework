
const { resolve } = require("path");
module.exports = () => {
  require(
    resolve(process.cwd(), "server")
  )
}
