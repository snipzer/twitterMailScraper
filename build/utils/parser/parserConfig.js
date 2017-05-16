'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _argparse = require('argparse');

var _argparse2 = _interopRequireDefault(_argparse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var parserConfig = function () {
    function parserConfig(pathToConfigSample, pathToConfig) {
        _classCallCheck(this, parserConfig);

        this.pathToConfigSample = pathToConfigSample;
        this.pathToConfig = pathToConfig;
        this.parser = new _argparse2.default.ArgumentParser({
            version: '0.0.1',
            addHelp: true,
            description: 'Used for create the config file'
        });

        this.parser.addArgument(['-c', '--credential'], {
            help: "Argument are: accessToken,accessTokenSecret,consumerKey,consumerSecure, host, port, database"
        });
    }

    _createClass(parserConfig, [{
        key: 'setParam',
        value: function setParam() {
            var args = this.parser.parseArgs();

            var argArray = args.credential.split(",");

            this.accessToken = argArray[0];
            this.accessTokenSecret = argArray[1];
            this.consumerKey = argArray[2];
            this.consumerSecret = argArray[3];
            this.host = argArray[4];
            this.port = argArray[5];
            this.database = argArray[6];

            return this;
        }
    }, {
        key: 'writeConfig',
        value: function writeConfig() {
            var _this = this;

            try {
                _fs2.default.readFile(this.pathToConfigSample, 'utf8', function (err, data) {
                    if (err) return console.log(err);

                    var result = data.replace(/ACCESS_TOKEN_SECRET/g, _this.accessTokenSecret).replace(/ACCESS_TOKEN/g, _this.accessToken).replace(/CONSUMER_SECRET/g, _this.consumerSecret).replace(/IP_ADRESSE/g, _this.host).replace(/PORT/g, _this.port).replace(/DATABASE_NAME/g, _this.database).replace(/CONSUMER_KEY/g, _this.consumerKey);

                    var promise = new Promise(function (resolve, reject) {
                        _fs2.default.writeFile(_this.pathToConfig, result, 'utf8', function (err) {
                            if (err) return console.log(err);
                            resolve();
                        });
                    });

                    Promise.all([promise]).then(console.log("Config file successfully write"));
                });
            } catch (e) {
                console.log(e);
            }
        }
    }]);

    return parserConfig;
}();

exports.default = parserConfig;