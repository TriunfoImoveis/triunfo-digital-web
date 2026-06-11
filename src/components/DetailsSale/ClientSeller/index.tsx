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
import { optionsCivilStatus, optionsGenero } from '../../../utils/loadOptions';
import { SaleData, Legend, InputGroup, ButtonGroup } from '../styles';
import { DateYMD, unMaked } from '../../../utils/unMasked';
import { valiateDate } from '../../../utils/validateDate';
import api from '../../../services/api';
import getValidationErros from '../../../utils/getValidationErros';
import { getErrorMessage } from '../../../utils/getErrorMessage';

import theme from '../../../styles/theme';

interface IOrigin {
  id: string;
  name: string;
  active: boolean;
}

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
    origin?: { id: string; name: string };
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
  const [origins, setOrigins] = useState<IOrigin[]>([]);
  const [loadingOrigins, setLoadingOrigins] = useState(false);
  const [selectedOriginId, setSelectedOriginId] = useState(clientSeller.origin?.id || '');
  const [selectedCivilStatus, setSelectedCivilStatus] = useState(clientSeller.civil_status || '');
  const [selectedGender, setSelectedGender] = useState(clientSeller.gender || '');
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { id } = useParams<Params>();

  // Sincroniza quando os dados do cliente chegam do fetch do pai
  useEffect(() => {
    if (clientSeller.civil_status) setSelectedCivilStatus(clientSeller.civil_status);
    if (clientSeller.gender) setSelectedGender(clientSeller.gender);
  }, [clientSeller.civil_status, clientSeller.gender]);

  useEffect(() => {
    if (edit === false) {
      setLoadingOrigins(true);
      api.get<IOrigin[]>('/origin-sale')
        .then(response => {
          const active = response.data.filter(o => o.active);
          setOrigins(active);
          const currentId = clientSeller.origin?.id || '';
          setSelectedOriginId(active.some(o => o.id === currentId) ? currentId : '');
        })
        .catch(() => {
          toast.error('Não foi possível carregar as origens');
          setOrigins([]);
        })
        .finally(() => setLoadingOrigins(false));
    }
  }, [edit, clientSeller.origin]);

  const unMaskValue = () => {
    const cpf = unMaked(formRef.current?.getFieldValue('client_seller.cpf'));
    formRef.current?.setFieldValue('client_seller.cpf', cpf);
    const date_birth = DateYMD(
      formRef.current?.getFieldValue('client_seller.date_birth'),
    );
    formRef.current?.setFieldValue('client_seller.date_birth', date_birth);
    const phone = unMaked(formRef.current?.getFieldValue('client_seller.phone'));
    formRef.current?.setFieldValue('client_seller.phone', phone);
    const numberChildren = Number(
      formRef.current?.getFieldValue('client_seller.number_children'),
    );
    formRef.current?.setFieldValue(
      'client_seller.number_children',
      numberChildren,
    );
  };
  const handleSubmit: SubmitHandler<FormData> = async data => {
    formRef.current?.setErrors({});
    try {
      setLoading(true);
      const schema = Yup.object().shape({
        client_seller: Yup.object().shape({
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
          number_children: Yup.string().required(
            'Quantidade de filhos Obrigatória',
          ),
          phone: Yup.string()
            .min(11, 'O numero precisa ter pelo menos 11 números')
            .max(18, 'Digite um numero de telefone válido')
            .required('Telefone obrigatório'),
          email: Yup.string()
            .email('informe um email Válido')
            .required('E-mail Obrigatório'),
        }),
      });

      if (!selectedCivilStatus) {
        toast.error('Estado Civil Obrigatório');
        setLoading(false);
        return;
      }
      if (!selectedGender) {
        toast.error('Gênero Obrigatório');
        setLoading(false);
        return;
      }

      await schema.validate(data, {
        abortEarly: false,
      });

      unMaskValue();
      const formData = formRef.current?.getData();
      await api.put(`/sale/${id}`, {
        client_seller: {
          ...formData?.client_seller,
          civil_status: selectedCivilStatus,
          gender: selectedGender,
          cnpj: null,
          origin_id: selectedOriginId,
        }
      });

      toast.success('Dados da Venda atualizadas!');
      history.push('/adm/lista-vendas');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);
        formRef.current?.setErrors(erros);
        toast.error('Verifique os campos obrigatórios');
      } else {
        toast.error(getErrorMessage(err, 'Erro ao atualizar cliente vendedor'));
      }
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
                  label="CPF"
                  name="client_seller.cpf"
                  placeholder="CPF"
                  mask='cpf'
                  readOnly={edit}
                  defaultValue={clientSeller.cpf}
                />
                <Input
                  label="Data de Nascimento"
                  name="client_seller.date_birth"
                  placeholder="Data de Nascimento"
                  mask='date'
                  readOnly={edit}
                  defaultValue={clientSeller.date_birth}
                />
              </InputGroup>
              <InputGroup>
                <Input
                  label="Telefone"
                  name="client_seller.phone"
                  placeholder="Telefone"
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
              <InputGroup>
                <SelectSimple
                  nameLabel="Estado Civíl"
                  value={selectedCivilStatus}
                  onChange={e => setSelectedCivilStatus((e.target as HTMLSelectElement).value)}
                  options={optionsCivilStatus}
                />
                <SelectSimple
                  nameLabel="Gênero"
                  value={selectedGender}
                  onChange={e => setSelectedGender((e.target as HTMLSelectElement).value)}
                  options={optionsGenero}
                />
                <Input
                  label="Numero de Filhos"
                  name="client_seller.number_children"
                  placeholder="Número de filhos"
                  readOnly={edit}
                  defaultValue={clientSeller.number_children}
                />
              </InputGroup>
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
      </SaleData>
    </Form>
  );
};

export default ClientSeller;
