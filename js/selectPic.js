var pageSpace={};
$(document).ready(function(){
	pageSpace._btn_showTidy=$("#showTidy");
	pageSpace._div_hideArea=$("#hideCon");
	pageSpace._div_con=$("#showCon");
	pageSpace.hideArea=publicJs.createHideArea(pageSpace._div_hideArea);
	pageSpace.bindEvent();
	pageSpace.showA();
});


pageSpace.bindEvent=function(){
	this._btn_showTidy.click(function(){
		pageSpace.hideArea.open("f");	
	});
}


pageSpace.showA=function(){
	var largePicBox=$("<div/>",{"class":"largePicBox"});
		var largePic=$("<div/>",{"class":"largePic img-polaroid center"});	
			var img=$("<img/>",{"src":"/css/img/001.jpg","class":"img"});
			var remove=$("<div/>",{"class":"remove"});
			largePic.append(img,remove);
		largePicBox.append(largePic);
	var picListBox=$("<div/>",{"class":"picListBox"});
	this._div_con.append(largePicBox,picListBox);
	

	this.getPicListByAjax(renderPicList);
	function renderPicList(ary){
		for(var i=0,l=ary.length;i<l;i++){
			var img=$("<img/>",{"class":"img-polaroid img"});	
			picListBox.append(img);
		}
	}
	img.load(function(){
	});

}


pageSpace.getPicListByAjax=function(fun){
	var ary=[
		{"src":"","name":"abc"},
		{"src":"","name":"abc"},
		{"src":"","name":"abc"},
		{"src":"","name":"abc"},
		{"src":"","name":"abc"},
		{"src":"","name":"abc"}
	];
	fun(ary);
}
