import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import Input from '../../Input';
import { Sync } from '../../../assets/images';

import Button from '../../Button';
import AsyncSelect from '../../AsyncSelect';
import {
  loadOptionsBank,
  loadOptionsTypeAccount,
} from '../../../utils/loadOptions';

import { Container, FormContent, InputGroup } from './styles';
import getValidationErros from '../../../utils/getValidationErros';

interface BankData {
  bank: string;
  op?: 'CC' | 'CP';
  account: string;
}

const UserFinances: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const handleSubmit: SubmitHandler<BankData> = useCallback(async data => {
    formRef.current?.setErrors({});
    try {
      const schema = Yup.object().shape({
        bank: Yup.string().required('Instituição financeira Obrigatória'),
        agency: Yup.string()
          .min(4, 'A agência deve conter no minímo 4 digítos')
          .max(6, 'Iforme uma agência válida!')
          .required('Agência Obrigatória'),
        account: Yup.string().required('Número da conta obrigatório'),
        type: Yup.string().required('Tipo da conta é obrigatório'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      console.log(data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);
        formRef.current?.setErrors(erros);
      }
    }
  }, []);

  return (
    <Container>
      <h2>Dados Bancários</h2>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <FormContent>
          <AsyncSelect
            name="bank"
            label="Instituição Financeira"
            loadOptions={loadOptionsBank}
            placeholder="Digite o código ou o nome do banco"
            defaultOptions
          />
          <InputGroup>
            <Input name="agency" label="Agência" />
            <Input name="account" label="Número da Conta" />
          </InputGroup>
          <AsyncSelect
            name="type"
            label="Tipo da Conta"
            loadOptions={loadOptionsTypeAccount}
            placeholder="Informe o tipo da conta"
            defaultOptions
          />
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
