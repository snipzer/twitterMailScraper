'use strict';

var _argparse = require('argparse');

var _argparse2 = _interopRequireDefault(_argparse);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ArgParse = _argparse2.default.ArgumentParser;

var parser = new ArgParse({
    version: '0.0.1',
    addHelp: true,
    description: 'Used for create the config file'
});

parser.addArgument(['-c', '--credential'], {
    help: "Argument are: accessToken,accessTokenSecret,consumerKey,consumerSecure"
});

var args = parser.parseArgs();

var argArray = args.credential.split(",");

var accessToken = argArray[0];
var accessTokenSecret = argArray[1];
var consumerKey = argArray[2];
var consumerSecret = argArray[3];

try {
    _fs2.default.readFile("config/config.sample.yml", 'utf8', function (err, data) {
        if (err) return console.log(err);

        var result = data.replace(/ACCESS_TOKEN_SECRET/g, accessTokenSecret).replace(/ACCESS_TOKEN/g, accessToken).replace(/CONSUMER_SECRET/g, consumerSecret).replace(/CONSUMER_KEY/g, consumerKey);

        _fs2.default.writeFile("config/config.yml", result, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    });
    console.log("Config file sucessfully updated");
} catch (e) {
    console.log(e);
}