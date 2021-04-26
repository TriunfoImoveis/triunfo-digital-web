import styled from 'styled-components';
import { shade } from 'polished';

export const SuccessContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > h1 {
    margin: 3rem 0;
    font-family: Roboto;
    font-weight: normal;
    font-size: 2rem;
    line-height: 3.5rem;
    color: #40b336;
  }

  strong {
    margin-top: 1rem;
    font-size: 1.6rem;
    font-weight: bold;
    color: #40b336;
  }

  p {
    color: #40b336;
    font-size: 1.2rem;
  }
  > svg {
    width: 100%;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 0.5rem;
    border: 0;
    color: ${({ theme }) => theme.colors.secondary};
    height: 5rem;
    width: 100%;
    margin-top: 16px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    transition: background-color 0.2s;

    font-weight: bold;
    font-size: 2rem;
    line-height: 2.3rem;

    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: none;
    &:hover {
      background: ${shade(0.2, '#C32925')};
    }
  }

  a + a {
    margin-left: 0.8rem;
  }

  .cancel,
  .next {
    height: 4.5rem;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 1.6rem;
    line-height: 1.9rem;

    color: #ffffff;
  }

  .cancel {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
    border: 0.1rem solid ${({ theme }) => theme.colors.primary};
    transition: background-color 0.2s;
  }

  .cancel:hover {
    background: ${({ theme }) => theme.colors.primaryAlpha};
  }

  @media (max-width: 425px) {
    > a {
      width: 16.5rem;
    }
    .cancel,
    .next {
      height: 3.6rem;
    }
  }
`;

export const FailedRegisterSale = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  > h1 {
    margin: 3rem 0;
    font-family: Roboto;
    font-weight: normal;
    font-size: 2rem;
    line-height: 3.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }
  > svg {
    width: 70%;
    height: 240px;
  }
`;
