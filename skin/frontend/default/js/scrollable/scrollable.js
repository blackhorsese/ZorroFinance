function services_slider() {
    var $services_slider = $('.services-content .slick-slider').slick({
        dots: false,
        arrows: false,
        infinite: false,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        slidesToShow: 1,
        adaptiveHeight: false
    });

    $('.section-services .services-nav ul li').click(function() {
        var $this = $(this);
        $('.section-services .services-nav ul li').removeClass('active');
        $this.addClass('active');
        $services_slider.slick('slickGoTo', parseInt($this.data('index')));
    });
}