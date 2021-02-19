import styled from 'styled-components';

interface SaldBanksHeaderProps {
  showBanks: number;
}
export const Container = styled.div`
  margin-top: 3rem;
  max-width: 1280px;
  width: 100%;
  z-index: 100;
`;
export const Header = styled.div`
  width: 100%;
`;
export const SaldBanksContainer = styled.div`
  width: 100%;
`;
export const SaldBanksHeader = styled.div<SaldBanksHeaderProps>`
  display: flex;
  align-items: center;
  h1 {
    font-size: 2.4rem;
    color: #504c4c;
    margin-right: 0.8rem;
  }

  button {
    border: 0;
    background: transparent;
  }
`;
export const SaldBanks = styled.div`
  table {
    width: 100%;
    thead {
      border: 1px solid #000;
      tr {
        display: grid;
        grid-template-columns: repeat(11, 1fr);

        > th {
          padding: 0.5rem;

          & + th {
            border-left: 1px solid #000;
          }
          div {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            > span {
              font-size: 1.2rem;
              color: #504c4c;
            }
          }
        }
      }
    }

    tbody {
      tr {
        display: grid;
        grid-template-columns: repeat(11, 1fr);
        > td {
          & + td {
            border-left: 1px solid #000;
            border-bottom: 1px solid #000;
          }
          text-align: center;
          font-size: 1.2rem;
          color: #504c4c;
          font-weight: bold;
        }
        > td:first-child {
          border-left: 1px solid #000;
          border-bottom: 1px solid #000;
        }
        > td:last-child {
          border-right: 1px solid #000;
        }
      }
    }
  }
`;

export const Content = styled.main`
  margin-top: 3rem;
  width: 100%;
  padding: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Filters = styled.div`
  width: 70%;
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
  padding: 0.5rem;

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

export const BalanceContainer = styled.div`
  width: 100%;
  padding: 2rem 4rem;

  .tab-container,
  .tab-content {
    max-width: 435px;
    width: 100%;
  }

  .nav-tabs .nav-link.active {
    color: ${({ theme }) => theme.colors.primary};
    /* border-width: 4px; */
    background-color: ${({ theme }) => theme.colors.primaryAlpha};
    border-color: #000 #000 #f8f8f8 #000;
  }

  .nav-tabs .nav-link {
    padding: 0.5rem 3rem;
    color: #000;
    font-size: 1.8rem;
    border-radius: 1rem 1rem 0 0;
    &:hover {
      border-color: #000 #000 #f8f8f8 #000;
    }
  }
`;

export const TitlePane = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryAlpha};
  text-align: center;
  font-size: 1.6rem;
  font-weight: bold;
  color: '#504C4C';
  border-left: 1px solid #000;
  border-right: 1px solid #000;
  border-top: 1px solid #000;
`;

export const Table = styled.table`
  width: 100%;
  > thead {
    text-align: center;
    > tr {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      border: 1px solid #000;

      > th {
        font-size: 1.6rem;
        color: '#504C4C';
        & + th {
          border-left: 1px solid #000;
        }
      }
    }
  }
  > tbody {
    text-align: center;
    > tr {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      border-left: 1px solid #000;
      border-right: 1px solid #000;
      border-bottom: 1px solid #000;

      > td {
        font-size: 1.6rem;
        color: '#504C4C';
        & + td {
          border-left: 1px solid #000;
        }
      }
    }
  }
`;
