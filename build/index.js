'use strict';

var _configYml = require('config-yml');

var _configYml2 = _interopRequireDefault(_configYml);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_configYml2.default.default.app.twitter.accessToken); //const config = require('config-yml');

console.log(_configYml2.default.default.app.twitter.accessTokenSecret);
console.log(_configYml2.default.default.app.twitter.consumerKey);
console.log(_configYml2.default.default.app.twitter.consumerSecret);