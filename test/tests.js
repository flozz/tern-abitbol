"use strict";

var expect = require("expect.js");

var runServer = require("./helpers.js").runServer;
var queryCompletion = require("./helpers.js").queryCompletion;

var server = runServer();

describe("tern-abitbol", function() {

    it("test", function() {
        return queryCompletion(server, null, "var Class = require('abitbol'); Class.")
            .then(r => console.log(r));
    });

});
