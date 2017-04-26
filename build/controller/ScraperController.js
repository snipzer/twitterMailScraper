'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _nodeTweetStream = require('node-tweet-stream');

var _nodeTweetStream2 = _interopRequireDefault(_nodeTweetStream);

var _parserIndex = require('../utils/parser/parserIndex');

var _parserIndex2 = _interopRequireDefault(_parserIndex);

var _MongooseConnector = require('../utils/bdd/MongooseConnector');

var _MongooseConnector2 = _interopRequireDefault(_MongooseConnector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScraperController = function () {
    function ScraperController() {
        _classCallCheck(this, ScraperController);
    }

    _createClass(ScraperController, [{
        key: 'index',
        value: function index(req, res) {
            //res.send(`Hello World`);
            res.render('scraperView');
        }
    }, {
        key: 'scraper',
        value: function scraper() {
            var _this = this;

            // Récupération des arguments
            var argument = new _parserIndex2.default().getArguments();

            // Récupération de la config
            var config = _jsYaml2.default.safeLoad(_fs2.default.readFileSync('src/config/config.yml', 'utf8'));

            var client = new _nodeTweetStream2.default({
                consumer_key: config.default.app.twitter.consumerKey,
                consumer_secret: config.default.app.twitter.consumerSecret,
                token: config.default.app.twitter.accessToken,
                token_secret: config.default.app.twitter.accessTokenSecret
            });

            var mongooseConnector = new _MongooseConnector2.default(config.default.db.host, config.default.db.port, config.default.db.database);

            mongooseConnector.run().then(function () {
                _this.stealUser(client, argument);
            });
        }
    }, {
        key: '_stealUser',
        value: function _stealUser(twitter, argument) {
            twitter.on('tweet', function (tweet, error) {
                if (error) console.log(error);

                console.log("================================\n");

                console.log('username: ' + tweet.user.screen_name + '\ndescription: ' + tweet.user.description + '\nfollowers: ' + tweet.user.followers_count + '\n');

                console.log("================================\n\n");

                var regex = /(?:(?:"[\w-\s]+")|(?:[\w-]+(?:\.[\w-]+)*)|(?:"[\w-\s]+")(?:[\w-]+(?:\.[\w-]+)*))(?:@(?:(?:[\w-]+\.)*\w[\w-]{0,66})\.(?:[a-z]{2,6}(?::\.[a-z]{2})?))|(?:@\[?(?:(?:25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?)/g;

                if (tweet.user.description != null && tweet.user.description.match(regex)) {
                    var userMail = tweet.user.description.match(regex);

                    UserModel.create({
                        username: tweet.user.screen_name,
                        email: userMail[0],
                        followers: tweet.user.followers_count
                    }).then(function () {
                        console.log('=========================>USER CREATED<=========================\n*username: ' + tweet.user.screen_name + '\n*description: ' + userMail[0] + '\n*followers: ' + tweet.user.followers_count + '\n');
                    }).catch(function (err) {
                        return console.log(err);
                    });
                }
            });

            twitter.track(argument.keyword);
        }
    }]);

    return ScraperController;
}();

exports.default = ScraperController;