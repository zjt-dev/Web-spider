/*
 * @Date: 2020-06-03 16:14:11
 * @LastEditors: ZJT
 * @LastEditTime: 2020-06-23 17:15:53
 * @FilePath: \Reptile\toMd.js
 */

var fs = require('fs');
var TurndownService = require('turndown'); //html转md
var turndownPluginGfm = require('joplin-turndown-plugin-gfm') //table优化插件
 
var gfm = turndownPluginGfm.gfm
var turndownService = new TurndownService({
  headingStyle:"atx",
  codeBlockStyle:"fenced",
});
turndownService.use(gfm)
fs.readFile('./eventloop.html',function(err,data){
  var markdown = turndownService.turndown(data.toString())
  fs.writeFileSync(`eventloop.md`, markdown, function (err) {
    if (err) throw err
  })
})