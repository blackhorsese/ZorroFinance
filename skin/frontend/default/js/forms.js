// JavaScript Document

var keydown_timeout;
var keydown_xhr;

function contactForm() {
    var validateEmail = function(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };

    $('.send').hover(function() {
        if ($('#email_input').val() == '') {
            $(this).addClass('invalid');
            $('.cross').text(lang.check_email);
            $('#email_input').addClass('invalid');
        }
        if ($("#name_input").val() == '') {
            $(this).addClass('invalid');
            $('.cross').text(lang.check_name);
            $('#name_input').addClass('invalid');
        }
    }, function() {
        $('.invalid').removeClass('invalid');
        $('.send').removeClass("shake_it_baby");
        $('.send').removeClass("highlighted");
        $('.envelope').fadeIn();
    });

    $('.send').click(function(e) {
        e.preventDefault();
        if (!$(this).hasClass('invalid')) {
            $('.send').addClass('sending');
            // wishlist to send
            var name = $("#name_input").val();
            var email = $('#email_input').val();
            var lang = $("#language_input").val() || 'ru';

            var ajaxurl = 'mail.php?name=' + name + '&email=' + email + '&lang=' + lang;


            $.ajax({
                data: $('form[name="contact-form"]').serialize(),
                success: function(data) {
                    if (data.status == 'ok') {

                        $('.send').addClass('success');
                        setTimeout(function() {
                            $('.send').removeClass('sending').removeClass('success');
                            $('#email_input').val('');
                        }, 2000);

                    } else if (data.status == 'error') {
                        form_submit_response('form[name="contact-form"]', 'error', data.error);
                    } else {
                        form_submit_response('form[name="contact-form"]', 'error', 'An unknown error occurred. Please try again later');
                    }
                }
            });
        } else {
            $('.send').addClass("highlighted");
            $('.envelope').hide();
            $('.send').addClass("shake_it_baby");
            $('.invalid').addClass("highlighted");
            setTimeout(function() {
                $('input.highlighted').removeClass("highlighted");

            }, 1500);
        }
    });


    $.ajax({
        url: 'https://www.google.com/recaptcha/api.js',
        dataType: "script"
    });

    $('form[name="contact-form"]').validate({

        submitHandler: function() {
            $.ajax({
                data: $('form[name="contact-form"]').serialize(),
                success: function(data) {
                    if (data.status == 'ok') {

                        ga('send', 'pageview', '/contact-success.html');

                        form_submit_response('form[name="contact-form"]', 'success', data.message, true);
                    } else if (data.status == 'error') {
                        form_submit_response('form[name="contact-form"]', 'error', data.error);
                    } else {
                        form_submit_response('form[name="contact-form"]', 'error', 'An unknown error occurred. Please try again later');
                    }
                }
            });
        }
    });
}

function form_submit_response(target, type, message, r) {
    "use strict";
    /*var redirect = r || false;
    $('#growls').empty();
    if (type == 'error') {
        $.growl.error({ duration:6000,title:'',message: message, location: 'tr',size:'large'  });
    } else if (type == 'warning') {
        $.growl.warning({ duration:6000,title:'',message: message, location: 'tr',size:'large'   });
    } else if (type == 'success') {
        $.growl.notice({ duration:6000,title: '', message: message, location: 'tr',size:'large'  });
    } else {
        $.growl({duration:6000,title: '', message: message, location: 'tr',size:'large'  });
    }
    if (redirect) {
        setTimeout(function () {
            window.location.reload();
        }, 2000);
    }*/
    alert(message);
}

$(function() {
    "use strict";
    $.validator.setDefaults({
        debug: false,
        errorPlacement: function(error) {
            error.hide();
        },
        highlight: function(element, errorClass, validClass) {

            if ($(element).is(':radio')) {
                $(element).parent().parent().find('.form-control-feedback').remove();
                $(element).parent().parent().append('<span class=" form-control-feedback" style="right:-20px"><i class="fa fa-times"></i></span>');
                $(element).parent().parent().addClass('has-error has-feedback');
            } else {
                $(element).addClass('invalid').removeClass('valid');
            }

        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass('invalid').addClass('valid');
        }
    });
});