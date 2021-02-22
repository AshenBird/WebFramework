const fs = require('fs-extra');
const { resolve } = require('path');
const getFileList = (path)=>{
  const result = [];
  const list = fs.readdirSync(path,{withFileTypes :true})
  for (const dirnet of list) {
    if(!dirnet.isDirectory()){
      result.push(
        resolve(path, dirnet.name)
      )
      continue;
    }
    result.push(...getFileList(resolve(path, dirnet.name)))
  }
  return result;
}
module.exports = {
  getFileList
}