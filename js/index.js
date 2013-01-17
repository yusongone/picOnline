var pageIndex={};
$(document).ready(function(){
	pageIndex._btn_createOrder=$("#createOrder");
	pageIndex._div_hideArea=$("#hideCon");
	pageIndex._table_order=$("#order");
	pageIndex.hideArea=publicJs.createHideArea(pageIndex._div_hideArea);
	pageIndex.bind();
	//pageIndex.selectMoudleByAjax();
});




pageIndex.bind=function(){
	var that=this;
	this._btn_createOrder.click(function(){
			if(pageIndex.hideArea.getState()=="show"){
				pageIndex.hideArea.hide();	
				return false;
			}
		var div=$("<div/>",{"class":"form-inline center","style":"width:340px;"});
			var name=$("<input/>",{"type":"text","class":"input-small","placeholder":"姓名"});
			var id=$("<input/>",{"type":"text","class":"input-small","placeholder":"预留帐号","style":"margin-left:5px;"});
			var ok=$("<a/>",{"class":"btn btn-primary","text":"创建","style":"margin-left:10px;"});
			var clean=$("<a/>",{"class":"btn","text":"取消","style":"margin-left:5px;"});
			div.append(name,id,ok,clean);
			pageIndex.hideArea.show(div);
				ok.click(function(){
					that.addOrderByAjax({
							"name":name.val(),
							"id":id.val(),
							"callback":function(){
									that.hideArea.close()
							}
					});
				});
				clean.click(function(){
					that.hideArea.close();
				});
	});
};

pageIndex.addOrderByAjax=function(json){
	var that=this;
	var tr=$("<tr/>",{});	
		var td1=$("<td/>",{"text":"2"});
		var td2=$("<td/>",{"text":json.name});
		var td3=$("<td/>",{"text":"2012-3-15"});
		var td4=$("<td/>",{"text":"新创建"});
		var td5=$("<td/>",{});
			var moudle=$("<a/>",{"text":"管理模板","href":"/site/bindProduct","target":"_blank"});
			var pic=$("<a/>",{"text":"管理图片"});
	tr.append(td1,td2,td3,td4,td5.append(moudle,"|",pic));
	this._table_order.append(tr);	
	json.callback();
	return false;
		var td1=$("<td/>",{"text":"2"});
	$.ajax({});
};





