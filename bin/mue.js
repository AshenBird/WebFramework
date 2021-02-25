#!/usr/bin/env node
const [node_path, cli_path, commandName, ...rest] = process.argv;
const fs = require('fs-extra')
const { resolve, relative } = require("path");
const root = resolve(__dirname, '../')
const { getFileList } = require("./utils");
const chalk = require('chalk');

// 判断命令是否存在
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

// 确保三个主要目录存在

fs.ensureDirSync(mwf);
fs.ensureDirSync(dest);
fs.ensureDirSync(src);


// 获取需要的文件列表，并拷贝未拷贝文件
getFileList(tempPath).forEach( async (origin) => {

  const file = relative(tempPath, origin)
  const target = resolve(process.cwd(), "./.mwf",file)
  if(fs.pathExistsSync(target))return;
  await fs.copy(origin, target).catch(e=>{
    console.log(e)
  })
  console.log(`has copy ${chalk.green(file)}`)
});


const opt = {
  rest
}

// 切换命令执行的目录位置
process.chdir(mwf)
require(`./commands/${commandName}`)(opt);
