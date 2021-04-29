import { createElement, lazy, useCallback } from 'react';

import enhancements from './enhancements';

export const combine = (stack, wrap) => wrap(stack);

export const useCore = ({ render: current, dependencies, ...settings }) => {
  const core = useCallback(
    props => {
      const enhance = apply => apply(dependencies);
      const format = layers => {
        const next = layers.reduce(
          combine,
          Object.assign(current, { displayName: '🎁' })
        );

        return { default: next };
      };
      const load = () =>
        Promise.all(enhancements.map(enhance).filter(Boolean)).then(format);

      return createElement(lazy(load), props);
    },
    [current, dependencies]
  );
  const Component = Object.assign(core, { displayName: '✨' });

  return { Component, ...settings };
};
