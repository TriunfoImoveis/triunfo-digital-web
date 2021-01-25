import React, { useRef, useCallback } from 'react';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import Input from '../../Input';
import { Sync } from '../../../assets/images';

import { Container, FormContent } from './styles';
import Button from '../../Button';

interface BankData {
  bank: string;
  op?: 'CC' | 'CP';
  account: string;
}
const UserFinances: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit: SubmitHandler<BankData> = useCallback(data => {
    console.log(data);
  }, []);
  return (
    <Container>
      <h2>Dados Bancários</h2>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <FormContent>
          <Input name="bank" label="Instituiçao Financeira" />
          <Input name="op" label="Operação" />
          <Input name="account" label="Número da Conta" />
        </FormContent>
        <Button>
          <span>Atualizar</span>
          <Sync />
        </Button>
      </Form>
    </Container>
  );
};

export default UserFinances;
