'use strict';

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = new _server2.default();
var socket = (0, _socket2.default)(server._server);

server.setSocket("io", socket);
server.setPort();

server.setScraper(_path2.default.join(__dirname, "../src/config/config.yml"));

server.getSocket().on("toto", function () {
  return console.log("toto is here");
});

server.run();