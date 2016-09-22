/*
 * MeeSlider, version: 1.1
 *
 * Author: Nikita Melikhov, ver@0xff.su
 * 
 * 1.1: Added autoplay
 * 1.0: Initial version
*/
(function($) {
    jQuery.fn.meeSlider = function(options) {
        _count = 0;
        _current = 1;
        options = $.extend({
            auto:     false,  // Autoplay, default: false
            delay:    5000,   // Autoplay delay, default: 5000
            controls: true,   // Show controls, default: true
            prev:     'prev', // Prev selector, default: 'prev'
            next:     'next', // Next selector, default: 'next'
            //start:    1,      // Initial slide, default: 1
            //pager:    true,   // Slides pager, default: true
            fadeIn:   200,    // fadeIn duration, default: 200
            fadeOut:  200,    // fadeOut duration, default: 200

            _debug:   false,  // Debug messages, default: false
        }, options);

        var make = function() {
            if(options._debug) console.log(' - MeeSlider: make()');
            var element = $(this);

            var ul = element.find('> ul');
            if(ul) {
                if(options._debug) console.log(' - MeeSlider: ul found');
                ul.css('list-style', 'none');

                _count = ul.find('li').length;
                if(options._debug) console.log(' - MeeSlider: count: ' + _count);

                ul.find('li').hide();
                element.data('mee-current', 1);
                _current = 1;
                if(options._debug) console.log(' - MeeSlider: current: ' + _current);

                $(ul.find('li')[_current - 1]).show();

                // Prev button
                function prevSlide(event) {
                    if(options._debug) console.log(' - MeeSlider: prevSlide(), count: ' + _count + ', current: ', _current);
                    $(ul.find('li')[_current - 1]).fadeOut(options.fadeOut, function() {
                        if(_current == 1) {
                            _current = _count + 1;
                            element.data('mee-current', _current + 1);
                        }
                        _current--;
                        $(ul.find('li')[_current - 1]).fadeIn(options.fadeIn);

                        element.data('mee-current', _current);
                        if(options._debug) console.log(' - MeeSlider: prevSlide(), count: ' + _count + ', current: ', _current);
                        if(options._debug) console.log(' ');
                    });

                }

                // Next button
                function nextSlide(event) {
                    if(options._debug) console.log(' - MeeSlider: nextSlide(), count: ' + _count + ', current: ', _current);
                    $(ul.find('li')[_current - 1]).fadeOut(options.fadeOut, function() {
                        if(_current == _count) {
                            _current = 0;
                            element.data('mee-current', 0);
                        }

                        _current++;
                        $(ul.find('li')[_current - 1]).fadeIn(options.fadeIn);

                        element.data('mee-current', _current);
                        if(options._debug) console.log(' - MeeSlider: nextSlide(), count: ' + _count + ', current: ', _current);
                    });
                }

                // Autostart
                if(options.auto) {
                    if(options._debug) console.log(' - MeeSlider: autostart is enabled');
                    function autoPlay() {
                        if(options._debug) console.log(' - MeeSlider: autoPlay()');
                        nextSlide();
                        timeout = setTimeout(autoPlay, options.delay);
                    }
                    var timeout = setTimeout(autoPlay, options.delay);

                    element.hover(
                        function() {
                            if(options._debug) console.log(' - MeeSlider: hover - stop autoplay');
                            clearTimeout(timeout);
                        },
                        function() {
                            if(options._debug) console.log(' - MeeSlider: hout - resume autoplay');
                            timeout = setTimeout(autoPlay, options.delay);
                        }
                    );
                } else {
                    console.warn('no autoplay');
                } // if options.auto

                element.find('.' + options.prev).click(prevSlide);
                element.find('.' + options.next).click(nextSlide);
            } // if ul
        } // make()

        return this.each(make);
    }
})(jQuery);
