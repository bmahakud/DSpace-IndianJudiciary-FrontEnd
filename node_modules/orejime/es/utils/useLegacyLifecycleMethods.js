import React from 'react';
export default function useLegacyLifecycleMethods() {
  var reactVersion = React.version.match(/(\d+)\.(\d+)*/);
  var major = reactVersion[1] * 1;
  var minor = reactVersion[2] * 1;
  return major <= 15 || major === 16 && minor <= 2;
}