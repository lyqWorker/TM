var express = require('express');
var router = express.Router();

//加载首页
router.get('/', function (req, res, next) {
    res.render('index');
});
//加载登录页
router.get('/login', function (req, res, next) {
    res.render('login');
});
//加载注册页
router.get('/register', function (req, res, next) {
    res.render('register');
});

module.exports = router;