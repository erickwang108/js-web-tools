import {
  addClass,
  hasClass,
  removeClass,
  toggleClass,
} from '../domElementClass';


function defineProperty(element, propName, value) {
  Object.defineProperty(element, propName, {
    value,
  });
}

describe('Element class tests', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="container">
        <div id="item-1" />
        <div id="item-2" class="abc-class test-class" />
      </div>
    `;
  });
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('hasClass should return true', () => {
    const element = document.getElementById('item-2');
    expect(hasClass(element, 'test-class')).toEqual(true);
    defineProperty(element, 'classList');
    expect(hasClass(element, 'test-class')).toEqual(true);
  });

  it('should add a class', () => {
    const element = document.getElementById('item-1');
    addClass(element, 'plus-class');
    expect(element.className.includes('plus-class')).toEqual(true);
  });

  it('should add a class properly when using a fallback path', () => {
    const element = document.getElementById('item-1');
    defineProperty(element, 'classList');
    addClass(element, 'new-class');
    expect(element.className.includes('new-class')).toEqual(true);
  });

  it('should add a class properly when className is not a string', () => {
    const element = document.getElementById('item-1');
    defineProperty(element, 'classList');
    defineProperty(element, 'className', { baseVal: 'base-class' });
    addClass(element, 'new-class');
    const eleAttrs = element.getAttribute('class');
    expect(eleAttrs.includes('new-class')).toEqual(true);
    expect(eleAttrs.includes('base-class')).toEqual(true);
  });

  it('should add a class properly when className is not a string and baseVal is not set', () => {
    const element = document.getElementById('item-1');
    defineProperty(element, 'classList');
    defineProperty(element, 'className', {});
    addClass(element, 'new-class');
    expect(element.getAttribute('class').includes('new-class')).toEqual(true);
  });

  it('should remove a class', () => {
    const element = document.getElementById('item-2');
    removeClass(element, 'test-class');
    expect(hasClass(element, 'test-class')).toEqual(false);
    expect(hasClass(element, 'abc-class')).toEqual(true);
  });

  it('should remove a class when className is a string', () => {
    const element = document.getElementById('item-2');
    defineProperty(element, 'classList');
    removeClass(element, 'test-class');
    expect(hasClass(element, 'test-class')).toEqual(false);
    expect(hasClass(element, 'abc-class')).toEqual(true);
  });

  it('should remove a class when className is not a string type', () => {
    const element = document.getElementById('item-2');
    defineProperty(element, 'classList');
    defineProperty(element, 'className', {});
    expect(hasClass(element, 'abc-class')).toEqual(false);
    removeClass(element, 'test-class');
    expect(element.getAttribute('class').includes('test-class')).toEqual(false);
  });

  it('should toggle a class', () => {
    const element = document.getElementById('item-2');
    toggleClass(element, 'test-class');
    expect(hasClass(element, 'test-class')).toEqual(false);
    toggleClass(element, 'test-class');
    expect(hasClass(element, 'test-class')).toEqual(true);
  });

  it('should toggle a class when element has no classList', () => {
    const element = document.getElementById('item-2');
    defineProperty(element, 'classList');
    toggleClass(element, 'new-class');
    expect(hasClass(element, 'new-class')).toEqual(true);
    toggleClass(element, 'new-class');
    expect(hasClass(element, 'new-class')).toEqual(false);
  });
});
