import styled from 'styled-components';

export default ({ style: { default: style }, render }) =>
  styled(render)`
    ${style}
  `;
