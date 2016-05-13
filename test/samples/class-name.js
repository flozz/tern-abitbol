"use strict";

var Class = require("abitbol");

var NamedClassVar = Class.$extend({
    method1: function() {}
});

var classes = {
    NamedClassObject1: Class.$extend({
        method1: function() {}
    })
};

classes.NamedClassObject2 = Class.$extend({
    method1: function() {}
});

var factories = {
    namedClassVarFactory: function() {
        return new NamedClassVar();
    },

    namedClassObject1Factory: function() {
        return new classes.NamedClassObject1();
    },

    namedClassObject2Factory: function() {
        return new classes.NamedClassObject2();
    }

};

