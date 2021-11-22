import styled from 'styled-components';

interface TableProps {
  cols?: number;
}

export const Container = styled.div`
  margin-top: 3rem;
  width: 100%;
  z-index: 1;
  h2 {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
export const Header = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Content = styled.main`
  margin-top: 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const Filters = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem;
`;
export const Filter = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;

  background-color: rgba(196, 196, 169, 0.2);
  & + & {
    margin-left: 3rem;
  }

  span {
    margin-left: 1.6rem;
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.textColor};
  }
  > input {
    background: transparent;
    border: none;
    padding-left: 0.8rem;
  }

  > select {
    background: transparent;
    border: none;
    padding-left: 0.8rem;

    cursor: pointer;
    flex: 1;
    height: 100%;
    border: 0;
    background-color: transparent;
    text-align: center; /* para firefox */
    text-align-last: center; /* para chrome */
    font-size: 2rem;
    color: ${({ theme }) => theme.colors.textColor};
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 1px;
    text-overflow: '';
    margin-right: 0.8rem;
  }
`;

export const Footer = styled.div`
  width: 100%;
  padding: 2rem 4.5rem;
`;
export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  > button {
    border: 0;
    background: transparent;
  }
  > a,
  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-decoration: none;

    > svg {
      width: 5rem;
      height: 5rem;
      color: ${({ theme }) => theme.colors.primary};
    }

    > span {
      margin-top: 0.8rem;
      font-size: 1.6rem;
      color: ${({ theme }) => theme.colors.primary};
      font-weight: 500;
    }

    & + a,
    & + button {
      margin-left: 6rem;
    }
    &:hover {
      > svg {
        > path {
          fill: ${({ theme }) => theme.colors.primaryAlpha};
        }
      }

      > span {
        color: ${({ theme }) => theme.colors.primaryAlpha};
      }
    }
  }
`;
