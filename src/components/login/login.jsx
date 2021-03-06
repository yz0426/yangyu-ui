import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Spin, Form, Input, Button, message } from 'antd';
const FormItem = Form.Item;

import $ from 'jquery';

import Config from '../../config/index';
import Base64 from '../../config/base64';

import './login.less';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            passwordDirty: false,
            username: '',
            password: ''
        };
    }

    handleSubmit = (e) => { // 登录
        e.preventDefault();
        const {actions, form} = this.props;
	    form.validateFieldsAndScroll((err, values) => {
		    if (!err) {
                let username = values.username, // 用户名
                    password = values.password, // 密码
                    loginParams = { // 登录参数
                        username: username,
                        password: password
                    };
                $.ajax({
                    url: '/login',
                    type: 'POST',
                    data: JSON.stringify(loginParams),
                    contentType: 'application/json;charset=UTF-8',
                    success: function(data, status, xhr){
                        let authorization = xhr.getResponseHeader("authorization");
                        if(authorization){
                            localStorage.setItem(Config.userToken,authorization);
                            location.href = '/';
                        }
                    },
                    error: function(request, status, e){
                        message.error(request.responseJSON.message)
                    }
                })
		    }
	    });
    }
    // 验证用户名
    checkUsername = (rule, value, callback) => {
        const form = this.props.form;
        if (!value) {
            callback();
        } else if (!Config.checkEng(value)) {
            callback(Config.message.usernameEng);
        } else {
            callback();
        }
    }
    // 验证密码
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.passwordDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }


    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="login-container">
                <div className="login-form">
                    <div className="login-logo">
                        <img src={Config.logoSrc} />
                        <span>youz</span>
                    </div>
                    <Form onSubmit={this.handleSubmit}>
                        <FormItem hasFeedback>
                            {getFieldDecorator('username', { initialValue: '13512345678', rules: [{ required: true, message: Config.message.usernameInput }, { validator: this.checkUsername }] })(
                                <Input size="large" placeholder="用户名" maxLength="18" />
                            )}
                        </FormItem>
                        <FormItem hasFeedback>
                            {getFieldDecorator('password', { rules: [{ required: true, message: Config.message.passwordInput }, { validator: this.checkPassword }] })(
                                <Input size="large" type="password" placeholder="密码" maxLength="18" />
                            )}
                        </FormItem>
                        <FormItem>
                            <Button type="primary" htmlType="submit" size="large" >登录</Button>
                        </FormItem>
                        <div className="other">
                            其他登录方式
                            {/* 需要加到 Icon 中 */}
                            <span className="iconAlipay" />
                            <span className="iconTaobao" />
                            <span className="iconWeibo" />
                            <Link className="register" to="/sign_up">注册账户</Link>
                        </div>
                        <div className="login-account">
                            <span>账号：13512345678</span>
                            <span>密码：123456</span>
                        </div>
                    </Form>
                </div>
            </div>
        )
    }
}

const LoginForm = Form.create()(Login);

module.exports = LoginForm;