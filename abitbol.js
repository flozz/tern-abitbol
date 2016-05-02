"use strict";

//var fs = require("fs");

//var __f = fs.openSync("/tmp/tern-abitbol.log", "a");
//log("-----------------------------");

//function log() {
    //for (var i = 0 ; i < arguments.length ; i++) {
        //fs.writeSync(__f, ""+arguments[i]);
    //}
    //fs.writeSync(__f, "\n");
//}

//function logobj(o) {
    //try {
        //log(JSON.stringify(o));
    //} catch (e) {
        //log(e);
        //var i = 100;
        //log("{");
        //for (var k in o) {
            //try {
                //if (typeof o[k] == "function") {
                    //log("    " + k + ": function(){},");
                //} else if (typeof o[k] == "string") {
                    //log("    " + k + ": \"" + o[k] + "\",");
                //} else {
                    //log("    " + k + ": " + o[k] + ",");
                //}
            //} catch (ee) {
                //log("    // !!!!!!!!!!!!!!!!! " + e);
            //}
            //i -= 1;
            //if (i <= 0) {
                //log("    // trucated ...");
                //break;
            //}
        //}
        //log("}");
    //}
//}

var __i = 0;
function getUniqClassId() {
    __i += 1;
    return "AbitbolClass" + __i;
}


var tern = require("tern/lib/tern");
var infer = require("tern/lib/infer");


function _isPrivate(name) {
    return name.indexOf("_") === 0;
}

function _isGetter(name) {
    return name.indexOf("get") === 0 || name.indexOf("is") === 0 || name.indexOf("has") === 0;
}

function _getterToPropertyName(name) {
    var accessorNameLength = 3;
    if (name.indexOf("is") === 0) {
        accessorNameLength = 2;
    }
    return name.slice(accessorNameLength, accessorNameLength + 1).toLowerCase() + name.slice(accessorNameLength + 1, name.length);
}


infer.registerFunction("abitbolExtend", function(_self, args, argNodes) {
    var hidePrivate = false;
    try {
        var abitbolClass = new infer.Fn(getUniqClassId(), new infer.AVal(), [], [], new infer.AVal());
        var abitbolClassPrototype = abitbolClass.getProp("prototype").getType();

        //log(";");
        //log(abitbolClass.name + " extends " + abitbolClass.proto.name);
        //log("getType: "+abitbolClass.getType());
        //log("proto: "+abitbolClass.proto);

        // parent class static properties
        // TODO

        // parent class properties
        var parentClassProperties = _self.getProp("prototype").getType();
        parentClassProperties.forAllProps(function(prop, val, local) {
            if (!local) return;
            if (prop == "prototype") return;
            if (_isPrivate(prop) && hidePrivate) return;
            val.propagate(abitbolClassPrototype.defProp(prop));
        });

        // new class static properties (__classvars__)
        // TODO

        // new class mixin properties (__include__)
        // TODO

        // new class properties / computed properties
        var newProperties = args[0];
        newProperties.forAllProps(function(prop, val, local) {
            if (!local) return;
            if (_isPrivate(prop) && hidePrivate) return;
            val.propagate(abitbolClassPrototype.defProp(prop));
            // autogenerated conmputed property
            if (_isGetter(prop)) {
                var propertyType = val.getType();
                var computedProperty = abitbolClassPrototype.defProp(_getterToPropertyName(prop));
                if (propertyType && propertyType.retval) {
                    propertyType.retval.propagate(computedProperty);
                }
                // TODO propagate getter's doc
            }
        });

        // new class constructor
        // TODO

        // abitbol $extend
        // TODO

        // abitbol $class
        // TODO

        // abitbol $data
        // TODO

        // abitbol $map
        // TODO

        _self.forAllProps(function(prop, val, local) {
            if (!local) return;
            if (prop == "prototype") return;
            val.propagate(abitbolClass.defProp(prop));
        });

        //var parentClassProperties = _self.getProp("prototype").getType();
        //parentClassProperties.forAllProps(function(prop, val, local) {
            //if (!local) return;
            //if (prop == "prototype") return;
            //val.propagate(abitbolClassPrototype.defProp(prop));
        //});

        //var newProperties = args[0];
        //newProperties.forAllProps(function(prop, val, local) {
            //if (local) {
                //val.propagate(abitbolClassPrototype.defProp(prop));
            //}
        //});

        return abitbolClass;
    } catch (e) {
        //log(e);
        return null;
    }

    //var cls = new infer.AVal();
    //var clsType = new infer.Obj(_self.getType());
    //cls.addType(clsType);

    //var protoProps = args[0];
    //var clsProto = clsType.getProp("prototype").getType();
    //protoProps.forAllProps(function(prop, val, local) {
        //if (local) {
            //val.propagate(clsProto.defProp(prop));
        //}
    //});

    //var staticProps = args[1];
    //staticProps.forAllProps(function(prop, val, local) {
    //if (local) {
    //val.propagate(clsType.defProp(prop));
    //}
    //});

    //var attributes = new infer.Obj(true),
    //options = new infer.Obj(true);
    //var inst = new infer.Obj(true);
    //var ctor = cls.hasCtor = new infer.Fn(null, infer.ANull, [attributes, options], ["attributes", "options"], inst);

    //var instAttributes = inst.defProp("attributes");
    //attributes.forAllProps(function(prop, val, local) {
        //if (local) val.propagate(instAttributes.defProp(prop));
    //});

    //return cls;
});

tern.registerPlugin("abitbol", function(server, options) {
    //server.on("beforeLoad", function(file) {
        //log(">>> FILE: " + file.name);
    //});

    server.addDefs(defs);
});

var defs = {

    "!name": "abitbol",

    "!define": {
        "!known_modules": {
            "abitbol": {
                "!type": "Class"
            }
        },

    },

    "Class": {
        "!type": "fn(?) -> +Class",
        "$extend": {
            "!type": "fn(properties: ?) -> !custom:abitbolExtend",
            "!effects": ["custom abitbol_extend"]
        },
        "$class": {
            "!type": "Class"
        },
        "$map": {
            "!type": "Obj"
        },
        "prototype": {}

    }

};

//{
    //proto: fn(),
    //name: "AbitbolClass5",
    //maybeProps: null,
    //origin: "check.js",
    //self: fn(?) -> Class,
    //args: ,
    //argNames: ,
    //retval: ?,
    //generator: undefined,
    //constructor: function(){},
    //toString: function(){},
    //getProp: function(){},
    //defProp: function(){},
    //getFunctionType: function(){},
    //isArrowFn: function(){},
    //purge: function(){},
    //hasProp: function(){},
    //normalizeIntegerProp: function(){},
    //broadcastProp: function(){},
    //onProtoProp: function(){},
    //replaceProto: function(){},
    //ensureMaybeProps: function(){},
    //removeProp: function(){},
    //forAllProps: function(){},
    //maybeUnregProtoPropHandler: function(){},
    //unregPropHandler: function(){},
    //gatherProperties: function(){},
    //getObjType: function(){},
    //propagate: function(){},
    //hasType: function(){},
    //isEmpty: function(){},
    //typeHint: function(){},
    //getType: function(){},
    //addType: function(){},
    //getSymbolType: function(){},
    //propagatesTo: function(){},
    //propHint: function(){},
    //on: function(){},
    //off: function(){},
    //signal: function(){},
    //signalReturnFirst: function(){},
    //hasHandler: function(){},
//}

//getWidth -> width
//{
    //types: ,
    //forward: null,
    //maxWeight: 0,
    //propertyOf: fn(),
    //propertyName: "width",
    //originNode: [object Object],
    //origin: "node_modules/photonui/src/interactive/iconbutton.js",
    //addType: function(){},
    //propagate: function(){},
    //getProp: function(){},
    //forAllProps: function(){},
    //hasType: function(){},
    //isEmpty: function(){},
    //getFunctionType: function(){},
    //getObjType: function(){},
    //getSymbolType: function(){},
    //getType: function(){},
    //toString: function(){},
    //makeupPropType: function(){},
    //makeupType: function(){},
    //typeHint: function(){},
    //propagatesTo: function(){},
    //gatherProperties: function(){},
    //guessProperties: function(){},
    //purge: function(){},
    //propHint: function(){},
    //on: function(){},
    //off: function(){},
    //signal: function(){},
    //signalReturnFirst: function(){},
    //hasHandler: function(){},
//}

