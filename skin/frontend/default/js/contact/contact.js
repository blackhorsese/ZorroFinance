function initContactForm() {

    $('.contact-form').validate({
        submitHandler: function() {
            var data = $('.contact-form').serialize();
            var object = {
                'success': function(response) {
                    $('.contact-form .form-response').removeClass('alert-success');
                    $('.contact-form .form-response').removeClass('alert-danger');

                    if (response['status'] == 'ok') {
                        $('.contact-form .form-response').addClass('alert-success').show().html(response['message']);
                    } else {
                        $('.contact-form .form-response').addClass('alert-danger').show().html(response['error']);
                    }
                },
                'data': data
            };
            $.ajax(object);
            return false;
        },
        errorPlacement: function(error, element) {
            // error.hide();
        },
        highlight: function(element, errorClass, validClass) {
            $(element).parent().find('.form-control-feedback').remove();
            $(element).closest('.form-group').append('<span class=" form-control-feedback"><i class="fa fa-exclamation-triangle"></i></span>');
            $(element).parent().addClass('has-error has-feedback');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).parent().find('.form-control-feedback').remove();
            $(element).parent().removeClass('has-error has-feedback');
        }
    });
}

function initEmailAlert() {

    $('.email-alert-form').validate({
        submitHandler: function() {
            var data = $('.email-alert-form').serialize();
            var object = {
                'success': function(response) {
                    $('.email-alert-form .form-response').removeClass('alert-success');
                    $('.email-alert-form .form-response').removeClass('alert-danger');

                    if (response['status'] == 'ok') {
                        $('.email-alert-form .form-response').addClass('alert-success').show().html(response['message']);
                    } else {
                        $('.email-alert-form .form-response').addClass('alert-danger').show().html(response['error']);
                    }
                },
                'data': data
            };
            $.ajax(object);
            return false;
        },
        errorPlacement: function(error, element) {
            // error.hide();
        },
        highlight: function(element, errorClass, validClass) {
            $(element).parent().find('.form-control-feedback').remove();
            $(element).closest('.form-group').append('<span class=" form-control-feedback"><i class="fa fa-exclamation-triangle"></i></span>');
            $(element).parent().addClass('has-error has-feedback');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).parent().find('.form-control-feedback').remove();
            $(element).parent().removeClass('has-error has-feedback');
        }
    });
}




function initContactMap() {
    "use strict";
    $.ajax({
        url: '//maps.googleapis.com/maps/api/js?key=AIzaSyAPyGu0Ic6jqnDfIlKJWn3jjX2tJxTIcPE',
        dataType: "script",
        success: function() {
            if (typeof $('#map-container-contact')[0] !== "undefined") {

                var map_styling = [{
                        "featureType": "administrative",
                        "elementType": "labels.text.fill",
                        "stylers": [{
                            "color": "#444444"
                        }]
                    }, {
                        "featureType": "landscape",
                        "elementType": "geometry",
                        "stylers": [{
                            "color": "#254169"
                        }]
                    }, {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    }, {
                        "featureType": "road",
                        "elementType": "geometry",
                        "stylers": [{
                            "visibility": "on"
                        }, {
                            "lightness": 45
                        }]
                    },
                    {
                        "featureType": "road",
                        "elementType": "labels",
                        "stylers": [{
                            "visibility": "off"
                        }, {
                            "lightness": 45
                        }]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry",
                        "stylers": [{
                            "visibility": "simplified"
                        }]
                    }, {
                        "featureType": "road.arterial",
                        "elementType": "labels.icon",
                        "stylers": [{

                            "visibility": "off"
                        }]
                    },

                    {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [{
                            "visibility": "off"
                        }]
                    }, {
                        "featureType": "water",
                        "elementType": "all",
                        "stylers": [{
                            "color": "#254169"
                        }, {
                            "visibility": "on"
                        }]
                    }
                ];



                var myLatlng_contact = new google.maps.LatLng(38.0474733, 23.8029528);
                var infowindow = new google.maps.InfoWindow({});
                var options = {
                    zoom: 16,
                    center: myLatlng_contact,
                    styles: map_styling,
                    scrollwheel: false,
                    navigationControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    draggable: false,
                    disableDoubleClickZoom: true,
                    zoomControl: false,
                    disableDefaultUI: true,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map_contact = new google.maps.Map($('#map-container-contact')[0], options);
                var markerImage = new google.maps.MarkerImage(
                    MAP_MARKER
                );

                var contentString =
                    '<div id="content" class="maps_infobox">' +
                    '<div id="siteNotice">' + '</div>' +
                    '<img id="firstHeading" src="' + SKIN + 'img/logo.png" class="firstHeading">' +
                    '<div id="bodyContent">' +
                    '<p>&nbsp;</p>' +
                    '<p><b>Star Bulk Carriers Corp.</b></p>' +
                    '<p>c/o Star Bulk Management Inc.</p>' +
                    '<p>40, Agiou Konstantinou Str., Maroussi 15124,</p>' +
                    '<p>Athens, Greece</p>' +
                    '<a target="_blank" href="https://maps.google.com?saddr=Current+Location&daddr=38.0478457,23.8040864">View Directions</a>'
                '</div>' +
                '</div>';
                infowindow = new google.maps.InfoWindow({
                    content: contentString
                });
                var marker = new google.maps.Marker({
                    position: myLatlng_contact,
                    map: map_contact,
                    icon: markerImage
                });

                marker.addListener('click', function() {
                    infowindow.open(map_contact, marker);
                });


            }

        }

    });

}