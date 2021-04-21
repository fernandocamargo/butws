export const index = (stack, { module, name, namespace }) =>
  Object.assign(stack, { [name]: { module, namespace } });

export const prepare = ({ load, ...settings }) => {
  const format = module => Object.assign({ module }, settings);

  return load().then(format);
};
