const { parse } = require('path');
const { PATTERN } = require('./constants');

function format({ items, load }) {
  const {
    babel: {
      types: { identifier, objectExpression, objectProperty },
    },
  } = this;
  const extract = current => {
    const { name } = parse(current);
    const next = load(current);

    return objectProperty(identifier(name), next);
  };

  return objectExpression(items.map(extract));
}

function identify() {
  return PATTERN;
}

module.exports = { format, identify };
