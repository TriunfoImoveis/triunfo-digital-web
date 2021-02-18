import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 1rem;
  margin-bottom: 1rem;
  margin-left: 10rem;
  width: 70%;
  border: 1px solid #000;
  padding: 1.5rem;

  background-color: ${({ theme }) => theme.colors.primaryAlpha};
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 0.4rem;

  .modal-container {
    align-items: initial;

    .modal-wrapper {
      margin-top: 25rem;
    }
  }
`;

export const AlertMessage = styled.h2`
  font-weight: 500;
  font-size: 2.4rem;
  line-height: 2.8rem;
  color: ${({ theme }) => theme.colors.primary};
`;
export const DetaisButton = styled.div`
  cursor: pointer;
  > span {
    font-weight: 500;
    font-size: 2.4rem;
    line-height: 2.8rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover {
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;

export const DetailsNotificationContainer = styled.div`
  padding: 0.5rem 2rem 0.5rem 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #000;
  background: #fff8f8;
  border: 1px solid rgba(121, 119, 119, 0.3);
  box-sizing: border-box;
  box-shadow: 0px 4px 4px rgba(137, 137, 137, 0.5);
  border-radius: 100px;
  transform: matrix(1, 0, 0, 1, 0, 0);

  .date-sale {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;

    color: #c32925;
  }
`;
export const Realtor = styled.div`
  display: flex;
  align-items: center;
  .avatar-realtor {
    width: 8.8rem;
    height: 8.8rem;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    margin-right: 1.2rem;
  }
`;
export const Info = styled.div`
  .name-realtor {
    font-style: normal;
    font-weight: 500;
    font-size: 3.2rem;
    line-height: 3.7rem;

    color: #797777;
  }

  > p {
    strong,
    span {
      font-weight: 500;
      font-size: 2.4rem;
      line-height: 2.8rem;

      color: #797777;
    }
    span {
      font-weight: normal;
    }
  }
`;

export const Button = styled.button`
  width: 221px;
  height: 65px;
  background: #c32925;
  border-radius: 100px;
  border: 0;

  > span {
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
    color: #fff;
  }
`;
