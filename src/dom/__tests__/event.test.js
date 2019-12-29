import Events from '../event';
import triggerEvent from '../_eventTrigger';

function injectHtml () {
  document.body.innerHTML = `
    <div id="container">
      <ul>
        <li class='green'>hello</li>
        <li class='green'>world</li>
        <li class='red'>again</li>
        <li class='red'>from</li>
        <li class='green'>cam</li>
      </ul>
    </div>
  `;
}

function clearHtml () {
  document.body.innerHTML = '';
}

describe('Events', () => {
  beforeEach(() => {
    injectHtml();
  });
  afterEach(() => {
    clearHtml();
  });

  it('on should invoke callback when event fired', () => {
    const callback = jest.fn();
    const el = document.querySelector('#container ul');
    Events.on(el, 'click', callback);

    triggerEvent(el, 'click');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('on bind same callback twice will only invoke once', () => {
    const callback = jest.fn();
    const el = document.querySelector('#container ul');
    Events.on(el, 'click', callback);
    Events.on(el, 'click', callback);

    triggerEvent(el, 'click');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('on can bind two events', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const callback3 = jest.fn();
    const el = document.querySelector('#container ul');
    Events.on(el, 'click', callback1);
    Events.on(el, 'click', callback2);

    triggerEvent(el, 'click');
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(1);
    expect(callback3).toHaveBeenCalledTimes(0);
  });

  it('off can remove on event', () => {
    const callback = jest.fn();
    const el = document.querySelector('#container ul');
    Events.on(el, 'click', callback);
    Events.off(el, 'click', callback);

    triggerEvent(el, 'click');
    expect(callback).toHaveBeenCalledTimes(0);
  });
});

describe('once', () => {
  beforeEach(() => {
    injectHtml();
  });
  afterEach(() => {
    clearHtml();
  });

  it('once will only invoke callback once', () => {
    const callback = jest.fn();
    const el = document.querySelector('#container ul');
    Events.once(el, 'click', callback);

    triggerEvent(el, 'click');
    triggerEvent(el, 'click');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('on will invoke callback many times as you trigger', () => {
    const callback = jest.fn();
    const el = document.querySelector('#container ul');
    Events.on(el, 'click', callback);

    triggerEvent(el, 'click');
    triggerEvent(el, 'click');
    triggerEvent(el, 'click');
    expect(callback).toHaveBeenCalledTimes(3);
  });

  it('off can unbind once', () => {
    const callback = jest.fn();
    const el = document.querySelector('#container ul');
    Events.once(el, 'click', callback);
    Events.off(el, 'click');

    triggerEvent(el, 'click');
    expect(callback).toHaveBeenCalledTimes(0);
  });
});

describe('with namespace', () => {
  beforeEach(() => {
    injectHtml();
  });
  afterEach(() => {
    clearHtml();
  });

  it('on can bind with namespace', () => {
    const callback = jest.fn();
    const el = document.querySelector('#container ul');
    Events.on(el, 'click.testns', callback);

    triggerEvent(el, 'click');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('off can remove event with namespace', () => {
    const callback = jest.fn();
    const el = document.querySelector('#container ul');
    Events.on(el, 'click.testns', callback);
    Events.off(el, 'click', callback);

    triggerEvent(el, 'click');
    expect(callback).toHaveBeenCalledTimes(0);
  });

  it('off with namespace only remove that namespace', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const el = document.querySelector('#container ul');
    Events.on(el, 'click.testns', callback1);
    Events.on(el, 'click.anotherns', callback2);
    Events.off(el, 'click.anotherns');

    triggerEvent(el, 'click');
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(0);
  });

  it('off without namespace will remove all events', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const el = document.querySelector('#container ul');
    Events.on(el, 'click.testns', callback1);
    Events.on(el, 'click.anotherns', callback2);
    Events.off(el, 'click');

    triggerEvent(el, 'click');
    expect(callback1).toHaveBeenCalledTimes(0);
    expect(callback2).toHaveBeenCalledTimes(0);
  });
});


describe('event delegation', () => {
  beforeEach(() => {
    injectHtml();
  });
  afterEach(() => {
    clearHtml();
  });

  it('delegate can bind event', () => {
    const callback = jest.fn();
    const el = document.querySelector('#container ul');
    Events.delegate(el, 'li.red', 'click', callback);

    triggerEvent(document.querySelector('#container ul li.red'), 'click');
    expect(callback).toHaveBeenCalledTimes(1);

    triggerEvent(document.querySelector('#container ul li.green'), 'click');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('undelegate can remove event delegation', () => {
    const el = document.querySelector('#container ul');
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    Events.delegate(el, 'li.red', 'click', callback1);
    Events.delegate(el, 'li.green', 'click', callback2);

    Events.undelegate(el, 'li.red', 'click');

    triggerEvent(document.querySelector('#container ul li.red'), 'click');
    triggerEvent(document.querySelector('#container ul li.green'), 'click');
    expect(callback1).toHaveBeenCalledTimes(0);
    expect(callback2).toHaveBeenCalledTimes(1);
  });

  it('off can also remove event delegation', () => {
    const callback = jest.fn();
    const el = document.querySelector('#container ul');
    Events.delegate(el, 'li.red', 'click', callback);
    Events.off(el, 'li.red', 'click');

    triggerEvent(el, 'click');
    expect(callback).toHaveBeenCalledTimes(0);
  });

  it('off with namespace only remove that namespace', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const el = document.querySelector('#container ul');
    Events.delegate(el, 'li.red', 'click.testns', callback1);
    Events.delegate(el, 'li.red', 'click.anotherns', callback2);
    Events.off(el, 'click.anotherns');

    triggerEvent(el.querySelector('li.red'), 'click');
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(0);
  });

  it('off without namespace will remove all events', () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    const el = document.querySelector('#container ul');
    Events.delegate(el, 'li.red', 'click.testns', callback1);
    Events.delegate(el, 'li.red', 'click.anotherns', callback2);
    Events.off(el, 'click.anotherns');

    triggerEvent(el.querySelector('li.red'), 'click');
    expect(callback1).toHaveBeenCalledTimes(1);
    expect(callback2).toHaveBeenCalledTimes(0);
  });
});

describe('trigger', () => {
  beforeEach(() => {
    injectHtml();
  });
  afterEach(() => {
    clearHtml();
  });

  it('can trigger events', () => {
    const callback = jest.fn();
    const el = document.querySelector('#container ul');
    Events.on(el, 'click', callback);

    Events.trigger(el, 'click');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('can trigger scroll events', () => {
    const callback = jest.fn();
    const el = document.querySelector('#container ul');
    Events.on(el, 'scroll', callback);

    Events.trigger(el, 'scroll');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('can trigger resize events', () => {
    const callback = jest.fn();
    const el = document.querySelector('#container ul');
    Events.on(el, 'resize', callback);

    Events.trigger(el, 'resize');
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('can trigger with params', () => {
    const callback = jest.fn();
    const el = document.querySelector('#container ul');
    Events.on(el, 'resize', callback);

    Events.trigger(el, 'resize', {foo: 'bar'});
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('can trigger with bubbles', () => {
    const callback = jest.fn();
    const el = document.querySelector('#container ul');
    Events.on(el, 'click', callback);

    Events.trigger(el, 'click', { bubbles: true });
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
