const fs = require('fs-extra');
const {resolve} = require("path")
const root = resolve(process.cwd(), "../")
const packageInfo = require(resolve(root, "package.json"))
const execa = require("execa")
module.exports=()=>{
  Object.assign(packageInfo.dependencies,{})
  fs.writeJsonSync(resolve(root, "package.json"), packageInfo )
  process.chdir(root);
  execa.command("yarn")
}