"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

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
        key: "run",
        value: function run() {
            var _this = this;

            var promiseMongoose = new Promise(function (resolve, reject) {
                _mongoose2.default.connect("mongodb://" + _this.ip + ":" + _this.port + "/" + _this.table, function (err) {
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
        key: "getUserModel",
        value: function getUserModel() {
            return this.userModel;
        }
    }]);

    return MongooseConnector;
}();

exports.default = MongooseConnector;