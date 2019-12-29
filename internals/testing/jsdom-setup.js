import { JSDOM } from 'jsdom';

const jsdom = new JSDOM(`
  <!doctype html>
  <html lang="en">
    <head>
      <title>test</title>
      <style>
        body {
          width: 800px;
          height: 600px;
        }
      </style>
    </head>
    <body>
    </body>
  </html>
`);

global.window = jsdom.window;
global.document = jsdom.window.document;

Object.defineProperties(window.HTMLElement.prototype, {
  offsetLeft: {
    get () { return parseFloat(window.getComputedStyle(this).marginLeft) || 0; }
  },
  offsetTop: {
    get () { return parseFloat(window.getComputedStyle(this).marginTop) || 0; }
  },
  offsetHeight: {
    get () { return parseFloat(window.getComputedStyle(this).height) || 0; }
  },
  offsetWidth: {
    get () { return parseFloat(window.getComputedStyle(this).width) || 0; }
  },
});
