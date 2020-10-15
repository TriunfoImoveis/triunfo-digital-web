import React, {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';

import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { IoMdArrowDropdown } from 'react-icons/io';
import axios from 'axios';
import Header from '../../../components/Header';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import Button from '../../../components/Button';
import {
  Container,
  Content,
  FormContainer,
  TabNavigator,
  InputGroup,
  ButtonGroup,
} from './styles';

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const RegisterSaleNew: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
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

  const optionsUFs = ufs.map(uf => ({
    value: uf,
    label: uf,
  }));

  const optionsCities = cities.map(city => ({ value: city, label: city }));

  const optionsTypeImobille = [
    { value: '', label: 'Tipo do Imóvel' },
    { value: 'Apartamento', label: 'Apartamento' },
  ];

  const handleSelectedUF = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const uf = event.target.value;
      setSelectedUf(uf);
    },
    [],
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
      <Header />
      <Content>
        <header>
          <h1>Cadastrar Vendas</h1>
          <span>VENDA</span>
        </header>
        <FormContainer>
          <TabNavigator />
          <Form ref={formRef} onSubmit={() => {}}>
            <Input name="property" placeholder="Empreendimento" />
            <InputGroup>
              <Select
                name="state"
                placeholder="Cidade"
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
            <Input name="bairro" placeholder="Bairro" />
            <Select
              name="type_immobile"
              placeholder="Tipo do Imovel"
              options={optionsTypeImobille}
              icon={IoMdArrowDropdown}
            />
            <Input name="unity" placeholder="Unidade" />
            <ButtonGroup>
              <Button type="reset" className="cancel">
                Cancelar
              </Button>
              <Button type="submit" className="next">
                Próximo
              </Button>
            </ButtonGroup>
          </Form>
        </FormContainer>
      </Content>
    </Container>
  );
};

export default RegisterSaleNew;
