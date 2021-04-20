const { normalize } = require('@helpers/path');
const { join, parse } = require('path');

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
  const { name } = parse(path);
  const namespace = join(normalize(path), name);

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
    objectProperty(identifier('name'), stringLiteral(name)),
    objectProperty(identifier('namespace'), stringLiteral(namespace)),
  ]);
}

module.exports = { load };
