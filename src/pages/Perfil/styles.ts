import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 0 3.2rem;
`;
export const Header = styled.div`
  padding: 1rem 0;
  margin: 0 auto;
  max-width: 1120px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 1rem 0;
    a {
      > svg {
        width: 8rem;
      }
    }
  }
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
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: 0;
    margin-left: 0.8rem;
    font-family: Roboto;
    font-style: normal;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    > span {
      padding-left: 0.8rem;
    }
  }

  @media (max-width: 768px) {
    button {
      > span {
        display: none;
      }
    }
  }
`;

export const Content = styled.div`
  padding: 1rem 0;
  margin: 0 auto;
  max-width: 1120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 3.2rem;
    margin-bottom: 3.9rem;
  }

  @media (max-width: 500px) {
    h1 {
      font-size: 2rem;
      margin-bottom: 2.3rem;
    }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TabWrapper = styled.div`
  width: 70%;
  .nav-tabs {
    border-bottom: none;
  }
  .nav-tabs .nav-link.active {
    color: ${({ theme }) => theme.colors.primary};
    background-color: transparent;
    border-color: ${({ theme }) => theme.colors.primary}
      ${({ theme }) => theme.colors.primary} #fff;
  }

  .nav-tabs .nav-link {
    padding: 0.5rem 3rem;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.8rem;
    border-radius: 1rem 1rem 0 0;
    &:hover {
      border-color: ${({ theme }) => theme.colors.primaryAlpha}
        ${({ theme }) => theme.colors.primaryAlpha} #fff;
    }
  }

  @media (max-width: 500px) {
    .nav-link {
      width: 100%;
      display: flex;
      justify-content: center;
      border-radius: 0;
      &:hover {
        background-color: ${({ theme }) => theme.colors.primary};
        color: #fff;
        border-radius: 0;
      }
    }
    .nav-tabs .nav-link.active {
      background-color: ${({ theme }) => theme.colors.primary};
      color: #fff;
      border-radius: 0;
    }
  }
`;
