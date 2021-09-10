const isEqual = require('lodash/isEqual');
const { parse } = require('path');
const { PATTERN } = require('./constants');

function format({ items, load }) {
  const {
    babel: {
      types: { identifier, objectExpression, objectProperty },
    },
  } = this;
  const extract = (item) => {
    const { dir, ...path } = parse(item);
    const name = isEqual(path.name, 'style') ? 'default' : parse(dir).name;

    return objectProperty(identifier(name), load(item));
  };

  return objectExpression(items.map(extract));
}

function identify() {
  return PATTERN;
}

module.exports = { format, identify };
