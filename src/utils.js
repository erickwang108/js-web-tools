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

export function isObject(value) {
  const type = typeof value;
  return type === 'function' || type === 'object' && !!value;
}

export function isWindows (opts = {}) {
  return process.platform !== 'win32' || opts.windows === true;
}

export const parseQuery = (search = '') => {
  if (search === '') {
    return null;
  }

  const decodeSearch = decodeURIComponent(search);
  const s = decodeSearch.substring(decodeSearch.indexOf('?'));
  const query = s.replace(/^\?/, '');

  return query.split('&').reduce((obj, v) => {
    const pair = v.split('=');

    /* istanbul ignore else */
    if (pair.length === 2) {
      const name = pair[0].replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
      const regex = new RegExp(`([\\\\?&]*)${name}=([^&#]*)`);
      const results = regex.exec(s);

      /* istanbul ignore else */
      if (results && results.length >= 3) {
        obj[name] = results[2].replace(/\+/g, ' ');
      }
    }

    return obj;
  }, {});
};

