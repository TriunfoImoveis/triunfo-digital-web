import React, { useState, useRef, useEffect } from 'react';
import { Form } from '@unform/web';
import { FormHandles, SubmitHandler } from '@unform/core';

import axios from 'axios';
import * as Yup from 'yup';
import { BiEditAlt } from 'react-icons/bi';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Sync } from '../../../assets/images';
import InputDisable from '../../InputDisabled';
import Input from '../../Input';
import Select from '../../ReactSelect';
import { SaleData, Legend, InputGroup, ButtonGroup } from '../styles';
import api from '../../../services/api';
import getValidationErros from '../../../utils/getValidationErros';

import theme from '../../../styles/theme';


interface IBGECityResponse {
  nome: string;
}

interface ITypeProperty {
  id: string;
  name: string;
}

interface FormData {
  realty: {
    enterprise: string;
    state: string;
    city: string;
    neighborhood: string;
    property: string;
    unit: string;
  };
}

interface IPropertyProps {
  status: string;
  propertyType: {
    id: string;
    name: string;
  };
  realty: {
    enterprise: string;
    state: string;
    city: string;
    neighborhood: string;
    unit: string;
  };
}

interface Params {
  id: string;
}

const Property: React.FC<IPropertyProps> = ({
  realty,
  propertyType,
  status,
}) => {
  const [edit, setEdit] = useState(true);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<ITypeProperty[]>([]);
  const [selectedUf, setSelectedUf] = useState<string>(realty.state);
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { id } = useParams<Params>();

  useEffect(() => {
    axios
      .get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`,
      )
      .then(response => {
        const cityNames = response.data.map(city => city.nome);
        setCities(cityNames);
      });
  }, [selectedUf]);

  useEffect(() => {
    const loadPropertyType = async () => {
      const response = await api.get('/property-type');
      setPropertyTypes(response.data);
    };
    loadPropertyType();
  }, [realty]);

  const optionsUFs = [
    { label: 'Ceará', value: 'CE' },
    { label: 'Maranhão', value: 'MA' },
    { label: 'Piauí', value: 'PI' },
    { label: 'Paraíba', value: 'PB' },
    { label: 'São Paulo', value: 'SP' },
  ];

  const optionsCity = cities.map(city => ({
    label: city,
    value: city,
  }));

  const optionsTypeImobille = propertyTypes.map(pt => ({
    label: pt.name,
    value: pt.id,
  }));

  const handleSelectedUF = (inputValue, { action }) => {
    switch (action) {
      case 'select-option':
        setSelectedUf(inputValue.value);
        break;
      default:
        break;
    }
  };
  const handleSubmit: SubmitHandler<FormData> = async data => {
    formRef.current?.setErrors({});
    try {
      setLoading(true);
      const schema = Yup.object().shape({
        realty: Yup.object().shape({
          enterprise: Yup.string().required('Nome do Imóvel Obrigatório'),
          state: Yup.string().required('Informe o Estado'),
          city: Yup.string().required('Informe o Cidade'),
          neighborhood: Yup.string().required('Informe o bairrro'),
          property: Yup.string().required('Selecione o tipo do imóvel'),
          unit: Yup.string().required('Infome a unidade'),
        }),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.put(`/sale/${id}`, data, {
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
            <legend>IMÓVEL</legend>
            {status !== 'CAIU' ? (
              <button type="button" onClick={() => setEdit(!edit)}>
                <BiEditAlt size={20} color={theme.colors.primary} />
                <span>editar</span>
              </button>
            ) : null}
          </Legend>
          {edit ? (
            <>
              <InputDisable label="Empreendimento" data={realty.enterprise} />
              <InputGroup>
                <InputDisable label="Estado" data={realty.state} />
                <InputDisable label="Cidade" data={realty.city} />
              </InputGroup>
              <InputDisable label="Bairro" data={realty.neighborhood} />
              <InputGroup>
                <InputDisable
                  label="Tipo do Imóvel"
                  data={propertyType?.name}
                />
                <InputDisable label="Unidade" data={realty.unit} />
              </InputGroup>
            </>
          ) : (
            <>
              <Input
                label="Empreendimento"
                name="realty.enterprise"
                placeholder="Empreendimento"
                readOnly={edit}
                defaultValue={realty.enterprise}
              />
              <InputGroup>
                <Select
                  name="realty.state"
                  label="Estado"
                  placeholder="Selecione o estado"
                  options={optionsUFs}
                  onChange={handleSelectedUF}
                  disabled={edit}
                  defaultInputValue={realty.state}
                />
                <Select
                  name="realty.city"
                  label="Cidade"
                  placeholder="selecione a cidade"
                  options={optionsCity}
                  disabled={edit}
                  defaultInputValue={realty.city}
                />
              </InputGroup>
              <Input
                label="Bairro"
                name="realty.neighborhood"
                placeholder="Bairro"
                readOnly={edit}
                defaultValue={realty.neighborhood}
              />
              <InputGroup>
                <Select
                  name="realty.property"
                  label="Tipo de Imóvel"
                  placeholder="Tipo do Imóvel"
                  options={optionsTypeImobille}
                  disabled={edit}
                  defaultInputValue={propertyType?.name}
                />

                <Input
                  label="Unidade"
                  name="realty.unit"
                  placeholder="Unidade"
                  readOnly={edit}
                  defaultValue={realty.unit}
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

export default Property;
