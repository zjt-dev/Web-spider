/*
 * @Date: 2020-06-15 16:51:14
 * @LastEditors: ZJT
 * @LastEditTime: 2020-07-04 19:16:12
 * @FilePath: \codeTest\Reptile\until.js
 */ 
var fs = require('fs')
var archiver = require('archiver');
var path = require('path')

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
/**
 * @name: ZJT
 * @msg: 
 * @param {type:输出文件的路径  zipDir: 打包的文件名}  
 * @return: 
 */
// zip打包
function zipHandler(type,zipDir){
  return new Promise(function(resolve,reject){
    var output = fs.createWriteStream(__dirname + `/public/source/${zipDir}.zip`);
    var archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    });
    output.on('close', function() {
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
/**
 * @name: ZJT
 * @msg: 
 * @param {url} 文件夹路径 
 * @return: 
 */
// 删除文件夹
function delDir(url) {
  var files = [];
  //判断给定的路径是否存在
  if (fs.existsSync(url)) {
    //返回文件和子目录的数组
    files = fs.readdirSync(url);
    files.forEach(function (file, index) {
      var curPath = path.join(url, file);
      //fs.statSync同步读取文件夹文件，如果是文件夹，在重复触发函数
      if (fs.statSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
        // 是文件delete file  
      } else {
        fs.unlinkSync(curPath);
      }
    });
    //清除文件夹
    setTimeout(() => {
      fs.rmdirSync(url);
    }, 3000);
  } else {
    console.log("给定的路径不存在，请给出正确的路径");
  }
}

module.exports = {
  hasDir,
  zipHandler,
  delDir
}