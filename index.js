var fs = require('fs');
var path = require('path');
var dir = require('node-dir');
var _ = require('lodash');
var defaults = {
    include: /.js$/
};

function mapOptions(options) {
    return {
        match: options.include,
        matchDir: options.includeDir,
        exclude: options.exclude,
        excludeDir: options.excludeDir
    };
}

function readAppJson(appPath, callback) {
    fs.readFile(appPath, function (err, appJson) {
        if (err) {
            return callback(err, null);
        }

        try {
            appJson = JSON.parse(appJson);
        } catch (e) {
            return callback(e, null);
        }

        callback(null, appJson);
    });
}

function scanDir(directory, options, callback) {
    dir.readFiles(directory, mapOptions(options), function (err, content, next) {
        if (err) {
            return callback(err, null);
        }
        next();
    }, function (err, files) {
        if (err) {
            return callback(err, null);
        }
        callback(null, files.map(function (file) {
            var jsFileExtension = file.lastIndexOf('.js');
            return (jsFileExtension !== -1 ? file.substr(0, jsFileExtension) : file).replace(directory + path.sep, '').replace(/\\/g, '/');
        }));
    });
}


module.exports = function (appDist, options, callback) {
    options = _.defaults(options || {}, defaults);
    var cmpPath = path.resolve(path.join(appDist, 'components'));
    var appJsonPath = path.resolve(path.join(appDist, 'app', 'app.json'));

    scanDir(path.resolve(appDist), options, function (err, modules) {
        var retVal = {
            modules: modules,
            application: null
        };

        if (err) {
            return callback(err, null);
        }
        readAppJson(appJsonPath, function (err, appJson) {
            if (err) {
                return callback(err, null);
            }

            retVal.application = appJson.js ? appJson.js : {};
            callback(null, retVal);
        });
    });
};