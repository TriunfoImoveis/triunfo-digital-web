import styled from 'styled-components';

export const Container = styled.div`
  padding: 3rem 0;
  margin: 0 auto;
  max-width: 1120px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > div {
    display: none;
  }

  @media (max-width: 768px) {
    padding: 1rem 0;
    > a {
      svg {
        width: 8rem;
      }
    }

    > div {
      display: initial;
    }
  }
`;

export const NavBarContainer = styled.nav`
  display: flex;
  height: 100%;

  @media (max-width: 768px) {
    display: none;
  }
`;
export const NavItemContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding-bottom: 1rem;

  &.active {
    border-bottom: 3px solid ${({ theme }) => theme.colors.primary};
  }
  &:hover {
    border-bottom: 3px solid ${({ theme }) => theme.colors.gold};
  }

  & + div {
    margin-left: 2.4rem;
  }
  > svg {
    width: 4rem;
    path {
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
  > a,
  button {
    margin-left: 0.8rem;
    font-family: Roboto;
    font-style: normal;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }

  > button {
    background: none;
    border: 0;
  }
`;
