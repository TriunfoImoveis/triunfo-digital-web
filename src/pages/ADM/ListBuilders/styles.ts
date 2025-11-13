import styled from 'styled-components';
import { darken } from 'polished';
import theme from '../../../styles/theme';

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
  background-color: ${({ theme }) => theme.colors.grayAlpha};

  width: 80rem;
  height: 4.4rem;
  padding: 0 0.5rem;

  input {
    width: 100%;
    padding: 0.8rem;
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.gray};
    font-size: 2rem;
    z-index: 10;
  }
`;

export const FilterDiv = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.grayAlpha};
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
    color: ${({ theme }) => theme.colors.gray};
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

    border: 0.1rem solid ${({ theme }) => theme.colors.borderColor};
    box-sizing: border-box;
    border-radius: 0.4rem;

    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 23px;

    color: ${({ theme }) => theme.colors.borderColor};
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
    color: ${({ theme }) => theme.colors.gold};
  }
  select {
    z-index: 10;
    width: 17rem;
    height: 4.8rem;

    border: 0.1rem solid ${({ theme }) => theme.colors.borderColor};
    box-sizing: border-box;
    border-radius: 0.4rem;
    color: ${({ theme }) => theme.colors.borderColor};
    padding: 0 0.5rem;

    font-size: 2rem;
    margin-right: 1.6rem;
  }

  > a {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    width: 17.1rem;
    height: 4.8rem;

    background: ${({ theme }) => theme.colors.primary};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    border: 0;
    color: ${({ theme }) => theme.colors.gold};
    font-size: 1.4rem;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.05, `${theme.colors.primary}`)};
    }
  }

  button {
    width: 8rem;
    height: 4.8rem;
    border: none;
    background-color: ${({ theme }) => theme.colors.primary};

    > svg {
      stroke: ${({ theme }) => theme.colors.gold};
    }

    border-radius: 0.4rem;
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
  grid-template-columns: repeat(5, 1fr);
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

  color: ${({ theme }) => theme.colors.primary};
`;

export const SaleBody = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
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

  > a {
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
