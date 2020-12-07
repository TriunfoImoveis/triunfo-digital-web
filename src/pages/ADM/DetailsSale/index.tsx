import React, { ChangeEvent, useState, useEffect, useCallback } from 'react';

import axios from 'axios';
import { Form } from '@unform/web';
import { BsCheckBox } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import AdmLayout from '../../Layouts/Adm';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import { Sync, Garb } from '../../../assets/images';
import { CPFMask, FoneMask } from '../../../utils/masked';
import { DateBRL } from '../../../utils/format';
import {
  Container,
  Content,
  SaleData,
  InputGroup,
  ButtonGroup,
} from './styles';
import api from '../../../services/api';

interface IBGECityResponse {
  nome: string;
}

interface IOptionsData {
  id: string;
  name: string;
}

interface IParamsData {
  id: string;
}

const DetailsSale: React.FC = () => {
  const [token] = useState(localStorage.getItem('@TriunfoDigital:token'));
  const [uf] = useState(['MA', 'CE', 'PI']);
  const [propertyType, setPropertyType] = useState<IOptionsData[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState('MA');
  const [, setSelectedCity] = useState('0');
  const [sale, setSale] = useState([]);
  const { id } = useParams<IParamsData>();

  useEffect(() => {
    const loadSale = async () => {
      try {
        const response = await api.get(`/sale/${id}`, {
          headers: {
            auhorization: `Bearer ${token}`,
          },
        });
        const sale = response.data;
        const cpfFormatted = CPFMask(sale.client_buyer.cpf);
        const dataFormatted = DateBRL(sale.client_buyer.date_birth);
        const foneFormatted = FoneMask(sale.client_buyer.phone);
        const saleFormatted = Object.assign(
          sale,
          (sale.client_buyer.cpf = cpfFormatted),
          (sale.client_buyer.date_birth = dataFormatted),
          (sale.client_buyer.phone = foneFormatted),
        );
        setSale(saleFormatted);
      } catch (error) {
        console.log(error);
      }
    };
    loadSale();
  }, [token, id]);
  useEffect(() => {
    const loadPropertyType = async () => {
      const response = await api.get('/property-type');
      setPropertyType(response.data);
    };
    loadPropertyType();
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

  const handleSelectedUF = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const state = event.target.value;
      setSelectedUf(state);
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

  const optionsState = uf.map(u => ({
    label: u,
    value: u,
  }));
  const optionsCity = cities.map(city => ({
    label: city,
    value: city,
  }));
  const optionsTypeImobille = propertyType.map(property => ({
    value: property.id,
    label: property.name,
  }));

  return (
    <AdmLayout>
      <Container>
        <h1>DETALHES DA VENDA</h1>
        <Content>
          <Form
            onSubmit={() => {
              console.log('ok');
            }}
            initialData={sale}
          >
            <SaleData>
              <fieldset className="login">
                <legend>IMÓVEL</legend>
                <Input name="realty.enterprise" placeholder="Empreendimento" />
                <InputGroup>
                  <Select
                    name="realty.state"
                    options={optionsState}
                    onChange={handleSelectedUF}
                  />
                  <Select
                    name="realty.city"
                    options={optionsCity}
                    onChange={handleSelectCity}
                  />
                </InputGroup>
                <Input name="realty.neighborhood" placeholder="Bairro" />
                <InputGroup>
                  <Select
                    name="realty.property"
                    options={optionsTypeImobille}
                  />
                  <Input name="realty.unit" placeholder="Unidade" />
                </InputGroup>
              </fieldset>
            </SaleData>
            <SaleData>
              <fieldset className="login">
                <legend>COMPRADOR</legend>
                <Input name="client_buyer.name" placeholder="Nome Completo" />
                <InputGroup>
                  <Input name="client_buyer.cpf" placeholder="CPF" />
                  <Input
                    name="client_buyer.date_birth"
                    placeholder="Data de Nascimento"
                  />
                </InputGroup>
                <InputGroup>
                  <Input name="client_buyer.phone" placeholder="Telefone" />
                  <Input
                    name="client_buyer.email"
                    type="email"
                    placeholder="E-mail"
                  />
                </InputGroup>
                <InputGroup>
                  <Input
                    name="client_buyer.civil_status"
                    placeholder="Estado Civíl"
                  />
                  <Input name="client_buyer.gender" placeholder="Gênero" />
                  <Input
                    name="client_buyer.number_children"
                    placeholder="Número de filhos"
                  />
                </InputGroup>
              </fieldset>
            </SaleData>
            <ButtonGroup>
              <button type="button">
                <Sync />
                <span>Atualizar</span>
              </button>
              <button type="button">
                <Garb />
                <span>Caiu</span>
              </button>
            </ButtonGroup>

            <button type="submit" className="submit">
              <BsCheckBox size={25} />
              <span>Cadastrar Colaborador</span>
            </button>
          </Form>
        </Content>
      </Container>
    </AdmLayout>
  );
};

export default DetailsSale;
