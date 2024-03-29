import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled?: boolean;
  isErrored: boolean;
  label: string | undefined;
}

export const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* position: relative; */

  > span.label {
    margin-top: 0.8rem;
    padding-bottom: 0.2rem;
    font-size: 1.6rem;
    line-height: 1.9rem;
    color: #898989;
  }

  @media (max-width: 500px) {
    span.label {
      font-size: 1.2rem;
    }
  }
`;
export const Container = styled.div<ContainerProps>`
  display: flex;

  cursor: pointer;
  border: 0.1rem solid ${({ theme }) => theme.colors.textColorAlpha};
  border-radius: ${({ theme }) => theme.borderRadius};

  .select-container,
  .select__control,
  .select__control--is-focused,
  .select__control--menu-is-open,
  .select__menu,
  .select__menu-list,
  .select__options,
  .css-1pahdxg-control {
    border: none;
    box-shadow: none;
    font-size: 1.4rem;
    z-index: 10;
  }

  .css-2b097c-container {
    width: 100%;
  }

  .select__single-value {
    color: ${({ theme }) => theme.colors.textColor};
    font-size: 1.4rem;
  }

  .select__input {
    color: ${({ theme }) => theme.colors.textColor};
  }
  .select__placeholder {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.textColorAlpha};
  }
  /* .select__indicators {
    display: none;
  } */

  .select__menu {
    z-index: 100;
    border: 0.1rem solid ${({ theme }) => theme.colors.textColorAlpha};
  }
  .select__option {
    background-color: ${({ theme }) => theme.colors.background};
    font-size: 1.6rem;
    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
      color: #fff;
    }
  }

  .select__option--is-selected {
    background-color: ${({ theme }) => theme.colors.primary};
    color: #fff;
  }

  .select__indicators {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 0 0.4rem 0.4rem 0;
    cursor: pointer;
    > span {
      display: none;
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryAlpha};
    }
  }

  .select__dropdown-indicator {
    color: #fff;
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  .select__clear-indicator {
    color: #fff;
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: ${({ theme }) => theme.colors.danger};
    `}
  ${props =>
    props.isFocused &&
    css`
      color: ${({ theme }) => theme.colors.primary};
      border-color: ${({ theme }) => theme.colors.borderColor};
    `} 
  ${props =>
    props.isFilled &&
    css`
      color: ${({ theme }) => theme.colors.primary};
    `}

  @media (max-width: 375px) {
    select,
    option {
      font-size: 1.2rem;
    }
  }
`;

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.9rem;
  border: 0;
  border-radius: 0 0.4rem 0.4rem 0;
  background: ${({ theme }) => theme.colors.primary};
`;
export const Error = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.fontSize.tiny};
  color: ${({ theme }) => theme.colors.danger};
  margin-top: 0.4rem;
`;
