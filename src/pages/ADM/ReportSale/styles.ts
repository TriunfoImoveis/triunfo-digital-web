import styled from 'styled-components';

export const Export = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-end;

  > button {
    position: relative;
    width: 17.1rem;
    height: 4.8rem;

    margin: 0.8rem;
    box-shadow: ${({ theme }) => theme.boxShadow};
    border: 0;
    background-color: ${({ theme }) => theme.colors.buttonAddColor};
    border: 0;
    border-radius: 0.4rem;
    font-size: 1.6rem;
    line-height: 1.9rem;
    color: #fff;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${({ theme }) => theme.colors.buttonAddColorAlpha};
    }
  }
`;
export const TableSaleWrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.borderColor};
  width: 100%;
  height: 40rem;
  background-color: #f0f0f0;
  overflow-y: auto;
`;
export const Table = styled.table`
  width: 100%;
`;
export const Header = styled.thead`
  height: 4.1rem;
  background-color: ${({ theme }) => theme.colors.primaryAlpha};
  display: grid;
  grid-template-columns: repeat(9, 150px);
  > th {
    text-align: center;
    border-right: 1px solid ${({ theme }) => theme.colors.borderColor};
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
    padding: 1rem;
    font-size: 1.2rem;
  }
`;

export const Body = styled.tbody`
  > tr {
    display: grid;
    grid-template-columns: repeat(9, 1fr);
    > td {
      text-align: center;
      border-right: 1px solid ${({ theme }) => theme.colors.borderColor};
      border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
      padding: 1rem;
      font-size: 1.2rem;
    }
  }
`;

export const Footer = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  justify-content: flex-end;

  > button {
    position: relative;
    width: 17.1rem;
    height: 4.8rem;

    margin: 0.8rem;
    box-shadow: ${({ theme }) => theme.boxShadow};
    border: 0;
    background-color: #fff;
    border: 0.1rem solid ${({ theme }) => theme.colors.primary};
    border-radius: 0.4rem;
    font-size: 1.6rem;
    line-height: 1.9rem;
    color: ${({ theme }) => theme.colors.primary};
    transition: background-color 0.2s;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryAlpha};
    }
  }
`;
