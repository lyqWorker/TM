var register = function () {
    var username, pwd, checkpwd, message;

    var initValue = function () {
        username = $('#username').val();
        pwd = $('#pwd').val();
        checkpwd = $('#checkpwd').val();
    }

    var checkInput = function () {
        if (username.length == 0) {
            message = " <strong>警告！</strong>登录名不能为空";
            return false;
        }
        if (pwd.length == 0) {
            message = " <strong>警告！</strong>密码不能为空";
            return false;
        }
        if (checkpwd.length == 0) {
            message = " <strong>警告！</strong>确认密码不能为空";
            return false;
        }
        if (pwd != checkpwd) {
            message = " <strong>警告！</strong>两次密码输入不一致";
            return false;
        }
        return true;
    }

    var regclick = function () {
        initValue();
        if (checkInput()) {
            var url = '/api/user/register';
            $.ajax({
                url: url,
                type: 'post',
                data: {
                    username: username,
                    password: pwd
                },
                dataType: 'json',
                success: function (result) {
                    if(result.code==0) {
                        message = '<strong>成功！</strong>' + result.message+
                                  '，&nbsp;&nbsp;<a href="login">去登录</a>';
                        $('#message').removeClass('alert-danger').addClass('alert-success');
                        $('#message').html(message);
                        $('#message').css('display', '');
                    }
                    else{
                        message = '<strong>警告！</strong>' + result.message +'，&nbsp;&nbsp;'+
                            '错误代码:' + result.code;
                        $('#message').html(message);
                        $('#message').css('display', '');
                    }
                }
            });
        }
        else {
            $('#message').html(message);
            $('#message').css('display', '');
        }
    }

    var updateState = function () {
        $('#message').css('display', 'none');
    }
    var initControl = function () {
        $('#username').on('focus', updateState);
        $('#pwd').on('focus', updateState);
        $('#checkpwd').on('focus', updateState);
        $('#btnReg').on('click', regclick);
    }

    return {
        init: function () {
            initControl();
        }()
    };
}()