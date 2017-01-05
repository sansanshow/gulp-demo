$(function() {
	document.body.setAttribute('ontouchstart', '');
	$('.container').on('click', '#history', function(e) {//历史纪录
		window.location.href = mm_params.page_url + '/page/history.html?@@version';
	}).on('click', '#schedule_ctrl', function(e) {//时段控制
		$.weui.alert('提示', function() {
			console.log('知道了...');
		});
	}).on('click', '#data_report', function(e) {//数据图表
		window.location.href = mm_params.page_url + '/page/more.html?@@version';
	}).on('click', '#location', function(e) {//定位查看
		window.location.href = mm_params.page_url + '/page/history.html?@@version';
	}).on('click', '#lock_screen', function(e) {//立即锁屏
		window.location.href = mm_params.mobile_url + '/page/more.html?@@version';
	}).on('click', '#screen_shot', function(e) {//立即截屏
		window.location.href = mm_params.page_url + '/page/more.html?@@version';
	}).on('click', '#more', function(e) {//
		window.location.href = mm_params.page_url + '/page/more.html?@@version';
	})
	//init
	init();
	//change
	$("#equiplist").change(function(){
		var equipId=$("#equiplist").find("option:selected").val(); //获取Select选择的Value 
		console.log("changed:"+equipId);
		localStorage.setItem("currEquipId",equipId);
		//alert(localStorage.currEquipId); 
	});
});
//init
function init(){
	//init equip
	initEquip();
}
var openid = getCookie("openid");

//初始化设备
function initEquip(){
	var e_id= localStorage.currEquipId;
	var param={userid:localStorage.km_UID,sign:localStorage.km_USIGN,openid:localStorage.WeiXin_UID};
	//var param2 = "userid="+localStorage.kmuserid+"&sign=" + localStorage.kmsign+"&openid="+localStorage.openid;
	console.log("-------param-----");
	console.log(param);
	$.ajax({
		type : 'post',
		dataType : 'json',
		url : mm_params.mobile_url+'/weixin/equip/equipment.wx/get',
		data : param,
		async : false,
		success : function(data) {
			var status = data.status;
			var equips = data.content;
			console.log("-------data-----");
			console.log(data);
			console.log("-------data---end--");
			console.log("-------equips---end--");
			console.log(equips);
			console.log("-------equips---end--");
			if (status == "success") {
				//$.weui.toast('已发送...',1000);
				$("#equiplist").empty();
				if(typeof(e_id) == "undefined"){
					localStorage.setItem("currEquipId",equips[0].id);
					console.log("-e_id---undefined");
					console.log("-typeof(e_id)---"+typeof(e_id));
				}else{
					//alert("1111");
					console.log("-e_id---undefined");
				}
				for(x in equips){
					if(e_id==equips[x].id){
						console.log("-e_id---selected:"+e_id);
						$("#equiplist").append("<option value=\""+equips[x].id+"\" selected=\"selected\">"+equips[x].aliasName+"</option>");
					}else{
						$("#equiplist").append("<option value=\""+equips[x].id+"\">"+equips[x].aliasName+"</option>");
					}
				}
				console.log("-------currEquipId-----");
				console.log(localStorage.currEquipId);
				console.log("-------kmuserid-----");
				console.log(localStorage.kmuserid);
				console.log("-------kmsign-----");
				console.log(localStorage.kmsign);
			} else {
				$.weui.topTips('请求失败！');
			}
		},
		error: function(){
			//alert("请求失败！！！");
			console.log("请求失败！！！");
		}
	});
}
function callback(result){
	console.log(result);
}
