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


        // Collapse Navbar When It's Clickicked
        $(window).scroll(function () {
            if (window.innerWidth > 768) {
                $('nav.navbar .navbar-collapse.in').collapse('hide');
            }
        });
    }


    return {
        initHeader: handleHeader
    };
}();

