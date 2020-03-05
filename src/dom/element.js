import { ownerDocument } from '../utils/domUtils';

let matchesImpl = null;
function matches(node, selector) {
  if (!matchesImpl) {
    const body = document.body;
    /* istanbul ignore next */
    const nativeMatch =
      body.matches ||
      body.matchesSelector ||
      body.webkitMatchesSelector ||
      body.mozMatchesSelector ||
      body.msMatchesSelector;

    matchesImpl = (n, s) => nativeMatch.call(n, s);
  }

  return matchesImpl(node, selector);
}

export function closest(node, selector, stopAt) {
  if (node.closest && !stopAt) {
    return node.closest(selector);
  }

  let nextNode = node;
  do {
    if (matches(nextNode, selector)) {
      return nextNode;
    }

    nextNode = nextNode.parentElement;
  } while (
    nextNode &&
    nextNode !== stopAt &&
    nextNode.nodeType === document.ELEMENT_NODE
  );

  return null;
}

export function contains(context, node) {
  /* istanbul ignore else */
  if (context.contains) {
    return context.contains(node);
  }

  /* istanbul ignore else */
  if (context.compareDocumentPosition) {
    return context === node || !!(context.compareDocumentPosition(node) & 16);
  }
}

export function getActiveElement(doc = ownerDocument()) {
  try {
    const active = doc.activeElement;
    /* istanbul ignore else */
    if (!active || !active.nodeName) {
      return null;
    }

    return active;
  } catch (e) {// TODO: How to test this codes coverage?
    /* istanbul ignore next */
    return doc.body;
  }
}

const toArray = Function.prototype.bind.call(Function.prototype.call, [].slice);
export function querySelectorAll(element, selector) {
  return toArray(element.querySelectorAll(selector));
}
