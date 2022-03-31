(function($, window, document, undefined){




    // 스와이프 기능	
		$(".slide-wrap").swipe({
			swipeLeft: function(){
				nextSlide();
				clearInterval(setId);  	//일시정지
				$('.playBtn').addClass('addNav');
				t=1;
			},
			swipeRight: function(){
				prevSlide();
				clearInterval(setId);  	//일시정지
				$('.playBtn').addClass('addNav');
				t=1;
			}
		});

})(jQuery, window, document);