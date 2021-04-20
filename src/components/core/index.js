import { Suspense, createElement, forwardRef, lazy, useCallback } from 'react';
import styled from 'styled-components';

import { group, prepare } from './helpers';

export default forwardRef(({ dependencies, render, ...settings }, ref) => {
  const enhance = useCallback(
    modules => {
      const {
        style: { default: style },
        statics,
      } = modules.reduce(group, {});
      const enhanced = styled(Object.assign(render, statics))([], style);

      return { default: enhanced };
    },
    [render]
  );
  const load = useCallback(
    () => Promise.all(dependencies.map(prepare)).then(enhance),
    [dependencies, enhance]
  );
  const Component = useCallback(
    props => {
      const component = lazy(load);

      return createElement(component, props);
    },
    [load]
  );

  return (
    <Suspense fallback="Loading...">
      <Component ref={ref} {...settings.props} />
    </Suspense>
  );
});
