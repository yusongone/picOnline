/**
JS for cncev.com
liuxun@gmail.com
2012/9/6
*/


$(function(){


//有dock机制的导航，比36kr的优雅多了吧
if($('#supernav').length>0){
	$(window).scroll( function() {
		var docked;
		var init = 152;//导航距离顶部高度，待调
		var supernav = $('#supernav');

		if ((supernav.offset().top - $(window).scrollTop()) < 15)
		{
			supernav.css({top: '15px', position: 'fixed'});
		}
		else if ($(window).scrollTop() <= init)
		{
			supernav.css({top: init + 'px', position: 'absolute'});
		}
	});
}

//加个blocklink 制造可以点的 li
$('.blocklink li').live('click', function() {
	window.location = $(this).find('a').attr('href');
});

//我是无敌的万能精简标签切换，那些流行的插件都是浮云
$('.toggletab').mouseover(function(){

	$('.'+$(this).parent().attr('for')).hide();
	$(this).siblings('li').addClass('off');
	$(this).siblings('li').removeClass('on');

	$(this).removeClass('off');
	$(this).addClass('on');
	$('#'+$(this).attr('for')).show();

});

//文章块是一定要有 hover 效果的！！
$('article').mouseover(function(){
	$(this).find('h2').children('a').css('color','#333333');
});
$('article').mouseout(function(){
	$(this).find('h2').children('a').css('color','#777777');
});

//对flash_msg的处理
$(document).ready(function(){
	if($ (".msg").length>0){
		setTimeout(function(){
			$ ('.msg').fadeOut(2000);
		},10000);
	}
});






});