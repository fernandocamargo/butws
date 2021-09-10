// import get from 'lodash/get';
// import { createElement } from 'react';
// import { matchPath } from 'react-router';

// import { useLocation } from 'hooks';

// import { connect, validate } from './helpers';

export const noop = { default: null };

export default ({
  dependencies: {
    routing: { settings, ...routes },
  },
  namespace,
}) => {
  /*
  const { pathname } = useLocation();

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

  console.log({ namespace, dependencies });

  return !dependency
    ? Promise.resolve(enhance())
    : dependency.load().then(enhance);

  if (!!settings) {
    console.group({ namespace, pathname });
    console.log(JSON.stringify(settings, null, 2));
    console.log(JSON.stringify(routes, null, 2));
    console.groupEnd();
  }
    */

  return false;
};
