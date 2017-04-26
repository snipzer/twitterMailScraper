'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _nodeTweetStream = require('node-tweet-stream');

var _nodeTweetStream2 = _interopRequireDefault(_nodeTweetStream);

var _MongooseConnector = require('../bdd/MongooseConnector');

var _MongooseConnector2 = _interopRequireDefault(_MongooseConnector);

var _UserModel = require('../bdd/models/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scraper = function () {
    function Scraper(pathToConfig, socket) {
        _classCallCheck(this, Scraper);

        console.log(socket);
        this.config = _jsYaml2.default.safeLoad(_fs2.default.readFileSync(pathToConfig, 'utf8'));
        this.socket = socket;

        this.consumerKey = this.config.default.app.twitter.consumerKey;
        this.consumerSecret = this.config.default.app.twitter.consumerSecret;
        this.accessToken = this.config.default.app.twitter.accessToken;
        this.accessTokenSecret = this.config.default.app.twitter.accessTokenSecret;

        this.host = this.config.default.db.host;
        this.port = this.config.default.db.port;
        this.database = this.config.default.db.database;

        this.client = new _nodeTweetStream2.default({
            consumer_key: this.consumerKey,
            consumer_secret: this.consumerSecret,
            token: this.accessToken,
            token_secret: this.accessTokenSecret
        });
    }

    _createClass(Scraper, [{
        key: 'run',
        value: function run(argument) {
            var _this = this;

            var mongooseConnector = new _MongooseConnector2.default(this.host, this.port, this.database);

            mongooseConnector.run().then(function () {
                _this._stealUser(_this.client, argument);
            });
        }
    }, {
        key: '_stealUser',
        value: function _stealUser(twitter, argument) {
            var socket = this.socket;

            twitter.on('tweet', function (tweet, error) {
                var _this2 = this;

                if (error) console.log(error);

                //console.log(`username: ${ tweet.user.screen_name }\ndescription: ${ tweet.user.description }\nfollowers: ${ tweet.user.followers_count }\n`);


                var regex = /(?:(?:"[\w-\s]+")|(?:[\w-]+(?:\.[\w-]+)*)|(?:"[\w-\s]+")(?:[\w-]+(?:\.[\w-]+)*))(?:@(?:(?:[\w-]+\.)*\w[\w-]{0,66})\.(?:[a-z]{2,6}(?::\.[a-z]{2})?))|(?:@\[?(?:(?:25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))(?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?)/g;

                if (tweet.user.description != null && tweet.user.description.match(regex)) {
                    var userMail = tweet.user.description.match(regex);

                    _UserModel2.default.create({
                        username: tweet.user.screen_name,
                        email: userMail[0],
                        followers: tweet.user.followers_count
                    }).then(function () {
                        console.log(_this2.socket);
                        console.log("================================\n");
                        console.log("================================\n\n");

                        socket.emit("toto");
                    }).catch(function (err) {
                        return console.log(err);
                    });
                }
            });

            twitter.track(argument);
        }
    }]);

    return Scraper;
}();

exports.default = Scraper;