const { sync: find } = require('glob');
const { dirname, resolve } = require('path');
const types = require('./dependencies');
const { identify, load, print } = require('./helpers');

function check({ item }) {
  return item.type === 'ExportDefaultDeclaration';
}

function transform({ item: { declaration: render }, stack }) {
  const {
    babel: {
      types: {
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
  const namespace = stringLiteral(identify(filename));
  const displayName = stringLiteral(print(filename));
  const scan = ([type, dependency]) => {
    const pattern = `./${dependency.identify()}.js`;
    const items = find(resolve(dirname(filename), pattern));
    const current = { load: load.bind(this), items };
    const next = dependency.format.call(this, current);

    return objectProperty(identifier(type), next);
  };
  const dependencies = objectExpression(Object.entries(types).map(scan));

  return stack
    .concat(
      exportNamedDeclaration(
        variableDeclaration('const', [
          variableDeclarator(identifier('namespace'), namespace),
        ])
      )
    )
    .concat(
      exportNamedDeclaration(
        variableDeclaration('const', [
          variableDeclarator(identifier('dependencies'), dependencies),
        ])
      )
    )
    .concat(
      exportNamedDeclaration(
        variableDeclaration('const', [
          variableDeclarator(identifier('render'), render),
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
                    jSXIdentifier('namespace'),
                    jSXExpressionContainer(identifier('namespace'))
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
              objectProperty(identifier('displayName'), displayName),
            ]),
          ]
        )
      )
    );
}

module.exports = { check, transform };
