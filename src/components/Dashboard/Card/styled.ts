import styled from 'styled-components';

export const Container = styled.div`
  width: 20rem;
  height: 10rem;

  border: 0.2rem solid ${({ theme }) => theme.colors.primary};
  border-radius: 0.5rem;

  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const Content = styled.div`
display: flex;
flex-direction: column;
align-items: center;
gap: 0.5rem;

> strong {
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
}

> span {
  font-size: 1.6rem;
  font-weight: bold;
}
`;
