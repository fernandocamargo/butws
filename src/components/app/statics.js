import { node, shape, string } from 'prop-types';

export const defaultProps = {
  routing: { routes: '[fake routes]' },
  version: '0.0.666',
};

export const propTypes = {
  routing: shape({ routes: node }).isRequired,
  name: string.isRequired,
  version: string,
};
