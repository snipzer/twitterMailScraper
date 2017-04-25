'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _UserModel = require('./models/UserModel');

var _UserModel2 = _interopRequireDefault(_UserModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_mongoose2.default.Promise = global.Promise;

var MongooseConnector = function () {
    function MongooseConnector(ip, port, table) {
        _classCallCheck(this, MongooseConnector);

        this.ip = ip;
        this.port = port;
        this.table = table;
    }

    _createClass(MongooseConnector, [{
        key: 'run',
        value: function run() {
            var _this = this;

            var promiseMongoose = new Promise(function (resolve, reject) {
                _mongoose2.default.connect('mongodb://' + _this.ip + ':' + _this.port + '/' + _this.table, function (err) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve("Connected");
                });
            });
            return promiseMongoose;
        }
    }, {
        key: 'stealUser',
        value: function stealUser(twitter, argument) {
            twitter.on('tweet', function (tweet, error) {
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

            twitter.track(argument.keyword);
        }
    }]);

    return MongooseConnector;
}();

exports.default = MongooseConnector;