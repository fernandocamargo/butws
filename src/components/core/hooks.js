import { createElement, lazy, useCallback } from 'react';

import { combine } from './helpers';
import enhancements from './enhancements';

export const useCore = ({
  render: current,
  dependencies,
  namespace,
  ...settings
}) => {
  const core = useCallback(
    props => {
      const enhance = apply => apply({ dependencies, namespace });
      const format = layers => {
        const next = layers.reduce(
          combine,
          Object.assign(current, { displayName: '🎁' })
        );

        return { default: next };
      };
      const promises = enhancements.map(enhance).filter(Boolean);
      const load = () => Promise.all(promises).then(format);

      return createElement(lazy(load), props);
    },
    [current, dependencies, namespace]
  );
  const Component = Object.assign(core, { displayName: '✨' });

  console.group({ namespace });
  console.log(JSON.stringify(dependencies.routing, null, 2));
  console.groupEnd();

  return { Component, ...settings };
};
