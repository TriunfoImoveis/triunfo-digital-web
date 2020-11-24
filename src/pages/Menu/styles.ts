import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 0 3.2rem;
`;

export const Header = styled.div`
  padding: 3rem 0;
  margin: 0 auto;
  max-width: 1120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const NavBarContainer = styled.nav`
  display: flex;
  height: 100%;
`;
export const NavItemContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  & + div {
    margin-left: 2.4rem;
  }
  > svg {
    path {
      fill: #c32925;
    }
  }
  > a,
  button {
    background: none;
    border: 0;
    margin-left: 0.8rem;
    font-family: Roboto;
    font-style: normal;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
`;

export const Content = styled.div`
  max-width: 90rem;
  width: 100%;
  padding: 0 10rem;
  margin: 0 auto;
`;
export const UserContainer = styled.div`
  display: flex;

  img {
    width: 11rem;
    height: 11rem;
    border-radius: 50%;
    border: 0.3rem solid ${({ theme }) => theme.colors.primary};
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
`;

export const OptionsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  gap: 2rem;
  margin-top: 1.5rem;
`;
export const Option = styled(Link)`
  width: 100%;
  height: 20rem;
  border: 0.2rem solid #c32925;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1.5rem;
  text-decoration: none;
  transition: background 0.2s;
  > svg {
    width: 10rem;
    height: 10rem;
    path {
      fill: #c32925;
    }
  }

  > span {
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
`;
