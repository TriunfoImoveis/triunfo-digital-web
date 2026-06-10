import React, { useState, useRef, useEffect } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles, SubmitHandler } from '@unform/core';
import { useHistory, useParams } from 'react-router-dom';
import { BiEditAlt } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { Sync } from '../../../assets/images';
import InputDisable from '../../InputDisabled';
import Input from '../../Input';
import SelectSimple from '../../SelectSimple';
import { SaleData, Legend, InputGroup, ButtonGroup } from '../styles';
import { unMaked } from '../../../utils/unMasked';
import api from '../../../services/api';
import getValidationErros from '../../../utils/getValidationErros';

import theme from '../../../styles/theme';


interface IOrigin {
  id: string;
  name: string;
  active: boolean;
  isOriginClient: boolean;
  isOriginChannel: boolean;
}

interface IPropertyProps {
  status: string;
  clientSeller: {
    name: string;
    cnpj: string;
    phone: string;
    email: string;
    address: string;
    origin?: { id: string; name: string };
  };
}

interface FormData {
  client_seller: {
    name: string;
    cnpj: string;
    phone: string;
    email: string;
    address: string;
    origin_id: string;
  };
}

interface Params {
  id: string;
}

const ClientSellerPJ: React.FC<IPropertyProps> = ({ clientSeller, status }) => {
  const [edit, setEdit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [origins, setOrigins] = useState<IOrigin[]>([]);
  const [loadingOrigins, setLoadingOrigins] = useState(false);
  const [selectedOriginId, setSelectedOriginId] = useState(clientSeller.origin?.id || '');
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { id } = useParams<Params>();

  useEffect(() => {
    if (edit === false) {
      setLoadingOrigins(true);
      api
        .get<IOrigin[]>('/origin-sale')
        .then(response => {
          const activeOrigins = response.data.filter(o => o.active);
          setOrigins(activeOrigins);
          const currentId = clientSeller.origin?.id || '';
          const exists = activeOrigins.some(o => o.id === currentId);
          setSelectedOriginId(exists ? currentId : '');
        })
        .catch(() => {
          toast.error('Não foi possível carregar as origens');
          setOrigins([]);
        })
        .finally(() => {
          setLoadingOrigins(false);
        });
    }
  }, [edit, clientSeller.origin]);

  const unMaskValue = () => {
    const cnpj = unMaked(formRef.current?.getFieldValue('client_seller.cnpj'));
    formRef.current?.setFieldValue('client_seller.cnpj', cnpj);
    const phone = unMaked(formRef.current?.getFieldValue('client_seller.phone'));
    formRef.current?.setFieldValue('client_seller.phone', phone)
  };
  const handleSubmit: SubmitHandler<FormData> = async data => {
    formRef.current?.setErrors({});
    try {
      setLoading(true);
      const schema = Yup.object().shape({
        client_seller: Yup.object().shape({
          name: Yup.string().required('Nome Obrigatório'),
          cnpj: Yup.string()
            .min(
              11,
              'Informe o CNPJ corretamente, CNPJ deve conter 14 digitos, sem traços ou pontos',
            )
            .max(18, 'Informe o CNPJ corretamente')
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
          origin_id: Yup.string().required('Origem obrigatória'),
        }),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      unMaskValue();
      const formData = formRef.current?.getData();
      await api.put(`/sale/${id}`, {
        client_seller: {
          ...formData?.client_seller,
          cpf: null,
          origin_id: selectedOriginId,
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
              <InputDisable label="CNPJ" data={clientSeller.cnpj} />
              <InputDisable label="Telefone" data={clientSeller.phone} />
              <InputDisable label="E-mail" data={clientSeller.email} />
              <InputDisable
                label="Endereço"
                data={clientSeller.address}
              />
              <InputDisable label="Origem" data={clientSeller.origin?.name || ''} />
            </>
          ) : (
            <>
              <Input
                label="Nome Completo"
                name="client_seller.name"
                placeholder="Nome Completo"
                readOnly={edit}
                defaultValue={clientSeller.name}
              />
              <InputGroup>
                <Input
                  label="CNPJ"
                  name="client_seller.cnpj"
                  placeholder="CNPJ"
                  mask='cnpj'
                  readOnly={edit}
                  defaultValue={clientSeller.cnpj}
                />
              </InputGroup>
              <InputGroup>
                <Input
                  label="Telefone"
                  name="client_seller.phone"
                  placeholder="Telefone"
                  mask='fone'
                  readOnly={edit}
                  defaultValue={clientSeller.phone}
                />
                <Input
                  label="E-mail"
                  name="client_seller.email"
                  type="email" autoComplete="off"
                  placeholder="E-mail"
                  readOnly={edit}
                  defaultValue={clientSeller.email}
                />
              </InputGroup>
              <Input
                label="Endereço"
                name="client_seller.address"
                type="text"
                placeholder="Endereço"
                readOnly={edit}
                defaultValue={clientSeller.address}
              />
              <SelectSimple
                nameLabel="Origem"
                disabled={loadingOrigins}
                value={selectedOriginId}
                onChange={e => setSelectedOriginId((e.target as HTMLSelectElement).value)}
                options={origins.map(o => ({ value: o.id, label: o.name }))}
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

export default ClientSellerPJ;
