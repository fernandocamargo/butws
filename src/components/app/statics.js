import { string } from 'prop-types';

export const defaultProps = {
  version: '0.0.1',
};

export const propTypes = {
  name: string.isRequired,
  version: string.isRequired,
};
