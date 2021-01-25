import React, { useRef, useCallback } from 'react';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import Input from '../../Input';
import { Sync } from '../../../assets/images';

import Button from '../../Button';
import AsyncSelect from '../../AsyncSelect';
import banks from '../../../services/Data/banks';

import { Container, FormContent, InputGroup } from './styles';

interface BankData {
  bank: string;
  op?: 'CC' | 'CP';
  account: string;
}

interface OptionsData {
  label: string;
  value: string;
}
const UserFinances: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const finances = {
    banks: 'CAIXA ECONOMICA FEDERAL',
    agency: '12345',
    account: '12345678-9',
    type: 'CORRENTE',
  };

  const handleSubmit: SubmitHandler<BankData> = useCallback(data => {
    console.log(data);
  }, []);

  const opionsBanks = banks.map(bank => ({
    label: `${bank.code} - ${bank.fullName}`,
    value: bank.fullName,
  }));

  const OptionsTypeAccount = [
    { label: 'POUPANÇA', value: 'POUPANÇA' },
    { label: 'CORRENTE', value: 'CORRENTE' },
  ];

  const filterBanks = useCallback(
    (inputValue: string, options: OptionsData[]) => {
      return options.filter(option =>
        option.label.toLowerCase().includes(inputValue.toLowerCase()),
      );
    },
    [],
  );

  const loadOptionsBank = useCallback(
    (inputValue: string, callback: any) => {
      setTimeout(() => {
        callback(filterBanks(inputValue, opionsBanks));
      }, 1000);
    },
    [filterBanks, opionsBanks],
  );
  const loadOptionsTypeAccount = useCallback(
    (inputValue: string, callback: any) => {
      setTimeout(() => {
        callback(filterBanks(inputValue, OptionsTypeAccount));
      }, 1000);
    },
    [filterBanks, OptionsTypeAccount],
  );
  return (
    <Container>
      <h2>Dados Bancários</h2>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={finances}>
        <FormContent>
          <AsyncSelect
            name="banks"
            label="Instituição Financeira"
            loadOptions={loadOptionsBank}
            options={opionsBanks}
            placeholder="Digite o código ou o nome do banco"
            defaultOptions
            defaultInputValue={finances.banks}
          />
          <InputGroup>
            <Input name="agency" label="Agência" />
            <Input name="account" label="Número da Conta" />
          </InputGroup>
          <AsyncSelect
            name="type"
            label="Tipo da Conta"
            loadOptions={loadOptionsTypeAccount}
            options={opionsBanks}
            placeholder="Informe o tipo da conta"
            defaultOptions
            defaultInputValue={finances.type}
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
