'use strict';

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _argparse = require('argparse');

var _argparse2 = _interopRequireDefault(_argparse);

var _nodeTweetStream = require('node-tweet-stream');

var _nodeTweetStream2 = _interopRequireDefault(_nodeTweetStream);

var _dbWriter = require('./utils/dbWriter');

var _dbWriter2 = _interopRequireDefault(_dbWriter);

var _UserModel = require('./utils/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

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

var arrayUser = [];
// Permet de récupéré le tableau d'argument
var args = parser.parseArgs();

var client = new _nodeTweetStream2.default({
    consumer_key: config.default.app.twitter.consumerKey,
    consumer_secret: config.default.app.twitter.consumerSecret,
    token: config.default.app.twitter.accessToken,
    token_secret: config.default.app.twitter.accessTokenSecret
});

var mongooseConnector = new _dbWriter2.default(config.default.db.host, config.default.db.port, config.default.db.database);

mongooseConnector.run().then(function () {
    client.on('tweet', function (tweet, error) {
        if (error) console.log(error);

        console.log("================================\n");

        console.log('username: ' + tweet.user.screen_name + '\ndescription: ' + tweet.user.description + '\nfollowers: ' + tweet.user.followers_count + '\n');

        console.log("================================\n\n");

        var regex = /(?:(?:"[\w-\s]+")|(?:[\w-]+(?:\.[\w-]+)*)|(?:"[\w-\s]+")(?:[\w-]+(?:\.[\w-]+)*))(?:@(?:(?:[\w-]+\.)*\w[\w-]{0,66})\.(?:[a-z]{2,6}(?::\.[a-z]{2})?))|(?:@\[?(?:(?:25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?)/g;

        if (tweet.user.description != null && tweet.user.description.match(regex)) {
            var userMail = tweet.user.description.match(regex);

            _UserModel2.default.create({
                username: tweet.user.screen_name,
                email: userMail[0],
                followers: tweet.user.followers_count
            }).then(function () {
                return console.log('=========================>USER CREATED<=========================\n*username: ' + tweet.user.screen_name + '\n*description: ' + userMail[0] + '\n*followers: ' + tweet.user.followers_count + '\n');
            }).catch(function (err) {
                return console.log(err);
            });
        }
    });

    client.track(args.keyword);
});