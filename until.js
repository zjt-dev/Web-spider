/*
 * @Date: 2020-06-15 16:51:14
 * @LastEditors: ZJT
 * @LastEditTime: 2020-06-15 17:57:32
 * @FilePath: \codeTest\Reptile\until.js
 */ 
var fs = require('fs')
var archiver = require('archiver');

// 判断文件是否存在
function hasDir(dir){
  return new Promise(function(resolve,rejects){
    fs.stat(dir, async function(error,stats){
      if(error){
        resolve(false)
        return false
      }
      resolve(stats.isDirectory())
    })
  })
}

// zip打包
function zipHandler(type,zipDir){
  return new Promise(function(resolve,reject){
    var output = fs.createWriteStream(__dirname + `/public/source/${zipDir}.zip`);
    var archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    });
    output.on('close', function() {
      // console.log(archive.pointer() + ' total bytes');
      // console.log('archiver has been finalized and the output file descriptor has closed.');
      let path = `/source/${zipDir}.zip`
      resolve({path})
    });
    archive.on('error', function(err) {
      reject(err)
    });
    archive.pipe(output);
    archive.directory(`${type}/${zipDir}`, false);
    archive.finalize();
  })
}
module.exports = {
  hasDir,
  zipHandler
}