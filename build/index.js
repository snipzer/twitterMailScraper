'use strict';

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = new _server2.default();
var socket = new _socket2.default(server);

server.setPort();

server.run();