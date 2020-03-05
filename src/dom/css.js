import {
  isTransform,
  getComputedStyle,
} from '../utils/domUtils';

function hyphenate (s) {
  const str = s.replace(/([A-Z])/g, '-$1').toLowerCase();
  return str.replace(/^ms-/, '-ms-');
}

export function convertStyle(styleObj) {
  let style = '';

  for (var prop in styleObj) {
    /* istanbul ignore else */
    if (Object.prototype.hasOwnProperty.call(styleObj, prop)) {
      style += (prop + ':' + styleObj[prop] + ';');
    }
  }

  return style;
}

export function css(ele, prop) {
  /* istanbul ignore else */
  if (typeof prop === 'string') {
    return (
      ele.style.getPropertyValue(hyphenate(prop)) ||
      getComputedStyle(ele).getPropertyValue(hyphenate(prop))
    );
  }

  let resCss = '';
  let transforms = '';

  Object.keys(prop).forEach((key) => {
    const value = prop[key];
    if (!value && value !== 0) {
      ele.style.removeProperty(hyphenate(key));
    } else if (isTransform(key)) {
      transforms += `${key}(${value}) `;
    } else {
      resCss += `${hyphenate(key)}: ${value};`;
    }
  });

  /* istanbul ignore else */
  if (transforms) {
    resCss += `transform: ${transforms};`;
  }

  const { cssText } = ele.style;
  if (cssText) {
    /* istanbul ignore else */
    if (/;$/.test(cssText)) {
      ele.style.cssText += `${resCss}`;
    } else {
      ele.style.cssText += `;${resCss}`;
    }
  } else {
    ele.style.cssText = `${resCss}`;
  }
}

export default css;
