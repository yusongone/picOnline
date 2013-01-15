/**
 * add a imlement to Element
 */
Element.implement({
    toggle: function(fn1,fn2){
        this.store('toggled',false);
        return this.addEvent('click',function(event){
            event.stop();
             if(this.retrieve('toggled')){
                 fn1.call(this);
             }else{
                 fn2.call(this);
             }
            this.store('toggled',!(this.retrieve('toggled')));
        });
    }
});
/**
 * This is a Free Source
 * Build a tree with Mootools
 * @author kunay
 * @version 2012-11-27
 */
var KNode=(function(){
	//单机节点的时候对应的操作
	return new Class({
		Implements:[Options,Events],
		options:{
			//onClick:function(){},
			//onExpand:function(){},
			//onClick:function(){},
			onAfterRightClick:function(){
				this.tree.removeContextMenu();//ContextMenuDom.destroy();
			},
			title:"新节点",
			parent:"",
			contextMenu:[],
			isLeaf:false,
			isExpanded:false,
			children:[]
		},
		initialize:function(options){
			this.setOptions(options);
			var _this=this;
			var li=new Element("li");
			var node=new Element("div",{
				"class":"k_node"				
			});
			if(_this.options.isLeaf==false){
				this.sign=new Element("a",{
					"class":"sign",
					"href":"javascript:void(0)",
					events:{
						"click":function(){
							if(_this.isExpanded()){
								_this.collapse();
							}else{
								_this.expand();
							}
						}
					}
				});
			}else{
				this.sign=new Element("a",{
					"class":"nosign",
					"href":"javascript:void(0)"
				});
			}
			var item=new Element("a",{
				"class":"item",
				"href":"javascript:void(0)"
			});
			var icon=new Element("em",{
				"class":"icon"
			});
			this.text=new Element("span",{
				"class":"text",
				text:this.options.title,
				events:{
					click:function(){
						_this.fireEvent("click");
					},
					contextmenu:this.rightClick.bind(this)
				}
			});
			li.adopt(node);
			node.adopt(this.sign);
			node.adopt(item);
			item.adopt(icon);
			item.adopt(this.text);
			this.dom=li;
		},
		addChild:function(node){
			if(!this.childrenDom){
				this.childrenDom=new Element("ul").inject(this.dom);
			}
			node.setOptions({
				parent:this,
				onExpand:this.tree.onExpand
			});
			node.tree=this.tree;
			this.options.isLeaf=false;
			node.getDom().inject(this.childrenDom);
			this.options.children.push(node);
			this.update();
			//this.expand();
		},
		remove:function(){
			this.options.parent.removeChild(this);
			this.dom.destroy();
		},
		removeChild:function(node){
			this.options.children.erase(node);
		},
		toRename:function(beforeRename){
			var oldValue=this.text.get("text");
			var _this=this;
			this.text;
			var editor=new Element("input",{
				"type":"text",
				"value":oldValue,
				"class":"node_editing"
			}).replaces(this.text);
			editor.addEvent("keypress",function(evt){
				if(evt.key!="enter"){
					return;
				}
				_this.text.replaces(editor);
				var newValue=editor.get("value");
				if(beforeRename(_this,newValue,oldValue)){
					_this.text.set("text",newValue);
				}
			});
			editor.focus();
		},
		update:function(){
			
		},
		expand:function(){
			if(this.options.children.length==0&&this.options.isLeaf==false){
				this.fireEvent("expand",function(){
					this.childrenDom.setStyle("display","block");
					//new Fx.Slide(this.childrenDom).slideIn("vertical");
				});
			}else{
				this.childrenDom.setStyle("display","block");
				//new Fx.Slide(this.childrenDom).slideIn("vertical");
			}
			this.sign.addClass("sign_expanded");
			this.options.isExpanded=true;
		},
		collapse:function(){
			this.sign.removeClass("sign_expanded");
			//this.childrenDom.setStyle("display","none");
			//new Fx.Slide(this.childrenDom).slideOut("vertical");
			this.childrenDom.setStyle("display","none");
			this.options.isExpanded=false;
		},
		isExpanded:function(){
			return this.options.isExpanded;
		},
		rightClick:function(evt){
			var contextMenuDom=this.tree.getContextMenu();
			if(contextMenuDom){
				this.tree.removeContextMenu();
			}	
			var contextMenu=this.options.contextMenu;
			if(contextMenu===undefined
					|| contextMenu==null
					|| (typeof(contextMenu)=="array"&&contextMenu.length==0)){
				return;
			}
			contextMenuDom=new Element("ul",{
				"class":"contextmenu"
			});
			this.tree.adoptContextMenu(contextMenuDom);
	
			this.options.contextMenu.each(function(item,index){
				var _this=this;
				var li=new Element("li",{
					events:{
						"click":function(evt){
							_this.fireEvent("afterRightClick");
							item.fn.call(_this,evt);
						}
					}
				}).inject(contextMenuDom);
				var a=new Element("a",{
					"href":"javascript:void(0)",
					"class":"menu_item"
				}).inject(li);
				var text=new Element("span",{
					"text":item.title
				}).inject(a);
			},this);
			contextMenuDom.setStyles({
				"top":evt.client.y,
				"left":evt.client.x,
				"display":"block"
			});
		},
		getDom:function(){
			return this.dom;
		}
	});
})();

/**
 * 构建Tree的容器
 */
var KTree=new Class({
	Implements:[Options,Events],
	options:{
		onExpand:function(){},
		treeClass:"k_tree"
	},
	initialize:function(tree,options){
		this.onExpand=options.onExpand;
		this.tree=tree;
		this.tree.addClass(this.options.treeClass);
		this.tree.setProperty("oncontextmenu","return false");
		this.fireEvent("expand");
	},
	addNode:function(node){
		node.setOptions({
			onExpand:this.onExpand
		});
		node.tree=this;
		var ul=new Element("ul").inject(this.tree);
		ul.adopt(node.getDom());
	},
	getDom:function(){
		return this.tree;
	},
	adoptContextMenu:function(dom){
		this.contextMenuDom=dom;
		this.tree.adopt(dom);
	},
	getContextMenu:function(){
		return this.contextMenuDom;
	},
	removeContextMenu:function(){
		if(this.contextMenuDom)
			this.contextMenuDom.destroy();
	}
});