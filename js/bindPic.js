var pageSpace={};
$(document).ready(function(){
	pageSpace.con=$("#picList");
	pageSpace.renderPic();
});

pageSpace.renderPic=function(){
	var p=$("<div/>",{"class":"pic"});	
	var img=$("<img/>",{"class":"img-polaroid img","src":"/css/img/002.jpg"})
	var alphaDiv=$("<div/>",{"class":"alphaDiv"});
	var infoDiv=$("<div/>",{"class":"infoDiv"});
		var text=$("<div/>",{"class":"progressText","text":"0%"});
		var bar=$("<div/>",{"class":"progressBar"});
		infoDiv.append(text,bar);
	var closeDiv=$("<div/>",{"class":"closeDiv"});
		var ii=$("<i/>",{"class":"icon-remove"});
		
	pageSpace.con.append(p.append(img,alphaDiv,infoDiv,closeDiv.append(ii)));
}
