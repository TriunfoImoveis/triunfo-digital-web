import React, { useState, useRef, useEffect, ChangeEvent } from 'react';
import { Form } from '@unform/web';
import { FormHandles, SubmitHandler } from '@unform/core';

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
import { OptionsData, states } from '../../../utils/loadOptions';

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

interface ITypeProperty {
  id: string;
  name: string;
}

interface FormData {
  realty: {
    enterprise: string;
    state: string;
    zipcode: string;
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
  const [propertyTypes, setPropertyTypes] = useState<ITypeProperty[]>([]);
  const [selectedUf, setSelectedUf] = useState<string>(realty.state);
  const [isFindingNeighborhood, setIsFindingNeighborhood] = useState(true);
  const [optionsNeighborhood, setOptionsNeighborhood] = useState<OptionsData[]>([]);
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { id } = useParams<Params>();


  const createOptionsneighborhood = (neighborhood: Array<{name: string}>) => {
    return neighborhood.map(neighborhood => ({
      label: neighborhood.name,
      value: neighborhood.name
    }))
  }
  useEffect(() => {
    const loadPropertyType = async () => {
      const response = await api.get('/property-type');
      setPropertyTypes(response.data);
    };
    loadPropertyType();
  }, [realty]);


  const optionsTypeImobille = propertyTypes.map(pt => ({
    label: pt.name,
    value: pt.id,
  }));

  const handleZipCode = async (event: ChangeEvent<HTMLInputElement>) => {
    const zipCode = event.target.value;
    if (zipCode.length === 9) {
      const response = await api.get<ICEP>(`https://viacep.com.br/ws/${zipCode}/json/`);
      const {uf,localidade, bairro} = response.data

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
  const handleSubmit: SubmitHandler<FormData> = async data => {
    formRef.current?.setErrors({});
    try {
      setLoading(true);
      const schema = Yup.object().shape({
        realty: Yup.object().shape({
          enterprise: Yup.string().required('Nome do Imóvel Obrigatório'),
          zipcode: Yup.string().required('Cep Obrigatório'),
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

      const body ={
        realty: {
          enterprise: data.realty.enterprise,
          state: selectedUf,
          city: data.realty.city,
          neighborhood: data.realty.neighborhood,
          property: data.realty.property,
          unit: data.realty.unit,
        }
      }
      await api.put(`/sale/${id}`, body, {
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
                <InputDisable label="Estado" data={states[realty.state]} />
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
                <Input
                  label="CEP"
                  mask='cep'
                  name="realty.zipcode"
                  placeholder="00000-000"
                  onBlur={handleZipCode}
                />
              </InputGroup>
              <InputGroup>
               <Input
                  label="Estado"
                  name="realty.state"
                  placeholder="Estado"
                  readOnly={edit}
                  disabled
                />
                <Input
                label="Cidade"
                name="realty.city"
                placeholder="Cidade"
                disabled
                
                />
              </InputGroup>
              {isFindingNeighborhood ? (
                <Input
                label="Bairro"
                name="realty.neighborhood"
                placeholder="Bairro"
                readOnly={edit}
                disabled={isFindingNeighborhood}
              />  
              ) : (
                <Select
                  name="realty.neighborhood"
                  label="Bairro"
                  placeholder="Informe o bairro"
                  options={optionsNeighborhood}
                  disabled={edit}
                />
              )}
              
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
