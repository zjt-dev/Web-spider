/*
 * @Date: 2020-06-04 12:24:33
 * @LastEditors: ZJT
 * @LastEditTime: 2020-06-15 18:07:25
 * @FilePath: \codeTest\Reptile\test.js
 */ 
// var TurndownService = require('turndown'); //html转md
// var turndownService = new TurndownService({
//   headingStyle:'atx'
// });
// var fs = require('fs')
// // fs.readFile('./note/深入理解JavaScript系列（10）：JavaScript核心（晋级高手必读篇）.html',function(err,data){
// //   console.log(data.toString());
// //   var markdown = turndownService.turndown(da)
// //   fs.writeFileSync(`./noteMd/1111.md`, markdown, function (err) {
// //     if (err) throw err
// //   })
// // })
// fs.readdir('./note',(err,files)=>{
//   var a = []
//   files.map((v,i)=>{
//     var f = v.split('.html')[0]
//     // var b = f.split('系列')[1]
//     // var end = b.split('：')[1]
//     // var sta = b.split('：')[0]
//     // var s = sta.replace(/[（|）]/g,"")
//     // console.log(v);
//     fs.readFile('./note/'+v,function(err,data){
//       // console.log('./note/'+v);
//       var markdown = turndownService.turndown(data.toString())
//       fs.writeFileSync(`./noteMd/${f}.md`, markdown, function (err) {
//         if (err) throw err
//       })
//     })
//   })
// })

var untils = require('./until')
// console.log(untils);
untils.zipHandler('note','1592213154226').then(res=>{
  console.log(res);
})
