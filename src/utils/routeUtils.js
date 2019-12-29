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
