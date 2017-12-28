var express = require('express');
var router = express.Router();
var User = require('../models/User');

//统一的返回格式
var responseData;
router.use(function (req, res, next) {
    responseData = {
        code: 0,
        message: ''
    }
    next();
});
//加载加密模块
var getMD5 = require('../utils/crypt');

/*
 * 注册逻辑
 */
router.post('/user/register', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({
        username: username
    }).then(function(userinfo) {
        if(userinfo) {
            responseData.code = 1;
            responseData.message = '用户名已经被注册了';
            res.json(responseData);
            return;
        }
        //保存用户注册信息到数据库中
        var user = new User({
            username: username,
            password: getMD5.jiami(password)
        });
        return user.save();
    }).then(function (value) {
        responseData.message = '恭喜您，注册成功了';
        res.json(responseData);
    });
});

module.exports = router;