$(function() {
    "use strict";
    setEqualHeights('.pressroom-highlight .item .caption');
});
$(window).on('resize', function() {
    "use strict";
    setEqualHeights('.pressroom-highlight .item .caption');
});

function setEqualHeights(target) {
    "use strict";
    var highestBox = 0;
    $(target).css('min-height', 0);
    $(target).each(function() {
        if ($(this).height() > highestBox) {
            highestBox = $(this).height();
        }
    });
    $(target).css('min-height', highestBox + 15);
}

/*function initHighlight(){
    "use strict";
	
	var carousel = $(".pressroom-highlight .pressroom-highlight-carousel");
	carousel.slick({
		speed: 500,
		appendDots:$('.pressroom-highlight .slide-dots'),
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		appendArrows:$('.pressroom-highlight .slide-dots'),
		nextArrow:'<a class="next-slide" href="#"><i class="fa fa-angle-right" aria-hidden="true"></i></a>',
		prevArrow:'<a class="prev-slide" href="#"><i class="fa fa-angle-left" aria-hidden="true"></i></a>',
		dots: true,
		
		responsive: [
			{
			  breakpoint: 1024,
			  settings: {
				slidesToShow: 3				
			  }
			},
			{
			  breakpoint: 600,
			  settings: {
				slidesToShow: 2
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
				slidesToShow: 1
			  }
			}
		  ]
	});
}*/