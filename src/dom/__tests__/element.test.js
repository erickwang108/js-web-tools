import {
  closest,
  contains,
  getActiveElement,
  querySelectorAll,
} from '../element';
import { hasClass } from '../elementClass';

describe('Closest tests', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul id="one" class="level-1">
        <li class="item-i">I</li>
        <li id="ii" class="item-ii">II
          <ul class="level-2">
            <li class="item-a">A</li>
            <li class="item-b">B
              <ul class="level-3">
                <li class="item-1">1</li>
                <li class="item-2">2</li>
                <li class="item-3">3</li>
              </ul>
            </li>
            <li class="item-c">C</li>
          </ul>
        </li>
        <li class="item-iii">III</li>
      </ul>
    `;
  });
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('get null target', () => {
    const element = document.getElementById('one');
    const notExistNode = document.getElementById('ii');
    const target = closest(element, 'div', notExistNode);
    expect(target).toEqual(null);
  });

  it('get closest element', () => {
    const [element] = document.getElementsByClassName('item-a');
    expect(element).toBeDefined();
    const target = closest(element, 'ul');
    expect(hasClass(target, 'level-2')).toEqual(true);
  });

  it('stop to find closest element when set target node', () => {
    const [element] = document.getElementsByClassName('item-b');
    const [stopNode] = document.getElementsByClassName('level-3');
    const target = closest(element, 'ul', stopNode);
    expect(hasClass(target, 'level-2')).toEqual(true);
  });
});

describe('Contains tests', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id='item-1'>
        <div id='item-2'>
          <span id='item-3'>Item 1<span>
          <span id='sibling-1'>Item 2<span>
          <span id='sibling-2'>Item 3<span>
          <span id='sibling-3'>Item 4<span>
        </div>
        <div id="item-4" />
      </div>
    `;
  });
  afterEach(() => {
    const element = document.getElementById('item-1');
    element.parentNode.removeChild(element);
  });

  it('should check for contained element', () => {
    const child = document.getElementById('item-3');
    const parent = document.getElementById('item-1');

    expect(contains(parent, child)).toEqual(true);
    expect(contains(child, parent)).toEqual(false);
  });

  it('should handle orphaned elements', () => {
    const orphan = document.createElement('div');
    expect(contains(document.body, orphan)).toEqual(false);
  });

  it('should use compareDocumentPosition to compare elements', () => {
    const sibling2 = document.getElementById('item-2');
    const sibling4 = document.getElementById('item-4');
    sibling2.contains = null;
    expect(contains(sibling2, sibling4)).toEqual(false);
  });
});

describe('Query active element tests', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="container">
        <input id="text-input" type="text" />
      </div>
    `;
  });
  afterEach(() => {
    const element = document.getElementById('container');
    element.parentNode.removeChild(element);
  });

  it('should document body is active', () => {
    const activeElement = getActiveElement();
    expect(activeElement).toEqual(document.body);
  });

  it('should return null when node has no activeElement or name', () => {
    const container = document.getElementById('container');
    const activeElement = getActiveElement(container);
    container.activeElement = null;
    expect(activeElement).toEqual(null);
  });

  it('should document body is active', () => {
    document.getElementById('text-input').focus();
    const activeElement = getActiveElement();
    expect(activeElement).toEqual(document.getElementById('text-input'));
  });
});

describe('Query select all', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="container">
        <span id="textID">Text</span>
      </div>
    `;
  });
  afterEach(() => {
    const element = document.getElementById('container');
    element.parentNode.removeChild(element);
  });

  it('should document body is active', () => {
    const container = document.getElementById('container');
    const [target] = querySelectorAll(container, '#textID');
    expect(target).toEqual(document.getElementById('textID'));
  });
});

