import jwt from 'jsonwebtoken';

import { isString } from './utils';

export const AUTH_SCHEMA = 'Bearer';

const DEFAULT_CONFIG = {
  authSchema: AUTH_SCHEMA,
  privateKey: '37LvDSm4XvjYOh9Y',
};
const DEFAULT_OPTIONS = {
  algorithm: 'HS256',
  expiresIn: '30h',
};

export const JWT_REGEX = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;

export class JWT {
  constructor(config = DEFAULT_CONFIG, options = DEFAULT_OPTIONS) {
    this._config = {
      ...DEFAULT_CONFIG,
      ...config
    };
    this._options = {
      ...DEFAULT_OPTIONS,
      ...options,
    };
  }

  /*
   * sign payload and return token string or empty if throw an error.
   */
  sign = (payload) => {
    try {
      const { privateKey } = this._config;
      const data = isString(payload) ? JSON.parse(payload) : payload;
      return jwt.sign(data, privateKey, this._options);
    } catch (err) {
      /* */
    }
    return '';
  };

  /*
   * test token is expire or not.
   */
  isExpire = (token = '') => {
    const { authSchema } = this._config;
    const regexp = new RegExp(`^${authSchema}\\s{1}[A-Za-z0-9-_=]+\\.[A-Za-z0-9-_=]+\\.?[A-Za-z0-9-_.+/=]*$`);

    /* istanbul ignore else */
    if (token === '' || token === 'undefined' || !regexp.test(token)) {
      return true;
    }

    try {
      const { privateKey } = this._config;
      const jwtToken = this._getJwtToken(token);
      jwt.verify(jwtToken, privateKey, this._options);
      return false;
    } catch (err) {
      /* */
    }

    return true;
  };

  /*
   * verify token.
   */
  verify = token => !this.isExpire(token);

  _getJwtToken = (token) => {
    const { authSchema } = this._config;
    const prefixVerifyRegexp = new RegExp(`^${authSchema}\\s{1}`);
    return token.replace(prefixVerifyRegexp, '');
  };

  /*
   * get object with token, or by the key and token.
   */
  get = (...args) => {
    let key = '', token = '';

    if (args.length === 1) {
      [token = ''] = args;
    } else {
      [key = '', token = ''] = args;
    }

    if (token === '') {
      return null;
    }

    try {
      const jwtToken = this._getJwtToken(token);
      const payload = jwt.verify(jwtToken, this._config.privateKey);
      /* istanbul ignore else */
      if (payload) {
        if (key !== '' && Object.prototype.hasOwnProperty.call(payload, key)) {
          return payload[key];
        }
        return payload;
      }
    } catch (err) {
      /* */
    }
    return null;
  }
}

export default JWT;

