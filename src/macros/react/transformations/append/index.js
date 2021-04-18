const { sync } = require('glob');
const { dirname, parse, resolve } = require('path');

const DEPENDENCIES = './*(hooks|style).js';

function check({ item }) {
  return item.type === 'ExportDefaultDeclaration';
}

function transform({ item, stack }) {
  const {
    babel: {
      types: {
        arrayExpression,
        arrowFunctionExpression,
        blockStatement,
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
        returnStatement,
        stringLiteral,
        variableDeclaration,
        variableDeclarator,
      },
    },
    state: { filename },
  } = this;
  const dependencies = sync(
    resolve(dirname(filename), DEPENDENCIES)
  ).map(path =>
    objectExpression([
      objectProperty(
        identifier('load'),
        arrowFunctionExpression(
          [],
          blockStatement([
            returnStatement(
              callExpression(identifier('import'), [stringLiteral(path)])
            ),
          ])
        )
      ),
      objectProperty(identifier('name'), stringLiteral(parse(path).name)),
    ])
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
          blockStatement([
            returnStatement(
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
          ])
        )
      )
    );
}

module.exports = { check, transform };
