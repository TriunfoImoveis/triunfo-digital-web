import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 0 3.2rem;
`;

export const Content = styled.div`
  max-width: 90rem;
  width: 100%;
  padding: 1rem 10rem;
  margin: 0 auto;

  @media (max-width: 500px) {
    padding: 1rem 0;
  }
`;

export const OptionsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  gap: 2rem;
  margin-top: 1.5rem;

  @media (max-width: 375px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
export const Option = styled(Link)`
  width: 100%;
  height: 20rem;
  border: 0.2rem solid ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 1.5rem;
  text-decoration: none;
  transition: background 0.2s;
  padding: 1.8rem 0;
  box-shadow: ${({ theme }) => theme.boxShadow};
  > svg {
    width: 10rem;
    height: 10rem;
    path {
      fill: ${({ theme }) => theme.colors.primary};
    }
  }

  > span {
    padding: 1.8rem 0;
    font-weight: 500;
    font-size: 3.2rem;
    line-height: 3.7rem;
    text-align: center;

    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    background: ${({ theme }) => theme.colors.primaryAlpha};
    text-decoration: none;

    > svg {
      path {
        fill: ${({ theme }) => theme.colors.gold};
      }
    }

    span {
      color: ${({ theme }) => theme.colors.gold};
    }
  }

  @media (max-width: 768px) {
    > span {
      font-size: 20px;
      line-height: 23px;
      text-align: center;
    }
  }

  @media (max-width: 375px) {
    width: 20rem;
    height: 20rem;

    > svg {
      width: 5rem;
      height: 5rem;
    }

    > span {
      font-size: 20px;
      line-height: 23px;
      text-align: center;
    }
  }
`;