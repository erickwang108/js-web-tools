import {
  parseQuery,
} from '../routeUtils';

describe('routeUtils', () => {
  it('should get null is search is undefined or empty string', () => {
    expect(parseQuery()).toEqual(null);
    expect(parseQuery('')).toEqual(null);
  });

  it('should get query object', () => {
    expect(parseQuery('http://www.mydomain.com/subPath?a=av&b=bv&c=123')).toMatchObject({
      a: 'av',
      b: 'bv',
      c: '123',
    });
  });

  it('should not get query object exclude property', () => {
    const query = parseQuery('http://www.mydomain.com/subPath?a=&b=bv&c');
    expect(query.c).toEqual(undefined);
  });
});
