import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 0 3.2rem;
`;

export const Content = styled.div`
  width: 100%;
  padding: 1rem 10rem;
  margin: 0 auto;
  padding: 5rem 0;

  @media (max-width: 500px) {
    padding: 1rem 0;
  }
`;

export const ContainerCards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;
export const Box = styled.div`
  width: 100%;
  height: 10rem;
  border-radius: 0.5rem;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.4rem;
`;

export const BoxContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;

  strong {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.textColor};
  }
  span {
    font-size: 2rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
