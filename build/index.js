'use strict';

var _jsYaml = require('js-yaml');

var _jsYaml2 = _interopRequireDefault(_jsYaml);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _nodeTweetStream = require('node-tweet-stream');

var _nodeTweetStream2 = _interopRequireDefault(_nodeTweetStream);

var _MongooseConnector = require('./utils/bdd/MongooseConnector');

var _MongooseConnector2 = _interopRequireDefault(_MongooseConnector);

var _parserIndex = require('./utils/parser/parserIndex');

var _parserIndex2 = _interopRequireDefault(_parserIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Récupération des arguments
var argument = new _parserIndex2.default().getArguments();

// Récupération de la config
var config = _jsYaml2.default.safeLoad(_fs2.default.readFileSync('src/config/config.yml', 'utf8'));

var client = new _nodeTweetStream2.default({
    consumer_key: config.default.app.twitter.consumerKey,
    consumer_secret: config.default.app.twitter.consumerSecret,
    token: config.default.app.twitter.accessToken,
    token_secret: config.default.app.twitter.accessTokenSecret
});

var mongooseConnector = new _MongooseConnector2.default(config.default.db.host, config.default.db.port, config.default.db.database);

mongooseConnector.run().then(function () {
    mongooseConnector.stealUser(client, argument);
});