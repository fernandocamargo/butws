import styled from 'styled-components';

import { normalize } from './helpers';

export default ({
  style: {
    module: { default: style },
    namespace,
  },
  render,
}) => {
  const componentId = normalize(namespace);
  const apply = styled(render).withConfig({ componentId });
  const component = apply`${style}`;

  return Object.assign(component, { displayName: '💅' });
};
