import styled, { css } from 'styled-components';

interface ItemsProps {
  status: string;
}
export const Container = styled.div`
  padding: 3rem 2rem;
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
`;
export const LabelContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
`;
export const SalesContainer = styled.div`
  padding: 2rem 3rem;
`;
export const Item = styled.div<ItemsProps>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: center;
  padding: 2rem 3rem;
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
    padding-left: 5rem;

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
`;

export const Text = styled.span`
  font-size: 3rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.textColor};
`;
