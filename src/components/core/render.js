import { Suspense } from 'react';

import { useCore } from './hooks';

export default (props, ref) => {
  const { Component, ...settings } = useCore(props);

  return (
    <Suspense fallback="Loading...">
      <Component ref={ref} {...settings.props} />
    </Suspense>
  );
};
