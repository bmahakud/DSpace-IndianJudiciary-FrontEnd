export function createCssNamespace(namespace) {
  return function ns(classNames) {
    var splitClassNames = classNames.split(' ');
    return splitClassNames.filter(function (className) {
      return className.length > 0;
    }).map(function (className) {
      return "".concat(namespace, "-").concat(className);
    }).join(' ');
  };
}