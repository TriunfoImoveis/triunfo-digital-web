import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles, Scope } from '@unform/core';
import { toast } from 'react-toastify';
import { useForm } from '../../../context/FormContext';
import api from '../../../services/api';
import getValidationErros from '../../../utils/getValidationErros';

import Button from '../../Button';
import ReactSelect from '../../ReactSelect';

import { InputGroup, ButtonGroup, InputForm } from './styles';
import { states } from '../../../utils/loadOptions';

interface IOptionsData {
  id: string;
  name: string;
}

interface ICEP {
  bairro?: string
  cep: string
  complemento?: string
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
}

interface INeighborhoodData {
  id: string;
  name: string;
  uf: string;
  active: boolean;
}

interface RealtyNewFormData {
  realty: {
    enterprise: string;
    unit: string;
    state: string;
    city: string;
    neighborhood: string;
    property: string;
    zipcode: string;
  };
  builder: string;
}
interface RealtyFormNewProps {
  nextStep: () => void;
}
const RealtyFormNew = ({ nextStep }: RealtyFormNewProps) => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const { updateFormData } = useForm();

  const [builders, setBuilders] = useState<IOptionsData[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<IOptionsData[]>([]);
  const [optionsNeighborhood, setOptionsNeighborhood] = useState<{ label: string, value: string }[]>([]);

  const [isFindingNeighborhood, setIsFindingNeighborhood] = useState(true);
  const [selectedUf, setSelectedUf] = useState('');

  useEffect(() => {

    const loadBuilders = async () => {
      if (selectedUf !== '') {
        const response = await api.get('/builder', {
          params: {
            uf: selectedUf,
          },
        });
        setBuilders(response.data);
      }

    };
    const loadPropertyType = async () => {
      const response = await api.get('/property-type');
      setPropertyTypes(response.data);
    };
    loadBuilders();
    loadPropertyType();
  }, [selectedUf]);

  const createOptionsneighborhood = (neighborhood: Array<{ name: string }>) => {
    return neighborhood.map(neighborhood => ({
      label: neighborhood.name,
      value: neighborhood.name
    }))
  }

  const optionBuilder = builders.map(builder => ({
    label: builder.name,
    value: builder.id,
  }));

  const optionsPropertyType = propertyTypes.map(property => ({
    label: property.name,
    value: property.id,
  }));

  const handleZipCode = async (event: ChangeEvent<HTMLInputElement>) => {
    const zipCode = event.target.value;
    if (zipCode.length === 9) {
      const response = await api.get<ICEP>(`https://viacep.com.br/ws/${zipCode}/json/`);
      const { uf, localidade, bairro } = response.data

      if (!bairro) {
        const response = await api.get<INeighborhoodData[]>('/neighborhood', {
          params: {
            uf: uf,
            city: localidade
          }
        });
        const neighborhoods = response.data;
        setOptionsNeighborhood(createOptionsneighborhood(neighborhoods))
        setIsFindingNeighborhood(false)
      }
      formRef.current?.setData({
        realty: {
          state: states[uf],
          city: localidade,
          neighborhood: bairro,
        }
      })
      setSelectedUf(response.data.uf);
    }
  }

  const handleSubmit = useCallback(
    async (data: RealtyNewFormData) => {
      formRef.current?.setErrors({});
      try {
        setLoading(true);
        const schema = Yup.object().shape({
          realty: Yup.object().shape({
            zipcode: Yup.string().required('CEP obrigatório'),
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

        updateFormData({
          realty: {
            enterprise: data.realty.enterprise,
            city: data.realty.city,
            state: selectedUf,
            property: data.realty.property,
            neighborhood: data.realty.neighborhood,
            unit: data.realty.unit,
          },
          builder: data.builder,
        });

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
    [nextStep, selectedUf, updateFormData],
  );

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Scope path="realty">
        <InputForm label="Empreendimento" name="enterprise" />
        <InputForm
          name='zipcode'
          mask='zipcode'
          label='CEP'
          placeholder='00000-000'
          maxLength={8}
          onBlur={handleZipCode}
        />
        <InputGroup>

          <InputForm
            name="state"
            placeholder="Informe o estado"
            label="Estado"
            disabled
          />
          <InputForm
            name="city"
            label="Cidade"
            placeholder="Digite a cidade"
            disabled
          />
        </InputGroup>
        {isFindingNeighborhood ? (
          <InputForm
            label="Bairro"
            name="neighborhood"
            placeholder="Bairro"
            readOnly
            disabled={isFindingNeighborhood}
          />
        ) : (
          <ReactSelect
            name="neighborhood"
            label="Bairro"
            placeholder="Informe o bairro"
            options={optionsNeighborhood}
          />
        )}
        <ReactSelect
          name="property"
          label="Tipo de Imóvel"
          placeholder="Selecione o tipo do imovel"
          options={optionsPropertyType}
        />
        <InputForm label="Unidade" name="unit" placeholder="Unidade" />
      </Scope>
      <ReactSelect
        placeholder="Selecione a construtora"
        name="builder"
        options={optionBuilder}
        label="Contrutora"
      />
      <ButtonGroup>
        <Button type="reset" className="cancel">
          Cancelar
        </Button>
        <Button type="submit" className="next" >
          {loading ? '...' : 'Próximo'}
        </Button>
      </ButtonGroup>
    </Form>
  )
}

export default RealtyFormNew


