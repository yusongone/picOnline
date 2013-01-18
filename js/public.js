var publicJs=window.publicJs||(function(){
	//隐藏区域
	var hideArea={
			"state":"hide"
		};
		hideArea.getState=function(){
			return this.state;	
		};
		hideArea.close=function(){
			this.state="hide";	
			this.area.html("").hide(500);
		};
		hideArea.hide=function(){
			this.state="hide";	
			this.area.slideUp();
		};	
		hideArea.open=function(content){
			this.area.html("").append(content).slideDown();
			this.state="show";	
		};
		hideArea.show=function(content){
			this.area.slideDown();
			this.state="show";	
		};


	return {
		"createHideArea":function(tage){
			hideArea.area=tage;
			return hideArea;
		},
		"getHideArea":function(){
			return hideArea;
		}
	};
})();
