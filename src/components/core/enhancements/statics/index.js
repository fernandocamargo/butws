import get from 'lodash/get';

import { enhance } from './helpers';

export default dependencies => {
  const dependency = get(dependencies, ['standalone', 'statics']);

  return dependency && dependency.load().then(enhance);
};
