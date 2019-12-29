import {
  isString,
  trim,
  toNumber,
} from '../stringUtils';

describe('Stirng Utils', () => {
  describe('isString', () => {
    it('should get true if source is string type', () => {
      expect(isString('hello')).toEqual(true);
      expect(isString(new String('hello'))).toEqual(true);
    });

    it('should get false if source is not string type', () => {
      expect(isString('hello')).toEqual(true);
      expect(isString(new String('hello'))).toEqual(true);
    });
  });

  describe('trim string blanks', () => {
    it('should trim string blanks', () => {
      expect(trim(' hello ')).toEqual('hello');
    });

    it('should trim string blanks', () => {
      const str = new String(' hello ');
      expect(trim(str)).toEqual('hello');
    });

    it('should get source when no blanks to trim', () => {
      expect(trim('hello')).toEqual('hello');
    });

    it('should get source when source type is not string type', () => {
      expect(trim(123)).toEqual(123);
      expect(trim(true)).toEqual(true);
      expect(trim(false)).toEqual(false);
      expect(trim(['hello'])).toMatchObject(['hello']);
    });

    it('should use Regexp to trim blanks', () => {
      const str = new String(' blanks    ');
      Object.defineProperty(str, 'trim', {
        value: null,
      });
      expect(trim(str)).toEqual('blanks');
    });
  });

  describe('toNumber', () => {
    it('should get number', () => {
      expect(toNumber('12px')).toEqual(12);
      expect(toNumber(24)).toEqual(24);
    });

    it('should get number 0 when source type is not string or number', () => {
      expect(toNumber(true)).toEqual(0);
      expect(toNumber({})).toEqual(0);
      expect(toNumber([])).toEqual(0);
      expect(toNumber('abc90')).toEqual(0);
    });
  });
});
