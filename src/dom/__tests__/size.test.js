import { width, height } from '../size';

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

describe('Size', () => {
  let mockEle = null;
  beforeEach(() => {
    mockEle = createMockElement(300, 400);
    document.body.appendChild(mockEle);
  });
  afterEach(() => {
    document.body.removeChild(mockEle);
  });

  it('should get target width', () => {
    const w = width(mockEle);
    const h = height(mockEle);

    expect(w).toEqual(300);
    expect(h).toEqual(400);
  });
});
