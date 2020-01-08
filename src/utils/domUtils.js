import { isObject } from './commons';

export function isDocument (element) {
  return 'nodeType' in element && element.nodeType === document.DOCUMENT_NODE;
}

export function isWindow (node) {
  if ('window' in node && node.window === node) {
    return node;
  }

  if (isDocument(node)) {
    return node.defaultView || false;
  }

  return false;
}

export function getWindow (node) {
  return isWindow(node);
}

export function canUseDOM () {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
}

export function ownerDocument (node) {
  return (node && node.ownerDocument) || document;
}

export function ownerWindow (node) {
  const doc = ownerDocument(node);
  return (doc && doc.defaultView) || window;
}

const SUPPORTED_TRANSFORMS = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i;
export function isTransform (value) {
  return !!(value && SUPPORTED_TRANSFORMS.test(value));
}

export function getComputedStyle(node, psuedoElement) {
  return ownerWindow(node).getComputedStyle(node, psuedoElement);
}

export function isDOMNode(obj) {
  return isObject(obj) && obj.nodeType > 0;
}
