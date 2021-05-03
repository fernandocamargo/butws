import get from 'lodash/get';
import { createElement } from 'react';
import { matchPath } from 'react-router';

import { connect, validate } from './helpers';

export const noop = { default: null };

export default ({ location: { pathname }, dependencies, namespace }) => {
  const translate = connect(namespace);
  const check = dependency => {
    const path = translate(dependency.namespace);
    const exact = validate(path);

    return matchPath(pathname, { exact, path });
  };
  const dependency = get(dependencies, ['routing'], []).find(check);
  const enhance = ({ default: current } = noop) => component => props =>
    createElement(component, {
      routing: { current: !!current && createElement(current) },
      ...props,
    });

  return !dependency
    ? Promise.resolve(enhance())
    : dependency.load().then(enhance);
};
