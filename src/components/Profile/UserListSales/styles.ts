import styled, { css } from 'styled-components';

interface ItemsProps {
  status: string;
}
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

  @media (max-width: 500px) {
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
  margin-top: 3rem;

  @media (max-width: 500px) {
    width: 100%;
  }
`;
export const LabelContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media (max-width: 768px) {
    display: flex;
  }
`;
export const LabelItems = styled.div`
  text-align: center;
  padding: 2rem 3rem;
  display: flex;
  align-items: center;
  justify-content: center;

  > .label {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 2rem;
    line-height: 2.3rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 768px) {
    padding: 0 2rem;
    > .label {
      font-size: 1.2rem;
      line-height: 1.2rem;
      word-wrap: break-word;
    }
  }
`;
export const SalesContainer = styled.div`
  padding: 2rem 3rem;
  @media (max-width: 768px) {
    padding: 0;
  }
`;
export const Item = styled.div<ItemsProps>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: center;
  /* padding: 2rem 3rem; */
  background: #fff8f8;
  border: 1px solid rgba(121, 119, 119, 0.3);
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(137, 137, 137, 0.5);
  border-radius: 100px;
  transform: matrix(1, 0.01, 0, 1, 0, 0);
  margin-bottom: 0.8rem;

  > .property,
  .date,
  .status {
    text-align: left;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 2rem;
    line-height: 2.3rem;
    color: #898989;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .date,
  .status {
    text-align: center;
  }

  .status {
    font-size: 2.4rem;
    color: #ec2527;

    ${props =>
      props.status === 'PAGO_TOTAL' &&
      css`
        color: ${({ theme }) => theme.colors.success};
      `}
    ${props =>
      props.status === 'PENDENTE' &&
      css`
        color: ${({ theme }) => theme.colors.warning};
      `}
  }

  @media (max-width: 768px) {
    display: flex;

    > .property,
    .date,
    .status {
      font-size: 1.2rem;
      line-height: 1rem;
      padding: 0 2rem;
    }
    .property:first-child {
      padding: 0;
    }
  }
`;

export const Text = styled.span`
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

  @media (max-width: 768px) {
    width: 768px;
    table {
      th {
        padding: 0.8rem;
        font-size: 1rem;
        line-height: 1.2rem;
      }
    }
  }
`;
