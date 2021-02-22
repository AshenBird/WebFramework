// --@ts-check
// const execa = require("execa")
const { resolve } = require("path");
const forever = require('forever-monitor');
const fs = require("fs-extra")
module.exports = ()=>{
  
  const filePath = resolve(process.cwd(), "server.js");
  const child = new (forever.Monitor)(filePath, {
    max: 3,
    silent: true,
    args: [],
    'env': { 'NODE_ENV': 'production' }
  });

  child.on('exit', function () {
    console.log('server.js has exited after 3 restarts');
  });
  child.on('start', function(_process, data) {
    const p = resolve(process.cwd(), "forever.json")
    fs.ensureFileSync(p)
    fs.writeJsonSync(p, data )
    process.exit(0)
  });
  child.start();
  // console.log(filePath)
  // execa(`cross-env NODE_ENV=production forever start ${filePath}`)
  //   .stdout
  //   .pipe(process.stdout);
}

