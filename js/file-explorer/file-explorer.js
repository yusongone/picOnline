/**
 * Javascript版本的文件浏览器，
 * 
 * 此代码依赖于Mootools
 * 额外组件 swfupload  https://code.google.com/p/swfupload/
 * 
 */
var FileExplorer=new Class({
	
	Implements:[Options,Events],
	
	options:{
		upload:{
			url:"/index.php/resource/create",
			maxSize:"2 MB",
			postName:"filename",
			postFile:"filedata",
			fileTypes:"*.jpg"
		},
		broswer:{
			url:"/index.php/resource/",
			delUrl:"",
			postId:"id"
		},
		params:{},
		forms:{},
		headers:{},
		width:500,
		height:400,
		onSelected:function(){}
	},
	initialize:function(options,fileSelected){
		this.setOptions(options);
		this.fileSelected=fileSelected;
		this.doms={};
		
		this.doms.wrapper=new Element("div",{
			style:"display:block;width:100%;height:100%;position:absolute;top:0px;left:0px;"
		}).inject(document.body);
		//overlay
		new Element("div",{
			style:"display:block;width:100%;height:100%;position:fixed;top:0px;left:0px;background-color:#E7E7E7;filter: alpha(opacity=60);opacity:0.6;z-index:65534"
		}).inject(this.doms.wrapper);
		
		this.doms.container=new Element("div.file-explorer").inject(this.doms.wrapper);
		this.doms.container.setStyles({
			height:this.options.height,
			width:this.options.width,
			top:(window.getSize().y-this.options.height)/2,
			left:(window.getSize().x-this.options.height)/2,
		});
		this.doms.titleBar = new Element("div.title-bar").inject(this.doms.container);
		this.doms.title = new Element("span",{
			text:"文件选择器",
			"class":"dialog-title"
		}).inject(this.doms.titleBar);
		this.doms.closeBtn = new Element("a",{
			text:"关闭",
			"class":"close-btn",
			"href":"javascript:void(0)",
			"title":"关闭窗口"
		}).inject(this.doms.titleBar);
		
		this.doms.tabsTitle = new Element("div").inject(this.doms.container);		
		this.doms.tabsPanel = new Element("div.tabs-panel").inject(this.doms.container);
		
		this.doms.tabs={
			upload:{
				title:new Element("span.tab-title",{text:"上传"}).inject(this.doms.tabsTitle),
				panel:new Element("div.tab-panel").inject(this.doms.tabsPanel)
			},
			browser:{
				title:new Element("span.tab-title",{text:"浏览上传过的文件"}).inject(this.doms.tabsTitle),
				panel:new Element("div.tab-panel").inject(this.doms.tabsPanel)
			},
			link:{
				title:new Element("span.tab-title",{text:"使用网络上的URL"}).inject(this.doms.tabsTitle),
				panel:new Element("div").inject(this.doms.tabsPanel)
			}
				
		};
		
		//设定面板的切换事件
		Object.each(this.doms.tabs,function(el,key,arr){
			(function(){
				var cur = el;
				cur.panel.setStyle("display","none");
				
				cur.title.addEvent("click",function(){
					
					Object.each(arr,function(obj){
						obj.title.removeClass("current-tab-title");
						obj.panel.setStyle("display","none");
					});
					cur.title.addClass("current-tab-title");
					cur.panel.setStyle("display","block");
					
				});
				
			})();
		});
		//默认让上传标签显示
		this.doms.tabs.upload.title.fireEvent("click");

		this.doms.closeBtn.addEvents({
			"click":this.destroy.bind(this)
		});
		//加载组件
		this.uploader = new FileExplorer.Uploader(this.doms.tabs.upload.panel,
					Object.merge(this.options.upload,{onSelected:this.onSelected.bind(this)}));
		
		this.browser = new FileExplorer.Browser(this.doms.tabs.browser.panel,
					Object.merge(this.options.broswer,{
											onSelected:this.onSelected.bind(this),
											maxHeight:this.options.height-100
											}));
		this.link = new FileExplorer.Link(this.doms.tabs.link.panel);
	},
	destroy:function(){
		this.doms.wrapper.destroy();
	},
	onSelected:function(url){
		this.fireEvent("selected",[url]);
		this.destroy();
	}
	
});
/**
 * 文件浏览器组件，上传器
 */
FileExplorer.Uploader=new Class({
	Implements:[Options,Events],
	
	options:{
		
	},
	initialize:function(container,options){
		this.setOptions(options);
		this.doms = {};
		this.doms.container = container;
		
		this.doms.uploader = new Element("span",{"text":"选择文件"}).inject(new Element("div").inject(this.doms.container));
		this.doms.fileName = new Element("input[type=text]",{"value":"文件名称"}).inject(new Element("div").inject(this.doms.container));
		this.doms.uploadBtn = new Element("button").inject(new Element("div").inject(this.doms.container));
		
		this._initSwfUpload();
		this.disableUploadBtn();
		//时间绑定
		this.doms.uploadBtn.addEvents({
			"click":this.upload.bind(this)
		});
	},
	_initSwfUpload:function(){
		var settings = {
			flash_url : "/js/swfupload/swfupload.swf",
			upload_url: this.options.url,
			file_size_limit : this.options.maxSize,
			file_post_name : this.options.postFile,//此处标识文件上传是用的name
			file_types : this.options.fileTypes,
			//file_types_description : "images",
			file_upload_limit : 10,
			file_queue_limit : 10,
			button_action : SWFUpload.BUTTON_ACTION.SELECT_FILE,//单选文件
			debug: false,

			// Button settings
			button_image_url: "/js/file-explorer/upload-btn.png",
			button_width: "50",
			button_height: "20",
			button_placeholder: this.doms.uploader,
			button_text: '选择文件',
			
			file_queued_handler : this._fileQueued.bind(this),
			file_queue_error_handler : this._fileQueueError.bind(this),
			upload_success_handler : this._uploadSuccess.bind(this)
		};

		this.swfUpload = new SWFUpload(settings);
	},
	upload:function(){
		var key = this.options.postName;
		var params = {};
		params[key] = this.doms.fileName.get("value");
		this.swfUpload.setPostParams(params);
		this.swfUpload.startUpload();
	},
	disableUploadBtn:function(){
		this.doms.uploadBtn.set({
			text:"未选择文件",
			disabled:"disabled"
		});
	},
	enableUploadBtn:function(){
		this.doms.uploadBtn.set({
			text:"上传"
		});
		this.doms.uploadBtn.removeProperty("disabled");
	},
	_fileQueued:function(file){
		if(this.fileQueued){
			this.swfUpload.cancelUpload(this.fileQueued.id);
		}
		this.fileQueued=file;
		var filename=file.name.replace(/\.\w+$/,'');//去除后缀，得到文件名
		this.doms.fileName.set("value",filename);
		this.enableUploadBtn();
	},
	_fileQueueError:function(){
		this.swfUpload.cancelUpload();
		this.disableUploadBtn();
		alert("选择的文件不合法");
	},
	_uploadSuccess:function(file,resp,received){
		var resp=JSON.decode(resp);
		this.fireEvent("selected",[resp.url]);
	}
});

/**
 * 文件浏览器组件，浏览服务器上的文件
 */
FileExplorer.Browser=new Class({
	Implements:[Options,Events],
	
	options:{
		
	},
	initialize:function(container,options){
		this.setOptions(options);
		this.doms = {};
		this.doms.container = container;
		this.doms.serverFiles = new Element("div.server-files",{
			styles:{
				height:this.options.maxHeight
			}
		}).inject(this.doms.container);
		this.loadFiles();
	},

	loadFiles:function(){
		var _this=this;
		new Request.JSON({
			url:this.options.url,
			method:"get",
			onSuccess:function(resp){
				resp.each(function(el){
					var file=_this._createFileItem(el);
					file.inject(_this.doms.serverFiles);
				});
			}
		}).send();
	},
	_createFileItem:function(item){
		var rootUrl="/js/file-explorer/img/";
		var fileType=item.url.replace(/^.+\./,"");
		var imgSrc;
		switch(fileType){
			case "jpg":
			case "png":
			case "gif":
				imgSrc=item.url;
				break;
			case "flv":
				imgSrc=rootUrl+"video.png";
				break;
			case "swf":
				imgSrc=rootUrl+"swf.png";
				break;
			default:
				imgSrc=rootUrl+"unknow.png";
		}
		var wrapper=new Element("div.file");
		var title=new Element("span.img-title",{
			"text":item.title
		}).inject(wrapper);
		var imgBox=new Element("div.img-box").inject(wrapper);
		var img=new Element("img",{
			"src":imgSrc
		}).inject(imgBox);
		var tools=new Element("ul.tools").inject(wrapper);
		/*
		 * TODO 暂时不做预览功能，时间有限
		var previewBtn=new Element("li.tool",{text:"预览"}).inject(tools);
		*/
		var delBtn=new Element("li.tool",{text:"删除"}).inject(tools);
		
		//绑定事件
		var _this=this;
		wrapper.addEvents({
			mouseover:function(){
				tools.setStyle("display","block");
			},
			mouseout:function(){
				tools.setStyle("display","none");
			}
		});
		delBtn.addEvents({
			click:function(){
				var data={};
				data[_this.options.postId]=item.id;
				new Request.JSON({
					url:_this.options.delUrl,
					data:data,
					method:"post",
					onSuccess:function(resp){
						if(resp.status != false){
							wrapper.destroy();
						}else{
							alert("出现错误，请稍候重试");
						}
						
					}
				}).send();
			}
		});
		img.addEvents({
			dblclick:function(){
				_this.fireEvent("selected",[item.url]);
			}
		});
		return wrapper;
	}
});

/**
 * 根据连接地址获得文件
 */
FileExplorer.Link = new Class({
	Implements:[Options,Events],
	
	options:{
		
	},

	initialize:function(container){
		this.doms = {};
		this.doms.container = container;
		this.doms.url = new Element("input[type=text]").inject(this.doms.container);
	}
	
});