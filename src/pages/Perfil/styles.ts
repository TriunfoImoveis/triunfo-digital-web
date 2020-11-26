import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 0 3.2rem;
`;
export const Header = styled.div`
  padding: 1rem 0;
  margin: 0 auto;
  max-width: 1120px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 1rem 0;
    a {
      > svg {
        width: 8rem;
      }
    }
  }
`;
export const NavBarContainer = styled.nav`
  display: flex;
  height: 100%;
`;
export const NavItemContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  & + div {
    margin-left: 2.4rem;
  }
  > svg {
    path {
      fill: #c32925;
    }
  }
  > a,
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: 0;
    margin-left: 0.8rem;
    font-family: Roboto;
    font-style: normal;
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    > span {
      padding-left: 0.8rem;
    }
  }

  @media (max-width: 768px) {
    button {
      > span {
        display: none;
      }
    }
  }
`;

export const Content = styled.div`
  padding: 1rem 0;
  margin: 0 auto;
  max-width: 1120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    color: ${({ theme }) => theme.colors.primary};
    font-size: 3.2rem;
    margin-bottom: 3.9rem;
  }
`;

export const ProfileContainer = styled.div`
  width: 70%;
`;

export const BasicInfo = styled.div`
  width: 100%;
  display: flex;
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

  button {
    width: 14.5rem;
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
  }
`;

export const InforUser = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.8rem 0.8rem;
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
`;
export const InfoGroup = styled.div`
  display: flex;
`;

export const Separator = styled.div`
  z-index: 10;
  margin: 3.2rem 0;
  border-top: 0.3rem solid ${({ theme }) => theme.colors.primary};
`;

export const LogonInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2 {
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
    }
  }
`;

export const FormContent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  gap: 3rem;

  margin-bottom: 5rem;
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
