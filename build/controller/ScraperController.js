"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScraperController = function () {
    function ScraperController() {
        _classCallCheck(this, ScraperController);
    }

    _createClass(ScraperController, [{
        key: "index",
        value: function index(req, res) {
            res.send("Hello World");
            // res.render('user/index', {
            //     name: req.params.username,
            //     title: 'Mon titre de page'
            // });
        }
    }]);

    return ScraperController;
}();

exports.default = ScraperController;