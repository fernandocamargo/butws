import { arrayOf, elementType, func, shape, string } from 'prop-types';

export const defaultProps = {
  dependencies: [],
};

export const displayName = 'Core';

export const propTypes = {
  dependencies: arrayOf(
    shape({ name: string.isRequired, load: func.isRequired })
  ),
  render: elementType.isRequired,
};
