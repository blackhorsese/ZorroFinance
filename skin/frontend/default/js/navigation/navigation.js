var scrollTop;
var elementOffset;
$(function() {
    $('header .burger-btn').click(function() {
        $('body').toggleClass('show-mobile-nav');
    });

    $('.responsive-nav-overlay').click(function() {
        $('body').removeClass('show-mobile-nav');
    });
});

$(window).on('resize', function() {
    "use strict";
    if ($('.navigation').offset() !== undefined) {
        //var navInitDistance = $('.navigation').offset().top;
        var threshold = $('header').height();

        if ($('body').hasClass('section-global-positioning')) {
            $('.navigation').addClass('fixed');
            $('.navigation').css('top', threshold);

            var h = $('header').height() + $('.navigation').height();
            var adjust = $('.map').height() - (h + $('footer').height());
            $('.map').css('margin-top', h);
            $('.map').css('height', adjust);

        }
    }
});
$(window).load(function() {
    "use strict";
    if ($(document).scrollTop() > 50) {
        $('header').addClass('small');
    } else {
        $('header').removeClass('small');
    }
    setTimeout(function() {
        if ($('.navigation').offset() !== undefined) {
            //var navInitDistance = $('.navigation').offset().top;
            var threshold = $('header').height();

            if ($('body').hasClass('section-global-positioning')) {
                $('.navigation').addClass('fixed');
                $('.navigation').css('top', threshold);

                var h = $('header').height() + $('.navigation').height();
                var adjust = $('.map').height() - (h + $('footer').height());
                console.log($('footer').height());
                $('.map').css('margin-top', h);
                $('.map').css('height', adjust);

            }
        }

        $(window).scroll(function() {
            if (!$('body').hasClass('without-hero')) {
                if ($(document).scrollTop() > 200) {
                    $('header').addClass('small');
                } else {
                    $('header').removeClass('small');
                }
                scrollTop = $(window).scrollTop();
                elementOffset = $('.heros').innerHeight() - $('header').innerHeight();
                if (scrollTop >= elementOffset) {
                    $('.navigation').addClass('fixed');
                } else {
                    $('.navigation').removeClass('fixed');
                }
            } else {
                if ($(document).scrollTop() > 50) {
                    $('header').addClass('small');
                } else {
                    $('header').removeClass('small');
                }
                scrollTop = $(window).scrollTop();
                elementOffset = $('header').innerHeight();
                if (scrollTop >= elementOffset) {
                    $('.navigation').addClass('fixed');
                } else {
                    $('.navigation').removeClass('fixed');
                }
            }
        });

    }, 500);
});