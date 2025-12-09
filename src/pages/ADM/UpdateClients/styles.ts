import styled from 'styled-components';

export const Container = styled.div`
  max-width: 960px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin: 0 0 2.4rem;
    font-size: 3.2rem;
    line-height: 3.7rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 1.2rem;
    flex: 1;
  }

  .tab-container {
    width: 100%;
  }

  .tab-content,
  .tab-pane {
    width: 100%;
  }

  .nav-tabs {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  .nav-tabs .nav-link.active {
    color: ${({ theme }) => theme.colors.primary};
    background-color: transparent;
    border-color: ${({ theme }) => theme.colors.primary}
      ${({ theme }) => theme.colors.primary} #f8f8f8;
  }

  .nav-tabs .nav-link {
    padding: 0.5rem 3rem;
    color: ${({ theme }) => theme.colors.primary};
    font-size: 1.6rem;
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
      &:hover {
        background-color: ${({ theme }) => theme.colors.primary};
        color: #fff;
      }
    }
    .nav-tabs .nav-link.active {
      background-color: ${({ theme }) => theme.colors.primary};
      color: #fff;
    }
  }
`;
