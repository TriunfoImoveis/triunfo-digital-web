import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 0.5rem;
  border: 0;
  color: ${({ theme }) => theme.colors.secondary};
  height: 5rem;
  width: 100%;
  margin-top: 16px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: background-color 0.2s;

  font-weight: bold;
  font-size: 2rem;
  line-height: 2.3rem;

  color: ${({ theme }) => theme.colors.secondary};
  &:hover {
    background: ${shade(0.2, '#C32925')};
  }
`;
