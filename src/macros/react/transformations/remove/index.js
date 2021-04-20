function check({ item }) {
  return (
    item.type === 'ImportDeclaration' &&
    item.source.value.endsWith('@macros/react/macro')
  );
}

function transform({ stack }) {
  return stack;
}

module.exports = { check, transform };
