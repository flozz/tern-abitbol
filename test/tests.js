"use strict";

var expect = require("expect.js");
var lodash = require("lodash");

var runServer = require("./helpers.js").runServer;
var queryCompletion = require("./helpers.js").queryCompletion;

var server = runServer();

describe("tern-abitbol", function() {

    describe("properties", function() {

        it("finds properties from Class.$extend", function() {
            return queryCompletion(server, "simple-class.js", "var simpleClass = new SimpleClass(); simpleClass.")
                .then(function(response) {
                    var properties = lodash.map(response.completions, "name");
                    expect(properties).to.contain("__init__");
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

        it("finds auto-generated computed properties", function() {
            return queryCompletion(server, "simple-class.js", "var simpleClass = new SimpleClass(); simpleClass.")
                .then(function(response) {
                    var properties = lodash.map(response.completions, "name");
                    expect(properties).to.contain("valueA");
                    expect(properties).to.contain("valueB");
                    expect(properties).to.contain("valueC");
                    expect(properties).to.contain("valueD");
                });
        });

        it("propagates the type from the getter to the computed properties", function() {
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

    //it("test", function() {
        //return queryCompletion(server, "simple-class.js", "var simpleClass = new SimpleClass(); simpleClass.")
            //.then(r => console.log(r));
    //});

});
