import styled from 'styled-components';
import Input from '../../Input';

export const Container = styled.div`
  padding-bottom: 1.6rem;
  form {
    margin-top: 1.2rem;
  }
  .nav-tabs {
    /* border-bottom: none; */
    /* border-width: 4px; */
    border-color: ${({ theme }) => theme.colors.primary};
  }
  .nav-tabs .nav-link.active {
    color: ${({ theme }) => theme.colors.primary};
    /* border-width: 4px; */
    background-color: transparent;
    border-color: ${({ theme }) => theme.colors.primary}
      ${({ theme }) => theme.colors.primary} #f8f8f8;
  }

  .nav-tabs .nav-link {
    padding: 0.5rem 3rem;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.8rem;
    border-radius: 1rem 1rem 0 0;
    &:hover {
      border-color: ${({ theme }) => theme.colors.primaryAlpha}
        ${({ theme }) => theme.colors.primaryAlpha} #f8f8f8;
    }
  }

  @media screen and (max-width: 700px) {
    width: 100%;
    .nav-link {
      width: 100%;
      display: flex;
      justify-content: center;
      /* border-radius: 0; */
      &:hover {
        background-color: ${({ theme }) => theme.colors.primary};
        color: #fff;
        /* border-radius: 0; */
      }
    }
    .nav-tabs .nav-link.active {
      background-color: ${({ theme }) => theme.colors.primary};
      color: #fff;
      /* border-radius: 0; */
    }
  }
`;
export const InputForm = styled(Input)`
  padding: 0 0.8rem;
`;

export const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;

  > div,
  select,
  input {
    width: 49%;
    margin-top: 0;
  }

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

    color: #ffffff;
  }

  .cancel {
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
    border: 0.1rem solid ${({ theme }) => theme.colors.primary};
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
