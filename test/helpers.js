"use strict";

var fs = require("fs");

var tern = require("tern");
var q = require("q");
var uuid = require("uuid");

function runServer() {
    require("tern/plugin/node");
    require("../abitbol.js");

    var server = new tern.Server({
        plugins: {
            "abitbol": {},
            "node": {}
        },
        projectDir: __dirname
    });
    return server;
}

function queryCompletion(server, fileName, expression, options) {
    options = options || {};
    var fakeFileName = options.fakeFileName || uuid.v4() + ".js";
    var fileContent;

    if (fileName) {
        fileContent = fs.readFileSync(__dirname + "/samples/" + fileName);
        if (expression) {
            fileContent += "\n" + expression;
        }
    } else {
        fileContent = expression;
    }

    server.addFile(fakeFileName, fileContent);

    return q.nfcall(server.request.bind(server), {
        query: {
            type: "completions",
            file: fakeFileName,
            end: fileContent.length,
            types: true,
            docs: false,
            urls: false,
            origins: true,
            caseInsensitive: true,
            lineCharPositions: true,
            expandWordForward: false
        }
    });
}

module.exports = {
    runServer: runServer,
    queryCompletion: queryCompletion
};
