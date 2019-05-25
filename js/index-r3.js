$(document).ready(function () {

    var slides = [1, 2, 3, 5, 6, 11, 12, 13, 14, 15, 16]
    var target = Math.floor(Math.random() * slides.length)

    console.log(target, 'url("images/slide/' + slides[target] + '.jpg");')
    $('#header').css('background-image', 'url("images/slide/' + slides[target] + '.jpg");')

    $("#applybtn").click(function () {
        swal({
            title: 'I am applying as a...',
            showCancelButton: false,
            showCloseButton: true,
            showConfirmButton: false,
            html: '<a href="https://register.masseyhacks.ca/" target="_blank"><button type="button" class="btn btn-large btn-wide">Hacker</button><br></a>' +
                '<a href="https://masseyhacks.ca" target="_blank"><button type="button" disabled="true" class="btn btn-large btn-wide">Mentor/Workshop Host</button></a>'
        })
    })


    function updateScroll(position) {
        switch (position) {
            case 'hidden': // Hide bar when detached from top
                $('#nav-main').removeClass('nav-active')
                $('#nav-main').removeClass('nav-docked')
                $('#nav-main').addClass('nav-hidden')

                $("#nav-ham").attr("hidden", true)

                break
            case 'body': // Body
                $('#nav-main').css('position', 'fixed')

                $('#nav-main').removeClass('nav-docked')
                $('#nav-main').addClass('nav-active')

                $('#nav-main').removeClass('nav-hidden')

                //$('#nav-logo').attr('src', 'images/logo/logo.svg');
                $('#bannerImg').attr('src', 'https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-blue.svg')
                //$('#nav-logo-group').attr("hidden", false);

                //$('#mobile-overlay').removeClass('overlay-dark');
                //$('#mobile-overlay').addClass('overlay-light');

                // Hide hamburger
                /*
                if ($('#nav-main-table').is(":hidden")) {
                    $("#nav-ham").attr("hidden", false);
                }*/

                break
            default: // Top (Docked)
                $('#nav-main').css('position', 'absolute')
                $('#nav-main').addClass('nav-docked')
                $('#nav-main').removeClass('nav-active')
                $('#nav-main').removeClass('nav-hidden')

                //$('#nav-logo').attr('src', 'images/logo/logo-white.svg');
                $('#bannerImg').attr('src', 'https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg')
                //$('#nav-logo-group').attr("hidden", true);

                //$('#mobile-overlay').addClass('overlay-dark');
                //$('#mobile-overlay').removeClass('overlay-light');

                /*
                if ($('#nav-main-table').is(":hidden")) {
                    $("#nav-ham").attr("hidden", false);
                }*/

                break
        }
    }

    var wp = new Waypoint({
        element: document.getElementById('about'),
        handler: function (direction) {
            updateScroll(direction == 'down' ? 'body' : 'hidden')
        },
        offset: '50px'
    })

    var wp2 = new Waypoint({
        element: document.getElementById('header'),
        handler: function (direction) {
            updateScroll(direction == 'down' ? 'hidden' : 'docked')
        },
        offset: '-50px'
    })

    updateScroll('docked')

    $('.js-navbar-link').on('click', function (e) {
        e.preventDefault()

        var target = this.hash
        var $target = $(target)

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 500, 'swing', function () {

        })
    })

    $('#year').html(new Date().getFullYear())

    $(".hamburger").on("click", function () {
        toggleOverlay()
    })

    $('a.overlayLink').click(function () {
        toggleOverlay()
    })

    var bgresize = function () {
        if ($(document).width() <= 767) {

            $("#accordion").removeClass("hidden")
            $(".accordionCont").removeClass("hidden")
            $("#full-faq").addClass("hidden")
            $("#nav-ham").removeClass("hidden")

            //$("#navleft").hide();
            $("#navright").hide()

            $("#nav-inner").removeClass("container")
        } else {

            $("#accordion").addClass("hidden")
            $(".accordionCont").addClass("hidden")
            $("#full-faq").removeClass("hidden")
            $("#nav-ham").addClass("hidden")

            //$("#navleft").show();
            $("#navright").show()

            $("#nav-inner").addClass("container")
        }

        if ($("#nav-ham").hasClass("is-active")) {
            $("#nav-ham").toggleClass("is-active")
            $(".overlay").css({top: "-100%"})
            $("html").css({"overflow-y": "visible"})
        }
    }

    bgresize()
    $(window).resize(bgresize)
    $(window).on("orientationchange", bgresize)
})

function toggleOverlay() {
    $("#nav-ham").toggleClass("is-active")

    if ($("#nav-ham").hasClass("is-active")) {
        $(".overlay").css({top: "0"})
        $("html").css({"overflow-y": "hidden"})
    } else {
        $(".overlay").css({top: "-100%"})
        $("html").css({"overflow-y": "visible"})
    }
}

$.ajax({
    type: 'GET',
    url: 'schedule.json',
    dataType: 'json',
    success: function (data) {
        var exp = ''
        for (var i = 0; i < data.length; i++) {
            var d = data[i]
            var xOffset = 100 + 200 * d['xs']
            var width = (d['xe'] - d['xs']) * 200
            var yOffset = 95 + 80 * d['y']
            exp += '<div style="left: ' + xOffset + 'px; top: ' + yOffset + 'px; width: ' + width + 'px !important; background-color: ' + d['color'] + ';" class="schedule-label">' +
                '<div class="inner-label">' +
                '<p class="label-caption"><b>' + d['caption'] + '</b></p>' +
                '<p class="label-description">' + d['start'] + ' - ' + d['end'] + ' | ' + d['location'] + '</p>' +
                '</div></div>'
        }
        $('#label-container').html(exp)

    },
    error: function (data) {
        $('#schedule-frame').html('<b><h2>Server error occurred<br>Unable to get schedule</h2></b>')
    }
})

