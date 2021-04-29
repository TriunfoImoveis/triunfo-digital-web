import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    font-size: 3.5rem;
  }

  section {
    width: 100%;
    height: auto;

    > img {
      width: 400px;
      height: 350px;
    }
  }
`;
