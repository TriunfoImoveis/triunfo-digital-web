import styled from 'styled-components';

export const ContainerWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    font-size: 2.4rem;
    color: ${({ theme }) => theme.colors.primary};
    font-weight: bold;
    margin-bottom: 1rem;
  }

  @media (max-width: 450px) {
    h3 {
      font-size: 1.4rem;
    }
  }
  @media (max-width: 350px) {
    h3 {
      font-size: 1.4rem;
    }
  }
`;
export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.8rem;

  @media (max-width: 450px) {
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 350px) {
    display: flex;
    flex-direction: column;

    button + button {
      margin-top: 1rem;
    }
  }
`;
export const CancelButton = styled.button`
  height: 20rem;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background: #f5f5f5;

  > svg {
    width: 10rem;
    height: 10rem;
    color: ${({ theme }) => theme.colors.primary};
  }
  p {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 450px) {
    height: 10rem;

    > svg {
      width: 5rem;
      height: 5rem;
    }
    p {
      font-size: 1.6rem;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
  @media (max-width: 350px) {
    height: 10rem;

    > svg {
      width: 5rem;
      height: 5rem;
    }
    p {
      font-size: 1.6rem;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
export const LogoutButton = styled.button`
  height: 20rem;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  background: #f5f5f5;

  > svg {
    width: 10rem;
    height: 10rem;
    color: ${({ theme }) => theme.colors.primary};
  }
  p {
    font-size: 3rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    border-color: #f5f5f5;
    background-color: ${({ theme }) => theme.colors.primary};

    > svg {
      color: #fff;
    }
    p {
      color: #fff;
    }
  }

  @media (max-width: 450px) {
    height: 10rem;

    > svg {
      width: 5rem;
      height: 5rem;
    }
    p {
      font-size: 1.6rem;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
  @media (max-width: 350px) {
    height: 10rem;

    > svg {
      width: 5rem;
      height: 5rem;
    }
    p {
      font-size: 1.6rem;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
