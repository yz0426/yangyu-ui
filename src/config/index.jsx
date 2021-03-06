const Config = {
	target: process.env.NODE_ENV !== 'production' ? 'http://admin.sosout.com' : 'http://admin.sosout.com', //目标网站
    name: 'Ant Design Admin',
    prefix: 'antdAdmin',
    footerText: 'Ant Design Admin 版权所有 © 2017 由 sosout 支持',
    logoSrc: 'https://avatars2.githubusercontent.com/u/25759289?s=460&v=4',
    logoText: 'Antd Admin',
    needLogin: true,
	message: { // 提示信息
		usernameInput: '请输入用户名',
        usernameEng: '用户名为6-18位',
		passwordInput: '请输入密码',
		loginError: '用户名或者密码错误!'
	},
	userToken: 'Authorization',
	// localKey: { // 本地存储Key
	// 	userToken: 'USER_AUTHORIZATION'
	// },
	/**
	 * 只能输入英文
	 * 
	 * @param {any} str
	 * @returns
	 */
	checkEng(str) {
		var reg = new RegExp(/^[\d\w]{6,18}$/);
		return str && reg.test(str);
	},
    /**
	 * 参数格式化
	 * 
	 * @param {any} data
	 * @returns
	 */
	paramFormat(data) {
		let paramArr = [];
		let paramStr = '';
		for(let attr in data) {
			paramArr.push(attr + '=' + data[attr]);
		}
		paramStr = paramArr.join('&');
		return paramStr ? '?' + paramStr : paramStr;
	},
    /**
	 * 本地数据存储或读取
	 * 
	 * @param {any} key
	 * @param {any} value
	 * @returns
	 */
	localItem(key, value) {
		if(arguments.length == 1) {
			return localStorage.getItem(key) && localStorage.getItem(key) !== 'null' ? localStorage.getItem(key) : null;
		} else {
			return localStorage.setItem(key, value);
		}
	},
	/**
	 * 删除本地数据
	 * 
	 * @param {any} k
	 * @returns
	 */
	removeLocalItem(key) {
		if(arguments.length == 1) {
			return localStorage.removeItem(key);
		} else {
			return localStorage.clear();
		}
	},

	/**
	 * 响应状态为0
	 * @param {*} code 
	 */
	success(code){
		return code == 0;
	},

	logout(){
		localStorage.removeItem(this.userToken);
		location.href = '/sign_in';
	}
};

export default Config;
