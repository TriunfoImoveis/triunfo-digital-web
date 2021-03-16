import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 3rem;
  max-width: 1280px;
  width: 100%;
  z-index: 10;
`;

export const CalculatorContainer = styled.div`
  padding: 2rem 4rem;

  .tab-container,
  .tab-content {
    width: 100%;
  }

  .nav-tabs {
    border-bottom: 0;
  }
  .nav-tabs .nav-link {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 12.8rem;
    height: 2.4rem;

    padding: 0.5rem 3rem;
    color: #504c4c;
    font-size: 1.2rem;
    border-radius: 1rem 1rem 0 0;
    border-color: rgba(195, 41, 37, 0.3);
    &:hover {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
  .nav-tabs .nav-link.active {
    color: ${({ theme }) => theme.colors.primary};
    /* border-width: 4px; */
    background-color: ${({ theme }) => theme.colors.primaryAlpha};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const HeaderCalc = styled.header`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > h1 {
    font-weight: 500;
    font-size: 2.8rem;
    line-height: 3.3rem;

    color: #504c4c;
  }
  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    > span {
      font-size: 2rem;
      line-height: 2.3rem;

      color: #4f4f4f;
    }

    > select {
      width: 27rem;
      height: 4.4rem;
      background: rgba(196, 196, 196, 0.2);
      border-radius: 4px;
      font-size: 20px;
      line-height: 23px;

      color: #4f4f4f;
    }
  }
`;
