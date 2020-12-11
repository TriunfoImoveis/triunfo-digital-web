import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  label {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.textColor};
    margin-right: 0.8rem;
  }

  input {
    margin-right: 0.8rem;

    &[type='checkbox']:checked:after {
      width: 15px;
      height: 15px;
      border-radius: 15px;
      top: -2px;
      left: -1px;
      position: relative;
      background-color: ${({ theme }) => theme.colors.primary};
      content: '';
      display: inline-block;
      visibility: visible;
      border: 2px solid white;
    }
  }

  @media (max-width: 375px) {
    label {
      font-size: 1.2rem;
    }
  }
`;
