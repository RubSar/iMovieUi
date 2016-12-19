var App = function () {
    // extend jQuery by method hasAttr
    $.fn.hasAttr = function (name) {
        return this.attr(name) !== undefined;
    };

    // Header
    function handleHeader() {
        // jQuery to collapse the navbar on scroll
        if ($('.navbar').offset().top > 150) {
            $('.navbar-fixed-top').addClass('top-nav-collapse');
        }
        $(window).scroll(function () {
            if ($('.navbar').offset().top > 150) {
                $('.navbar-fixed-top').addClass('top-nav-collapse');
            } else {
                $('.navbar-fixed-top').removeClass('top-nav-collapse');
            }
        });

        var $offset = 0;
        if ($('.one-page-nav-scrolling').hasClass('one-page-nav__fixed')) {
            $offset = $(".one-page-nav-scrolling").height() + 8;
        }
        // jQuery for page scrolling feature - requires jQuery Easing plugin
        $('.page-scroll a').bind('click', function (event) {
            var $position = $($(this).attr('href')).offset().top;
            $('html, body').stop().animate({
                scrollTop: $position - $offset
            }, 600);
            event.preventDefault();
        });

        // Collapse Navbar When It's Clickicked
        $(window).scroll(function () {
            //if (window.innerWidth > 768) {
               $('nav.navbar .navbar-collapse.in').collapse('hide');
            //}
        });
    }

    //owl carousel
    function initOwlCarousel() {
        $('.comics-character-list').owlCarousel({
            loop: true,
            margin: 15,
            responsive: {
                0: {
                    items: 1
                },
                500: {
                    items: 2
                },
                650: {
                    items: 3
                },
                850: {
                    items: 4
                },
                1024: {
                    items: 4
                },
                1270: {
                    items: 4
                }
            },
            navText: [,],
            nav: true,
            dots: false,
            navContainerClass: 'owl-buttons'
        });
    }

    return {
        initHeader: handleHeader,
        initOwlCarousel: initOwlCarousel

    };
}();

