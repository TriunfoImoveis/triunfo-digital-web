import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  height: 100vh;
  padding: 0 1.6rem;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding-bottom: 1.6rem;

  > svg {
    margin-top: 5.2rem;
    width: 30rem;
    margin-bottom: 5rem;
  }

  h1 {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 3.2rem;
    line-height: 3.7rem;
    color: ${({ theme }) => theme.colors.primary};

    margin-bottom: 4.3rem;
  }

  form {
    width: 37rem;
    > div {
      margin-bottom: 1.6rem;
    }
  }

  @media (max-width: 375px) {
    > svg {
      margin-top: 1.2rem;
      width: 8rem;
      margin-bottom: 1.4rem;
    }

    > h1 {
      font-size: 1.8rem;
      margin-bottom: 1rem;
    }
    > form {
      width: 30rem;
    }
  }
`;

export const ForgotPassword = styled(Link)`
  margin-top: 3rem;
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.textColor};
  transition: 0.2s;
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
`;

export const ForgotDescrption = styled.div`
  width: 37rem;
  height: 5rem;
  background-color: ${({ theme }) => theme.colors.primaryAlpha};
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 0.8rem;

  p {
    font-size: 1.4rem;
    font-style: italic;
    text-align: justify;
  }
`;
