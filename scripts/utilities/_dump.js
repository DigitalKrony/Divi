/*########################
    Grunt Task by Adam Sivins <adamsiv@microsoft.com>
    JSON Parsing by Andy Seres <andyse@microsoft.com>
########################*/

'use strict';

module.exports = function(grunt) {
    var DESC = "The things that it does!";

    grunt.registerMultiTask('jsonToScss', DESC, function() {
        this.files.map(function(file) {
            return {
                src: file.src.filter(function(fileSrc) {
                    if (!grunt.file.exists(fileSrc)) {
                        grunt.log.warn('Source file "' + fileSrc + '" not found.');
                        return false;
                    } else {
                        return true;
                    }
                }),
                dest: file.dest
            }
        }).map(function(file) {
            return {
                src: file.src.map(function(path) {
                    return executeMapping(grunt.file.readJSON(path));
                }).join('\n'),
                dest: file.dest
            };
        }).forEach(function(file) {
            grunt.file.write(file.dest, file.src);
            grunt.log.writeln('File "' + file.dest + '" created.');
        });
    });
};

var executeMapping = function(json) {
    var s = "";
    var listKeys = Object.keys(json);

    for (var i = 0; i < listKeys.length; i++) {
        var k = listKeys[i];
        var m = "$" + k + ": ";

        var doThis = doWhat(json[k]);
        m += doThis.concatValues.insertThisBefore +
            doThis.parseFunction(json[k]) +
            doThis.concatValues.insertThisAfter;

        s += m + ";\n";
    }
    return s;
};

var selectParser = function( value, index, arrayOfTuples) {
    m = "";

    var doThis = doWhat(value, true);
    m += doThis.concatValues.insertThisBefore +
            doThis.parseFunction(valueToConvert) +
            doThis.concatValues.insertThisAfter;

    outerIndex < arrayOfTuples.length - 1 ? m += doThis.concatValues.insertThisAfterLine : null;

    return m;
};

var parseArray = function(a) {
    var m = "(";
    a.map(function(valueToConvert, outerIndex, arrayOfTuples) {
        var doThis = doWhat(valueToConvert, true);
        m += doThis.concatValues.insertThisBefore +
            doThis.parseFunction(valueToConvert) +
            doThis.concatValues.insertThisAfter;
        outerIndex < arrayOfTuples.length - 1 ? m += doThis.concatValues.insertThisAfterLine : null;
    });
    m += ")";
    return m;
};

var parseObject = function(o) {
    var m = '';
    Object.keys(o).forEach(function(key, outerIndex, arrayOfTuples) {
        m += key + ": ";
        var doThis = doWhat(o[key], true);
        m += doThis.concatValues.insertThisBefore +
            doThis.parseFunction(o[key]) +
            doThis.concatValues.insertThisAfter;
        outerIndex < arrayOfTuples.length - 1 ? m += doThis.concatValues.insertThisAfterLine : null;

    });
    return m;
};

var parseStringOrNumber = function(o) { return o; };

var doWhat = function(what, isNested) {
    var whatFunction, //This selects the type of funciton used to parse the data
        openWithWhat, // This begins the line for a new parsing
        closeWithWhat, // This ends the line of said new parsing
        endLineWithWhat; // This closes out the Object, Array, or String completely before going on to the next key

    switch (toString.call(what)) {
        case "[object String]" :
        case "[object Number]" :
            whatFunction = parseStringOrNumber;
            openWithWhat = isNested ? "" : "";
            closeWithWhat = isNested ? "" : "";
            endLineWithWhat = isNested ? ", " : ", ";
            break;

        case "[object Object]" :
            whatFunction = parseObject;
            openWithWhat = isNested ? "\n\t(" : "(";
            closeWithWhat = isNested ? ")" : ")";
            endLineWithWhat = isNested ? ", " : "\n";
            break;

        case "[object Array]" :
            whatFunction = parseArray;
            openWithWhat = isNested ? "" : "";
            closeWithWhat = isNested ? "" : "";
            endLineWithWhat = isNested ? ",\n" : "\n";
            break;

        default:
            console.log('You have entered an unreconized JSON statment. Please review your JSON and try again.');
            break;
    }

    return {
        parseFunction: whatFunction,
        concatValues: {
            "insertThisBefore": openWithWhat,
            "insertThisAfter": closeWithWhat,
            "insertThisAfterLine": endLineWithWhat
        }
    }
};