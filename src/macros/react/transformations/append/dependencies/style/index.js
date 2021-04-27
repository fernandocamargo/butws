const isEqual = require('lodash/isEqual');
const { parse } = require('path');
const { PATTERN } = require('./constants');

function format({ items, load }) {
  const {
    babel: {
      types: { identifier, objectExpression, objectProperty },
    },
  } = this;
  const extract = current => {
    const { dir, ...path } = parse(current);
    const name = isEqual(path.name, 'style') ? 'default' : parse(dir).name;
    const next = load(current);

    return objectProperty(identifier(name), next);
  };

  return objectExpression(items.map(extract));
}

function identify() {
  return PATTERN;
}

module.exports = { format, identify };
