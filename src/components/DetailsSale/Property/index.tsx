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
  realty: {
    enterprise: string;
    state: string;
    city: string;
    neighborhood: string;
    property: ITypeProperty;
    unit: string;
  };
}

const Property: React.FC<IPropertyProps> = ({ realty, status }) => {
  const [edit, setEdit] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const [propertyTypes, setPropertyTypes] = useState<ITypeProperty[]>([]);
  const [selectedUf, setSelectedUf] = useState(realty.state);
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
      const options = response.data.map(data => ({
        label: data.name,
        value: data.id,
      }));
      setPropertyTypes(options);
    };
    loadPropertyType();
  }, []);
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
                  data={realty.property.name}
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
                  nameLabel="Estado"
                  options={optionsUFs}
                  onChange={handleSelectedUF}
                  disabled={edit}
                  defaultInputValue={realty.state}
                />
                <Select
                  name="realty.city"
                  nameLabel="Cidade"
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
                  nameLabel="Tipo de Imóvel"
                  options={optionsTypeImobille}
                  disabled={edit}
                  defaultInputValue={realty.property.id}
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
