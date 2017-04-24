'use strict';

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = _jsYaml2.default.safeLoad(_fs2.default.readFileSync('config/config.yml', 'utf8'));

console.log(config.default.app.twitter.accessToken);
console.log(config.default.app.twitter.accessTokenSecret);
console.log(config.default.app.twitter.consumerKey);
console.log(config.default.app.twitter.consumerSecret);