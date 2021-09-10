const isEqual = require('lodash/isEqual');
const { parse } = require('path');
// const update = require('immutability-helper');
const { PATTERN } = require('./constants');
// const { sort } = require('./helpers');

const sanitize = (path) => path.replace(/^\[|\]$/gi, '').replace(/@/gi, ':');

function format({ items, load }) {
  const {
    babel: {
      types: { arrayExpression, identifier, objectExpression, objectProperty },
    },
  } = this;
  /*
  const extract = (stack, current) => {
    const { dir } = parse(current);
    const check = index => dir.startsWith(index);
    const eligible = !stack.indexes.filter(check).length;
    const next = load(current);

    return eligible
      ? update(stack, {
          indexes: { $push: [dir] },
          items: { $push: [next] },
        })
      : stack;
  };
  const { items } = sort(settings.items).reduce(extract, {
    items: [],
    indexes: [],
  });
  */
  // update(stack, { routes: { $push: [route] } });
  // const extract = (stack, current) => {
  const extract = (stack, item) => {
    const { dir, ...path } = parse(item);
    const getName = () => {
      switch (true) {
        case isEqual(path.name, 'routing'):
          return 'settings';
        default:
          return parse(dir).name;
      }
    };
    const name = sanitize(getName());

    // console.log({ name, item });

    return stack;
  };
  const {
    404: notFound,
    routing: settings,
    routes,
  } = items.reduce(extract, { routes: [] });

  return objectExpression(
    [
      !!notFound && objectProperty(identifier('404'), notFound),
      !!settings && objectProperty(identifier('settings'), settings),
      objectProperty(identifier('routes'), arrayExpression(routes)),
    ].filter(Boolean)
  );
}

function identify() {
  return PATTERN;
}

module.exports = { format, identify };
