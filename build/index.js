'use strict';

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _argparse = require('argparse');

var _argparse2 = _interopRequireDefault(_argparse);

var _nodeTweetStream = require('node-tweet-stream');

var _nodeTweetStream2 = _interopRequireDefault(_nodeTweetStream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Récupération de la config
var config = _jsYaml2.default.safeLoad(_fs2.default.readFileSync('config/config.yml', 'utf8'));

// Permet la ligne de commande npm run build argument.
var ArgParse = _argparse2.default.ArgumentParser;
var parser = new ArgParse({
    version: '0.0.1',
    addHelp: true,
    description: 'Used for create the request to twitter'
});

parser.addArgument(['-k', '--keyword'], {
    help: "The keyword to search for"
});

// Permet de récupéré le tableau d'argument
var args = parser.parseArgs();

var client = new _nodeTweetStream2.default({
    consumer_key: config.default.app.twitter.consumerKey,
    consumer_secret: config.default.app.twitter.consumerSecret,
    token: config.default.app.twitter.accessToken,
    token_secret: config.default.app.twitter.accessTokenSecret
});

var arrayMail = [];

client.on('tweet', function (tweet, error) {
    if (error) console.log(error);

    console.log(tweet.user.description);
    console.log(tweet.user.screen_name);
    console.log(tweet.user.followers_count);

    var promise = new Promise(function (resolve, reject) {
        var regex = /(?:(?:"[\w-\s]+")|(?:[\w-]+(?:\.[\w-]+)*)|(?:"[\w-\s]+")(?:[\w-]+(?:\.[\w-]+)*))(?:@(?:(?:[\w-]+\.)*\w[\w-]{0,66})\.(?:[a-z]{2,6}(?::\.[a-z]{2})?))|(?:@\[?(?:(?:25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?)/g;

        if (tweet.user.description != null && tweet.user.description.match(regex)) {
            var arrayTemp = tweet.user.description.match(regex);
            for (var i = 0; i < arrayTemp.length; i++) {
                arrayMail.push(arrayTemp[i]);
            }
        }

        resolve(arrayMail);
    });
    Promise.all([promise]).then(console.log(arrayMail)).catch(function (e) {
        return console.log(e);
    });
});

client.track(args.keyword);