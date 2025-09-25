import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import React from 'react';
import { getPurposes } from '../utils/config';
import Dialog from './dialog';
import ConsentNotice from './consent-notice';

var ConsentNoticeWrapper =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ConsentNoticeWrapper, _React$Component);

  function ConsentNoticeWrapper() {
    _classCallCheck(this, ConsentNoticeWrapper);

    return _possibleConstructorReturn(this, _getPrototypeOf(ConsentNoticeWrapper).apply(this, arguments));
  }

  _createClass(ConsentNoticeWrapper, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          isVisible = _this$props.isVisible,
          props = _objectWithoutProperties(_this$props, ["isVisible"]);

      if (!this.props.isMandatory && !isVisible) {
        return null;
      }

      var title = this.props.t(['consentNotice', 'title']);
      var ariaProp = title ? {
        aria: {
          'labelledby': 'orejime-notice-title'
        }
      } : {};

      if (this.props.isMandatory) {
        return React.createElement(Dialog, _extends({
          isOpen: isVisible
        }, ariaProp, {
          config: this.props.config,
          portalClassName: this.props.ns('NoticePortal'),
          overlayClassName: this.props.ns('NoticeOverlay'),
          className: this.props.ns('NoticeWrapper')
        }), React.createElement(ConsentNotice, props));
      }

      return React.createElement(ConsentNotice, props);
    }
  }]);

  return ConsentNoticeWrapper;
}(React.Component);

export { ConsentNoticeWrapper as default };