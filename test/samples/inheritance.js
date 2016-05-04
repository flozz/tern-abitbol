"use strict";

var Class = require("abitbol");

var ClassA = Class.$extend({
    __init__: function(paramA) {},
    methodA: function() {},
    getValueA: function() {},
    attrA: 42
});

var ClassB = ClassA.$extend({
    __init__: function(paramB) {},
    methodB: function() {},
    getValueB: function() {},
    attrB: false
});

var ClassC = ClassB.$extend({
    attrB: "hello",
    attrC: "world"
});

