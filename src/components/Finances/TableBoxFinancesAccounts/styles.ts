import styled from 'styled-components';


export const TitlePane = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryAlpha};
  text-align: center;
  font-size: 1.6rem;
  font-weight: bold;
  color: #504c4c;
`;

export const BalanceAmount = styled.div`
  width: 100%;

  > p {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    > span {
      font-size: 2.4rem;
      margin-right: 1rem;
    }

    strong {
      font-size: 3.2rem;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
