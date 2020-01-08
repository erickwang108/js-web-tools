import { isWindow as getWindow } from '../utils/domUtils';
import { getOffset } from './position';

export function width(node, client) {
  const win = getWindow(node);
  /* istanbul ignore if */
  if (win) {
    return win.innerWidth;
  }

  /* istanbul ignore if */
  if (client) {
    return client.clientWidth;
  }

  return getOffset(node).width;
}


export function height(node, client) {
  const win = getWindow(node);
  /* istanbul ignore if */
  if (win) {
    return win.innerHeight;
  }

  /* istanbul ignore if */
  if (client) {
    return client.clientHeight;
  }

  return getOffset(node).height;
}
