import { Suspense, createElement, forwardRef, lazy, useCallback } from 'react';

import { index, prepare } from './helpers';
import enhancements from './enhancements';

export default forwardRef(({ dependencies, ...settings }, ref) => {
  const Component = useCallback(
    props => {
      const load = () => {
        const enhance = modules => {
          const indexes = modules.reduce(index, {});
          const apply = (render, meta) => {
            const [[name, transform]] = Object.entries(meta);
            const { [name]: module } = indexes;

            return !module ? render : transform({ [name]: module, render });
          };

          return { default: enhancements.reduce(apply, settings.render) };
        };

        return Promise.all(dependencies.map(prepare)).then(enhance);
      };
      const component = lazy(load);

      return createElement(component, props);
    },
    [settings.render, dependencies]
  );

  return (
    <Suspense fallback="Loading...">
      <Component ref={ref} {...settings.props} />
    </Suspense>
  );
});
