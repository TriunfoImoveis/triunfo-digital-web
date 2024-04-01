import styled from "styled-components";
import Button from "../Button";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Text = styled.span`
  font-size: 1.4rem;
  line-height: 2rem;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const ButtonPagination = styled(Button)`
  width: 3.2rem;
  height: 3.2rem;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
`;