$(document).ready(function(){
	pageIndex._btn_createOrder=$("#createOrder");
	pageIndex._btn_newUser=$("#newUser");
	pageIndex._div_hideArea=$("#hideCon");
	pageIndex._table_order=$("#order");
	pageIndex.hideArea=publicJs.createHideArea(pageIndex._div_hideArea);
	pageIndex.bind();
	//pageIndex.selectMoudleByAjax();
});

var pageIndex=pageIndex||(function(){
	tempSpace={};
	//绑定页面按钮事件
	tempSpace.bind=function(){
			var that=this;
			this._btn_createOrder.click(function(){
				//that.initCreateOrderUI();
				var div=$("<div/>",{});
				var _table_userList=$("<table/>",{"class":"table table-hover"});
				var createBox=that.initNewUserUI();
				div.append(createBox,_table_userList);
				pageIndex.hideArea.open(div);
				that.getUserList(_table_userList);
			});

		//绑定新建用户按钮
			that._btn_newUser.click(function(){
				that.initNewUserUI();
			});
		}

	//初始化创建订单界面
	tempSpace.initCreateOrderUI=function(){
				var that=this;
				var div=$("<div/>",{"class":"form-inline center","style":"width:340px;"});
				var name=$("<input/>",{"type":"text","class":"input-small","placeholder":"姓名"});
				var id=$("<input/>",{"type":"text","class":"input-small","placeholder":"预留帐号","style":"margin-left:5px;"});
				var ok=$("<a/>",{"class":"btn btn-primary","text":"创建","style":"margin-left:10px;"});
				var clean=$("<a/>",{"class":"btn","text":"取消","style":"margin-left:5px;"});
				div.append(name,id,ok,clean);
				pageIndex.hideArea.open(div);
					clean.click(function(){
						that.hideArea.close();
					});
	
	};
	//初始化新建用户界面
	tempSpace.initNewUserUI=function(){
				var that=this;
				var div=$("<div/>",{"class":"form-inline center","style":"width:340px;"});
				var name=$("<input/>",{"type":"text","class":"input-small","placeholder":"昵称(备注)"});
				var id=$("<input/>",{"type":"text","class":"input-small","placeholder":"预留帐号","style":"margin-left:5px;"});
				var ok=$("<a/>",{"class":"btn btn-primary","text":"创建","style":"margin-left:10px;"});
				var clean=$("<a/>",{"class":"btn","text":"取消","style":"margin-left:5px;"});
				div.append(id,name,ok,clean);
			//	that.hideArea.open(div);
					ok.click(function(){
						that.createUser({
								"name":name.val(),
								"account":id.val(),
								"callback":function(){
										that.hideArea.close()
								}
						});
					});
				return div;
	};
	tempSpace.getUserList=function(table){
		var that=this;
		$.ajax({
			type:"post",
			url:"/user/getUserList",
			data:{"pageNum":0,"pageSize":20},
			dataType:"json",
			cache:false,
			success:function(data){
				that.renderUserList(data.data,table);	
			}
		});
	}
	tempSpace.renderUserList=function(ary,table){
		var that=this;
		for(var i=0,l=ary.length;i<l;i++){
				var tr=$("<tr/>",{});	
				var td1=$("<td/>",{"text":i});
				var td2=$("<td/>",{"text":ary[i].name});
				var td3=$("<td/>",{"text":"2012-3-15"});
				var td4=$("<td/>",{"text":ary[i].accounts});
				var td5=$("<td/>",{});
					var moudle=$("<a/>",{"text":"创建订单"});
				tr.append(td1,td2,td3,td4,td5.append(moudle));
				table.append(tr);	
				(function(){
					var json=ary[i];
					moudle.click(function(){
						that.addOrder(json);	
					});
				})();
		}	
	}

	tempSpace.createUser=function(json){
		$.ajax({
			type:"post",
			url:"/user/newUser",
			data:{"name":json.name,"account":json.account},
			dataType:"json",
			cache:false,
			success:function(data){
				alert(data);
			}
		});
		return false;
		var that=this;
		json.callback();
	};
	tempSpace.addOrder=function(json){
		$.ajax({
			type:"post",
			url:"/order/createOrder",
			data:{"userId":json.id},
			dataType:"json",
			cache:false,
			success:function(data){
				alert(data);
			}
		});
		return false;
				var tr=$("<tr/>",{});	
				var td1=$("<td/>",{"text":i});
				var td2=$("<td/>",{"text":ary[i].name});
				var td3=$("<td/>",{"text":"2012-3-15"});
				var td4=$("<td/>",{"text":ary[i].accounts});
				var td5=$("<td/>",{});
					var moudle=$("<a/>",{"text":"管理模板","href":"/site/bindProduct","target":"_blank"});
					var pic=$("<a/>",{"text":"管理图片"});
				tr.append(td1,td2,td3,td4,td5.append(moudle,"|",pic));
				table.append(tr);	

	}
	tempSpace.checkAccountByAjax=function(json){
		$.ajax({
			type:"post",
			url:"/user/searchUserByAccount",
			data:{"name":json.name,"account":json.account},
			dataType:"json",
			cache:false,
			success:function(data){
				alert(data);
			}
		});
	}

	return tempSpace;
})();





