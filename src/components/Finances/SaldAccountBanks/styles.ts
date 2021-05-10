import styled from 'styled-components';

type SaldBanksProps = {
  quantCols: number;
};
export const SaldBanksContainer = styled.div`
  width: 100%;
`;
export const SaldBanksHeader = styled.div`
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
export const SaldBanks = styled.div<SaldBanksProps>`
  table {
    width: 100%;
    thead {
      border: 1px solid #000;
      tr {
        display: grid;
        grid-template-columns: ${props => `repeat(${props.quantCols}, 1fr)`};

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
        grid-template-columns: ${props => `repeat(${props.quantCols}, 1fr)`};
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

export const SyncBankBalance = styled.div`
  width: 100%;
  button {
    width: 100%;
  }
`;
