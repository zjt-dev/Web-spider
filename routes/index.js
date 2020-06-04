/*
 * @Author: your name
 * @Date: 2020-06-03 20:37:39
 * @LastEditTime: 2020-06-04 09:36:10
 * @LastEditors: ZJT
 * @Description: In User Settings Edit
 * @FilePath: \Reptile\routes\index.js
 */ 
var express = require('express');
var router = express.Router();
var http = require('https');
var cheerio = require('cheerio');
var fs = require("fs")
var request = require("request")
var TurndownService = require('turndown'); //html转md
var turndownService = new TurndownService();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: '简单nodejs爬虫'
  });
});
router.get('/getdata', function (req, Res, next) { // 浏览器端发来get请求
  var page = req.query.page;
  var type = req.query.type;
  var pageStart = page.split('-')[0];
  var pageEnd = page.split("-")[1];
  getAllLink()
  function getAllLink() {
    var promises = [];
    for (let i = pageStart; i <= pageEnd; i++) {
      promises.push(geturl(i));
    }
    Promise.all(promises).then(res => {
      res.forEach(v => {
        for (let k = 0; k < v.length; k++) {
          reptile(v[k], function ($) {
            var tit = $(".postTitle").text().trim();
            // 以标题为文件名，去除特殊符号
            filetitle = tit.replace(/[&\/\\#,\-+$~%.'":*?<>{}]/g, '').trim();
            if (type == "html") { //输出html
              fs.writeFileSync(`./note/${filetitle}.html`, $(".blogpost-body").html(), function (err) {
                if (err) {
                  throw err;
                }
              });
            } else { //输出md 
              var markdown = turndownService.turndown($(".blogpost-body").html())
              fs.writeFileSync(`./noteMd/${filetitle}.md`, markdown, function (err) {
                if (err) throw err
              })
            }
          })
        }
      })
      Res.send("<h1>爬取成功</h1>")
    })
  }
  // 获取每页的文章链接
  function geturl(i) {
    return new Promise(function (resolve, reject) {
      reptile(`https://www.cnblogs.com/zjt-blogs/default.html?page=${i}`, function ($) {
        var arr = []
        $(".postTitle2").each(function (i, v) {
          arr.push($(this).attr('href'))
        })
        resolve(arr)
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
      var $ = cheerio.load(body, {
        decodeEntities: false //解析中文
      });
      cb($)
    })
    // http.get(url, function (res) {
    //   var data = '';
    //   res.on('data', function (chunk) {
    //     data += chunk
    //   })
    //   res.on('end', function () {
    //     console.log(data)
    //     var $ = cheerio.load(data, {
    //       decodeEntities: false //解析中文
    //     });
    //     cb($)
    //   })
    // })
  }
});

router.post('/spider',(req,res,nex)=>{
  console.log(req.body)
  res.json({code:1})
})
module.exports = router;