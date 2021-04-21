import { arrayOf, elementType, func, shape, string } from 'prop-types';

export const defaultProps = {
  dependencies: [],
};

export const displayName = '🧠';

export const propTypes = {
  dependencies: arrayOf(
    shape({
      load: func.isRequired,
      name: string.isRequired,
      namespace: string.isRequired,
    })
  ),
  render: elementType.isRequired,
};
