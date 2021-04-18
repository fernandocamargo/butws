import { Suspense, forwardRef, lazy, useCallback } from 'react';

import { group, prepare } from './helpers';

export default forwardRef(({ render, ...settings }, ref) => {
  const enhance = useCallback(
    modules => {
      const dependencies = modules.reduce(group, {});

      console.log({ dependencies });

      return { default: render };
    },
    [render]
  );
  const Component = useCallback(
    props => {
      const dependencies = settings.dependencies.map(prepare);
      const Component = lazy(() => Promise.all(dependencies).then(enhance));

      return <Component {...props} />;
    },
    [settings.dependencies, enhance]
  );

  return (
    <Suspense fallback="Loading...">
      <Component ref={ref} {...settings.props} />
    </Suspense>
  );
});
