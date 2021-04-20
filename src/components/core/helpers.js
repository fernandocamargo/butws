export const index = (stack, { module, name }) =>
  Object.assign(stack, { [name]: module });

export const prepare = ({ load, name }) => {
  const format = module => ({ module, name });

  return load().then(format);
};
