import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 1000
`;

export const Filter = styled.div`
  width: 20%;
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Avatar = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0.8rem;

  img {
    width: 13.5rem;
    height: 13.5rem;
    border-radius: 50%;
    margin: 1.8rem 0;
    border: 0.1rem solid ${({ theme }) => theme.colors.primary};
  }

  label {
    width: 14.5rem;
    height: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 0.2rem solid ${({ theme }) => theme.colors.primary};
    border-radius: 0.5rem;

    > input {
      display: none;
    }
    > span {
      margin-right: 0.5rem;

      font-size: 1.6rem;
      font-weight: bold;
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 10rem;
      height: 10rem;
    }

    button {
      width: 11.5rem;
      height: 3.2rem;

      > span {
        margin-right: 0.5rem;
        font-size: 1.2rem;
      }
    }
  }
`;

export const AvatarName = styled.p`
  font-size: 2rem;
  font-weight: bold;
`;

export const InforUser = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.8rem 0.8rem;

  @media (max-width: 500px) {
    margin: 1.8rem 0;
  }
`;

export const Main = styled.main`
  width: 70%;
  border: 1px solid #000;
  
`;

export const CardContainer = styled.section`
  display: flex;
  gap: 1rem;
`;
