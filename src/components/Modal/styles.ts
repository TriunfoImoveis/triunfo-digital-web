import styled from 'styled-components';

export const ModalContainer = styled.div`
  width: 100%;
  height: calc(100vw * (9 / 6));
  background-color: rgba(121, 119, 119, 0.8);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  flex: 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

export const ModalWrapper = styled.div`
  width: 85rem;
  height: 55rem;
  margin-bottom: 25rem;
  background-color: #fff;
  box-shadow: -1px 3px 42px 6px rgba(0, 0, 0, 0.75);
  border-radius: 2rem;
  padding: 2rem;
  position: relative;
`;
export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > button {
    background: transparent;
    border: 0;
    margin-right: 1.6rem;
  }
`;

export const Title = styled.span`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.primary};
`;
export const ModalBody = styled.div`
  overflow-y: auto;
`;
export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -200px;
  margin-bottom: 3rem;

  > button {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 40.3rem;
    height: 6rem;
    border: 0;
    background-color: ${({ theme }) => theme.colors.success};
    transition: background-color 0.2s;

    color: #fff;
    font-size: ${({ theme }) => theme.fontSize.large};

    &:hover {
      background-color: ${({ theme }) => theme.colors.successLight};
    }

    > svg {
      margin-right: 1.2rem;
    }
  }
`;
