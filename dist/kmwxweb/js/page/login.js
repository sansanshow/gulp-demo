	var openid;
	$(function() {
		$('#btn_login').on('click',function(e) {
			//alert("sss");
			var pairs = $('form').serialize().split(/&/gi);
			var data = {};
			pairs.forEach(function(pair) {
				pair = pair.split('=');
				data[pair[0]] = decodeURIComponent(pair[1] || '');
			});
			if (!data.mobile || !/^1\d{10}$/.test(data.mobile)) {
				$.weui.topTips('请输入正确手机号');
				return false;
			}
			if (!data.verifycode || !/\d{6}$/.test(data.verifycode)) {
				$.weui.topTips('请输入验证码');
				return false;
			}
			if(data.openid){
				setCookie("openid",data.openid);
				localStorage.setItem("openid", data.openid);
			}
			localStorage.setItem("openid", data.openid);
			var param = "mobile=" + data.mobile
					+ "&verifycode=" + data.verifycode
					+ "&openid=" + data.openid
					+ "&function=bind";
			console.log(param);
			return true;
/*			$.ajax({
				type : "post",
				dataType : "json",
				url : "bind.wx",
				data : param,
				async : false,
				success : function(ret_data) {
					console.log(ret_data);
					var status = ret_data.ret_status;
					if (status == "success") {
						var user =  JSON.parse(ret_data.user);
						var view =  JSON.parse(ret_data.viewName);
						console.log(user);
						console.log("kmsign:"+ user.sign);
						console.log("view:"+ view);
						console.log("kmuserid", user.userid);
						
						localStorage.setItem("kmsign", user.sign);
						localStorage.setItem("kmuserid", user.userid);
						$.weui.toast('登陆成功');
						window.location.href = view;
					} else {
						alert(status);
					}
				}
			});
			*/
		})
		$('#sendvcode').on('click',function(e) {
			openid = localStorage.WeiXin_UID;
			if (!$("#mobile").val() || !/^1\d{10}$/.test($("#mobile").val())) {
				$.weui.topTips('请输入正确手机号');
				return;
			}
			var param2 = "mobile=" + $("#mobile").val() + "&openid="+openid + "&function=bind";
			//alert(param2);
			console.log(param2);
			$.ajax({
				type : "post",
				dataType : "json",
				url : "http://t.kidmate.cn/kidmatemobile/weixin/user/sendsms.wx",
				data : param2,
				async : false,
				success : function(ret_data) {
					var status = ret_data.status;
					console.log(status);
					var vcode = ret_data.content;
					if (status == "success") {
						$.weui.toast('已发送...',1000);
					} else {
						$.weui.topTips('验证码发送失败！');
					}
				}
			});
		})
		
	})