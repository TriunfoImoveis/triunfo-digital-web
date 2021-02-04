import styled from 'styled-components';

export const Container = styled.div`
  padding: 3rem 2rem;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0;
  }
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > .title {
    font-style: normal;
    font-weight: 500;
    font-size: 2.4rem;
    line-height: 2.8rem;
    color: ${({ theme }) => theme.colors.textColor};
  }

  @media (max-width: 700px) {
    margin-top: 2rem;
    flex-direction: column;

    > .title {
      margin-bottom: 3rem;
    }
  }
`;
export const Filter = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 22rem;
  height: 4.4rem;
  padding: 0.8rem;

  background: rgba(196, 196, 196, 0.2);
  border-radius: 0.4rem;

  > select {
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
  }
`;

export const ListSalesContainer = styled.div`
  width: 100%;
  margin-top: 3rem;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const Text = styled.span`
  display: block;
  margin-top: 5rem;
  font-size: 3rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textColor};
`;

export const TableContainer = styled.section`
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 1rem;
    th {
      color: ${({ theme }) => theme.colors.primary};
      font-weight: bold;
      padding: 2rem;
      text-align: center;
      font-size: 2rem;
      line-height: 2.4rem;
    }
    tbody {
      tr {
        box-shadow: 0px 4px 4px rgba(137, 137, 137, 0.5);
        border-radius: 10rem;
      }
    }
    td {
      padding: 2rem;
      background: #fff8f8;
      font-size: 2rem;
      font-weight: 500;
      color: #969cb3;
      text-align: center;
      background: #fff8f8;
      border-top: 1px solid #797777;
      border-bottom: 1px solid #797777;

      > .rLabel {
        display: none;
      }
      &.property {
        font-weight: 400;
      }
      &.PAGO_TOTAL {
        color: ${({ theme }) => theme.colors.success};
      }

      &.CAIU {
        color: ${({ theme }) => theme.colors.primary};
      }
      &.NAO_VALIDADO {
        color: ${({ theme }) => theme.colors.primary};
      }
      &.PENDENTE {
        color: ${({ theme }) => theme.colors.warning};
      }
    }
    td:first-child {
      border-radius: 10rem 0 0 10rem;
      border-left: 1px solid #797777;
    }
    td:last-child {
      border-radius: 0 10rem 10rem 0;
      border-right: 1px solid #797777;
    }
  }

  @media screen and (max-width: 768px) {
    table {
      th {
        display: none;
      }

      > tbody {
        > tr {
          display: flex;
          flex-direction: column;
          margin-bottom: 0.8rem;
          box-shadow: none;

          td {
            position: relative;
            > .rLabel {
              display: initial;
              position: absolute;
              top: 0;
              left: 0;
              margin: 1rem;
              font-size: 1.6rem;
              color: ${({ theme }) => theme.colors.primary};
              font-weight: bold;
            }
            border-right: 1px solid #797777;
            border-left: 1px solid #797777;
          }
          td:first-child {
            border-radius: 1rem 1rem 0 0;
            border-top: 1px solid #000;
          }
          td:last-child {
            border-radius: 0 0 1rem 1rem;
            border-bottom: 1px solid #000;
          }
        }
      }
    }
  }
  @media screen and (max-width: 400px) {
    table {
      > tbody {
        > tr {
          td {
            > .rLabel {
              font-size: 1.2rem;
            }
          }
        }
      }
    }
  }
`;
