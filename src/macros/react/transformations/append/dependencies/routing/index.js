const { parse } = require('path');
const update = require('immutability-helper');
const { PATTERN } = require('./constants');
const { sort } = require('./helpers');

function format({ load, ...settings }) {
  const {
    babel: {
      types: { arrayExpression },
    },
  } = this;
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

  return arrayExpression(items);
}

function identify() {
  return PATTERN;
}

module.exports = { format, identify };
