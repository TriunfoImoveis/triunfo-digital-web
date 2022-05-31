import React, { useState, useRef } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles, SubmitHandler } from '@unform/core';
import { useHistory, useParams } from 'react-router-dom';
import { BiEditAlt } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { Sync } from '../../../assets/images';
import InputDisable from '../../InputDisabled';
import Input from '../../Input';
import Select from '../../ReactSelect';
import { optionsCivilStatus, optionsGenero } from '../../../utils/loadOptions';
import { SaleData, Legend, InputGroup, ButtonGroup } from '../styles';
import { DateYMD, unMaked } from '../../../utils/unMasked';
import { valiateDate } from '../../../utils/validateDate';
import api from '../../../services/api';
import getValidationErros from '../../../utils/getValidationErros';

import theme from '../../../styles/theme';

interface IPropertyProps {
  status: string;
  clientSeller: {
    name: string;
    cpf: string;
    date_birth: string;
    phone: string;
    whatsapp: string;
    email: string;
    civil_status: string;
    gender: string;
    number_children: string;
  };
}

interface FormData {
  client_seller: {
    name: string;
    cpf: string;
    date_birth: string;
    phone: string;
    whatsapp: string;
    email: string;
    civil_status: string;
    gender: string;
    number_children: string;
  };
}

interface Params {
  id: string;
}

const ClientSeller: React.FC<IPropertyProps> = ({ clientSeller, status }) => {
  const [edit, setEdit] = useState(true);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { id } = useParams<Params>();

  const unMaskValue = () => {
    const cpf = unMaked(formRef.current?.getFieldValue('client_buyer.cpf'));
    formRef.current?.setFieldValue('client_buyer.cpf', cpf);
    const date_birth = DateYMD(
      formRef.current?.getFieldValue('client_buyer.date_birth'),
    );
    formRef.current?.setFieldValue('client_buyer.date_birth', date_birth);
    const phone = unMaked(formRef.current?.getFieldValue('client_buyer.phone'));
    formRef.current?.setFieldValue('client_buyer.phone', phone);
    const numberChildren = Number(
      formRef.current?.getFieldValue('client_buyer.number_children'),
    );
    formRef.current?.setFieldValue(
      'client_buyer.number_children',
      numberChildren,
    );
  };
  const handleSubmit: SubmitHandler<FormData> = async data => {
    formRef.current?.setErrors({});
    try {
      setLoading(true);
      const schema = Yup.object().shape({
        client_buyer: Yup.object().shape({
          name: Yup.string().required('Nome Obrigatório'),
          cpf: Yup.string()
            .min(
              11,
              'Informe o cpf corretamente, cpf deve conter 11 digitos, sem traços ou pontos',
            )
            .max(14, 'Informe o cpf corretamente')
            .required('CPF obrigatório'),
          date_birth: Yup.string()
            .test('validateDate', 'Data Invalida', function valid(value) {
              const { path, createError } = this;
              const isValid = valiateDate(value);
              return isValid || createError({ path, message: 'Data Invalida' });
            })
            .required('Data de nascimento obrigatória'),
          civil_status: Yup.string().required('Estado Civil Obrigatório'),
          gender: Yup.string().required('Genero Obrigatório'),
          number_children: Yup.string().required(
            'Quantidade de filhos Obrigatória',
          ),
          // occupation: Yup.string().required('Profissão Obrigatória'),
          phone: Yup.string()
            .min(11, 'O numero precisa ter pelo menos 11 números')
            .max(18, 'Digite um numero de telefone válido')
            .required('Telefone obrigatório'),
          // whatsapp: Yup.string()
          //   .min(11, 'O numero precisa ter pelo menos 11 digitos')
          //   .max(14, 'Digite um numero de telefone válido')
          //   .required('Whatsapp obrigatório'),
          email: Yup.string()
            .email('informe um email Válido')
            .required('E-mail Obrigatório'),
        }),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      unMaskValue();
      const formData = formRef.current?.getData();
      await api.put(`/sale/${id}`, formData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem(
            '@TriunfoDigital:token',
          )}`,
        },
      });

      toast.success('Dados da Venda atualizadas!');
      history.push('/adm/lista-vendas');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);
        formRef.current?.setErrors(erros);
      }
      toast.error('ERROR!, verifique as informações e tente novamente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <SaleData>
        <fieldset className="login">
          <Legend>
            <legend>VENDEDOR</legend>
            {status !== 'CAIU' ? (
              <button type="button" onClick={() => setEdit(!edit)}>
                <BiEditAlt size={20} color={theme.colors.primary} />
                <span>editar</span>
              </button>
            ) : null}
          </Legend>
          {edit ? (
            <>
              <InputDisable label="Nome Completo" data={clientSeller.name} />
              <InputGroup>
                <InputDisable label="CPF" data={clientSeller.cpf} />
                <InputDisable
                  label="Data de Nascimento"
                  data={clientSeller.date_birth}
                />
              </InputGroup>
              <InputGroup>
                <InputDisable label="Telefone" data={clientSeller.phone} />
                <InputDisable label="E-mail" data={clientSeller.email} />
              </InputGroup>
              <InputGroup>
                <InputDisable
                  label="Estado Civíl"
                  data={clientSeller.civil_status}
                />
                <InputDisable label="Gênero" data={clientSeller.gender} />
                <InputDisable
                  label="Numero de Filhos"
                  data={clientSeller.number_children}
                />
              </InputGroup>
            </>
          ) : (
            <>
              <Input
                label="Nome Completo"
                name="client_buyer.name"
                placeholder="Nome Completo"
                readOnly={edit}
                defaultValue={clientSeller.name}
              />
              <InputGroup>
                <Input
                  label="CPF"
                  name="client_buyer.cpf"
                  placeholder="CPF"
                  readOnly={edit}
                  defaultValue={clientSeller.cpf}
                />
                <Input
                  label="Data de Nascimento"
                  name="client_buyer.date_birth"
                  placeholder="Data de Nascimento"
                  readOnly={edit}
                  defaultValue={clientSeller.date_birth}
                />
              </InputGroup>
              <InputGroup>
                <Input
                  label="Telefone"
                  name="client_buyer.phone"
                  placeholder="Telefone"
                  readOnly={edit}
                  defaultValue={clientSeller.phone}
                />
                <Input
                  label="E-mail"
                  name="client_buyer.email"
                  type="email"
                  placeholder="E-mail"
                  readOnly={edit}
                  defaultValue={clientSeller.email}
                />
              </InputGroup>
              <InputGroup>
                <Select
                  label="Estado Civíl"
                  name="client_buyer.civil_status"
                  options={optionsCivilStatus}
                  disabled={edit}
                  defaultInputValue={clientSeller.civil_status}
                />
                <Select
                  label="Gênero"
                  name="client_buyer.gender"
                  options={optionsGenero}
                  disabled={edit}
                  defaultInputValue={clientSeller.gender}
                />
                <Input
                  label="Numero de Filhos"
                  name="client_buyer.number_children"
                  placeholder="Número de filhos"
                  readOnly={edit}
                  defaultValue={clientSeller.number_children}
                />
              </InputGroup>
              <ButtonGroup>
                <button type="submit">
                  <Sync />
                  <span>{loading ? 'Atualizando...' : 'Atualizar'}</span>
                </button>
              </ButtonGroup>
            </>
          )}
        </fieldset>
      </SaleData>
    </Form>
  );
};

export default ClientSeller;
