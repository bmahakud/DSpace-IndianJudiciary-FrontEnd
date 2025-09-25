export function cookies(params) {
  var cookies = ['_ga', '_gat', '_gid', '__utma', '__utmb', '__utmc', '__utmt', '__utmz'];

  if (params && params.ua) {
    cookies.push("_gat_gtag_".concat(params.ua), "_gat_".concat(params.ua));
  }

  return cookies;
}