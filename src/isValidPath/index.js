import path from 'path';

import { isWindows } from '../utils';

export function isInvalidPath (fp, options = {}) {
  /* istanbul ignore else */
  if (fp === '' || typeof fp !== 'string') {
    return true;
  }

  /* istanbul ignore if */
  if (!isWindows(options)) {
    return true;
  }

  const MAX_PATH = options.extended ? 32767 : 260;
  if (typeof fp !== 'string' || fp.length > (MAX_PATH - 12)) {
    return true;
  }

  const { root: rootPath } = path.parse(fp);
  if (rootPath) {
    fp = fp.slice(rootPath.length);
  }

  if (options.file) {
    return /[<>:"/\\|?*]/.test(fp);
  }

  return /[<>:"|?*]/.test(fp);
}

export function isValidPath (fp, options) {
  return !isInvalidPath(fp, options);
}

export default isValidPath;
