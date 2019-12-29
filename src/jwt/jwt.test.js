import {
  JWT,
  AUTH_SCHEMA,
  JWT_REGEX,
} from './';

describe('jwt', () => {
  it('should get a token using default config', () => {
    const jwt = new JWT();
    let token = jwt.sign({
      username: 'Erick',
      role: 'admin',
    });
    expect(JWT_REGEX.test(token)).toEqual(true);

    token = jwt.sign('{"username": "Erick", "role": "admin"}');
    expect(JWT_REGEX.test(token)).toEqual(true);
  });

  it('should get a not expire token', () => {
    const jwt = new JWT();
    const token = jwt.sign({ username: 'Erick' });

    expect(jwt.isExpire()).toEqual(true);
    expect(jwt.isExpire(`${AUTH_SCHEMA} ${token}`)).toEqual(false);
    expect(jwt.verify(`${AUTH_SCHEMA} ${token}`)).toEqual(true);
  });

  it('should get a expire token', (done) => {
    const jwt = new JWT(null, { expiresIn: 1 });
    const token = jwt.sign({ username: 'Erick' });
    setTimeout(() => {
      expect(jwt.isExpire(`${AUTH_SCHEMA} ${token}`)).toEqual(true);
      expect(jwt.verify(`${AUTH_SCHEMA} ${token}`)).toEqual(false);
      done();
    }, 2000);
  });

  it('should not get a token', () => {
    const jwt = new JWT();
    const token = jwt.sign('{username: "Erick"}');
    expect(token).toEqual('');
  });

  it('should get object values', () => {
    const jwt = new JWT();
    const token = jwt.sign({
      username: 'Erick',
      role: 'admin',
      id: 10001,
    });
    expect(jwt.get('username', token)).toEqual('Erick');
    expect(jwt.get('role', token)).toEqual('admin');
    expect(jwt.get('id', token)).toEqual(10001);
    expect(jwt.get(token)).toMatchObject({
      username: 'Erick',
      role: 'admin',
      id: 10001,
    });
  });

  it('should get null if token is empty string', () => {
    const jwt = new JWT();
    expect(jwt.get()).toEqual(null);
    expect(jwt.get(undefined)).toEqual(null);
    expect(jwt.get(null)).toEqual(null);
    expect(jwt.get('')).toEqual(null);
  });
});
