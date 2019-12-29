export function hasClass (ele, className) {
  /* istanbul ignore else */
  if (ele.classList) {
    return !!className && ele.classList.contains(className);
  }

  return (
    ` ${ele.className || ele.className.baseVal} `.indexOf(
      ` ${className} `
    ) !== -1
  );
}

export function addClass (element, className) {
  /* istanbul ignore else */
  if (element.classList) {
    element.classList.add(className);
    return;
  }

  /* istanbul ignore else */
  if (!hasClass(element, className)) {
    if (typeof element.className === 'string') {
      element.className = `${element.className} ${className}`;
    } else {
      element.setAttribute(
        'class',
        `${(element.className && element.className.baseVal) || ''} ${className}`
      );
    }
  }
}

function replaceClassName (origClass, classToRemove) {
  return origClass
    .replace(new RegExp(`(^|\\s)${classToRemove}(?:\\s|$)`, 'g'), '$1')
    .replace(/\s+/g, ' ')
    .replace(/^\s*|\s*$/g, '');
}

export function removeClass (element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else if (typeof element.className === 'string') {
    element.className = replaceClassName(element.className, className);
  } else {
    element.setAttribute(
      'class',
      replaceClassName(
        (element.className && element.className.baseVal) || '',
        className
      )
    );
  }
}

export function toggleClass (element, className) {
  if (element.classList) {
    element.classList.toggle(className);
  } else if (hasClass(element, className)) {
    removeClass(element, className);
  } else {
    addClass(element, className);
  }
}
