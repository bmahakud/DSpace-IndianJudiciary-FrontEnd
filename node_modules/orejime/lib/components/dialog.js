"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var _reactModal = _interopRequireDefault(require("react-modal"));

var _useLegacyLifecycleMethods = _interopRequireDefault(require("../utils/useLegacyLifecycleMethods"));

var Dialog =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Dialog, _React$Component);

  function Dialog(props) {
    var _this;

    (0, _classCallCheck2.default)(this, Dialog);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Dialog).call(this));

    if (props.config.appElement) {
      _reactModal.default.setAppElement(props.config.appElement);
    }

    _this.scrollPosition = null; // handle lifecycle methods depending on react version for full support

    if ((0, _useLegacyLifecycleMethods.default)()) {
      _this.componentWillUpdate = _this.componentWillUpdateLifecycle;
    } else {
      _this.getSnapshotBeforeUpdate = _this.getSnapshotBeforeUpdateLifecycle;
    }

    return _this;
  } // for react <16.3 support - see constructor


  (0, _createClass2.default)(Dialog, [{
    key: "componentWillUpdateLifecycle",
    value: function componentWillUpdateLifecycle(nextProps) {
      var willOpen = nextProps.isOpen;

      if (willOpen && !this.props.isOpen) {
        this.scrollPosition = window.pageYOffset;
      }
    } // for react >= 16.3 support - see constructor

  }, {
    key: "getSnapshotBeforeUpdateLifecycle",
    value: function getSnapshotBeforeUpdateLifecycle(prevProps) {
      var isOpen = this.props.isOpen;

      if (isOpen && !prevProps.isOpen) {
        this.scrollPosition = window.pageYOffset;
      }

      return null;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this2 = this;

      var isOpen = this.props.isOpen;

      if (!isOpen && prevProps.isOpen && this.props.handleScrollPosition && this.scrollPosition !== null) {
        // the scroll position stuff is for iOS to work correctly when we want to prevent normal website
        // scrolling with the modal opened
        //
        // /!\ this requires specific CSS to work, example if `htmlOpenClassName = modal-open`:
        //
        // .modal-open {
        //   height: 100%;
        // }
        // .modal-open body {
        //   position: fixed;
        //   overflow: hidden;
        //   height: 100%;
        //   width: 100%;
        // }
        setTimeout(function () {
          //setTimeout because it seems there is a race condition of some sort without it… oh well
          window.scrollTo(window.pageXOffset, _this2.scrollPosition);
          _this2.scrollPosition = null;
        }, 0);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          appElement = _this$props.appElement,
          handleScrollPosition = _this$props.handleScrollPosition,
          config = _this$props.config,
          reactModalProps = (0, _objectWithoutProperties2.default)(_this$props, ["children", "appElement", "handleScrollPosition", "config"]);
      return _react.default.createElement(_reactModal.default, (0, _extends2.default)({
        parentSelector: function parentSelector() {
          return document.getElementById(config.elementID || 'orejime');
        },
        htmlOpenClassName: "orejimeHtml-WithModalOpen",
        bodyOpenClassName: "orejimeBody-WithModalOpen"
      }, reactModalProps), children);
    }
  }]);
  return Dialog;
}(_react.default.Component);

exports.default = Dialog;
Dialog.defaultProps = {
  handleScrollPosition: true
};