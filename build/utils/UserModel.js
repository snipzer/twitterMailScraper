'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _mongoose2.default.Schema({
    username: String,
    email: String,
    followers: String
});

module.exports = _mongoose2.default.model('UserModel', User);