$(function() {
	document.body.setAttribute('ontouchstart', '');
	$.weui.loading('数据加载中...');
	var code = getUrlParam("code");
	if(!code.replace(/^ +| +$/g , '')==''){
		var params = {code:code};
        $.ajax({
            url:mm_params.mobile_url+"/weixin/user/judge.wx",
            data:params,
            type:"POST",
            dataType:"json",
            error:function(){
                setTimeout($.weui.hideLoading, 0);
				//window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx365c10c5232278d3&redirect_uri=http%3A%2F%2Ft.kidmate.cn%2Fkidmatemobile%2Fpage%2Fjudge.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
				alert("数据加载失败");
            },
            success:function(data){
                if(data.status == 200){
                	localStorage.setItem("WeiXin_UID", data.openid);
                	switch(data.type)//100:index 101:扫码绑定 102:添加孩子 103:login
					{
					case 100:
						window.location.href=mm_params.page_url+"/page/index.html"
					  	break;
					case 101:
						localStorage.setItem("km_CHILD", data.content);
						localStorage.setItem("km_CHILD_ID", JSON.parse(data.content).id);
						console.log("--childid:"+JSON.parse(data.content).id);
						//alert("--childid:"+JSON.parse(data.content).id);
						window.location.href=mm_params.page_url+"/page/qrcode.html"
					  	break;
					case 102:
						window.location.href=mm_params.page_url+"/page/add_child.html"
					  	break;
					case 103:
						window.location.href=mm_params.page_url+"/page/login.html"
					  	break;
					default:
					 	 break;
					}
					setTimeout($.weui.hideLoading, 500);
                }else{
                	window.close();
                }
            }
        });
        code='';
    }else{
    	
    }
})
function updateUserInfo(){
}