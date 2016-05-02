"use strict";

var Class = require("abitbol");

var SimpleClass = Class.$extend({

    __init__: function(valueA, valueB, valueC) {
        this.$data.valueA = (valueA !== undefined) ? valueA : 42;
        this.$data.valueB = (valueB !== undefined) ? valueB : "hello";
        this.$data.valueC = (valueC !== undefined) ? valueC : false;
        this.$data.valueD = true;
    },

    getValueA: function() {
        return this.$data.valueA|0;
    },

    setValueA: function(value) {
        this.$data.valueA = value|0;
    },

    getValueB: function() {
        return ""+this.$data.valueB;
    },

    isValueC: function() {
        return !!this.$data.valueC;
    },

    hasValueD: function() {
        return !!this.$data.valueD;
    },

    method1: function(a, b) {
        a = a|0;
        b = b|0;
        return a === b;
    },

    attrBoolean: true,
    attrString: "hello",
    attrNumber: 1337,
    attrObject: {a: 1, b: 2, c: 3},
    attrArray: [1, 2, 3]

});

