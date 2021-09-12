import get from 'lodash/get';
import update from 'immutability-helper';
import { createElement } from 'react';
import { Route, Routes } from 'react-router-dom';

export const Test = ({ path }) => <p>Path: {path}</p>;

export const render = ({ path }) => (
  <Route key={path} path={path} element={<Test path={path} />} />
);

export default ({ dependencies }) => {
  const dependency = get(dependencies, ['routing', 'routes']);
  const enhance = (component) => (props) =>
    createElement(
      component,
      update(props, {
        routing: {
          routes: {
            $set: <Routes>{dependency.map(render)}</Routes>,
          },
        },
      })
    );

  return !!dependency && enhance;
};
