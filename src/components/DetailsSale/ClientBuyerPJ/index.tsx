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
import { SaleData, Legend, InputGroup, ButtonGroup } from '../styles';
import { unMaked } from '../../../utils/unMasked';
import api from '../../../services/api';
import getValidationErros from '../../../utils/getValidationErros';

import theme from '../../../styles/theme';


interface IPropertyProps {
  status: string;
  clientbuyer: {
    name: string;
    cnpj: string;
    phone: string;
    email: string;
    address: string;
  };
}

interface FormData {
  client_buyer: {
    name: string;
    cnpj: string;
    phone: string;
    email: string;
    address: string;
  };
}

interface Params {
  id: string;
}

const ClientBuyerPJ: React.FC<IPropertyProps> = ({ clientbuyer, status }) => {
  const [edit, setEdit] = useState(true);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { id } = useParams<Params>();

  const unMaskValue = () => {
    const cnpj = unMaked(formRef.current?.getFieldValue('client_buyer.cnpj'));
    formRef.current?.setFieldValue('client_buyer.cnpj', cnpj);
    const phone = unMaked(formRef.current?.getFieldValue('client_buyer.phone'));
    formRef.current?.setFieldValue('client_buyer.phone', phone)
  };
  const handleSubmit: SubmitHandler<FormData> = async data => {
    formRef.current?.setErrors({});
    try {
      setLoading(true);
      const schema = Yup.object().shape({
        client_buyer: Yup.object().shape({
          name: Yup.string().required('Nome Obrigatório'),
          cnpj: Yup.string()
            .min(
              15,
              'Informe o CNPJ corretamente, CNPJ deve conter 14 digitos, sem traços ou pontos',
            )
            .max(14, 'Informe o CNPJ corretamente')
            .required('CNPJ obrigatório'),
          phone: Yup.string()
            .min(11, 'O numero precisa ter pelo menos 11 números')
            .max(18, 'Digite um numero de telefone válido')
            .required('Telefone obrigatório'),
          email: Yup.string()
            .email('informe um email Válido')
            .required('E-mail Obrigatório'),
          address: Yup.string()
            .required('Endereço Obrigatório'),
        }),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      unMaskValue();
      const formData = formRef.current?.getData();
      await api.put(`/sale/${id}`, {
        ...formData?.client_buyer,
        cpf: null
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
            <legend>CLIENTE</legend>
            {status !== 'CAIU' ? (
              <button type="button" onClick={() => setEdit(!edit)}>
                <BiEditAlt size={20} color={theme.colors.primary} />
                <span>editar</span>
              </button>
            ) : null}
          </Legend>
          {edit ? (
            <>
              <InputDisable label="Nome Completo" data={clientbuyer.name} />
              <InputDisable label="CNPJ" data={clientbuyer.cnpj} />
              <InputDisable label="Telefone" data={clientbuyer.phone} />
              <InputDisable label="E-mail" data={clientbuyer.email} />
              <InputDisable
                label="Endereço"
                data={clientbuyer.address}
              />
            </>
          ) : (
            <>
              <Input
                label="Nome Completo"
                name="client_buyer.name"
                placeholder="Nome Completo"
                readOnly={edit}
                defaultValue={clientbuyer.name}
              />
              <InputGroup>
                <Input
                  label="CNPJ"
                  name="client_buyer.cnpj"
                  placeholder="CNPJ"
                  mask='cnpj'
                  readOnly={edit}
                  defaultValue={clientbuyer.cnpj}
                />
              </InputGroup>
              <InputGroup>
                <Input
                  label="Telefone"
                  name="client_buyer.phone"
                  placeholder="Telefone"
                  mask='fone'
                  readOnly={edit}
                  defaultValue={clientbuyer.phone}
                />
                <Input
                  label="E-mail"
                  name="client_buyer.email"
                  type="email"
                  placeholder="E-mail"
                  readOnly={edit}
                  defaultValue={clientbuyer.email}
                />
              </InputGroup>
              <Input
                label="Endereço"
                name="client_buyer.address"
                type="text"
                placeholder="Endereço"
                readOnly={edit}
                defaultValue={clientbuyer.email}
              />
              <ButtonGroup>
                <button type="submit">
                  <Sync />
                  <span>{loading ? 'Atualizando...' : 'Atualizar'}</span>
                </button>
              </ButtonGroup>
            </>
          )}
        </fieldset>
      </SaleData >
    </Form >
  );
};

export default ClientBuyerPJ;
