import styled from 'styled-components';

export const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.8rem;

  > * {
    flex: 1;
  }

  @media (max-width: 375px) {
    flex-direction: column;
  }
`;

export const FormButtons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.8rem;

  > button {
    flex: 1;
  }

  @media (max-width: 375px) {
    flex-direction: column;
  }
`;
