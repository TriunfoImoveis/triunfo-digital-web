import React from 'react';

import { ContainerWrapper, Container, Label, Content } from './styles';

interface IInputDisableProps {
  label: string;
  data?: string;
}

const InputDisabled: React.FC<IInputDisableProps> = ({ label, data }) => {
  return (
    <ContainerWrapper>
      <Label>{label}</Label>
      <Container>
        <Content>
          <span>{data}</span>
        </Content>
      </Container>
    </ContainerWrapper>
  );
};

export default InputDisabled;
