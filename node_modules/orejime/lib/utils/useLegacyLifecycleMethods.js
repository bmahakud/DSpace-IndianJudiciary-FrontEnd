"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useLegacyLifecycleMethods;

var _react = _interopRequireDefault(require("react"));

function useLegacyLifecycleMethods() {
  var reactVersion = _react.default.version.match(/(\d+)\.(\d+)*/);

  var major = reactVersion[1] * 1;
  var minor = reactVersion[2] * 1;
  return major <= 15 || major === 16 && minor <= 2;
}