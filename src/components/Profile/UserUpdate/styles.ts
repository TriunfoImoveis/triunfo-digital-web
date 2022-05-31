import styled from 'styled-components';

export const LogonInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2 {
    margin-top: 2rem;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  > form {
    display: flex;
    flex-direction: column;
    align-items: center;
    button {
      margin: 0.8rem 0;
      width: 27rem;
      height: 4.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: 0.2rem solid ${({ theme }) => theme.colors.primary};
      border-radius: 0.5rem;

      > span {
        margin-right: 0.5rem;

        font-size: 1.6rem;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.primary};
      }

      > svg {
        path {
          fill: ${({ theme }) => theme.colors.primary};
        }
      }
    }
  }

  @media (max-width: 500px) {
    width: 100%;
    h2 {
      font-size: 1.6rem;
    }
  }
`;

export const FormContent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  gap: 3rem;

  margin-bottom: 5rem;

  @media (max-width: 500px) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;
export const Input = styled.div`
  display: flex;
  flex-direction: column;
  .label {
    margin: 0.8rem 0;
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    /* identical to box height */

    color: #898989;
  }

  > div {
    > div {
      padding: 0 0.8rem;

      > input {
        font-size: 2rem;
      }
    }
  }
`;
