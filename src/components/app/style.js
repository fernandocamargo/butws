import { css } from 'styled-components';

export const test = css`
  background-color: orange;
  border: ${props => console.log('css();', { props }) || 'solid 2px red'};
`;

export default `
  border: solid 2px black;
  color: ${props => console.log('style.js()', { props }) || 'pink'};
  margin: 1rem;
  padding: 1rem;
  ${test};
`;
