const { normalize } = require('@helpers/path');
const startCase = require('lodash/startCase');
const { parse, sep } = require('path');
const { SAFE_SPECIAL_CHARS, SPECIAL_CHARS } = require('./constants');

const identify = path => {
  const { dir, name } = parse(normalize(path));

  return [dir, name].join(sep);
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
  const namespace = identify(path);

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

const print = path => {
  const { dir } = parse(path);
  const tag = normalize(dir)
    .split(sep)
    .slice(1)
    .map(startCase)
    .join(sep);

  return `▓▓▓▓▓▓▓▓▓▓ ${tag} ▓▓▓▓▓▓▓▓▓▓`;
};

const sanitize = path => path.replace(SPECIAL_CHARS, SAFE_SPECIAL_CHARS);

module.exports = { identify, load, print, sanitize };
