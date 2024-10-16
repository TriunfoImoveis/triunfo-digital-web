import React, { useRef, useCallback, useState } from 'react';
import * as Yup from 'yup';
import { FormHandles, Scope, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { BiEditAlt } from 'react-icons/bi';
import { Sync } from '../../../assets/images';
import Input from '../../Input';
import Button from '../../Button';
import ReactSelect from '../../ReactSelect';
import { opionsBanks, OptionsTypeAccount } from '../../../utils/loadOptions';
import { useAuth } from '../../../context/AuthContext';
import { Container, FormContent, InputGroup, Header } from './styles';
import getValidationErros from '../../../utils/getValidationErros';
import api from '../../../services/api';
import InputDisabled from '../../InputDisabled';

interface BankData {
  bank_data: {
    bank_name: string;
    agency: string;
    account: string;
    account_type: string;
  };
}

const UserFinances: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
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
    <Container>
      <Header>
        <h2>Dados Bancários</h2>
        <div>
          <button type="button" onClick={() => setEdit(!edit)}>
            <BiEditAlt />
            editar
          </button>
        </div>
      </Header>
      <Form ref={formRef} onSubmit={handleSubmit}>
        {edit ? (
          <>
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
          </>
        ) : (
          <FormContent>
            <InputDisabled
              label="Instituição Financeira"
              data={userAuth?.bank_data[0]?.bank_name}
            />
            <InputGroup>
              <InputDisabled
                label="Agência"
                data={userAuth?.bank_data[0]?.agency}
              />
              <InputDisabled
                label="Número da Conta"
                data={userAuth?.bank_data[0]?.account}
              />
            </InputGroup>
            <InputDisabled
              label="Tipo da Conta"
              data={userAuth?.bank_data[0]?.account_type}
            />
          </FormContent>
        )}
      </Form>
    </Container>
  );
};

export default UserFinances;
