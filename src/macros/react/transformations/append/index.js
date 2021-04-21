const { sync: find } = require('glob');
const { dirname, resolve } = require('path');
const { DEPENDENCIES } = require('./constants');
const { format, load } = require('./helpers');

function check({ item }) {
  return item.type === 'ExportDefaultDeclaration';
}

function transform({ item, stack }) {
  const {
    babel: {
      types: {
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
        memberExpression,
        objectExpression,
        objectProperty,
        stringLiteral,
        variableDeclaration,
        variableDeclarator,
      },
    },
    state: { filename },
  } = this;
  const pattern = resolve(dirname(filename), DEPENDENCIES);
  const dependencies = find(pattern).map(load.bind(this));

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
        callExpression(
          memberExpression(identifier('Object'), identifier('assign')),
          [
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
            ),
            objectExpression([
              objectProperty(
                identifier('displayName'),
                stringLiteral(format(filename))
              ),
            ]),
          ]
        )
      )
    );
}

module.exports = { check, transform };
