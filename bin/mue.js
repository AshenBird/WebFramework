#!/usr/bin/env node
const [node_path, cli_path, commandName, ...rest] = process.argv;
const fs = require('fs-extra')
const { resolve, relative } = require("path");
const root = resolve(__dirname, '../')
const { getFileList } = require("./utils");
const chalk = require('chalk');

if (
  !fs.pathExists(`./commands/${commandName}`) ||
  !fs.pathExists(`./commands/${commandName}.js`)
) {
  console.error(chalk.white.bgRed(`找不到命令 "${commandName}"`))
  process.exit(0);
}

const tempPath = resolve(root, "./template")
const mwf = resolve(process.cwd(),"./.mwf");
const dest = resolve(mwf,"./dist");
const src = resolve(mwf,"./src");

fs.ensureDirSync(mwf);
fs.ensureDirSync(dest);
fs.ensureDirSync(src);

getFileList(tempPath).forEach( async (origin) => {

  const file = relative(tempPath, origin)
  const target = resolve(process.cwd(), "./.mwf",file)
  if(fs.pathExistsSync(target))return;
  await fs.copy(origin, target).catch(e=>{
    console.log(e)
  })
  console.log(`has copy ${chalk.green(file)}`)
});

process.chdir(mwf)
require(`./commands/${commandName}`)(rest);
