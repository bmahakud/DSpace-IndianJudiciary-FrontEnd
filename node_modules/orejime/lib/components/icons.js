"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Close = void 0;

var _react = _interopRequireDefault(require("react"));

var Close = function Close(_ref) {
  var t = _ref.t,
      ns = _ref.ns;
  return _react.default.createElement("svg", {
    role: "img",
    className: ns('CloseIcon'),
    "aria-label": t(['close']),
    width: "12",
    height: "12",
    viewport: "0 0 12 12",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg"
  }, _react.default.createElement("title", null, t(['close'])), _react.default.createElement("line", {
    x1: "1",
    y1: "11",
    x2: "11",
    y2: "1",
    strokeWidth: "1"
  }), _react.default.createElement("line", {
    x1: "1",
    y1: "1",
    x2: "11",
    y2: "11",
    strokeWidth: "1"
  }));
};

exports.Close = Close;