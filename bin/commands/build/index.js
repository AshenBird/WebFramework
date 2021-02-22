const clientBuild = require("./client")
const serverBuild = require("./server")
module.exports = async () => {
  await Promise.all([
    clientBuild(),
    serverBuild()
  ])
}
