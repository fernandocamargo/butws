const { createMacro } = require('babel-plugin-macros');
const transformations = require('./transformations');

module.exports = createMacro(context => {
  const {
    state: {
      file: {
        path: {
          node: { body },
        },
      },
    },
  } = context;
  const transform = (current, item, index) => {
    const apply = (stack, { check, transform }) => {
      const call = callback => callback.call(context, { stack, index, item });

      return call(check) ? call(transform) : stack;
    };
    const transformed = Object.values(transformations).reduce(apply, []);
    const next = transformed.length ? transformed : item;

    return current.concat(next);
  };
  const changes = body.reduce(transform, []);

  return body.splice(0, body.length, ...changes);
});
