import React, { useState, useRef, useEffect } from 'react';
import { Form } from '@unform/web';
import { FormHandles, SubmitHandler } from '@unform/core';

import axios from 'axios';
import { BiEditAlt } from 'react-icons/bi';
import InputDisable from '../../InputDisabled';
import Input from '../../Input';
import Select from '../../ReactSelect';
import { SaleData, Legend, InputGroup } from '../styles';
import api from '../../../services/api';

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

const Property: React.FC<IPropertyProps> = ({
  realty,
  propertyType,
  status,
}) => {
  const [edit, setEdit] = useState(true);
  const [cities, setCities] = useState<string[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<ITypeProperty[]>([]);
  const [selectedUf, setSelectedUf] = useState<string>(realty.state);
  const formRef = useRef<FormHandles>(null);

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

  console.log(propertyType);

  const handleSelectedUF = (inputValue, { action }) => {
    switch (action) {
      case 'select-option':
        setSelectedUf(inputValue.value);
        break;
      default:
        break;
    }
  };
  const handleSubmit: SubmitHandler<FormData> = data => {
    console.log(formRef);
    console.log(data);
  };
  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <SaleData>
        <fieldset className="login">
          <Legend>
            <legend>IMÓVEL</legend>
            {status !== 'CAIU' ? (
              <button type="button" onClick={() => setEdit(!edit)}>
                <BiEditAlt size={20} color="#C32925" />
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
            </>
          )}
        </fieldset>
      </SaleData>
    </Form>
  );
};

export default Property;