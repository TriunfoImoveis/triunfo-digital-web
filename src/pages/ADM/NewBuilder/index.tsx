import React, {
  useRef,
  useCallback,
  useEffect,
  useState,
  ChangeEvent,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import Axios from 'axios';
import AdmLayout from '../../Layouts/Adm';
import Input from '../../../components/Input';

import { Container, InfoLogin, ButtonGroup } from './styles';
import { Sync, Garb } from '../../../assets/images';
import api from '../../../services/api';
import Select from '../../../components/Select';
import { unMaked, unMaskedCNPJ } from '../../../utils/unMasked';
import getValidationErros from '../../../utils/getValidationErros';
import { cnpj, FoneMask } from '../../../utils/masked';

interface IRoteparams {
  id: string;
}

interface IBuilder {
  id: string;
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  city: string;
}

interface IBGECityResponse {
  nome: string;
}

const NewBuilders: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [pageDetails, setPageDetails] = useState(false);
  const [builder, setBuilders] = useState<IBuilder>({} as IBuilder);
  const [selectedUf, setSelectedUf] = useState('MA');
  const [selectedCity, setSelectedCity] = useState('0');
  const [cities, setCities] = useState<string[]>([]);
  const token = localStorage.getItem('@TriunfoDigital:token');
  const history = useHistory();

  const { id } = useParams<IRoteparams>();

  useEffect(() => {
    const loadBuilder = async () => {
      const response = await api.get(`/builder/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const builder = response.data;
      const builderFormatted = {
        ...builder,
        cnpj: cnpj(builder.cnpj),
        phone: FoneMask(builder.phone),
      };
      setBuilders(builderFormatted);
    };
    if (id) {
      setPageDetails(true);
      loadBuilder();
    }
  }, [id, token]);

  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }

    Axios.get<IBGECityResponse[]>(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`,
    ).then(response => {
      const cityNames = response.data.map(city => city.nome);
      setCities(cityNames);
    });
  }, [selectedUf]);

  const handleSelectCity = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const city = event.target.value;
      setSelectedCity(city);
    },
    [],
  );

  const optionsState = [
    { label: 'Maranhão', value: 'MA' },
    { label: 'Ceará', value: 'CE' },
    { label: 'Piauí', value: 'PI' },
  ];

  const handleSelectedUF = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const uf = event.target.value;
      setSelectedUf(uf);
    },
    [],
  );

  const optionsCities = cities.map(city => ({ value: city, label: city }));
  const unMasked = useCallback(() => {
    const fone = unMaked(formRef.current?.getFieldValue('phone'));
    formRef.current?.setFieldValue('phone', fone);
    const cnpj = unMaskedCNPJ(formRef.current?.getFieldValue('cnpj'));
    formRef.current?.setFieldValue('cnpj', cnpj);
  }, []);

  const handleSubmit = useCallback(async () => {
    formRef.current?.setErrors({});
    unMasked();
    const data = formRef.current?.getData();
    try {
      setLoading(true);

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome da Contrutora obrigatório'),
        cnpj: Yup.string().required('CNPJ obrigatório'),
        email: Yup.string().email().required('E-mail obrigatório'),
        phone: Yup.string().required('Telefone obrigatório'),
        responsible: Yup.string().required('Nome do Responsável obrigatório'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });
      await api.post('/builder', data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      toast.success('Nova Construtora Cadastrada');
      history.push('/adm/lista-construtoras');
      setLoading(false);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const erros = getValidationErros(err);
        formRef.current?.setErrors(erros);
      }

      toast.error('ERROR!, verifique as informações e tente novamente');
      setLoading(false);
    }
  }, [unMasked, token, history]);

  return (
    <AdmLayout>
      <Container>
        <h1>NOVA CONSTRUTORA</h1>
        {pageDetails ? (
          <Form ref={formRef} onSubmit={handleSubmit} initialData={builder}>
            <InfoLogin>
              <fieldset className="login">
                <legend>INFORMAÇÕES DA CONSTRUTORA</legend>
                <Input label="Nome" name="name" />
                <Input label="CNPJ" name="cnpj" maxlength={14} mask="cnpj" />
                <Input label="E-mail" name="email" type="email" />
                <Input
                  label="Telefone"
                  name="phone"
                  mask="fone"
                  maxlength={11}
                />
                <Input label="Nome do Responsável" name="responsible" />
                <Select
                  name="state"
                  nameLabel="Estado"
                  options={optionsState}
                  defaultValue={selectedUf}
                  onChange={handleSelectedUF}
                />
                <Select
                  name="city"
                  nameLabel="Cidade"
                  options={optionsCities}
                  defaultValue={builder.city}
                  onChange={handleSelectCity}
                />
              </fieldset>
            </InfoLogin>

            {pageDetails && (
              <ButtonGroup>
                <button type="button">
                  <Sync />
                  <span>Atualizar</span>
                </button>
                <button type="button">
                  <Garb />
                  <span>Remover</span>
                </button>
              </ButtonGroup>
            )}

            {!pageDetails && (
              <button type="submit" className="submit">
                {loading ? 'Aguarde' : 'Cadastrar Colaborador'}
              </button>
            )}
          </Form>
        ) : (
          <Form ref={formRef} onSubmit={handleSubmit}>
            <InfoLogin>
              <fieldset className="login">
                <legend>INFORMAÇÕES DE LOGIN</legend>
                <Input label="Nome" name="name" />
                <Input label="CNPJ" name="cnpj" maxlength={14} mask="cnpj" />
                <Input label="E-mail" name="email" type="email" />
                <Input
                  label="Telefone"
                  name="phone"
                  mask="fone"
                  maxlength={11}
                />
                <Input label="Nome do Responsável" name="responsible" />
                <Select
                  name="state"
                  nameLabel="Estado"
                  options={optionsState}
                  defaultValue={selectedUf}
                  onChange={handleSelectedUF}
                />
                <Select
                  name="city"
                  nameLabel="Cidade"
                  options={optionsCities}
                  defaultValue={selectedCity}
                  onChange={handleSelectCity}
                />
              </fieldset>
            </InfoLogin>

            {pageDetails && (
              <ButtonGroup>
                <button type="button">
                  <Sync />
                  <span>Atualizar</span>
                </button>
                <button type="button">
                  <Garb />
                  <span>Remover</span>
                </button>
              </ButtonGroup>
            )}

            {!pageDetails && (
              <button type="submit" className="submit">
                {loading ? 'Aguarde' : 'Cadastrar Colaborador'}
              </button>
            )}
          </Form>
        )}
      </Container>
    </AdmLayout>
  );
};

export default NewBuilders;
