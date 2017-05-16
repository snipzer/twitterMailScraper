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
            res.render('scraperView');
        }
    }]);

    return ScraperController;
}();

exports.default = ScraperController;