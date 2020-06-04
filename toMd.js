/*
 * @Date: 2020-06-03 16:14:11
 * @LastEditors: ZJT
 * @LastEditTime: 2020-06-04 13:53:52
 * @FilePath: \Reptile\toMd.js
 */

// var fs = require('fs');
// var archiver = require('archiver');
// var output = fs.createWriteStream(__dirname + '/public/source/note.zip');
// var archive = archiver('zip', {
//   zlib: { level: 9 } // Sets the compression level.
// });
// output.on('close', function() {
//   console.log(archive.pointer() + ' total bytes');
//   console.log('archiver has been finalized and the output file descriptor has closed.');
// });
// output.on('end', function() {
//   console.log('Data has been drained');
// });
// archive.on('warning', function(err) {
//   if (err.code === 'ENOENT') {
//     // log warning
//   } else {
//     // throw error
//     throw err;
//   }
// });

// archive.on('error', function(err) {
//   throw err;
// });
// archive.pipe(output);
// archive.directory('note/', false);
// archive.finalize();
function miniZip (n){
  console.log(n)
}
exports.miniZip = miniZip
exports.name = 'sdfdsfs'

