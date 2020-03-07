import {
  scrollLeft,
  getOffset,
  offsetParent,
  scrollPrarent,
  position,
} from '../domElementPosition';
import css from '../domElementStyle';

function createMockElement(width, height, top = 0, left = 0) {
  const newEle = document.createElement("div");
  newEle.style.cssText = `width:${width}px;height:${height}px;`;
  newEle.getBoundingClientRect = () => ({
    width,
    height,
    top,
    left,
    right: width,
    bottom: height,
  });
  return newEle;
}

describe('position', () => {
  describe('Scroll', () => {
    it('scrollLeft', () => {
      expect(scrollLeft(window)).toEqual(0);
    });
  });

  describe('Position offset', () => {
    let mockEle = null;
    beforeEach(() => {
      mockEle = createMockElement(300, 400);
      document.body.appendChild(mockEle);
    });
    afterEach(() => {
      document.body.removeChild(mockEle);
    });

    it('should get default offset', () => {
      Object.defineProperty(mockEle, 'ownerDocument', {
        value: 'abc',
      });
      const offset = getOffset(mockEle);
      expect(offset).toMatchObject({
        top: 0,
        left: 0,
        width: 0,
        height: 0,
      });
    });

    it('should get offset', () => {
      const offset = getOffset(mockEle);
      expect(offset).toMatchObject({
        top: 0,
        left: 0,
        width: 300,
        height: 400,
      });
    });
  });

  describe('Position scroll prarent', () => {
    it('should get document element', () => {
      const mockNode = createMockElement(160, 160);
      document.body.appendChild(mockNode);

      const doc = offsetParent(mockNode);
      expect(doc).toEqual(document.documentElement);

      mockNode.parentNode.removeChild(mockNode);
    });

    it('should get parent node', () => {
      document.body.innerHTML = `
        <ul class="level-1">
          <li class="item-i">I</li>
          <li class="item-ii" style="position: relative;">II
            <ul class="level-2" style="position: static;">
              <li class="item-a">A</li>
              <li class="item-b">B</li>
              <li class="item-c">C</li>
            </ul>
          </li>
          <li class="item-iii">III</li>
        </ul>
      `;

      Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
        get() { return this.parentNode; },
      });

      const doc = offsetParent(document.querySelector('.item-a'));
      expect(doc).toEqual(document.querySelector('.item-ii'));

      Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
        get() { return null; },
      });

      document.body.innerHTML = '';
    });

    it('should get document node', () => {
      document.body.innerHTML = `
        <div class="content" style="position:fixed">
          This is content.
        </div>
      `;

      const ele = document.querySelector('.content');
      expect(scrollPrarent(ele)).toEqual(document);

      Object.defineProperty(ele, 'ownerDocument', { value: null });
      expect(scrollPrarent(ele)).toEqual(document);

      document.body.innerHTML = '';
    });

    it('should get document when content position is not fixed', () => {
      document.body.innerHTML = `
        <div class="content">
          This is content.
        </div>
      `;

      const ele = document.querySelector('.content');
      expect(scrollPrarent(ele)).toEqual(document);

      document.body.innerHTML = '';
    });

    it('should scroll prarent node', () => {
      document.body.innerHTML = `
        <div class="outer" style="width:200px;height:200px;overflow-y:scroll;">
          <div class="inner" style="position:static;width:200px;height:400px;">
            <div class="content" style="position:absolute;width:300px;height:400px;scrollHeight:600px;">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
              in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
              sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </div>
          </div>
        </div>
      `;
      const contentEle = document.querySelector('.content');
      document.querySelectorAll('div').forEach((ele) => {
        if (ele.style.cssText !== '') {
          const width = parseInt(css(ele, 'width'), 10);
          const height = parseInt(css(ele, 'height'), 10);
          ele.getBoundingClientRect = () => ({
            width,
            height,
            top: 0,
            left: 0,
            right: width,
            bottom: height,
          });
          Object.defineProperty(ele, 'scrollHeight', { configurable: true, value: 500 });
        }
      });

      const doc = scrollPrarent(contentEle);
      expect(doc).toEqual(document.querySelector('.outer'));

      document.body.innerHTML = '';
    });
  });

  describe('Position', () => {
    it('should get node client rect', () => {
      document.body.innerHTML = `
        <div id="outer" style="margin-top:20px;">
          <div id="inner" style="position:fixed;width:200px;height:200px;top:24px;left:32px;margin-left:25px;">
            inner content
          </div>
        </div>
      `;
      document.querySelectorAll('div').forEach((ele) => {
        if (ele.style.cssText !== '') {
          const width = parseInt(css(ele, 'width'), 10) || 0;
          const height = parseInt(css(ele, 'height'), 10) || 0;
          const top = parseInt(css(ele, 'top'), 10) || 0;
          const left = parseInt(css(ele, 'left'), 10) || 0;
          ele.getBoundingClientRect = () => ({
            width,
            height,
            top,
            left,
            right: width,
            bottom: height,
          });
        }
      });

      const eleInner = document.getElementById('inner');
      const eleOuter = document.getElementById('outer');
      const pos = position(eleInner, eleOuter);
      expect(pos).toMatchObject({ left: 7, top: 24 });
      document.body.innerHTML = '';
    });

    it('should get parent position', () => {
      const eleInnter = createMockElement(50, 50, 35, 15);
      const outerInnter = createMockElement(150, 150, 15, 10);
      outerInnter.appendChild(eleInnter);
      document.body.appendChild(outerInnter);

      Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
        get() { return this.parentNode; },
      });

      const pos = position(eleInnter);
      expect(pos).toMatchObject({ left: 5, top: 20 });
      document.body.innerHTML = '';
    });

    it('should get parent position', () => {
      const eleInnter = createMockElement(50, 50, 35, 15);
      const outerInnter = createMockElement(150, 150, 15, 10);
      outerInnter.appendChild(eleInnter);
      document.body.appendChild(outerInnter);

      Object.defineProperty(HTMLElement.prototype, 'offsetParent', {
        get() { return this.parentNode; },
      });

      const pos = position(eleInnter);
      expect(pos).toMatchObject({ left: 5, top: 20 });
      document.body.innerHTML = '';
    });
  });
});
