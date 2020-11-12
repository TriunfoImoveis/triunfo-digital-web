import styled from 'styled-components';

export const Container = styled.div`
  height: 3.2rem;
  background-color: rgba(129, 129, 129, 0.1);

  display: flex;
  align-items: center;
  justify-content: center;

  span {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
