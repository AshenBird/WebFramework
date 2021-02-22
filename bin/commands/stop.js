// --@ts-check
const { resolve } = require("path");
const forever = require('forever-monitor');
const fs = require("fs-extra")
module.exports = ()=>{
  const filePath = resolve(process.cwd(), "forever.json");
  const pid = fs.readJsonSync(filePath).pid
  forever.kill(pid)
  fs.removeSync(filePath)
}

