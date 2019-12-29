import eventTrigger from '../_eventTrigger';

function triggerAndCatch(element, event, options, fn){
  // If no options are specified, assume the last param is the callback
  if (!fn) {
    fn = options;
  }

  element.addEventListener(event, fn, options);
  eventTrigger(element, event, options);
  element.removeEventListener(event, fn);
}

describe('Trigger events', () => {
  describe('trigger HTMLEvents', function(){
    it('triggers single scroll event', function() {
      const fn = jest.fn();
      triggerAndCatch(document.body, 'scroll', fn);
      expect(fn).toHaveBeenCalledTimes(1);
    });
  });

  describe('KeyboardEvent', function(){
    it('triggers keydown event', function(){
      const fn = jest.fn();
      triggerAndCatch(document.body, 'keydown', fn);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('triggers keyup event', function(){
      const fn = jest.fn();
      triggerAndCatch(document.body, 'keyup', fn);
      expect(fn).toHaveBeenCalledTimes(1);
    });

  });

  describe('MouseEvents', () => {
    it('triggers single click event', () => {
      const fn = jest.fn();
      triggerAndCatch(document.body, 'click', fn);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('sets screenX/Y to clientX/Y if not present', (done) => {
      const options = { clientX: 10, clientY: 20 };
      triggerAndCatch(document.body, 'click', options, (params) => {
        expect(params.clientX).toEqual(options.clientX);
        expect(params.clientY).toEqual(options.clientY);
        done();
      });
    });

    it('keeps screenX/Y if not present', (done) => {
      const options = {
        clientX: 10,
        clientY: 20,
        screenX: 15,
        screenY: 25
      };
      triggerAndCatch(document.body, 'click', options, (params) => {
        expect(params.clientX).toEqual(options.clientX);
        expect(params.clientY).toEqual(options.clientY);
        expect(params.screenX).toEqual(options.screenX);
        expect(params.screenY).toEqual(options.screenY);
        done();
      });
    });
  });

  describe('CustomEvents', () => {
    it('triggers single custom event with detail', (done) => {
      triggerAndCatch(document.body, 'some-custom-event', { bubbles: true, detail: 'expected' }, (evt) => {
        expect(evt.detail).toEqual('expected');
        done();
      });
    });
  });
});
