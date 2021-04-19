import { Suspense, createElement, forwardRef, lazy, useCallback } from 'react';
import styled, { css } from 'styled-components';

import { group, prepare } from './helpers';

export const test = css`
  background-color: orange;
  border: ${props => console.log('css();', { props }) || 'solid 2px red'};
`;

export default forwardRef(({ render, ...settings }, ref) => {
  const enhance = useCallback(
    modules => {
      const {
        style: { default: style },
        statics,
      } = modules.reduce(group, {});
      const enhanced = styled(Object.assign(render, statics))([], style);

      console.log(1);
      console.log`
        border: solid 2px black;
        color: ${props => console.log('style.js()', { props }) || 'pink'};
        margin: 1rem;
        padding: 1rem;
        ${test};
      `;

      console.log(2);
      console.log(`
        border: solid 2px black;
        color: ${props => console.log('style.js()', { props }) || 'pink'};
        margin: 1rem;
        padding: 1rem;
        ${test};
      `);

      console.log(3);
      console.log({ style });

      return { default: enhanced };
    },
    [render]
  );
  const Component = useCallback(
    props => {
      const dependencies = settings.dependencies.map(prepare);
      const component = lazy(() => Promise.all(dependencies).then(enhance));

      return createElement(component, props);
    },
    [settings.dependencies, enhance]
  );

  return (
    <Suspense fallback="Loading...">
      <Component ref={ref} {...settings.props} />
    </Suspense>
  );
});
