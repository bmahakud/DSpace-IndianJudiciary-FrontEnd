"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _google = require("./helpers/google");

function _default(params) {
  return {
    name: 'google-analytics',
    title: 'Google Analytics',
    purposes: ['analytics'],
    cookies: (0, _google.cookies)(params)
  };
}