function check({ index }) {
  return !index;
}

function transform({ item, stack }) {
  const {
    babel: {
      types: {
        identifier,
        importDeclaration,
        importDefaultSpecifier,
        stringLiteral,
      },
    },
  } = this;

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
}

module.exports = { check, transform };
