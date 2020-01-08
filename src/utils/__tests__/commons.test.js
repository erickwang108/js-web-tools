import {
  isObject,
} from '../commons';

describe('common utils', () => {
  it('test isObject', () => {
    expect(isObject(() => {})).toEqual(true);
    expect(isObject(null)).toEqual(false);
    expect(isObject('str')).toEqual(false);
    expect(isObject([])).toEqual(true);
    expect(isObject(/^abc*/ig)).toEqual(true);
    expect(isObject(false)).toEqual(false);
  });
});
