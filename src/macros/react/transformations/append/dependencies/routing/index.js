const { parse } = require('path');
const isEqual = require('lodash/isEqual');
const update = require('immutability-helper');
const { PATTERN } = require('./constants');
const { sanitize, sort } = require('./helpers');

function format({ items, load }) {
  const {
    babel: {
      types: {
        arrayExpression,
        identifier,
        objectExpression,
        objectProperty,
        stringLiteral,
      },
    },
    state,
  } = this;
  const { dir: filename } = parse(state.filename);
  const extract = (stack, item) => {
    const { dir, name } = parse(sanitize(item));
    const path = dir.substring(filename.length);
    const check = (existing) => path.startsWith(existing.path);
    const special = [
      isEqual(name, 'routing') && 'settings',
      isEqual(parse(dir).name, '404') && '404',
    ].find(Boolean);
    const route = load(item, {
      inject: [
        !!path && objectProperty(identifier('path'), stringLiteral(path)),
      ].filter(Boolean),
    });
    const eligible = !special && !stack.indexes.filter(check).length;

    return update(stack, {
      ...(!!eligible && {
        indexes: { $push: [{ path }] },
        routes: { $push: [route] },
      }),
      ...(!!special && { [special]: { $set: route } }),
    });
  };
  const {
    404: notFound,
    routes,
    settings,
  } = sort(items).reduce(extract, { routes: [], indexes: [] });

  return objectExpression(
    [
      !!notFound && objectProperty(identifier('404'), notFound),
      !!settings && objectProperty(identifier('settings'), settings),
      !!routes.length &&
        objectProperty(identifier('routes'), arrayExpression(routes)),
    ].filter(Boolean)
  );
}

function identify() {
  return PATTERN;
}

module.exports = { format, identify };
