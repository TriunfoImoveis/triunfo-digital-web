import styled from 'styled-components';

interface TableProps {
  cols?: number;
}

export const TitlePane = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryAlpha};
  text-align: center;
  font-size: 1.6rem;
  font-weight: bold;
  color: #504c4c;
`;

export const ContentWrapper = styled.div`
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0;
    background: transparent;
  }
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
      grid-template-columns: repeat(${props => props.cols}, 1fr);
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
      grid-template-columns: repeat(${props => props.cols}, 1fr);
      border-left: 1px solid #504c4c;
      border-right: 1px solid #504c4c;
      border-bottom: 1px solid #504c4c;

      > td {
        font-size: 1.6rem;
        color: #504c4c;
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
