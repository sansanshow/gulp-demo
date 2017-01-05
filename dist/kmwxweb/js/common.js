var mm_params={
	mobile_url:"http://t.kidmate.cn/kidmatemobile",
	page_url:"http://t.kidmate.cn/kmwxweb",
	history_url:"/weixin/equip/appusage.wx/ID/PAGE/10/TYPE"
}
//获取当前路径参数
function getUrlParam(name) {
	//var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if (r != null)
		return unescape(r[2]);
	return null; //返回参数值
}
// 写cookies
function setCookie(name, value) {
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires="
			+ exp.toGMTString();
}
//读取cookies
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}

//删除cookies
function delCookie(name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
// 如果需要设定自定义过期时间
// 那么把上面的setCookie 函数换成下面两个函数就ok;
// 程序代码
function setCookieWithTime(name, value, time) {
	var strsec = getsec(time);
	var exp = new Date();
	exp.setTime(exp.getTime() + strsec * 1);
	document.cookie = name + "=" + escape(value) + ";expires="
			+ exp.toGMTString();
}
function getsec(str) {
	alert(str);
	var str1 = str.substring(1, str.length) * 1;
	var str2 = str.substring(0, 1);
	if (str2 == "s") {
		return str1 * 1000;
	} else if (str2 == "h") {
		return str1 * 60 * 60 * 1000;
	} else if (str2 == "d") {
		return str1 * 24 * 60 * 60 * 1000;
	}
}

//获取url中的参数
function getUrlParam(name) {
	//var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if (r != null)
		return unescape(r[2]);
	return null; //返回参数值
}
function getUserStatus() {
	var code = getUrlParam("code");
	var param2 = "type=OPENID&code=" + code;
	alert(param2);
	//console.log(param2);
	if (code != '') {
		$.ajax({
			type : 'post',
			dataType : 'html',
			url : 'http://t.kidmate.cn/kidmatemobile/weixin/access.wx',
			data : param2,
			async : false,
			success : function(jsonUsers) {
				if (jsonUsers == "login") {
					alert("login");
				} else {
					location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx365c10c5232278d3&redirect_uri=http%3A%2F%2Ft.kidmate.cn%2Fkidmatemobile%2Fpage%2Flogin.jsp&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
				}
			}
		});
	}
}

