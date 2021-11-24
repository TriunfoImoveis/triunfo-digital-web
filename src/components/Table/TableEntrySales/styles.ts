import styled from 'styled-components';


interface TableProps {
  cols?: number;
}

export const Wrapper = styled.div`
  display: block;
  width: 100%;
  height: auto;
  overflow-y: auto;
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
      grid-template-columns: repeat(${props => props.cols}, 140px);
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
  .VENCIDA {
    background-color: rgba(235, 87, 87, 0.3);
    color: ${({ theme }) => theme.colors.primary};
  }
  .PENDENTE {
    background-color: rgba(47, 128, 237, 0.3);
    color: #2f80ed;
  }
`;

