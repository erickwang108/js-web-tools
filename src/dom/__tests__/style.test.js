import { getComputedStyle } from '../../utils/domUtils';
import { css } from '../css';

describe('Style tests', () => {
  beforeEach(() => {
    document.head.innerHTML = `
      <style type="text/css">
        html {
          font-size: 16px;
        }

        #container {
          padding-right: 20px;
          margin-left: 1rem;
        }
      </style>
    `;
    document.body.innerHTML = `
      <div id="container"></div>
      <div id="styledContainer" style="margin-left: 12px;"></div>
    `;
  });
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should get computed style', () => {
    const container = document.getElementById('container');
    const eleStyle = getComputedStyle(container);

    expect(eleStyle.getPropertyValue('margin-left')).toEqual('1rem'); // TODO: 16px?
    expect(eleStyle.getPropertyValue('padding-right')).toEqual('20px');
  });

  it('should get style', () => {
    const ele = document.getElementById('container');

    expect(css(ele, 'margin-left')).toEqual('1rem'); // TODO: 16px?
    expect(css(ele, 'paddingRight')).toEqual('20px');
    expect(css(ele, 'padding-right')).toEqual('20px');
  });

  it('should set styles', () => {
    const ele = document.getElementById('styledContainer');
    css(ele, {
      'margin-left': undefined, // remove this style
      'padding-right': '4px',
      scale: 0.4,
    });
    const eleStyle = getComputedStyle(ele);

    expect(eleStyle.getPropertyValue('margin-left')).toEqual('');
    expect(eleStyle.getPropertyValue('transform')).toEqual('scale(0.4)');
    expect(eleStyle.getPropertyValue('padding-right')).toEqual('4px');
  });

  it('should run coverage codes', () => {
    const ele = document.getElementById('styledContainer');

    css(ele, { 'margin-bottom': '24px' });

    const eleStyle = getComputedStyle(ele);
    expect(eleStyle.getPropertyValue('margin-bottom')).toEqual('24px');
  });
});
