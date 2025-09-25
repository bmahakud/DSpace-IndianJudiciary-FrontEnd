import React from 'react';
export var Close = function Close(_ref) {
  var t = _ref.t,
      ns = _ref.ns;
  return React.createElement("svg", {
    role: "img",
    className: ns('CloseIcon'),
    "aria-label": t(['close']),
    width: "12",
    height: "12",
    viewport: "0 0 12 12",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg"
  }, React.createElement("title", null, t(['close'])), React.createElement("line", {
    x1: "1",
    y1: "11",
    x2: "11",
    y2: "1",
    strokeWidth: "1"
  }), React.createElement("line", {
    x1: "1",
    y1: "1",
    x2: "11",
    y2: "11",
    strokeWidth: "1"
  }));
};