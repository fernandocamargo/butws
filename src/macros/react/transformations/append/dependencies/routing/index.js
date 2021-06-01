const { parse } = require('path');
const update = require('immutability-helper');
const { PATTERN } = require('./constants');
const { sort } = require('./helpers');

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
  const extract = stack => stack;
  const { '404': notFound, routes, settings } = items.reduce(extract, {
    routes: [],
  });

  console.log({ notFound, routes, settings });

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
