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

var ParserIndex = function () {
    function ParserIndex() {
        _classCallCheck(this, ParserIndex);

        this.parser = new _argparse2.default.ArgumentParser({
            version: '0.0.1',
            addHelp: true,
            description: 'Used for create the request to twitter'
        });

        this.parser.addArgument(['-k', '--keyword'], {
            help: "The keyword to search for"
        });
        this.args = this.parser.parseArgs();
    }

    _createClass(ParserIndex, [{
        key: 'getArguments',
        value: function getArguments() {
            return this.args;
        }
    }]);

    return ParserIndex;
}();

exports.default = ParserIndex;