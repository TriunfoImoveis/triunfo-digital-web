import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 0 3.2rem;
`;

export const Content = styled.div`
  width: 100%;
  padding: 1rem 10rem;
  margin: 0 auto;
  padding: 5rem 0;

  @media (max-width: 500px) {
    padding: 1rem 0;
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
    color: ${({ theme }) => theme.colors.primary};
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

export const ContainerCards = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;
export const Box = styled.div`
  width: 100%;
  height: 10rem;
  border-radius: 0.5rem;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.4rem;
`;

export const BoxContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;

  strong {
    font-size: 1.2rem;
    color: ${({ theme }) => theme.colors.textColor};
  }
  span {
    font-size: 2rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.primary};
  }
`;
