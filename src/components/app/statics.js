import { node, string } from 'prop-types';

export const defaultProps = {
  children: 'Fake',
  version: '0.0.1',
};

export const propTypes = {
  children: node,
  name: string.isRequired,
  version: string,
};
