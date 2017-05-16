"use strict";

var _parserConfig = require("./parser/parserConfig");

var _parserConfig2 = _interopRequireDefault(_parserConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pConfig = new _parserConfig2.default("src/config/config.sample.yml", "src/config/config.yml");

pConfig.setParam().writeConfig();