import { toNumber } from './utils';
import style from './domElementStyle';
import { contains } from './domElement';
import { height } from './domElementSize';
import {
  isWindow,
  isDocument,
  ownerDocument,
} from './domUtils';

function isHTML(node) {
  return node && node.nodeName && node.nodeName.toLowerCase() === 'html';
}

function getScrollAccessor(offset) {
  const prop = offset === 'pageXOffset' ? 'scrollLeft' : 'scrollTop';

  return (node, val) => {
    const win = isWindow(node);

    /* istanbul ignore else */
    if (typeof val === 'undefined') {
      return win ? win[offset] : node[prop];
    }

    /* istanbul ignore next */
    if (win) {
      win.scrollTo(win[offset], val);
    } else {
      node[prop] = val;
    }
  };
}

function isHTMLElement(element) {
  return !!element && 'offsetParent' in element;
}

export const scrollLeft = getScrollAccessor('pageXOffset');
export const scrollTop = getScrollAccessor('pageYOffset');

// https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent
export function offsetParent(node) {
  const doc = ownerDocument(node);
  let parent = node && node.offsetParent;

  while (
    isHTMLElement(parent) &&
    !isHTML(parent) &&
    style(parent, 'position') === 'static'
  ) {
    parent = parent.offsetParent;
  }

  return (parent || doc.documentElement);
}

export function getOffset(node) {
  const doc = ownerDocument(node);

  let box = { top: 0, left: 0, height: 0, width: 0 };
  const docElem = doc && doc.documentElement;

  if (!docElem || !contains(docElem, node)) {
    return box;
  }

  /* istanbul ignore else */
  if (typeof node.getBoundingClientRect !== 'undefined') {
    box = node.getBoundingClientRect();
  }

  box = {
    top: box.top + scrollTop(node) - (docElem.clientTop || 0),
    left: box.left + scrollLeft(node) - (docElem.clientLeft || 0),
    width: box.width,
    height: box.height,
  };

  return box;
}

export function scrollPrarent(element, firstPossible) {
  const position = style(element, 'position');
  const excludeStatic = position === 'absolute';
  const ownerDoc = element.ownerDocument;

  const defVal = ownerDoc || document;

  /* istanbul ignore else */
  if (position === 'fixed') {
    return defVal;
  }

  while ((element = element.parentNode) && !isDocument(element)) {
    const isStatic = excludeStatic && style(element, 'position') === 'static';
    const eleStyle =
      (style(element, 'overflow') || '') +
      (style(element, 'overflow-y') || '') +
      style(element, 'overflow-x');

    if (isStatic) {
      continue;
    }

    /* istanbul ignore else */
    if (
      /(auto|scroll)/.test(eleStyle) &&
      (firstPossible || height(element) < element.scrollHeight)
    ) {
      return element;
    }
  }

  return defVal;
}

export function position(node, parentNode) {
  let parentOffset = { top: 0, left: 0 };
  let offset;

  if (style(node, 'position') === 'fixed') {
    offset = node.getBoundingClientRect();
  } else {
    const parent = parentNode || offsetParent(node);
    offset = getOffset(node);

    /* istanbul ignore else */
    if (!isHTML(parent)) {
      parentOffset = getOffset(parent);
    }

    const borderTop = toNumber(style(parent, 'borderTopWidth'));
    parentOffset.top += borderTop - scrollTop(parent) || 0;

    const borderLeft = toNumber(style(parent, 'borderLeftWidth'));
    parentOffset.left += borderLeft - scrollLeft(parent) || 0;
  }

  const marginTop = toNumber(style(node, 'marginTop'));
  const marginLeft = toNumber(style(node, 'marginLeft'));

  return {
    ...offset,
    top: offset.top - parentOffset.top - marginTop,
    left: offset.left - parentOffset.left - marginLeft,
  };
}
