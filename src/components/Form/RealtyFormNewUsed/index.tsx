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
import axios from 'axios';

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
interface IOptionsData {
  id: string;
  name: string;
}

interface RealtyUsedFormData {
  realty: {
    enterprise: string;
    unit: string;
    state: string;
    city: string;
    neighborhood: string;
    property: string;
    zipcode: string;
  };
}
interface RealtyFormUsedProps {
  nextStep: () => void;
}
const RealtyFormUsed = ({ nextStep }: RealtyFormUsedProps) => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const { updateFormData } = useForm();

  const [propertyTypes, setPropertyTypes] = useState<IOptionsData[]>([]);
  const [optionsNeighborhood, setOptionsNeighborhood] = useState<{ label: string, value: string }[]>([]);

  const [isFindingNeighborhood, setIsFindingNeighborhood] = useState(true);
  const [selectedUf, setSelectedUf] = useState('');


  useEffect(() => {
    const loadPropertyType = async () => {
      const response = await api.get('/property-type');
      setPropertyTypes(response.data);
    };
    loadPropertyType();
  }, []);

  const createOptionsneighborhood = (neighborhood: Array<{ name: string }>) => {
    return neighborhood.map(neighborhood => ({
      label: neighborhood.name,
      value: neighborhood.name
    }))
  }

  const optionsPropertyType = propertyTypes.map(property => ({
    label: property.name,
    value: property.id,
  }));

  const handleZipCode = async (event: ChangeEvent<HTMLInputElement>) => {
    const zipCode = event.target.value;
    if (zipCode.length === 9) {
      const response = await axios.get<ICEP>(`https://viacep.com.br/ws/${zipCode}/json/`);
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
    async (data: RealtyUsedFormData) => {
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
        })


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
    [nextStep, updateFormData, selectedUf],
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

export default RealtyFormUsed
