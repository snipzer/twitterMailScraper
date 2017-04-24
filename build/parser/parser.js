'use strict';

var _argparse = require('argparse');

var _argparse2 = _interopRequireDefault(_argparse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ArgParse = _argparse2.default.ArgumentParser;

var parser = new ArgParse({
    version: '0.0.1',
    addHelp: true,
    description: 'Argparse example'
});

parser.addArgument(['-at', '--accessToken'], {
    help: "Token d'acces"
});

parser.addArgument(['-ats', '--accessTokenSecret'], {
    help: "Token d'acces secret"
});

parser.addArgument(['-ck', '--consumerKey'], {
    help: "Clef d'utilisateur "
});

parser.addArgument(['-cs', '--consumerSecret'], {
    help: "Secret d'utilisateur"
});

console.log(ArgParse.accessToken);