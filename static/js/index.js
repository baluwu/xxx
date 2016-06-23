'use strict';

define(function(require, module, exports) {
    var get_xy = function() {
        var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        return {
            width: w,
            height: h
        }
    }
    var set_elements = function() {
        var dim = get_xy();
        var c_w = dim.width;
        var c_h = dim.height;

        //$('.t-b-r').css({width: c_w - 200, height: c_h - 100});
        //$('.t-b-l').css({height: c_h - 100});
    };

    set_elements();

    $(window).resize(function() {
        set_elements();
    });
});