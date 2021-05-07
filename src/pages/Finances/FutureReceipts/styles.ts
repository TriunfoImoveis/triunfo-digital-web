import styled from 'styled-components';

interface TableProps {
  cols?: number;
}

export const AccountContainer = styled.div`
  padding: 2rem 4rem;

  .tab-container,
  .tab-content {
    width: 100%;
  }

  .nav-tabs .nav-link.active {
    color: ${({ theme }) => theme.colors.primary};
    /* border-width: 4px; */
    background-color: ${({ theme }) => theme.colors.primaryAlpha};
    border-color: ${({ theme }) => theme.colors.primary};
  }

  .nav-tabs .nav-link {
    padding: 0.5rem 3rem;
    color: #504c4c;
    font-size: 1.2rem;
    border-radius: 1rem 1rem 0 0;
    border-color: rgba(195, 41, 37, 0.3);
    &:hover {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const TitlePane = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryAlpha};
  text-align: center;
  font-size: 1.6rem;
  font-weight: bold;
  color: #504c4c;
`;

export const Table = styled.table<TableProps>`
  width: 100%;
  thead,
  tbody {
    display: block;
  }

  tbody {
    overflow-y: auto;
    height: 200px;
    ::-webkit-scrollbar {
      width: 0;
      background: transparent;
    }
  }
  > thead {
    text-align: center;
    > tr {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      border: 1px solid #504c4c;

      > th {
        display: block;
        width: 140px;
        font-size: 1.4rem;
        font-weight: 500;
        color: #504c4c;
        & + th {
          border-left: 1px solid #504c4c;
        }
      }
    }
  }
  > tbody {
    text-align: center;

    > tr {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      border-left: 1px solid #504c4c;
      border-right: 1px solid #504c4c;
      border-bottom: 1px solid #504c4c;

      > td {
        text-align: center;
        font-size: 1.6rem;
        color: #504c4c;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        & + td {
          border-left: 1px solid #504c4c;
        }
      }
      .border-none {
        border: none;
        padding: 1.2rem;
        font-size: 2.4rem;
        font-weight: 500;
      }

      .total {
        padding: 1.2rem;
        border-bottom: 1px solid #504c4c;
        font-size: 1.8rem;
        font-weight: 500;
      }
    }
    .total-row {
      border-left: 0;
      border-bottom: 0;
    }
  }
  .PAGO {
    background-color: rgba(111, 207, 151, 0.5);
    color: #27ae60;
  }
  .VENCIDO {
    background-color: rgba(235, 87, 87, 0.3);
    color: ${({ theme }) => theme.colors.primary};
  }
  .PENDENTE {
    background-color: rgba(47, 128, 237, 0.3);
    color: #2f80ed;
  }
`;

export const BalanceAmount = styled.div`
  width: 100%;

  > p {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    > span {
      font-size: 2.4rem;
      margin-right: 1rem;
    }

    strong {
      font-size: 3.2rem;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const Background = styled.div`
  height: 100vh;
  background: #fff;
  padding: 0 2rem;
  z-index: 1;
`;

export const Container = styled.div`
  margin-top: 3rem;
  width: 100%;
  z-index: 1;
`;
export const Header = styled.div`
  width: 100%;
  h1 {
    font-size: 3.2rem;
    color: #504c4c;
  }
`;

export const Content = styled.main`
  margin-top: 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
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
