import React from 'react';

import { ContainerWrapper, Container, Label, Content } from './styles';

interface IInputDisableProps {
  label: string;
  data?: string | null;
  status?: 'PAGO' | 'PENDENTE';
}

const InputDisabled: React.FC<IInputDisableProps> = ({
  label,
  data,
  status,
}) => {
  return (
    <ContainerWrapper>
      <Label>{label}</Label>
      <Container status={status}>
        <Content>
          <span>{data}</span>
        </Content>
      </Container>
    </ContainerWrapper>
  );
};

export default InputDisabled;
