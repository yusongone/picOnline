var pageIndex={};
$(document).ready(function(){
	pageIndex._div_hideArea=$("#hideCon");
	pageIndex._div_selectedProductList=$("#selectedProductList");
	pageIndex.hideArea=publicJs.createHideArea(pageIndex._div_hideArea);
	pageIndex.bind();
	pageIndex.selectMoudleByAjax();
});




pageIndex.bind=function(){
};

//通过ajax获取条目列表
pageIndex.selectMoudleByAjax=function(){
	var that=this;
	var ary=[
		{"src":"/images/abc.jpg","name":"仿古相册"},
		{"src":"/images/abc.jpg","name":"仿古相册"},
		{"src":"/images/abc.jpg","name":"仿古相册"},
		{"src":"/images/abc.jpg","name":"仿古相册"},
		{"src":"/images/abc.jpg","name":"仿古相册"},
		{"src":"/images/abc.jpg","name":"仿古相册"},
		{"src":"/images/abc.jpg","name":"仿古相册"},
		{"src":"/images/abc.jpg","name":"仿古相册"},
		{"src":"/images/abc.jpg","name":"仿古相册"},
		{"src":"/images/abc.jpg","name":"仿古相册"},
		{"src":"/images/abc.jpg","name":"仿古相册"},
		{"src":"/images/abc.jpg","name":"仿古相册"},
		{"src":"/images/abc.jpg","name":"仿古相册"},
		{"src":"/images/abc.jpg","name":"仿古相册"}
			];
			doit();
	function doit(){
		var div=that.renderMoudle(ary);
		$("#selectedBox").append(div);
	}
};

//根据ajax数据生成条目列表
pageIndex.renderMoudle=function(ary){
	var width=$(".con").width();
	var div=$("<div/>",{"class":"productBox center"});
		for(var i=0,l=ary.length;i<l;i++){
				var p=new pageIndex.product(ary[i]);
				div.append(p.mod);
		}
	return div;
}

//条目的构建函数
pageIndex.product=function(json){
	this.mod=$("<div/>",{"class":"product"});	
	this.initUI(json);
};
pageIndex.product.prototype.initUI=function(json){
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
					var add=$("<a/>",{"class":"btn","text":"+","style":"width:16px;height:16px;padding:0;line-height:16px;"});
					sizeList.append("120*20 ",add,"<br/>");
					add.click(function(){
						pageIndex._div_selectedProductList.append("ffdd");
					});
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




