var $body, $modal, $secondaryModal, $window, sidebar_pos, sidebar_width, ajax_contents, scroll_from_top, menu_scroll;
var timeout = false;
var rtime;
var delta = 500;
$(function() {
    "use strict";
    setTimeout(function() {
        $('body').removeClass("loading");
        $('body').addClass('loaded');
    }, 2000);


    if ("ontouchstart" in window || navigator.msMaxTouchPoints) {
        $('body').addClass('touch');
    } else {
        $('body').addClass('no-touch');
    }

    if ($('section').length > 0) {
        var anchors = [];
        var nav = [];
        var section_names = [];
        $('section').each(function() {
            anchors.push($(this).data('anchor'));
            section_names.push($(this).data('label'));

            if ($(this).data('nav')) {
                $('.top-menu .nav-right').prepend('<div class="menu-item pull-right"><a href="#' + $(this).data('anchor') + '">' + $(this).data('label') + '</a></div>');
                $('.responsive-nav ul').append('<li class="menu-item"><a href="#' + $(this).data('anchor') + '">' + $(this).data('label') + '</a></li>');
            }
        });
    } else {
        $('.burger').addClass('hidden');
    }

    $(document).on("click", ".burger", function(e) {
        $("body").toggleClass('show-responsive');
        e.preventDefault();
    });
    $(document).on("click", ".responsive-nav-overlay", function(e) {
        $("body").removeClass('show-responsive');
        e.preventDefault();
    });

    $(document).on("click", ".slide-to", function(e) {
        e.preventDefault();
        $("html, body").animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 1000);
    });

    $(document).on("click", ".top-menu .nav-right a,.responsive-nav a", function(e) {
        e.preventDefault();
        $("body").removeClass('show-responsive');
        $("html, body").animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 1000);
    });

    $(document).on("click", ".logo", function(e) {
        if ($("body").hasClass('section-home')) {
            e.preventDefault();
            $("html, body").animate({
                scrollTop: 0
            }, 1000);
        }

    });

    $(".top-menu").addClass('visible');

    var waypoints = $('.way-point-animate').waypoint(function(direction) {
        $(this.element).addClass('shown');
    }, {
        offset: '90%'
    });
    var waypoints = $('.way-point-animate-left').waypoint(function(direction) {
        $(this.element).addClass('shown');
    }, {
        offset: '90%'
    });
    var waypoints = $('.way-point-animate-right').waypoint(function(direction) {
        $(this.element).addClass('shown');
    }, {
        offset: '90%'
    });

    $.cookieBar({
        element: 'body',
        zindex: '999999',
        message: 'This website uses cookies to ensure the best user experience. By using this website you agree to our use of cookies.',
        acceptText: '',
        //policyText: 'MORE',
        //policyURL: '#,
        domain: 'www.http://armatus.ch',
        referrer: 'www.http://armatus.ch'
    });
    callbacks();
});

function initShares() {
    "use strict";
    $('.close-share-this').click(function() {
        $('.modal.in').modal('hide');
        return false;
    });

    var clipboard = new Clipboard('.clipboardButton');
    clipboard.on('success', function(e) {
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);

        $('.clipboardButton .copy-label').text(' copied!');

        e.clearSelection();
    });
    clipboard.on('error', function(e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);

    });

}

function callbacks(c) {
    "use strict";
    var container = c || '';
    //ajaxContent(container + ' .ajax-content');

    $(container + ' .callbacks').each(function() {
        if (!$(this).hasClass('callbacks-executed')) {
            if (container !== '' || !$(this).hasClass('callbacks-executed')) {
                var c = $(this).data();
                for (var i in c) {
                    if (i.indexOf('fn') === 0 && c[i] !== '') {
                        var fn = c[i];
                        var params = c['params' + i] || null;

                        try {
                            if (c['after' + i] && typeof(window[c['after' + i]]) === 'function') {

                                var callbackAfter = c['after' + i];
                                var callbackAfterParams = c['after' + i + 'Params'] || null;

                                window[fn](params, function() {
                                    window[callbackAfter](callbackAfterParams);
                                });
                            } else {
                                window[fn](params);
                            }
                            $(this).addClass('callbacks-executed');
                        } catch (Error) {
                            console.log(Error + ' ' + fn);
                        }
                    }
                }
            }
        }
    });
}