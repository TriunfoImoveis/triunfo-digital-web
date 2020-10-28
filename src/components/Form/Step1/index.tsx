import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { IoMdArrowDropdown } from 'react-icons/io';
import axios from 'axios';
import { toast } from 'react-toastify';
import api from '../../../services/api';
import getValidationErros from '../../../utils/getValidationErros';

import Select from '../../Select';
import Button from '../../Button';

import { Container, InputGroup, ButtonGroup, InputForm } from './styles';

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

interface IPropertyTypeData {
  id: string;
  name: string;
}

interface ISaleNewData {
  SaleNewData(data: object): void;
  nextStep: () => void;
}

const Step1: React.FC<ISaleNewData> = ({ SaleNewData, nextStep }) => {
  const formRef = useRef<FormHandles>(null);
  const [ufs, setUfs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const [propertyType, setPropertyType] = useState<IPropertyTypeData[]>([]);
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      )
      .then(response => {
        const ufInitials = response.data.map(uf => uf.sigla);
        setUfs(ufInitials);
      });
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
    const loadPropertyType = async () => {
      const response = await api.get('/property-type');
      setPropertyType(response.data);
    };
    loadPropertyType();
  }, []);

  const optionsUFs = ufs.map(uf => ({
    value: uf,
    label: uf,
  }));

  const optionsCities = cities.map(city => ({ value: city, label: city }));

  const optionsTypeImobille = propertyType.map(property => ({
    value: property.id,
    label: property.name,
  }));

  const optionBuilder = [
    { label: 'Dimensão Engenharia', value: 'Dimensão Engenharia' },
    { label: 'Sá Cavalcante', value: 'Sá Cavalcante' },
    { label: 'Delman', value: 'Delman' },
  ];
  const handleSelectedUF = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const uf = event.target.value;
      setSelectedUf(uf);
    },
    [],
  );

  const handleSubmit = useCallback(
    async data => {
      formRef.current?.setErrors({});
      try {
        setLoading(true);
        const schema = Yup.object().shape({
          enterprise: Yup.string().required('Nome do Imóvel Obrigatório'),
          state: Yup.string().required('Informe o Estado'),
          city: Yup.string().required('Informe o Cidade'),
          neighborhood: Yup.string().required('Informe o bairrro'),
          property: Yup.string().required('Selecione o tipo do imóvel'),
          unit: Yup.string().required('Infome a unidade'),
          builder: Yup.string().required('Selecione uma construtora'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        SaleNewData(data);
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
    [SaleNewData, nextStep],
  );

  const handleSelectCity = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const city = event.target.value;
      setSelectedCity(city);
    },
    [],
  );
  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <InputForm name="enterprise" placeholder="Empreendimento" />
        <InputGroup>
          <Select
            name="state"
            placeholder="Selecione um estado"
            options={optionsUFs}
            icon={IoMdArrowDropdown}
            defaultValue={selectedUf}
            onChange={handleSelectedUF}
            nameLabel="o Estado"
          />
          <Select
            name="city"
            placeholder="Cidade"
            options={optionsCities}
            icon={IoMdArrowDropdown}
            defaultValue={selectedCity}
            onChange={handleSelectCity}
            nameLabel="a cidade"
          />
        </InputGroup>
        <InputForm name="neighborhood" placeholder="Bairro" />
        <Select
          name="property"
          placeholder="Tipo do Imovel"
          options={optionsTypeImobille}
          icon={IoMdArrowDropdown}
          nameLabel="o Tipo do Imóvel"
        />
        <InputForm name="unit" placeholder="Unidade" />
        <Select
          name="builder"
          options={optionBuilder}
          icon={IoMdArrowDropdown}
          nameLabel="a contrutora"
        />
        <ButtonGroup>
          <Button type="reset" className="cancel">
            Cancelar
          </Button>
          <Button type="submit" className="next">
            {loading ? '...' : 'Próximo'}
          </Button>
        </ButtonGroup>
      </Form>
    </Container>
  );
};

export default Step1;
