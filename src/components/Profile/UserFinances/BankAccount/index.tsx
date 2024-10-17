import React, { useState } from 'react';
import { FormContent, Header, InputGroup } from '../styles';
import InputDisabled from '../../../InputDisabled';
import { BiEditAlt } from 'react-icons/bi';
import FormCreateBankAccount from '../FormCreateBankAccount';

interface Bank {
  bank_name: string;
  agency: string;
  account: string;
  account_type: string;
}
interface BankData {
  bank_data: Bank;
}

interface BankAccountProps {
  bank: Bank;
}

const BankAccount: React.FC<BankAccountProps> = ({bank = {}}) => {
  const [edit, setEdit] = useState(false);
  return (
    <>
      <Header>
        <div>
          <button type="button" onClick={() => setEdit(!edit)}>
            <BiEditAlt />
            editar
          </button>
        </div>
      </Header>
        {edit ? (
          <FormCreateBankAccount />
        ) : (
          <FormContent>
            <InputDisabled
              label="Instituição Financeira"
              data={bank.bank_name}
            />
            <InputGroup>
              <InputDisabled
                label="Agência"
                data={bank.agency}
              />
              <InputDisabled
                label="Número da Conta"
                data={bank.account}
              />
            </InputGroup>
            <InputDisabled
              label="Tipo da Conta"
              data={bank.account_type}
            />
          </FormContent>
        )}
    </>
  );
}

export default BankAccount;