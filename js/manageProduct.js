var pageSpace={};
$(document).ready(function(){
	pageSpace._btn_createProduct=$("#createProduct");
	pageSpace._div_hideArea=$("#hideCon");
	pageSpace.hideArea=publicJs.createHideArea(pageSpace._div_hideArea);
	pageSpace.bind();
});




pageSpace.bind=function(){
	var that=this;
	this._btn_createProduct.click(function(){
		var div=that.renderCreateProduct();
			that.hideArea.show(div);
	});
};

pageSpace.renderCreateProduct=function(){
	var div=$("<div/>",{"class":"createBox center"});
		var left=$("<div/>",{"class":"left"});
			var img=$("<img/>",{"class":"img","src":"/css/img/001.jpg"});
			left.append(img);
		var right=$("<div/>",{"class":"right"});
			var name=$("<input/>",{"type":"text","class":"name","placeholder":"商品名称"});
			var group=$("<div/>",{"class":"input-append"});
			var size=$("<input/>",{"type":"text","class":"size","placeholder":"添加不同尺寸或型号，可用逗号或分号隔开；"});
			var add=$("<a/>",{"class":"btn","text":"添加"});
			var sizeBox=$("<div/>",{"class":"sizeBox"});
			var ok=$("<a/>",{"class":"btn btn-primary ok","text":"确定"});
			var clean=$("<a/>",{"class":"btn clean","text":"取消"});
			right.append(name,group.append(size,add),sizeBox,ok,clean);
		div.append(left,right);
		ok.unbind("click").click(function(){
				var p=new pageSpace.product({});
				$("#productBox").append(p.mod);
		});
	return div;	
}



//根据ajax数据生成条目列表
pageSpace.renderMoudle=function(ary){
	var width=$(".con").width();
	var div=$("<div/>",{"class":"productBox center"});
		for(var i=0,l=ary.length;i<l;i++){
				var p=new pageIndex.product(ary[i]);
				div.append(p.mod);
		}
	return div;
}

//条目的构建函数
pageSpace.product=function(json){
	this.mod=$("<div/>",{"class":"product"});	
	this.initUI(json);
};
pageSpace.product.prototype.initUI=function(json){
				var imgBox=$("<div/>",{"class":"imgBox"});
				var img=$("<img/>",{});
				var showSize=$("<div/>",{"class":"showSize"});
				var alphadiv=$("<div/>",{"class":"alphadiv"});
				var sizeList=$("<div/>",{"class":"sizeList"});
				var tools=$("<div/>",{"class":"tools"});
					var add=$("<div/>",{"class":"add"});
					showSize.append(alphadiv,sizeList,tools.append(add));
				var name=$("<div/>",{"class":"name","text":json.name});
				this.mod.append(imgBox.append(img,showSize),name);
				var time;
				for(var i=0;i<5;i++){
					sizeList.append("120*20 ","<br/>");
				}
				imgBox.hover(function(){
					time=setTimeout(function(){
						showSize.animate({"top":"0px"});
					},200);
				},function(){
					clearTimeout(time);
					showSize.animate({"top":"150px"});
				});
}






