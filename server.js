var express = require('express')

var app = express()

var fs = require('fs')
var path = require('path')




var hasError = false;
app.get('/getlistdata', function(req, res, next) {
    res.contentType('json');
    // console.log(req.query);
    var pageSize = parseInt(req.query.pageSize);
    var pageNum = parseInt(req.query.pageNum);
    var data = [];
    for(var i=0;i<pageSize;i++){
        data.push({
            name:"正文标题第"+(pageNum)+"页第"+(i+1)+"条数据",
            desc:"描述文本描述文本描述文本描述文本描述文本描述文本描述文本描述文本描述文本描述文本描述文本第"+(pageNum)+"页第"+(i+1)+"条数据",
            id:"xxx",
            time:"2012-12-12",
            status:i%3
        });
    }
    var result = {
        code:0,
        msg:"描述信息",
        data:data
    };
    if(pageNum==3||pageNum==6){
        if(hasError==false){
            hasError = true;
            result = {
                code:-111,
                msg:"错误"
            }
        }else{
            hasError = false;
        }

    }

    setTimeout(function() {
        res.send(result);
        res.end();
    }, 1000);
});



app.use(express.static(__dirname));
app.listen(3333, function() {
    console.log("====================");
    console.log('http://localhost:3333/index.html, Ctrl+C to stop');
    console.log("====================");
})
