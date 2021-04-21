import get from 'lodash/get';
import { createElement, lazy, useCallback } from 'react';

import { index, prepare } from './helpers';
import enhancements from './enhancements';

export const useCore = ({ render: current, dependencies, ...settings }) => {
  const core = useCallback(
    props => {
      const load = () => {
        const enhance = modules => {
          const indexes = modules.reduce(index, {});
          const apply = (render, meta) => {
            const [[name, transform]] = Object.entries(meta);
            const module = get(indexes, [name, 'module']);

            return !module ? render : transform({ render, ...indexes });
          };
          const next = enhancements.reduce(
            apply,
            Object.assign(current, { displayName: '🎁' })
          );

          return { default: next };
        };

        return Promise.all(dependencies.map(prepare)).then(enhance);
      };
      const component = lazy(load);

      return createElement(component, props);
    },
    [current, dependencies]
  );
  const Component = Object.assign(core, { displayName: '✨' });

  return { Component, ...settings };
};
