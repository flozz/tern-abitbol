"use strict";

var Class = require("abitbol");

var StaticPropClass = Class.$extend({

    __classvars__: {
        staticMethod1: function(a, b) {
            a = a|0;
            b = b|0;
            return a + b;
        },
        staticAttr1: 42
    }

});

var StaticPropClass2 = StaticPropClass.$extend({

    __classvars__: {
        staticMethod2: function() {},
        staticAttr2: false
    }

});

var StaticPropClass3 = StaticPropClass.$extend({

    __classvars__: {
        staticAttr1: true
    }

});

