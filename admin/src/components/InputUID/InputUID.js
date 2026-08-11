import styled from 'styled-components';
import { InputText } from '@punch-in/buffet-modern-core';
import { colors } from '@punch-in/buffet-modern-styles';

/* eslint-disable indent */
const InputUID = styled(InputText)`
  width: 100%;

  ${({ containsEndAdornment }) =>
    containsEndAdornment &&
    `
      > input {
        padding-right: calc(40px + 1rem);
      }
    `}

  ${({ error }) =>
    error &&
    `
      > input {
        border-color: ${colors.darkOrange};
      }
    `}
`;

export default InputUID;
