import get from 'lodash/get';
import { matchPath } from 'react-router';

import { connect, validate } from './helpers';

export default ({ location, namespace, ...settings }) => {
  const translate = connect(namespace);
  const check = dependency => {
    const path = translate(dependency.namespace);
    const exact = validate(path);

    return matchPath(location.pathname, { exact, path });
  };
  const dependency = get(settings.dependencies, ['routing'], []).find(check);

  console.log({ dependency });

  return false;
};
