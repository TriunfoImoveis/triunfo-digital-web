import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 0 3.2rem;
`;

export const Content = styled.div`
  max-width: 90rem;
  width: 100%;
  padding: 1rem 10rem;
  margin: 0 auto;
  padding: 5rem 0;

  @media (max-width: 500px) {
    padding: 1rem 0;
  }
`;
export const UserContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;

  span {
    font-size: 2rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textColor};
  }
`;
export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding-left: 2.5rem;

  span {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 3.2rem;
    line-height: 3.7rem;

    color: #797777;
    &.office {
      font-size: 2rem;
    }
  }

  @media (max-width: 500px) {
    > span {
      font-size: 2rem;

      &.office {
        font-size: 1.6rem;
      }
    }
  }
`;

export const OptionsContainer = styled.div`
  width: 100%;
  margin-top: 1.5rem;

  @media (max-width: 375px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
export const Option = styled(Link)`
  width: 100%;
  height: 20rem;
  border: 0.2rem solid #c32925;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1.5rem;
  text-decoration: none;
  transition: background 0.2s;
  padding: 1.8rem 0;
  box-shadow: ${({ theme }) => theme.boxShadow};
  margin-bottom: 2rem;

  > svg {
    width: 10rem;
    height: 10rem;
    path {
      fill: #c32925;
    }
  }

  > span {
    margin-left: 1rem;
    padding: 1.8rem 0;
    font-weight: 500;
    font-size: 3.2rem;
    line-height: 3.7rem;
    text-align: center;

    color: #c32925;
  }

  &:hover {
    background: #a11f1c;

    > svg {
      path {
        fill: #fff;
      }
    }

    span {
      color: #fff;
    }
  }

  @media (max-width: 768px) {
    > span {
      font-size: 20px;
      line-height: 23px;
      text-align: center;
    }
  }

  @media (max-width: 375px) {
    width: 20rem;
    height: 20rem;

    > svg {
      width: 5rem;
      height: 5rem;
    }

    > span {
      font-size: 20px;
      line-height: 23px;
      text-align: center;
    }
  }
`;
