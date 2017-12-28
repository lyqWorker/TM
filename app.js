//加载express模块
var express = require('express');
//加载模板处理模块
var swig = require('swig');
//加载数据库模块
var mongoose = require('mongoose');
//加载body-parser,用来处理post提交过来的数据
var bodyParser = require('body-parser');
//创建app应用 => NodeJs Http.createServer()
var app = express();

//当用户访问的url以/public开始，那么直接返回对应__dirname+'/public'下的文件
app.use('/public', express.static(__dirname + '/public'));
app.use('/views', express.static(__dirname + '/views'));

//body-parser设置
app.use(bodyParser.urlencoded({extended: true}));

//配置应用模板
//定义当前应用所使用的模板引擎
//第一个参数：模板引擎的名称，同时也是模板文件的后缀，第二个参数：表示用于解析处理模板内容的方法
app.engine('html', swig.renderFile);
//设置模板文件存放的目录，第一个参数必须是views,第二个参数目录
app.set('views', './views');
//注册所使用的模板引擎，第一个参数必须是view engine,第二个参数和app.engine这个方法中定义的模板引擎的名称（第一个参数）
//必须是一致的
app.set('view engine', 'html');

//开发过程中，需要取消模板缓存
swig.setDefaults({cache: false});

//根据不同的功能划分模块
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));



mongoose.connect('mongodb://localhost:27017/TM', {useMongoClient: true}, function (err) {
    if (err) {
        console.log('数据库连接失败');
    } else {
        console.log('数据库连接成功');
        //监听请求
        app.listen(8080);
    }
});
