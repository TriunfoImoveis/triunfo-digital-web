import styled from 'styled-components';

export const ProfileContainer = styled.div`
  width: 100%;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const BasicInfo = styled.div`
  width: 100%;
  display: flex;

  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
  }
`;

export const Avatar = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0.8rem;

  img {
    width: 13.5rem;
    height: 13.5rem;
    border-radius: 50%;
    margin: 1.8rem 0;
    border: 0.1rem solid ${({ theme }) => theme.colors.primary};
  }

  label {
    width: 14.5rem;
    height: 4.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: 0.2rem solid ${({ theme }) => theme.colors.primary};
    border-radius: 0.5rem;

    > input {
      display: none;
    }
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

  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 10rem;
      height: 10rem;
    }

    button {
      width: 11.5rem;
      height: 3.2rem;

      > span {
        margin-right: 0.5rem;
        font-size: 1.2rem;
      }
    }
  }
`;

export const InforUser = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.8rem 0.8rem;

  @media (max-width: 500px) {
    margin: 1.8rem 0;
  }
`;
export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.8rem;
  margin-right: 5.6rem;

  font-family: Roboto;
  font-style: normal;
  font-weight: 500;

  font-size: 2.8rem;
  line-height: 3.3rem;
  color: #797777;
  .label {
    font-size: 1.6rem;
    line-height: 1.9rem;
    color: #898989;
  }

  @media (max-width: 500px) {
    width: 100%;
    margin-right: 0;

    font-size: 1.6rem;
    line-height: 1.9rem;

    .label {
      font-size: 1.2rem;
    }
  }
`;
export const InfoGroup = styled.div`
  display: flex;
  width: 100%;
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Separator = styled.div`
  z-index: 10;
  margin: 3.2rem 0;
  border-top: 0.3rem solid ${({ theme }) => theme.colors.background};

  @media (max-width: 500px) {
    width: 100%;
    margin: 1.8rem 0;
  }
`;
