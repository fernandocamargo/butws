import { createElement, lazy, useCallback } from 'react';

import { useLocation } from 'hooks';

import { combine } from './helpers';
import enhancements from './enhancements';

export const useCore = ({
  render: current,
  dependencies,
  namespace,
  ...settings
}) => {
  const location = useLocation();
  const core = useCallback(
    props => {
      const enhance = apply => apply({ dependencies, location, namespace });
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
    [current, dependencies, location, namespace]
  );
  const Component = Object.assign(core, { displayName: '✨' });

  return { Component, ...settings };
};
