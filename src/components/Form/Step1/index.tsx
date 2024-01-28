import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useForm } from '../../../context/FormContext';
import api from '../../../services/api';
import getValidationErros from '../../../utils/getValidationErros';

import Button from '../../Button';
import ReactSelect from '../../ReactSelect';

import { Container, InputGroup, ButtonGroup, InputForm } from './styles';
import { useAuth } from '../../../context/AuthContext';
import { unicItensArray } from '../../../utils/format';
import { states } from '../../../utils/loadOptions';

interface IOptionsData {
  id: string;
  name: string;
}

interface ISubsidiaries {
  id: string,
  name: string;
  state: string;
}

interface IBGECityResponse {
  nome: string;
}

interface ISaleNewData {
  nextStep: () => void;
  typeSale: 'new' | 'used';
}

interface IStep1FormData {
  realty: {
    enterprise: string;
    unity: string;
    state: string;
    city: string;
    neighborhood: string;
    property: string;
  };
  builder?: string;
}


const Step1: React.FC<ISaleNewData> = ({ nextStep, typeSale }) => {
  const formRef = useRef<FormHandles>(null);
  const { userAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const { updateFormData, initialFormData } = useForm();

  const [builders, setBuilders] = useState<IOptionsData[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<IOptionsData[]>([]);
  const [subsidiaries, setSubsidiaries] = useState<ISubsidiaries[]>([]);
  const [selectedUf, setSelectedUf] = useState(userAuth.subsidiary.state);
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    initialFormData();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }

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
    const loadBuilders = async () => {
      const response = await api.get('/builder', {
        params: {
          uf: selectedUf,
        },
      });
      setBuilders(response.data);
    };
    const loadSubsidiaries = async () => {
      const response = await api.get('/subsidiary');
      setSubsidiaries(response.data);
    };
    const loadPropertyType = async () => {
      const response = await api.get('/property-type');
      setPropertyTypes(response.data);
    };
    loadBuilders();
    loadPropertyType();
    loadSubsidiaries();
  }, [typeSale, selectedUf]);

  const optionsUFs = 
  unicItensArray(subsidiaries.map(subsidiary => subsidiary.state))
  .map(item => ({label: states[item], value: item}))
  const optionBuilder = builders.map(builder => ({
    label: builder.name,
    value: builder.id,
  })); 

  const optionsPropertyType = propertyTypes.map(property => ({
    label: property.name,
    value: property.id,
  }));

  const optionsCity = cities.map(city => ({
    label: city,
    value: city,
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

  const handleSubmit = useCallback(
    async (data: IStep1FormData) => {
      formRef.current?.setErrors({});
      try {
        setLoading(true);
        if (typeSale === 'new') {
          const schema = Yup.object().shape({
            realty: Yup.object().shape({
              enterprise: Yup.string().required('Nome do Imóvel Obrigatório'),
              state: Yup.string().required('Informe o Estado'),
              city: Yup.string().required('Informe o Cidade'),
              neighborhood: Yup.string().required('Informe o bairrro'),
              property: Yup.string().required('Selecione o tipo do imóvel'),
              unit: Yup.string().required('Infome a unidade'),
            }),
            builder: Yup.string().required('Selecione um construtora'),
          });

          await schema.validate(data, {
            abortEarly: false,
          });
        } else {
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
        }

        updateFormData(data);
        nextStep();
        setLoading(false);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const erros = getValidationErros(err);
          formRef.current?.setErrors(erros);
        }

        toast.error('ERROR!, verifique as informações e tente novamente');
        setLoading(false);
      }
    },
    [nextStep, typeSale, updateFormData],
  );

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <InputForm label="Empreendimento" name="realty.enterprise" />
        <InputGroup>
          <ReactSelect
            name="realty.state"
            placeholder="Informe o estado"
            options={optionsUFs || []}
            onChange={handleSelectedUF}
            label="Estado"
          />
          <ReactSelect
            name="realty.city"
            label="Cidade"
            placeholder="Digite a cidade"
            options={optionsCity}
          />
        </InputGroup>
        <InputForm
          label="Bairro"
          name="realty.neighborhood"
          placeholder="Bairro"
        />
        <ReactSelect
          name="realty.property"
          label="Tipo de Imóvel"
          placeholder="Selecione o tipo do imovel"
          options={optionsPropertyType}
        />
        <InputForm label="Unidade" name="realty.unit" placeholder="Unidade" />
        {typeSale === 'new' && (
          <ReactSelect
            placeholder="Selecione a construtora"
            name="builder"
            options={optionBuilder}
            label="Contrutora"
          />
        )}
        <ButtonGroup>
          <Button type="reset" className="cancel">
            Cancelar
          </Button>
          <Button type="submit" className="next" >
            {loading ? '...' : 'Próximo'}
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default Step1;
