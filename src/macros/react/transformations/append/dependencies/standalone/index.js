const { parse } = require('path');
const { PATTERN } = require('./constants');

function format({ items, load }) {
  const {
    babel: {
      types: { identifier, objectExpression, objectProperty },
    },
  } = this;
  const extract = (item) => {
    const { name } = parse(item);

    return objectProperty(identifier(name), load(item));
  };

  return objectExpression(items.map(extract));
}

function identify() {
  return PATTERN;
}

module.exports = { format, identify };
