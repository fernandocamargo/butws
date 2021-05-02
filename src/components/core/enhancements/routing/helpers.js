import { sep } from 'path';
import initial from 'lodash/initial';

import { DYNAMIC_PARAMS, ROUTES_DELIMITERS, STATIC_ROUTE } from './constants';

export const connect = namespace => {
  const dir = extract(namespace);
  const translate = path =>
    extract(path)
      .substring(dir.length)
      .replace(ROUTES_DELIMITERS, '')
      .replace(DYNAMIC_PARAMS, ':');

  return translate;
};

export const extract = path => initial(path.split(sep)).join(sep);

export const validate = path => STATIC_ROUTE.test(path);
