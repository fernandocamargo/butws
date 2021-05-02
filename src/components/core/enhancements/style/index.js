import get from 'lodash/get';
import styled from 'styled-components';

import { normalize } from './helpers';

export default ({ dependencies }) => {
  const dependency = get(dependencies, ['style', 'default']);
  const enhance = ({ default: style }) => current => {
    const componentId = normalize(dependency.namespace);
    const apply = styled(current).withConfig({ componentId });

    return Object.assign(apply`${style}`, { displayName: '💅' });
  };

  return dependency && dependency.load().then(enhance);
};
