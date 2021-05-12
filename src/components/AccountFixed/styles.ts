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

export const InputGroup = styled.div`
  display: flex;

  > div {
    flex: 1;

    & + div {
      margin-left: 4rem;
    }
  }
`;
