import { string } from 'prop-types';

export const defaultProps = {
  version: 0.1337,
};

export const propTypes = {
  name: string.isRequired,
};
