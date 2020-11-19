import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  padding: 0 3.2rem;

  > svg {
    position: absolute;
    width: 30rem;
    height: 50rem;
    top: 130px;
    left: -8px;
    z-index: 0;
  }
`;

export const Content = styled.div`
  margin: 0 auto;
  max-width: 1120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
`;
export const FiltersContainer = styled.div`
  width: 100%;
`;
export const FiltersGroup = styled.div`
  display: flex;
  align-items: center;

  div + div {
    margin-left: 0.8rem;
  }
`;
export const Input = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(196, 196, 196, 0.2);

  width: 66.5rem;
  height: 4.4rem;
  padding: 0 0.5rem;

  input {
    width: 100%;
    padding: 0.8rem;
    background: transparent;
    border: none;
    color: #707070;
    font-size: 2rem;
  }
`;

export const FilterDiv = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(196, 196, 196, 0.2);

  width: 19rem;
  height: 4.4rem;
  padding: 0 0.5rem;

  span {
    font-size: 2rem;
    color: #707070;
    margin-left: 1rem;
  }
`;
