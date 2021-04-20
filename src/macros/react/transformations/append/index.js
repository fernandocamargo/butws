const { sync } = require('glob');
const { dirname, join, parse, resolve } = require('path');
const { normalize } = require('@helpers/path');
const { DEPENDENCIES } = require('./constants');

function check({ item }) {
  return item.type === 'ExportDefaultDeclaration';
}

function transform({ item, stack }) {
  const {
    babel: {
      types: {
        addComment,
        arrayExpression,
        arrowFunctionExpression,
        callExpression,
        exportDefaultDeclaration,
        exportNamedDeclaration,
        identifier,
        jSXAttribute,
        jSXClosingElement,
        jSXElement,
        jSXExpressionContainer,
        jSXIdentifier,
        jSXOpeningElement,
        objectExpression,
        objectProperty,
        stringLiteral,
        variableDeclaration,
        variableDeclarator,
        ...types
      },
    },
    state: { filename },
  } = this;
  const dependencies = sync(resolve(dirname(filename), DEPENDENCIES)).map(
    path => {
      const { name } = parse(path);
      const webpackChunkName = join(normalize(path), name);

      return objectExpression([
        objectProperty(
          identifier('load'),
          arrowFunctionExpression(
            [],
            callExpression(types.import(), [
              addComment(
                stringLiteral(path),
                'leading',
                `webpackChunkName: "${webpackChunkName}"`
              ),
            ])
          )
        ),
        objectProperty(identifier('name'), stringLiteral(name)),
      ]);
    }
  );

  return stack
    .concat(
      exportNamedDeclaration(
        variableDeclaration('const', [
          variableDeclarator(
            identifier('dependencies'),
            arrayExpression(dependencies)
          ),
        ])
      )
    )
    .concat(
      exportNamedDeclaration(
        variableDeclaration('const', [
          variableDeclarator(identifier('render'), item.declaration),
        ])
      )
    )
    .concat(
      exportDefaultDeclaration(
        arrowFunctionExpression(
          [identifier('props'), identifier('ref')],
          jSXElement(
            jSXOpeningElement(jSXIdentifier('Core'), [
              jSXAttribute(
                jSXIdentifier('dependencies'),
                jSXExpressionContainer(identifier('dependencies'))
              ),
              jSXAttribute(
                jSXIdentifier('props'),
                jSXExpressionContainer(identifier('props'))
              ),
              jSXAttribute(
                jSXIdentifier('ref'),
                jSXExpressionContainer(identifier('ref'))
              ),
              jSXAttribute(
                jSXIdentifier('render'),
                jSXExpressionContainer(identifier('render'))
              ),
            ]),
            jSXClosingElement(jSXIdentifier('Core')),
            []
          )
        )
      )
    );
}

module.exports = { check, transform };
