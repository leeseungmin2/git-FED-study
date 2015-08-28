/*
*	author : min
*
*
*
*
*/

$(function(){
	$.fn.popup = function(options, callback){
		
		// popup object
		var opt = $.extend({}, $.fn.popup.defaults, options);
		// valiables
		var $popup = this,
			id,
			xPos,
			yPos,
			wW = windowWidth(),
			wH = windowHeight()			
		;
			
		// HIDE SCROLLBAR?  
        if (!opt.scrollBar)	// scrollBar :  false 면 스크롤바 삭제
            $('html').css('overflow', 'hidden');
		
		// Dim 생성(Background)
		$("<div id=dim></div>").css({ 
			backgroundColor	:	opt.modalColor, 
			position :			"fixed", 
			left :				0,
			right : 			0,
			top : 				0,
			bottom : 			0,
			opacity : 			0,
			zIndex :			opt.zIndex,
			cursor : 			"pointer"
			
		}).appendTo(opt.appendTo).fadeTo(opt.speed, opt.opacity, function(){
			$(this).click(function(){
				close();	
			})
		});
		var dim = $('#dim');

		// Modal Setting & Animate
		modalPosition();	// 위치값 설정
		$popup.css({
				"position"	: "absolute",
				"z-index"	: opt.zIndex + 1,
				"left"		: xPos,
				"top"		: yPos,
				"opacity"	: 0,
				"display"	: "block"
		}).animate({
			opacity:1,
		},opt.followSpeed ,opt.followEasing, function(){
			$(this).find(".b-close").click(function(){
				close()
			})
		});
		
		function modalPosition(){
			xPos = (windowWidth() / 2) - ($popup.outerWidth() / 2);
			yPos = (windowHeight() / 2) - ($popup.outerHeight() / 2);
		};
		
		// window Width Value
		function windowWidth(){
			return $(window).width();
		};
		
		// window Height Value
		function windowHeight(){
			return $(window).height();
		};
		
		// Scrollbar
		function scrollBar(){
			if(!opt.scrollBar){
				$('html').css('overflow', 'auto');
			}else{
				$('html').css('overflow', 'hidden');
			}
		}
		
		// Dim Close
		function dimEvent(e){
			e.bind('click', function(){
				e.fadeTo(opt.speed, 0);
			});
		};
		
		// Popup Close
		function close(){
			scrollBar()
			$popup.fadeTo(opt.speed, 0, function(){
				$(this).hide();	
			});
			dim.fadeTo(opt.speed, 0, function(){
				$(this).remove();	
			});
		};
		
		// Popup X,Y Position Set
		function calcPosition(){
			wW = windowWidth();
			wH = windowHeight();
			xPos = (wW - $popup.outerWidth()) / 2;
			yPos = (wH - $popup.outerHeight()) / 2;
		};
		
		// Popup X,Y Animate
		function reposition(){
			popupResizeTimer = setTimeout(function(){
				$popup.dequeue().animate({
					left: 	xPos,
					top:	yPos,
				}, opt.followEasing, opt.followEasing);	
			}, 500)
		};
		
		// Resize Fn
		$(window).resize(function(){
			calcPosition();
			reposition();
		});
	}
	
	$.fn.popup.defaults = {

	    appendTo	: 		'body'
        , closeClass: 		'b-close'
		, easing: 			'swing'
		, followEasing: 	'swing'
        , followSpeed: 		500
        , modalColor: 		'#000'
        , opacity: 			0.7
        , scrollBar: 		true
		, speed: 			250 // open & close speed
        , zIndex: 			9997 // popup gets z-index 9999, modal overlay 9998
    };
	
});