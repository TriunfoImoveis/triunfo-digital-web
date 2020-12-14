import React, { ChangeEvent, useState, useEffect, useCallback } from 'react';

import { BiEditAlt } from 'react-icons/bi';
import axios from 'axios';
import { Form } from '@unform/web';
import { BsCheckBox } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
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
  Legend,
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

interface ISaleData {
  id: string;
  bonus?: string;
  builder?: {
    id: string;
    name: string;
  };
  client_buyer: {
    civil_status: string;
    cpf: string;
    date_birth: string;
    email: string;
    gender: string;
    id: string;
    name: string;
    number_children: number;
    occupation: string;
    phone: string;
    whatsapp: string;
  };
  client_seller?: {
    civil_status: string;
    cpf: string;
    date_birth: string;
    email: string;
    gender: string;
    id: string;
    name: string;
    number_children: number;
    occupation: string;
    phone: string;
    whatsapp: string;
  };
  commission: string;
  company?: {
    id: string;
    name: string;
    percentage: number;
  };
  origin: {
    id: string;
    name: string;
  };
  payment_type: {
    id: string;
    name: string;
  };
  percentage_company: number;
  percentage_sale: number;
  realty: {
    city: string;
    enterprise: string;
    id: string;
    neighborhood: string;
    property: {
      id: string;
      name: string;
    };
    state: string;
    unit: string;
  };
  realty_ammount: string;
  sale_date: string;
  sale_has_captivators: {}[];
  sale_has_sellers: {
    id: string;
    name: string;
    email: string;
    avatar_url?: string;
  }[];
  sale_type: string;
  status: string;
  user_coordinator?: {
    id: string;
    name: string;
  };

  users_directors: {
    id: string;
    name: string;
  }[];
}

const DetailsSale: React.FC = () => {
  const [token] = useState(localStorage.getItem('@TriunfoDigital:token'));
  const [uf] = useState(['MA', 'CE', 'PI']);
  const [edits, setEdits] = useState({
    property: true,
    buyer: true,
  });
  const [propertyType, setPropertyType] = useState<IOptionsData[]>([]);
  const [, setBuilders] = useState<IOptionsData[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState('MA');
  const [, setSelectedCity] = useState('0');
  const [sale, setSale] = useState<ISaleData>({} as ISaleData);
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
        toast.error(
          'Conexão do servidor falhou ! entre em contato com o suporte',
        );
      }
    };
    const loadPropertyType = async () => {
      const response = await api.get('/property-type');
      setPropertyType(response.data);
    };
    if (sale.sale_type === 'NOVO') {
      const loadBuilders = async () => {
        const response = await api.get('/builder');
        setBuilders(response.data);
      };
      loadBuilders();
    }
    loadSale();
    loadPropertyType();
  }, [token, id, sale.sale_type]);

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

  const handleEdit = useCallback(
    (stepForm: string): void => {
      switch (stepForm) {
        case 'property':
          setEdits({ ...edits, property: !edits.property });
          break;
        case 'buyer':
          setEdits({ ...edits, buyer: !edits.buyer });
          break;
        default:
          break;
      }
    },
    [edits],
  );
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
  // const optionsBuilders = builders.map(builder => ({
  //   value: builder.id,
  //   label: builder.name,
  // }));

  return (
    <AdmLayout>
      <Container>
        <h1>DETALHES DA VENDA</h1>
        <Content>
          <Form onSubmit={() => console.log('ok')} initialData={sale}>
            <SaleData>
              <fieldset className="login">
                <Legend>
                  <legend>IMÓVEL</legend>
                  <button type="button" onClick={() => handleEdit('property')}>
                    <BiEditAlt size={20} color="#C32925" />
                    <span>editar</span>
                  </button>
                </Legend>

                <Input
                  label="Empreendimento"
                  name="realty.enterprise"
                  placeholder="Empreendimento"
                  readOnly={edits.property}
                />
                <InputGroup>
                  {!edits.property ? (
                    <Select
                      name="realty.state"
                      nameLabel="Estado"
                      options={optionsState}
                      onChange={handleSelectedUF}
                      disabled={edits.property}
                    />
                  ) : (
                    <Input
                      name="realty.state"
                      label="Estado"
                      readOnly={edits.property}
                    />
                  )}
                  {!edits.property ? (
                    <Select
                      name="realty.city"
                      nameLabel="Cidade"
                      options={optionsCity}
                      onChange={handleSelectCity}
                      disabled={edits.property}
                    />
                  ) : (
                    <Input
                      name="realty.city"
                      label="Cidade"
                      readOnly={edits.property}
                    />
                  )}
                </InputGroup>
                <Input
                  label="Bairro"
                  name="realty.neighborhood"
                  placeholder="Bairro"
                  readOnly={edits.property}
                />
                <InputGroup>
                  {!edits.property ? (
                    <Select
                      name="realty.property"
                      nameLabel="Tipo de Imóvel"
                      options={optionsTypeImobille}
                      disabled={edits.property}
                    />
                  ) : (
                    <Input
                      name="realty.property.name"
                      label="Tipo de Imóvel"
                      readOnly={edits.property}
                    />
                  )}

                  <Input
                    label="Unidade"
                    name="realty.unit"
                    placeholder="Unidade"
                    readOnly={edits.property}
                  />
                </InputGroup>
              </fieldset>
            </SaleData>
            <SaleData>
              <fieldset className="login">
                <Legend>
                  <legend>COMPRADOR</legend>
                  <button type="button" onClick={() => handleEdit('buyer')}>
                    <BiEditAlt size={20} color="#C32925" />
                    <span>editar</span>
                  </button>
                </Legend>
                <Input
                  label="Nome Completo"
                  name="client_buyer.name"
                  placeholder="Nome Completo"
                  readOnly={edits.buyer}
                />
                <InputGroup>
                  <Input
                    label="CPF"
                    name="client_buyer.cpf"
                    placeholder="CPF"
                    readOnly={edits.buyer}
                  />
                  <Input
                    label="Data de Nascimento"
                    name="client_buyer.date_birth"
                    placeholder="Data de Nascimento"
                    readOnly={edits.buyer}
                  />
                </InputGroup>
                <InputGroup>
                  <Input
                    label="Telefone"
                    name="client_buyer.phone"
                    placeholder="Telefone"
                    readOnly={edits.buyer}
                  />
                  <Input
                    label="E-mail"
                    name="client_buyer.email"
                    type="email"
                    placeholder="E-mail"
                    readOnly={edits.buyer}
                  />
                </InputGroup>
                <InputGroup>
                  <Input
                    label="Estado Civíl"
                    name="client_buyer.civil_status"
                    placeholder="Estado Civíl"
                    readOnly={edits.buyer}
                  />
                  <Input
                    label="Gênero"
                    name="client_buyer.gender"
                    placeholder="Gênero"
                    readOnly={edits.buyer}
                  />
                  <Input
                    label="Numero de Filhos"
                    name="client_buyer.number_children"
                    placeholder="Número de filhos"
                    readOnly={edits.buyer}
                  />
                </InputGroup>
              </fieldset>
            </SaleData>
            {sale.sale_type === 'NOVO' && (
              <SaleData>
                <fieldset className="login">
                  <legend>CONSTRUTORA</legend>
                  <Input
                    label="Gênero"
                    name="builder.name"
                    placeholder="Gênero"
                  />
                </fieldset>
              </SaleData>
            )}
            {sale.sale_type === 'USADO' && (
              <SaleData>
                <fieldset className="login">
                  <legend>VENDEDOR</legend>
                  <Input
                    label="Nome Completo"
                    name="client_saller.name"
                    placeholder="Nome Completo"
                  />
                  <InputGroup>
                    <Input
                      label="CPF"
                      name="client_saller.cpf"
                      placeholder="CPF"
                    />
                    <Input
                      label="Data de Nascimento"
                      name="client_saller.date_birth"
                      placeholder="Data de Nascimento"
                    />
                  </InputGroup>
                  <InputGroup>
                    <Input
                      label="Telefone"
                      name="client_saller.phone"
                      placeholder="Telefone"
                    />
                    <Input
                      label="E-mail"
                      name="client_saller.email"
                      type="email"
                      placeholder="E-mail"
                    />
                  </InputGroup>
                  <InputGroup>
                    <Input
                      label="Estado Civíl"
                      name="client_saller.civil_status"
                      placeholder="Estado Civíl"
                    />
                    <Input
                      label="Gênero"
                      name="client_saller.gender"
                      placeholder="Gênero"
                    />
                    <Input
                      label="Numero de Filhos"
                      name="client_saller.number_children"
                      placeholder="Número de filhos"
                    />
                  </InputGroup>
                </fieldset>
              </SaleData>
            )}

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
