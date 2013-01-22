var pageSpace;
$(document).ready(function(){
	pageSpace.con=$("#picList");
	pageSpace._btn_fileUp=$("#fileUp");
	pageSpace.bindEvent();
});

pageSpace=pageSpace||(function(){
	var pageSpaceTemp={};
	/*
	 * bind 事件;
	 * */
	pageSpaceTemp.bindEvent=function(){
		pageSpace._btn_fileUp.change(function(evt){
			var files=$(this)[0].files;
			var fileupload=pageSpaceTemp.FileUpload;
			for(var i=0,l=files.length;i<l;i++){
				var img="image/jpeg image/png";
				if(img.indexOf(files[i].type)!=-1){
					var fu=new fileupload(files[i]);
				};
			}
		});
		document.addEventListener("drop",function(e){
			var files=e.dataTransfer.files;
			var fileupload=pageSpaceTemp.FileUpload;
			for(var i=0,l=files.length;i<l;i++){
				var fu=new fileupload(files[i]);
			}
			e.preventDefault();
		},false);
	};
	/*
	 *
	 * */
	function FileUpload(file){
		this.file=file;
		var ul=pageSpaceTemp.Uploader;
		this.xhr=new XMLHttpRequest();
		this.UI=new ul(file,this.xhr);
		this.bindEvent();
		this.send();
	};
	FileUpload.prototype.send=function(){
		var fd=new FormData();
			fd.append("file",this.file,true);
		this.xhr.open("POST","/sample/files");
		this.xhr.setRequestHeader("X-Requested-With","XMLHttpRequest");
		this.xhr.send(fd);
	}
	FileUpload.prototype.bindEvent=function(fun){
		var that=this;
		var xhr=this.xhr;
		xhr.addEventListener("load",fun,false);	
		xhr.addEventListener("error",fun,false);	
		xhr.addEventListener("abort",function(){
			alert(that.file.name);
		},false);	
		xhr.upload.addEventListener("progress",function(e){
			if(e.lengthComputable){
				var loaded=Math.ceil((e.loaded/e.total)*100);
			}
			that.UI.bar.css({"width":loaded+"%"});
			that.UI.text.text(loaded+"%");
			
		},false);
	};

	pageSpaceTemp.FileUpload=FileUpload;


	/*
	 *uploader
	 * */
	function Uploader(file,xhr){
		var that=this;
			this.xhr=xhr;
		var imgRead=new FileReader();
			imgRead.readAsDataURL(file);
			that.initUI({"name":file.name});
			imgRead.onload=function(f){
					var img="image/jpeg image/png";
					if(img.indexOf(file.type)!=-1){
						that.UIimg.attr("src",f.srcElement.result);
					};
			}
	}
	Uploader.prototype.initUI=function(json){
		var that=this;
		var p=$("<div/>",{"class":"img-polaroid pic"});	
		var imgBox=$("<div/>",{"class":"imgBox"})
			this.UIimg=$("<img/>",{"class":"image","src":json.src})
			var alphaDiv=$("<div/>",{"class":"alphaDiv"});
			var infoDiv=$("<div/>",{"class":"infoDiv"});
				this.text=$("<div/>",{"class":"progressText","text":"0%"});
				this.bar=$("<div/>",{"class":"progressBar"});
				infoDiv.append(this.text,this.bar);
			imgBox.append(this.UIimg,alphaDiv,infoDiv);
		var closeDiv=$("<div/>",{"class":"closeDiv"});
			var ii=$("<i/>",{"class":"icon-remove"});
		this.UIname=$("<div/>",{"class":"name","text":json.name});
			p.append(imgBox,closeDiv.append(ii),this.UIname)
		pageSpace.con.append(p);
			console.dir(that.xhr);
			closeDiv.click(function(){
				if(confirm("你确定要取消此图片？")){
					that.xhr.abort();
				}
			});
	}
	pageSpaceTemp.Uploader=Uploader;

	return pageSpaceTemp;
})();
