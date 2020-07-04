/*
 * @Author: your name
 * @Date: 2020-06-03 20:37:39
 * @LastEditTime: 2020-07-04 19:44:10
 * @LastEditors: ZJT
 * @Description: In User Settings Edit
 * @FilePath: \codeTest\Reptile\routes\index1.js
 */
var express = require('express');
var router = express.Router();
var http = require('https');
var cheerio = require('cheerio');
var fs = require("fs")
var request = require("request")
var path = require("path")
var untils = require('../until')
var TurndownService = require('turndown'); //html转md
var turndownPluginGfm = require('joplin-turndown-plugin-gfm') //table优化插件
var gfm = turndownPluginGfm.gfm
var turndownService = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
});
turndownService.use(gfm)

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: '简单nodejs爬虫'
  });
});

function getAllLink(list_link, list_link_class, pageStart, pageEnd, target_tit, target_content, outputType, resCb) {
  var promises = [];
  var dir = Date.now();
  var type;
  type = outputType == 'html' ? 'note' : 'noteMd'
  untils.hasDir(`./${type}/${dir}`).then(res => {
    fs.mkdir(`./${type}/${dir}`, function (err) {
      if (err) return false
    })
  })
  for (let i = pageStart; i <= pageEnd; i++) {
    promises.push(geturl(list_link, i, list_link_class));
  }
  Promise.all(promises).then(rs => {
    rs.forEach(v => {
      for (let k = 0; k < v.length; k++) {
        reptile(v[k], function ($) {
          var tit = $(target_tit).text().trim();
          // 以标题为文件名，去除特殊符号
          filetitle = tit.replace(/[&\/\\#,\-+$~%.'":*?<>{}]/g, '').trim();
          if (outputType == "html") { //输出html
            fs.writeFile(`./note/${dir}/${filetitle}.html`, $(target_content).html(), function (err) {
              if (err) {
                throw err;
              } else {
                if (k == v.length - 1) {
                  untils.zipHandler(type, dir).then(rs => {
                    untils.delDir(`./${type}/${dir}`) //删除所有文件
                    resCb(rs)
                  })
                }
              }
            });
          } else { //输出md 
            var markdown;
            if ($(target_content).html()) {
              markdown = turndownService.turndown($(target_content).html())
            } else {
              markdown = '空的啦'
            }
            fs.writeFile(`./noteMd/${dir}/${filetitle}.md`, markdown, function (err) {
              if (err) {
                throw err;
              } else {
                if (k == v.length - 1) {
                  untils.zipHandler(type, dir).then(rs => {
                    untils.delDir(`./${type}/${dir}`) //删除所有文件
                    resCb(rs)
                  })
                }
              }
            })
          }
        })
      }
    })
  }).catch(err => {
    resCb(err)
  })
}
// 获取每页的文章链接
function geturl(url, i, list_link_class) {
  return new Promise(function (resolve, reject) {
    reptile(`${url}${i}`, function ($) {
      if ($(list_link_class).length != 0) {
        var arr = []
        $(list_link_class).each(function (i, v) {
          arr.push($(this).attr('href'))
        })
        resolve(arr)
      } else {
        reject('未找到要获取的文章链接的Class')
      }
    })
  })
}
// 爬取dom
function reptile(url, cb) {
  request({
    url: url,
    method: 'GET'
  }, (err, response, body) => {
    if (err) {
      console.log(err)
    }
    let $ = cheerio.load(body, {
      decodeEntities: false //解析中文
    });
    cb($)
  })
}
router.post('/spider', (req, res, nex) => {
  let {
    list_link,
    list_link_class,
    page_start,
    page_end,
    target_tit,
    target_content,
    outputType
  } = req.body;
  if (list_link &&
    list_link_class &&
    page_start &&
    page_end &&
    target_tit &&
    target_content &&
    outputType) {
    getAllLink(list_link, list_link_class, page_start, page_end, target_tit, target_content, outputType, function (rs) {
      if (rs.path) {
        res.json({
          code: 1,
          msg: rs
        })
      } else {
        res.json({
          code: 0,
          msg: 'fail'
        })
      }
    })
  }else{
    res.json({
      code:0,
      msg:'请补全参数'
    })
  }
})
module.exports = router;