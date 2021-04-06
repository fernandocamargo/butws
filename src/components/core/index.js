import noop from 'lodash/noop';
import { dirname, resolve } from 'path';
import { Suspense, createElement, forwardRef, lazy, useCallback } from 'react';

export default forwardRef(({ path, render, ...settings }, ref) => {
  const Component = useCallback(
    props => {
      const test = resolve(dirname(path), './style.js');
      const component = lazy(() =>
        Promise.all([import('components/app/style').catch(noop)]).then(
          (...modules) =>
            console.log({ test, modules }) || {
              default: render,
            }
        )
      );

      return createElement(component, props);
    },
    [path, render]
  );

  return (
    <Suspense fallback="Loading...">
      <Component ref={ref} {...settings.props} />
    </Suspense>
  );
});
