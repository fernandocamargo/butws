const { normalize } = require('@helpers/path');
const startCase = require('lodash/startCase');
const { parse, sep } = require('path');

const format = path => {
  const { dir } = parse(path);
  const tag = normalize(dir)
    .split(sep)
    .slice(1)
    .map(startCase)
    .join(sep);

  return `▓▓▓▓▓▓▓▓▓▓ ${tag} ▓▓▓▓▓▓▓▓▓▓`;
};

function load(path) {
  const {
    babel: {
      types: {
        addComment,
        arrowFunctionExpression,
        callExpression,
        identifier,
        objectExpression,
        objectProperty,
        stringLiteral,
        ...types
      },
    },
  } = this;
  const namespace = normalize(path);

  return objectExpression([
    objectProperty(
      identifier('load'),
      arrowFunctionExpression(
        [],
        callExpression(types.import(), [
          addComment(
            stringLiteral(path),
            'leading',
            `webpackChunkName: "${namespace}"`
          ),
        ])
      )
    ),
    objectProperty(identifier('namespace'), stringLiteral(namespace)),
  ]);
}

module.exports = { format, load };
