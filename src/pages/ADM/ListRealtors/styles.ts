import styled from 'styled-components';
import { darken } from 'polished';

export const FiltersContainer = styled.div`
  width: 100%;
  z-index: 100;
`;
export const FiltersTop = styled.div`
  display: flex;
  align-items: center;

  div + div {
    margin-left: 0.8rem;
  }
`;
export const FiltersBotton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
`;
export const Input = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(196, 196, 196, 0.2);

  width: 80rem;
  height: 4.4rem;
  padding: 0 0.5rem;

  input {
    width: 100%;
    padding: 0.8rem;
    background: transparent;
    border: none;
    color: #707070;
    font-size: 2rem;
    z-index: 10;
  }
`;

export const FilterDiv = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(196, 196, 196, 0.2);
  z-index: 10;

  width: 19rem;
  height: 4.4rem;
  padding: 0 0.5rem;

  > select {
    width: 100%;
    height: 100%;
    background: transparent;
    border: 0;
    font-size: 2rem;
    color: #707070;
    padding: 0 1rem;
    z-index: 10;
  }
`;

export const FilterItem = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3.2rem;
  z-index: 10;

  span {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: ${({ theme }) => theme.fontSize.large};
    line-height: 2.3rem;

    color: ${({ theme }) => theme.colors.primary};
  }

  select {
    width: 170px;
    height: 48px;
    padding-left: 2rem;

    border: 0.1rem solid #818181;
    box-sizing: border-box;
    border-radius: 0.4rem;

    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;

    color: #818181;
  }
`;

export const FiltersBottonItems = styled.div`
  z-index: 10;
  margin: 1.2rem 0;

  span {
    z-index: 10;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 2rem;
    color: #c32925;
  }
  select {
    z-index: 10;
    width: 17rem;
    height: 4.8rem;

    border: 0.1rem solid #818181;
    box-sizing: border-box;
    border-radius: 0.4rem;
    color: #818181;
    padding: 0 0.5rem;

    font-size: 2rem;
  }

  button[type='button'] {
    width: 17.1rem;
    height: 4.8rem;

    background: #f2c94c;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    border: 0;
    color: #fff;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.05, '#F2C94C')};
    }
  }
`;

export const Content = styled.div`
  margin: 0 auto;
  max-width: 1120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;

  margin-top: 3rem;
`;

export const SaleTableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const SaleHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;
export const HeaderItem = styled.div`
  width: 15rem;
  height: 5rem;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;

  /* Primary Triunfo */

  color: #c32925;
`;

export const SaleBody = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  height: 10rem;
  border-radius: 10rem;
  box-shadow: ${({ theme }) => theme.boxShadow};
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.background};

  margin-bottom: 0.8rem;
`;
export const SaleItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;

  &.avatar {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    > img {
      width: 8.8rem;
      height: 8.8rem;
      border-radius: 50%;
      margin-left: 0.8rem;
    }
  }

  font-size: 2rem;
  color: ${({ theme }) => theme.colors.textColor};

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.textColor};
    transition: color 0.2s;
    svg {
      margin-right: 0.5rem;
    }

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
export const LoadingContainer = styled.div`
  margin-top: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
