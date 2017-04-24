'use strict';

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _argparse = require('argparse');

var _argparse2 = _interopRequireDefault(_argparse);

var _twitter = require('twitter');

var _twitter2 = _interopRequireDefault(_twitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = _jsYaml2.default.safeLoad(_fs2.default.readFileSync('config/config.yml', 'utf8'));

// console.log(config.default.app.twitter.accessToken);
// console.log(config.default.app.twitter.accessTokenSecret);
// console.log(config.default.app.twitter.consumerKey);
// console.log(config.default.app.twitter.consumerSecret);

var ArgParse = _argparse2.default.ArgumentParser;

var parser = new ArgParse({
    version: '0.0.1',
    addHelp: true,
    description: 'Used for create the request to twitter'
});

parser.addArgument(['-k', '--keyword'], {
    help: "The keyword to search for"
});

var args = parser.parseArgs();

var client = new _twitter2.default({
    consumer_key: config.default.app.twitter.consumerKey,
    consumer_secret: config.default.app.twitter.consumerSecret,
    access_token_key: config.default.app.twitter.accessToken,
    access_token_secret: config.default.app.twitter.accessTokenSecret
});

var arrayMail = [];

client.get('search/tweets', { q: args.keyword }, function (error, tweets, response) {
    if (error) console.log(error);

    // console.log(tweets.statuses);
    var promise = new Promise(function (resolve, reject) {

        tweets.statuses.forEach(function (item) {
            console.log(item.user.description);
            var regex = /(?:(?:"[\w-\s]+")|(?:[\w-]+(?:\.[\w-]+)*)|(?:"[\w-\s]+")(?:[\w-]+(?:\.[\w-]+)*))(?:@(?:(?:[\w-]+\.)*\w[\w-]{0,66})\.(?:[a-z]{2,6}(?::\.[a-z]{2})?))|(?:@\[?(?:(?:25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?)/g;

            if (item.user.description.match(regex)) {
                var toto = item.user.description.match(regex);
                for (var i = 0; i < toto.length; i++) {
                    arrayMail.push(toto[i]);
                }
            }
        });
        resolve(arrayMail);
    });
    Promise.all([promise]).then(console.log(arrayMail));
});