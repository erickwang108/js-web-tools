import { isValidPath, isInvalidPath } from './index';

describe('isInvalidPath', () => {
  it('should be invalid if the path is not a string', () => {
    expect(isInvalidPath()).toEqual(true);
    expect(isInvalidPath({})).toEqual(true);
    expect(isInvalidPath(null)).toEqual(true);
    expect(isInvalidPath([])).toEqual(true);
  });

  it('should be invalid if the path has invalid characters', () => {
    expect(isInvalidPath('<abc')).toEqual(true);
    expect(isInvalidPath('>abc')).toEqual(true);
    expect(isInvalidPath(':abc')).toEqual(true);
    expect(isInvalidPath('"abc')).toEqual(true);
    expect(isInvalidPath('|abc')).toEqual(true);
    expect(isInvalidPath('?abc')).toEqual(true);
    expect(isInvalidPath('*abc')).toEqual(true);
  });

  it('should be invalid if the path has slashes and options.file is true', () => {
    expect(isInvalidPath('foo/abc', { file: true })).toEqual(true);
    expect(isInvalidPath('foo\\abc', { file: true })).toEqual(true);
  });

  it('should not be invalid if path has valid characters', () => {
    expect(!isInvalidPath('.')).toEqual(true);
    expect(!isInvalidPath('abc')).toEqual(true);
    expect(!isInvalidPath('a\'bc')).toEqual(true);
    expect(!isInvalidPath('a\\bc')).toEqual(true);
    expect(!isInvalidPath('a/bc')).toEqual(true);
    expect(!isInvalidPath('!foo')).toEqual(true);
    expect(!isInvalidPath('^abc')).toEqual(true);
    expect(!isInvalidPath('[abc]')).toEqual(true);
    expect(!isInvalidPath('(a)')).toEqual(true);
    expect(!isInvalidPath('+abc')).toEqual(true);
    expect(!isInvalidPath('@abc')).toEqual(true);
    expect(!isInvalidPath('{a}bc')).toEqual(true);
    expect(!isInvalidPath('{a..b..c}')).toEqual(true);
  });

  it('coverage', () => {
    let longStr = '';
    for (let k = 0; k < 32767; k += 1) {
      longStr += 'a';
    }
    expect(isInvalidPath(longStr, { extended: true })).toEqual(true);

    expect(!isInvalidPath('/abc.')).toEqual(true);
  });
});

describe('isValidPath', () => {
  it('should be valid', () => {
    expect(isValidPath('/home/user/dir/file.txt')).toEqual(true);
  });
});
