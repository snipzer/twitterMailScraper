'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _ScraperController = require('./controller/ScraperController');

var _ScraperController2 = _interopRequireDefault(_ScraperController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Server = function () {
    function Server() {
        _classCallCheck(this, Server);

        this._app = (0, _express2.default)();
        this._server = _http2.default.createServer(this._app);
        this._app.use(_express2.default.static(_path2.default.join(__dirname, '../public')));

        this._app.set('view engine', 'pug');
        this._app.set('views', _path2.default.join(__dirname, '../src/views'));
    }

    _createClass(Server, [{
        key: 'setPort',
        value: function setPort(port) {
            if (_underscore2.default.isEmpty(port)) {
                port = 3000;
            }

            this.port = port;
        }
    }, {
        key: '_initControllers',
        value: function _initControllers() {
            var scraperController = new _ScraperController2.default();

            this._app.get('/', scraperController.index);
        }
    }, {
        key: 'set',
        value: function set(variable, middleware) {
            this._app.set(variable, middleware);
        }
    }, {
        key: 'getSocket',
        value: function getSocket() {
            return this._app.get("io");
        }
    }, {
        key: 'run',
        value: function run() {
            var _this = this;

            this._initControllers();

            this._server.listen(this.port, function () {
                return console.log('Server listening on port ' + _this.port + '!');
            });
        }
    }]);

    return Server;
}();

exports.default = Server;