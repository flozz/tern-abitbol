"use strict";

var Class = require("abitbol");

var ClassA = Class.$extend({
    methodA: function() {},
    getValueA: function() {},
    attrA: 42
});

var ClassB = ClassA.$extend({
    methodB: function() {},
    getValueB: function() {},
    attrB: false
});

var ClassC = ClassB.$extend({
    attrB: "hello",
    attrC: "world"
});

