import styled from 'styled-components';

export const Container = styled.header`
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
