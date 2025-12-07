import styled from 'styled-components';

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
export const InputGroup = styled.div``;

export const ButtonGroup = styled.div``;
