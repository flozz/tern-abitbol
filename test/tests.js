"use strict";

var expect = require("expect.js");
var lodash = require("lodash");

var runServer = require("./helpers.js").runServer;
var queryCompletion = require("./helpers.js").queryCompletion;

var server = runServer();

describe("tern-abitbol", function() {

    describe("properties", function() {

        it("are found from Class.$extend", function() {
            return queryCompletion(server, "simple-class.js", "var simpleClass = new SimpleClass(); simpleClass.")
                .then(function(response) {
                    var properties = lodash.map(response.completions, "name");
                    expect(properties).to.contain("method1");

                    expect(properties).to.contain("attrArray");
                    expect(properties).to.contain("attrBoolean");
                    expect(properties).to.contain("attrNumber");
                    expect(properties).to.contain("attrObject");
                    expect(properties).to.contain("attrString");

                    expect(properties).to.contain("getValueA");
                    expect(properties).to.contain("setValueA");
                    expect(properties).to.contain("getValueB");
                    expect(properties).to.contain("isValueC");
                    expect(properties).to.contain("hasValueD");
                });
        });

    });

    describe("computed properties", function() {

        it("auto-generated computed properties are avaiable for autocompletion", function() {
            return queryCompletion(server, "simple-class.js", "var simpleClass = new SimpleClass(); simpleClass.")
                .then(function(response) {
                    var properties = lodash.map(response.completions, "name");
                    expect(properties).to.contain("valueA");
                    expect(properties).to.contain("valueB");
                    expect(properties).to.contain("valueC");
                    expect(properties).to.contain("valueD");
                });
        });

        it("types are propagated from the getter to the computed property", function() {
            return queryCompletion(server, "simple-class.js", "var simpleClass = new SimpleClass(); simpleClass.")
                .then(function(response) {
                    var completions = response.completions;
                    expect(lodash.find(completions, {name: "valueA"}).type).to.equal("number");
                    expect(lodash.find(completions, {name: "valueB"}).type).to.equal("string");
                    expect(lodash.find(completions, {name: "valueC"}).type).to.equal("bool");
                    expect(lodash.find(completions, {name: "valueD"}).type).to.equal("bool");
                });
        });

    });

    describe("constructor", function() {

        it("arguments of the __init__ methods are proagated to the contructor", function() {
            return queryCompletion(server, "simple-class.js", "var simpleClass = new SimpleClass")
                .then(function(response) {
                    var completions = response.completions;
                    var constructor = lodash.find(completions, item => item.type.indexOf("fn(") === 0);
                    expect(constructor.type).to.contain("valueA: number");
                    expect(constructor.type).to.contain("valueB: string");
                    expect(constructor.type).to.contain("valueC: bool");
                });
        });

        it("__init__ is not available as static method", function() {
            return queryCompletion(server, "simple-class.js", "SimpleClass.")
                .then(function(response) {
                    var properties = lodash.map(response.completions, "name");
                    expect(properties).not.to.contain("__init__");
                });
        });

        it("__init__ is available as instance method", function() {
            return queryCompletion(server, "simple-class.js", "var simpleClass = new SimpleClass(); simpleClass.")
                .then(function(response) {
                    var properties = lodash.map(response.completions, "name");
                    expect(properties).to.contain("__init__");
                });
        });

    });

    describe("abitbol special properties", function() {

        describe("$exend", function() {

            it("is available as static method", function() {
                return queryCompletion(server, "simple-class.js", "SimpleClass.")
                    .then(function(response) {
                        var properties = lodash.map(response.completions, "name");
                        expect(properties).to.contain("$extend");
                    });
            });

            it("is not available as instance method", function() {
                return queryCompletion(server, "simple-class.js", "var simpleClass = new SimpleClass(); simpleClass.")
                    .then(function(response) {
                        var properties = lodash.map(response.completions, "name");
                        expect(properties).not.to.contain("$extend");
                    });
            });

        });

        describe("$class", function() {

            it("is available as static method", function() {
                return queryCompletion(server, "simple-class.js", "SimpleClass.")
                    .then(function(response) {
                        var properties = lodash.map(response.completions, "name");
                        expect(properties).to.contain("$class");
                    });
            });

            it("is available as instance method", function() {
                return queryCompletion(server, "simple-class.js", "var simpleClass = new SimpleClass(); simpleClass.")
                    .then(function(response) {
                        var properties = lodash.map(response.completions, "name");
                        expect(properties).to.contain("$class");
                    });
            });

        });

        describe("$map", function() {

            it("is available as static method", function() {
                return queryCompletion(server, "simple-class.js", "SimpleClass.")
                    .then(function(response) {
                        var properties = lodash.map(response.completions, "name");
                        expect(properties).to.contain("$map");
                    });
            });

            it("is available as instance method", function() {
                return queryCompletion(server, "simple-class.js", "var simpleClass = new SimpleClass(); simpleClass.")
                    .then(function(response) {
                        var properties = lodash.map(response.completions, "name");
                        expect(properties).to.contain("$map");
                    });
            });

            // TODO introspection data into $map
            it("contains introspection categories", function() {
                return queryCompletion(server, "simple-class.js", "SimpleClass.$map.")
                    .then(function(response) {
                        var properties = lodash.map(response.completions, "name");
                        expect(properties).to.contain("attributes");
                        expect(properties).to.contain("methods");
                        expect(properties).to.contain("computedProperties");
                    });
            });

            it("contains attributes' introspection data", function() {
                return queryCompletion(server, "simple-class.js", "SimpleClass.$map.attributes.")
                    .then(function(response) {
                        var properties = lodash.map(response.completions, "name");
                        expect(properties).to.contain("attrBoolean");
                        expect(properties).to.contain("attrString");
                        expect(properties).to.contain("attrNumber");
                        expect(properties).to.contain("attrObject");
                        expect(properties).to.contain("attrArray");
                    });
            });

            it("contains methods' introspection data", function() {
                return queryCompletion(server, "simple-class.js", "SimpleClass.$map.methods.")
                    .then(function(response) {
                        var properties = lodash.map(response.completions, "name");
                        expect(properties).to.contain("__init__");
                        expect(properties).to.contain("getValueA");
                        expect(properties).to.contain("setValueA");
                        expect(properties).to.contain("getValueB");
                        expect(properties).to.contain("isValueC");
                        expect(properties).to.contain("hasValueD");
                        expect(properties).to.contain("method1");
                    });
            });

            it("contains advanced methods' introspection data", function() {
                return queryCompletion(server, "simple-class.js", "SimpleClass.$map.methods.method1.")
                    .then(function(response) {
                        var properties = lodash.map(response.completions, "name");
                        expect(properties).to.contain("annotations");
                    });
            });

            it("contains computed properties' introspection data", function() {
                return queryCompletion(server, "simple-class.js", "SimpleClass.$map.computedProperties.")
                    .then(function(response) {
                        var properties = lodash.map(response.completions, "name");
                        expect(properties).to.contain("valueA");
                        expect(properties).to.contain("valueB");
                        expect(properties).to.contain("valueC");
                        expect(properties).to.contain("valueD");
                    });
            });

            it("contains advanced computed properties' introspection data", function() {
                return queryCompletion(server, "simple-class.js", "SimpleClass.$map.computedProperties.valueA.")
                    .then(function(response) {
                        var properties = lodash.map(response.completions, "name");
                        expect(properties).to.contain("get");
                        expect(properties).to.contain("set");
                        expect(properties).to.contain("annotations");
                    });
            });

        });

        describe("$data", function() {

            it("is not available as static method", function() {
                return queryCompletion(server, "simple-class.js", "SimpleClass.")
                    .then(function(response) {
                        var properties = lodash.map(response.completions, "name");
                        expect(properties).not.to.contain("$data");
                    });
            });

            it("is available as instance method", function() {
                return queryCompletion(server, "simple-class.js", "var simpleClass = new SimpleClass(); simpleClass.")
                    .then(function(response) {
                        var properties = lodash.map(response.completions, "name");
                        expect(properties).to.contain("$data");
                    });
            });

        });

        describe("$super", function() {

            it("is not available as static method", function() {
                return queryCompletion(server, "simple-class.js", "SimpleClass.")
                    .then(function(response) {
                        var properties = lodash.map(response.completions, "name");
                        expect(properties).not.to.contain("$super");
                    });
            });

            it("is available as instance method", function() {
                return queryCompletion(server, "simple-class.js", "var simpleClass = new SimpleClass(); simpleClass.")
                    .then(function(response) {
                        var properties = lodash.map(response.completions, "name");
                        expect(properties).to.contain("$super");
                    });
            });

        });

    });

    describe("mixins (__include__)", function() {

        it("are attached to the class prototype", function() {
            return queryCompletion(server, "mixin.js", "var m = new MixinClass(); m.")
                .then(function(response) {
                    var properties = lodash.map(response.completions, "name");
                    expect(properties).to.contain("methodA");
                    expect(properties).to.contain("methodB");
                    expect(properties).to.contain("methodC");
                    expect(properties).to.contain("methodD");
                    expect(properties).to.contain("getValueA");
                    expect(properties).to.contain("valueA");
                });
        });

        it("have the right override behaviour", function() {
            return queryCompletion(server, "mixin.js", "var m = new MixinClass(); m.")
                .then(function(response) {
                    var completions = response.completions;
                    expect(lodash.find(completions, {name: "methodA"}).type).to.contain("-> number");
                    expect(lodash.find(completions, {name: "methodB"}).type).to.contain("-> string");
                    expect(lodash.find(completions, {name: "methodC"}).type).to.contain("-> string");
                    expect(lodash.find(completions, {name: "methodD"}).type).to.contain("-> bool");
                });
        });

        it("__include__ is not included in classes static properties", function() {
            return queryCompletion(server, "mixin.js", "MixinClass.")
                .then(function(response) {
                    var properties = lodash.map(response.completions, "name");
                    expect(properties).not.to.contain("__include__");

                });
        });

        it("__include__ is not included in classes properties", function() {
            return queryCompletion(server, "mixin.js", "var m = new MixinClass(); m.")
                .then(function(response) {
                    var properties = lodash.map(response.completions, "name");
                    expect(properties).not.to.contain("__include__");
                });
        });

    });

    describe("class static properties (__classvars__)", function() {

        it("are attached to the class", function() {
            return queryCompletion(server, "static-properties.js", "StaticPropClass.")
                .then(function(response) {
                    var properties = lodash.map(response.completions, "name");
                    expect(properties).to.contain("staticMethod1");
                    expect(properties).to.contain("staticAttr1");
                });
        });

        it("are not attached to the class instance", function() {
            return queryCompletion(server, "static-properties.js", "var s = new StaticPropClass(); s.")
                .then(function(response) {
                    var properties = lodash.map(response.completions, "name");
                    expect(properties).not.to.contain("staticMethod1");
                    expect(properties).not.to.contain("staticAttr1");
                });
        });

        it("__classvars__ is not included in classes static properties", function() {
            return queryCompletion(server, "static-properties.js", "StaticPropClass.")
                .then(function(response) {
                    var properties = lodash.map(response.completions, "name");
                    expect(properties).not.to.contain("__classvars__");

                });
        });

        it("__classvars__ is not included in classes properties", function() {
            return queryCompletion(server, "static-properties.js", "var s = new StaticPropClass(); s.")
                .then(function(response) {
                    var properties = lodash.map(response.completions, "name");
                    expect(properties).not.to.contain("__classvars__");
                });
        });
    });

    describe("inheritance", function() {

        it("classes inherites parent's classes properties", function() {
            return queryCompletion(server, "inheritance.js", "var c = new ClassC(); c.")
                .then(function(response) {
                    var properties = lodash.map(response.completions, "name");

                    expect(properties).to.contain("methodA");
                    expect(properties).to.contain("getValueA");
                    expect(properties).to.contain("valueA");
                    expect(properties).to.contain("attrA");

                    expect(properties).to.contain("methodB");
                    expect(properties).to.contain("getValueB");
                    expect(properties).to.contain("valueB");
                    expect(properties).to.contain("attrB");

                    expect(properties).to.contain("attrC");
                });
        });

        it("parent classes are not affected by inheritance", function() {
            return queryCompletion(server, "inheritance.js", "var c = new ClassC(); var a = new ClassA(); a.")
                .then(function(response) {
                    var properties = lodash.map(response.completions, "name");

                    expect(properties).to.contain("methodA");
                    expect(properties).to.contain("getValueA");
                    expect(properties).to.contain("valueA");
                    expect(properties).to.contain("attrA");

                    expect(properties).not.to.contain("methodB");
                    expect(properties).not.to.contain("getValueB");
                    expect(properties).not.to.contain("valueB");
                    expect(properties).not.to.contain("attrB");

                    expect(properties).not.to.contain("attrC");
                });
        });

        it("properties of child classes override the parent's ones", function() {
            return queryCompletion(server, "inheritance.js", "var c = new ClassC(); c.")
                .then(function(response) {
                    var completions = response.completions;
                    expect(lodash.find(completions, {name: "attrB"}).type).to.contain("string");
                });
        });

        it("constructor of child class overrides the one of its parent", function() {
            return queryCompletion(server, "inheritance.js", "ClassB")
                .then(function(response) {
                    var completions = response.completions;
                    var constructor = lodash.find(completions, item => item.type.indexOf("fn(") === 0);
                    expect(constructor.type).to.contain("paramB");
                });
        });

        it("parent classes are not affected by subclasses", function() {
            return queryCompletion(server, "inheritance.js", "ClassA")
                .then(function(response) {
                    var completions = response.completions;
                    var constructor = lodash.find(completions, item => item.type.indexOf("fn(") === 0);
                    expect(constructor.type).to.contain("paramA");
                });
        });

        it("classes inherites parent's classes static properties", function() {
            return queryCompletion(server, "static-properties.js", "StaticPropClass2.")
                .then(function(response) {
                    var properties = lodash.map(response.completions, "name");

                    expect(properties).to.contain("staticMethod1");
                    expect(properties).to.contain("staticAttr1");

                    expect(properties).to.contain("staticMethod2");
                    expect(properties).to.contain("staticAttr2");
                });
        });

        it("parent classes are not affected by child's static properties", function() {
            return queryCompletion(server, "static-properties.js", "var s = new StaticPropClass2(); StaticPropClass.")
                .then(function(response) {
                    var properties = lodash.map(response.completions, "name");

                    expect(properties).to.contain("staticMethod1");
                    expect(properties).to.contain("staticAttr1");

                    expect(properties).not.to.contain("staticMethod2");
                    expect(properties).not.to.contain("staticAttr2");
                });
        });

        it("child's static properties overrides the parent's one", function() {
            return queryCompletion(server, "static-properties.js", "StaticPropClass3.")
                .then(function(response) {
                    var completions = response.completions;
                    expect(lodash.find(completions, {name: "staticAttr1"}).type).to.contain("bool");
                });
        });

    });

    describe("classes name", function() {

        it("is found when the class is assigned to a variable that looks like a class name", function() {
            return queryCompletion(server, "class-name.js", "factories.namedClassVarFactory", {fakeFileName: "app/js/file1.js"})
                .then(function(response) {
                    expect(response.completions[0].type.toString()).to.equal("fn() -> (file1.js).NamedClassVar");
                });

        });

        it("is found when the class is declared as an object property that looks like a class name", function() {
            return queryCompletion(server, "class-name.js", "factories.namedClassObject1", {fakeFileName: "app/js/file2.js"})
                .then(function(response) {
                    expect(response.completions[0].type.toString()).to.equal("fn() -> (file2.js).NamedClassObject1");
                });

        });

        it("is found when the class is assigned to an object property that looks like a class name", function() {
            return queryCompletion(server, "class-name.js", "factories.namedClassObject2", {fakeFileName: "app/js/file3.js"})
                .then(function(response) {
                    expect(response.completions[0].type.toString()).to.equal("fn() -> (file3.js).NamedClassObject2");
                });

        });

    });

});
