var page_left=1;
var page_right=1;
$(function () {
	document.body.setAttribute('ontouchstart', '');
	 // tab
	$('.weui_tab').tab();
	//sessionStorage.setItem("key", "446698874");
	//localStorage.setItem("site", "js8.in");
	getList(1,1,false);
	getList(2,1,false);
});
function getList(type,page,foot){
	if(foot){
		console.log('加载中----');
		$.weui.loading('加载中');
	}
	var param={userid:localStorage.km_UID,sign:localStorage.km_USIGN,equipid:localStorage.currEquipId};
	//var param2 = "userid="+localStorage.kmuserid+"&sign=" + localStorage.kmsign+"&openid="+localStorage.openid;
	var URL=mm_params.history_url.replace("ID",localStorage.currEquipId).replace("PAGE",page).replace("TYPE",type);
	console.log("-------param-url----");
	console.log(param);
	console.log(mm_params.mobile_url + URL);
	$.ajax({
		type : 'post',
		dataType : 'json',
		url : mm_params.mobile_url + URL,
		data : param,
		async : false,
		success : function(data) {
			var status = data.status;
			var historys = data.content;
			console.log("-------data-----");
			console.log(data);
			console.log("-------data---end--");
			console.log("-------equips---end--");
			console.log(historys);
			console.log("-------equips---end--");
			if (status == 200) {
				//$.weui.toast('已发送...',1000);
				console.log("请求成功！！！");
				if(type==1){
					if(page==1){
					console.log("page====1");
					vm.list_left=[];
					for ( var int = 0; int < historys.length; int++) {
						var array_element = historys[int];
						vm.list_left.push(array_element);
					}
					}else{
						console.log("page   --大于--1--"+page);
						for ( var int = 0; int < historys.length; int++) {
							var array_element = historys[int];
							vm.list_left.push(array_element);
						}
					}
					if(historys.length<10){
						vm.footer_show_l=false;
					}
				}else{
					if(page==1){
						console.log("page====1");
						vm.list_right=[];
						for ( var int = 0; int < historys.length; int++) {
							var array_element = historys[int];
							vm.list_right.push(array_element);
						}
					}else{
						console.log("page   --大于--1--"+page);
						for ( var int = 0; int < historys.length; int++) {
							var array_element = historys[int];
							vm.list_right.push(array_element);
						}
					}
					if(historys.length<10){
						vm.footer_show_r=false;
					}
				}
				if(foot){
					console.log('加载完成----');
					setTimeout($.weui.hideLoading, 50);
				}
			} else {
				$.weui.topTips('请求失败400！');
				if(foot){
					setTimeout($.weui.hideLoading, 50);
				}
			}
		},
		error: function(){
			//alert("请求失败！！！");
			if(foot){
				setTimeout($.weui.hideLoading, 50);
			}
			$.weui.topTips('请求失败！');
			console.log("请求失败！！！");
		}
	});
}
