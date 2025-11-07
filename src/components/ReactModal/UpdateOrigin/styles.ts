import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  form {
    width: 100%;
    h3 {
      font-size: 2rem;
      font-weight: 500;
      line-height: 2.2rem;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
  .add-button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 34.4rem;
    height: 4.9rem;
    background-color: #6fcf97;

    > svg {
      width: 2.5rem;
      height: 2.5rem;
      margin-right: 2rem;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding-left: 3.2rem;
  padding-bottom: 1.2rem;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    margin-right: 0.8rem;
    height: 6rem;

    background: none;
    border: 0.1rem solid ${({ theme }) => theme.colors.primary};
    /* Primary Triunfo */
    box-sizing: border-box;
    border-radius: 4px;

    > svg {
      path {
        fill: ${({ theme }) => theme.colors.primary};
      }
    }

    > span {
      margin-left: 3.7rem;
      font-size: 24px;
      line-height: 28px;

      color: ${({ theme }) => theme.colors.primary};
    }
  }

  > button + button {
    margin-left: 3rem;
  }
`;