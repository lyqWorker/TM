//加载crypto模块
var crypto = require('crypto');
//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
var md5 = crypto.createHash('md5');
module.exports = {
    jiami:function(str){
        md5.update(str);
        //返回加密结果
        return md5.digest('hex');  //加密后的值dmd5.digest('hex');
    },
    add: function (a, b) {
        return a + b;
    }
}
