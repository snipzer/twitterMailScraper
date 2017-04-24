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

// parser.addArgument(
//     [ '-at', '--accessToken' ],
//     {
//         help: "Token d'acces"
//     }
// );
//
// parser.addArgument(
//     [ '-ats', '--accessTokenSecret' ],
//     {
//         help: "Token d'acces secret"
//     }
// );
//
// parser.addArgument(
//     [ '-ck', '--consumerKey' ],
//     {
//         help: "Clef d'utilisateur "
//     }
// );
//
// parser.addArgument(
//     [ '-cs', '--consumerSecret' ],
//     {
//         help: "Secret d'utilisateur"
//     }
// );

parser.addArgument(['-t', '--toto'], {
    help: "Secret d'utilisateur"
});

var args = parser.parseArgs();

var argArray = args.toto.split(",");

var accessToken = argArray[0];
var accessTokenSecure = argArray[1];
var consumerKey = argArray[2];
var consumerSecret = argArray[3];

console.log(argArray);