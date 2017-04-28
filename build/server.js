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

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _ScraperController = require('./controller/ScraperController');

var _ScraperController2 = _interopRequireDefault(_ScraperController);

var _scraper = require('./utils/scraper/scraper');

var _scraper2 = _interopRequireDefault(_scraper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Server = function () {
    function Server() {
        _classCallCheck(this, Server);

        this._app = (0, _express2.default)();
        this._server = _http2.default.createServer(this._app);

        this._app.use(_bodyParser2.default.urlencoded({
            extended: true
        }));

        this._app.use(_express2.default.static(_path2.default.join(__dirname, '../public')));

        this._app.set('view engine', 'twig');
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
            var _this = this;

            var scraperController = new _ScraperController2.default();

            this._app.get('/', scraperController.index);

            this._app.post('/scraper', function (request, response) {
                _this.scraper.track(request.body.argument);

                response.render('scraperView.twig', { arguments: _this.scraper.arguments });
            });
        }
    }, {
        key: 'setSocket',
        value: function setSocket(variable, middleware) {
            this._app.set(variable, middleware);
        }
    }, {
        key: 'getSocket',
        value: function getSocket() {
            return this._app.get("io");
        }
    }, {
        key: 'setScraper',
        value: function setScraper(pathToConfig) {
            this.scraper = new _scraper2.default(pathToConfig, this.getSocket());
        }
    }, {
        key: 'run',
        value: function run() {
            var _this2 = this;

            this._initControllers();

            this._server.listen(this.port, function () {
                return console.log('Server listening on port ' + _this2.port + '!');
            });
        }
    }]);

    return Server;
}();

exports.default = Server;