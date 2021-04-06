const { createMacro } = require('babel-plugin-macros');

module.exports = createMacro(
  ({
    babel: {
      types: {
        arrowFunctionExpression,
        blockStatement,
        exportDefaultDeclaration,
        exportNamedDeclaration,
        identifier,
        importDeclaration,
        importDefaultSpecifier,
        jSXAttribute,
        jSXClosingElement,
        jSXElement,
        jSXExpressionContainer,
        jSXIdentifier,
        jSXOpeningElement,
        returnStatement,
        stringLiteral,
        variableDeclaration,
        variableDeclarator,
      },
    },
    state: {
      file: {
        path: {
          node: { body },
        },
      },
      filename,
    },
  }) => {
    const transform = (stack, item, index) => {
      switch (true) {
        case !index:
          return [
            importDeclaration(
              [importDefaultSpecifier(identifier('React'))],
              stringLiteral('react')
            ),
            importDeclaration(
              [importDefaultSpecifier(identifier('Core'))],
              stringLiteral('components/core')
            ),
          ]
            .concat(item)
            .concat(stack);
        case item.type === 'ImportDeclaration' &&
          item.source.value.endsWith('macros/react/macro'):
          return stack;
        case item.type === 'ExportDefaultDeclaration':
          return stack
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
                            jSXIdentifier('path'),
                            jSXExpressionContainer(stringLiteral(filename))
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
        default:
          return stack.concat(item);
      }
    };
    const transformations = body.reduce(transform, []);

    return body.splice(0, body.length, ...transformations);
  }
);
