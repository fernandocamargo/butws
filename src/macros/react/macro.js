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
    const apply = (next, { check, transform }) => {
      const params = { stack: next, index, item };
      const eligible = check.call(context, params);

      return !eligible ? next : transform.call(context, params);
    };

    return Object.values(transformations).reduce(apply, current);
  };
  const changes = body.reduce(transform, []);

  return body.splice(0, body.length, ...changes);
});
