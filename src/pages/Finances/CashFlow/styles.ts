import styled from 'styled-components';
import { darken } from 'polished';


export const Container = styled.div`
  margin-top: 3rem;
  max-width: 1280px;
  width: 100%;
  z-index: 10;

  padding: 2rem 4rem;

  .tab-content {
    max-width: 1120px;
  }
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

export const Filters = styled.div`
  width: 70%;
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
  padding: 0.5rem;

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

export const FiltersContainer = styled.div`
  width: 100%;
  z-index: 100;
`;

export const FiltersBotton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;
`;

export const FilterButtonGroup = styled.div`
  display: flex;
  > div + div {
    margin-left: 1.6rem;
  }
`;
export const FiltersBottonItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

    font-size: 1.8rem;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 17.1rem;
    height: 4.8rem;
    font-size: 1.4rem;
    background: #2d9cdb;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    border: 0;
    color: #fff;
    transition: background 0.2s;

    &:hover {
      background: ${darken(0.05, '#2d9cdb')};
    }
  }

  form {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    input {
      height: 4rem;
    }

    button {
      margin-top: 0;
      height: 4rem;
    }
  }
`;

export const SwitchButton = styled.div`
  margin-top: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  span {
    margin: 0 0.5rem;
    font-size: 1.4rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.textColor};
  }
`;