import balancer, { indexOfMinOrMax } from '../balancer';

describe('Balance', () => {
  describe('Get min or max index of an array', () => {
    it ('should get -1 when array has no items', () => {
      const index = indexOfMinOrMax();
      expect(index).toEqual(-1);
    });

    it ('should get min index', () => {
      const index = indexOfMinOrMax([3, 1, 9]);
      expect(index).toEqual(1);
    });

    it ('should get max index', () => {
      const index = indexOfMinOrMax([3, 1, 8, 10, 234, 9], 'max');
      expect(index).toEqual(4);
    });
  });

  it('should get -1 when source is empty', () => {
    const result = balancer();
    expect(result).toHaveLength(0);
  });

  it('t1', () => {
    const source = [0.33333333331, 0.33333333331, 0.33333333333];
    const result = balancer(source, 1, 3);
    expect(result).toMatchObject([0.333, 0.333, 0.334]);
  });

  it('t2', () => {
    const source = [1, 55, 22, 67];
    const result = balancer(source, 69699, 0);
    expect(result).toMatchObject([480, 26438, 10575, 32206]);
  });

  it('t3', () => {
    const source = [10, 10, 10, 10, 15000];
    const result = balancer(source, 17000, 0);
    expect(result).toMatchObject([11, 11, 11, 11, 16956]);
  });

  it('t4', () => {
    const source = [0.00005, 5, 0.00005, 0.00005, 0.00005, 0.00005, 0.00005, 0.00005];
    const result = balancer(source, -5, 4);
    expect(result).toMatchObject([0, -5, 0, 0, 0, 0, 0, 0]);
  });

  it('t5', () => {
    const source = [0.0015974718789698097
      ,0.755383581038094
      ,0.13950473043946954
      ,0.0011978091842754731
      ,0.005126875727346068
      ,0.0042250281407886295
      ,0.0001720958819913952
      ,0.0047584144830165875
      ,0.0835073272489086
      ,0.00016098907002300275
      ,0.0028037075787230655
      ,0.0014378579473690483
      ,0.00012411138102484662
    ];
    const result = balancer(source, 1, 3);
    expect(result).toMatchObject([0.002, 0.755, 0.14, 0.001, 0.005, 0.004, 0, 0.005, 0.084, 0, 0.003, 0.001, 0]);
  });

  it('shoule not calculate string items', () => {
    const source = [10, 'abc', 30];
    const result = balancer(source);
    expect(result).toMatchObject([25, 75]);
  });

  it('shoule get fixed number', () => {
    const source = [10, 30, 20, 30];
    const result = balancer(source, 100, 2);
    expect(result).toMatchObject([11.11, 33.34, 22.22, 33.33]);
  });
});
