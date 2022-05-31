import styled, { css } from 'styled-components';
import { shade } from 'polished';
import theme from '../../styles/theme';

interface ContainerProps {
  colors?: string;
  colorsText?: string;
  active?: boolean;
}
export const Container = styled.button<ContainerProps>`
  background: ${props => (props.colors ? props.colors : theme.colors.primary)};
  border-radius: 0.5rem;
  border: 0;
  height: 5rem;
  width: 100%;
  margin-top: 16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: background-color 0.2s;
  padding: 0 1rem;

  font-weight: bold;
  font-size: 2rem;
  line-height: 2.3rem;

  color: ${props => (props.colorsText ? props.colorsText : theme.colors.gold)};

  &:hover {
    ${props =>
      props.colors
        ? css`
            background-color: ${shade(0.2, props.colors)};
          `
        : css`
            background: ${shade(0.2, theme.colors.primary)};
          `}
  }

  ${props =>
    props.active &&
    css`
      background: ${({ theme }) => theme.colors.textColor};
    `};
  &:disabled {
    background: ${({ theme }) => theme.colors.textColor};
  }
`;
