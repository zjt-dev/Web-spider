/*
 * @Date: 2020-06-03 16:14:11
 * @LastEditors: ZJT
 * @LastEditTime: 2020-06-03 16:55:45
 * @FilePath: \Reptile\toMd.js
 */
var fs = require('fs');
var TurndownService = require('turndown');
var turndownService = new TurndownService();
fs.readdir('./note', function (err, files) {
  files.forEach(v => {
    fs.readFile(`./note/${v}`, 'utf8', function (err, date) {
      var markdown = turndownService.turndown(date)
      var mdFilename = v.replace(/(.*\/)*([^.]+).*/ig, "$2") //去后缀
      fs.writeFileSync(`./noteMd/${mdFilename}.md`, markdown, function (err) {
        if (err) throw err
      })
    })
  })
})
// fs.readFile('./note/- 半小时.html','utf8',function(err,date){
//   var markdown = turndownService.turndown(date)
//   fs.writeFileSync('./noteMd/- 半小时.md',markdown,function(err){
//     if (err) throw err
//   })
// })