import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  button {
    background: transparent;
    border: none;

    svg:hover {
      fill: ${({ theme }) => theme.colors.gold};
      stroke: ${({ theme }) => theme.colors.gold};
    }
  }
`;
