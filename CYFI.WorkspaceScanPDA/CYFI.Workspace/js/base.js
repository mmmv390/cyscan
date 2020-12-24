$(function(){
	$("header>ul li").click(function(){
		$(this).addClass("active");
		$(this).siblings().removeClass("active");
	})
	$("header .top .pull-right>a").click(function(){
		$(this).next("ul").toggle()
	});
	$(".infolist .btn li a").click(function(){
		$(this).parent().addClass("active");
		$(this).parent().siblings().removeClass("active");
		var index = $(this).parent().index();
		$(".infolist .list").eq(index).show().siblings().hide();
	})
})
$(function(){
	$(".input_search").each(function(){
		var x = true;
		$(this).find(".input_right span").click(function(){
			if(x) {
				$(this).parent().find("ul").toggle();
				$(this).parent().addClass("active");
				x = false;
			}else{
				$(this).parent().find("ul").toggle();
				$(this).parent().removeClass("active");
				x = true;
			}	
		})
		$(this).find("ul li").click(function(){
			console.log($(this).find("a").text().trim());
			$(this).parents(".input_right").find("span").text($(this).find("a").text().trim());
			$(this).parent().hide();
			$(this).parents(".input_right").removeClass("active");
			$(this).addClass("active").siblings().removeClass("active");
		})
	})
	$(".down").each(function(){
		$(this).click(function(){
			$(this).parent().find("span").click()
		})
	})
	$(".order_change .top2 li ").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
		var index = $(this).index();
		$(".bottom .bottom_input").eq(index).show().siblings().hide();
	})
})

$(function(){
	$("input[id^=date-group1-]").each(function(){
		var id = "#" + $(this).attr("id");
		new Jdate({
			el: id,
			format: 'YYYY/MM/DD',
			beginYear: 2000,
			endYear: 2100
		})
	})
})
