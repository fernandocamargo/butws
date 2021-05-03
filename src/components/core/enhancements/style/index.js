import get from 'lodash/get';
import styled from 'styled-components';

import { normalize } from './helpers';

export default ({ dependencies }) => {
  const dependency = get(dependencies, ['style', 'default']);
  const enhance = ({ default: style }) => component => {
    const componentId = normalize(dependency.namespace);
    const apply = styled(component).withConfig({ componentId });

    return Object.assign(apply`${style}`, { displayName: '💅' });
  };

  return dependency && dependency.load().then(enhance);
};
