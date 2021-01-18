import styled from 'styled-components';

export const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Container = styled.div`
  background: rgba(129, 129, 129, 0.1);
  padding-left: 1.2rem;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 0.1rem solid ${({ theme }) => theme.colors.textColorAlpha};
  width: 100%;
  height: 4.5rem;
  display: flex;
  align-items: center;
`;
export const Label = styled.span`
  margin-top: 0.8rem;

  padding-bottom: 0.2rem;
  font-size: 1.6rem;
  line-height: 1.9rem;
  color: #898989;
`;
export const Content = styled.div`
  > span {
    padding-left: 1.2rem;
    height: 100%;
    flex: 1;
    border: 0;
    color: ${({ theme }) => theme.colors.textColor};
    font-size: 1.6rem;
  }
`;
