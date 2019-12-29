export function isString(src) {
  return src && (typeof src === 'string' || (src instanceof String));
}

export function trim(src) {
  if (isString(src)) {
    /* istanbul ignore else */
    if (src.trim) {
      return src.trim();
    }

    return src.replace(/(^\s*)|(\s*$)/g, '');
  }

  return src;
}

export function toNumber(val) {
  if (typeof val === 'number' || (val instanceof Number)) {
    return val;
  }

  if (typeof val === 'string') {
    return parseInt(val, 10) || 0;
  }

  return 0;
}
