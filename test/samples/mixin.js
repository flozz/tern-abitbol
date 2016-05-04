"use strict";

var Class = require("abitbol");

var MixinClass = Class.$extend({

    __include__: [
        {
            methodA: function() { return 42; },
            methodB: function() { return 42; },
            getValueA: function() { return 42; }
        },
        {
            methodB: function() { return "hello"; },
            methodC: function() { return "hello"; },
            methodD: function() { return "hello"; }
        }
    ],

    methodD: function() {
        return true;
    }

});

