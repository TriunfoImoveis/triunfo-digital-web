import { Form } from '@unform/web';
import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';

import { FormContent, InputGroup } from '../styles';
import { FormHandles, Scope, SubmitHandler } from '@unform/core';
import ReactSelect from '../../../ReactSelect';
import { opionsBanks, OptionsTypeAccount } from '../../../../utils/loadOptions';
import Input from '../../../Input';
import Button from '../../../Button';
import Loader from 'react-loader-spinner';
import { Sync } from '../../../../assets/images';
import api from '../../../../services/api';
import { useAuth } from '../../../../context/AuthContext';
import getValidationErros from '../../../../utils/getValidationErros';
import { toast } from 'react-toastify';

// import { Container } from './styles';
interface Bank {
  bank_name: string;
  agency: string;
  account: string;
  account_type: string;
}
interface BankData {
  bank_data: Bank;
}
const FormCreateBankAccount: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [token] = useState(localStorage.getItem('@TriunfoDigital:token'));
  const { userAuth, upadatedUser } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const handleSubmit: SubmitHandler<BankData> = useCallback(
    async data => {
      formRef.current?.setErrors({});
      setLoading(true);
      try {
        const schema = Yup.object().shape({
          bank_data: Yup.object()
            .shape({
              bank_name: Yup.string().required('Nome do banco obrigatório'),
              agency: Yup.string()
                .min(3, 'a agência tem que ter no mínimo 3 dígitos')
                .max(4, 'a agência tem que ter no máximo 4 dígitos')
                .required('Número da agência obrigatório'),
              account: Yup.string()
                .min(6, 'a agência tem que ter no mínimo 6 dígitos')
                .max(13, 'a agência tem que ter no máximo 13 dígitos')
                .required('Número da agência obrigatório'),
              account_type: Yup.string().required('Tipo de conta obrigatória'),
            })
            .required('Dados Obrigatório'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        const response = await api.put(`/users/${userAuth.id}`, data, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        upadatedUser(response.data);
        setLoading(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErros(err);
          formRef.current?.setErrors(erros);
        }
        if (err.response) {
          const { data } = err.response;
          if (data.status) {
            toast.error(`erro no servidor, entre em contato com o suporte`);
          }
          // toast.error(`ERROR! ${err.response.data.message}`);
        } else if (err.request) {
          toast.error(
            `ERROR! Falha ao connectar ao servidor! Entre em contato com o suporte.`,
          );
        }
        setLoading(false);
      }
    },
    [token, upadatedUser, userAuth.id],
  );
  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <FormContent>
        <Scope path="bank_data">
          <ReactSelect
            name="bank_name"
            label="Instituição Financeira"
            options={opionsBanks}
            placeholder="Digite o código ou o nome do banco"
          />
          <InputGroup>
            <Input name="agency" label="Agência" />
            <Input name="account" label="Número da Conta" />
          </InputGroup>
          <ReactSelect
            name="account_type"
            label="Tipo da Conta"
            options={OptionsTypeAccount}
            placeholder="Informe o tipo da conta"
          />
        </Scope>
      </FormContent>
      <Button>
        {loading ? (
          <Loader type="Bars" color="#C32925" height={30} width={30} />
        ) : (
          <>
            <span>Atualizar</span>
            <Sync />
          </>
        )}
      </Button>
    </Form>
  );
}

export default FormCreateBankAccount;