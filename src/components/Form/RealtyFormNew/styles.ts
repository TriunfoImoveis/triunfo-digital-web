import styled from 'styled-components';
import Input from '../../Input';

export const InputForm = styled(Input)`
  padding: 0 0.8rem;
`;

export const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;

  > div,
  select {
    width: 49%;
    margin-top: 0;
  }
  /* div + div {
    margin-left: 0.8rem;
  } */

  @media (max-width: 375px) {
    flex: 1;
    flex-direction: column;

    > div,
    select {
      width: 100%;
      margin-top: 0;
    }
    div + div {
      margin-left: 0;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;

  > button {
    width: 50%;
  }

  button + button {
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

    color: ${({ theme }) => theme.colors.gold};
  }

  .cancel {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.gold};
    border: 0.1rem solid ${({ theme }) => theme.colors.primary};
  }

  .next {
    &:hover {
      background: ${({ theme }) => theme.colors.primaryAlpha};
    }
  }

  @media (max-width: 425px) {
    .cancel,
    .next {
      height: 3.6rem;
    }
  }

  @media (max-width: 375px) {
    flex: 1;
    flex-direction: column;

    > button {
      width: 100%;
    }

    button + button {
      margin-left: 0;
    }
  }
`;
