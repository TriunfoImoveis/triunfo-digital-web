import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsPencil } from 'react-icons/bs';
import Loader from 'react-loader-spinner';
import AdmLayout from '../../Layouts/Adm';
import theme from '../../../styles/theme';
import {
  FiltersContainer,
  FiltersBotton,
  FiltersBottonItems,
  Content,
  SaleTableContainer,
  HeaderItem,
  SaleHeader,
  SaleBody,
  SaleItem,
  LoadingContainer,
} from './styles';
import { useFetchFinances } from '../../../hooks/useFetchFinances';
import { states } from '../../../utils/loadOptions';
import axios from 'axios';

interface IIBGEResponse {
  id: number;
  sigla: string;
  nome: string;
}
interface Params {
  name?: string;
  city?: string;
  uf?: string;
  active?: boolean;
}

interface INeighborhoodData {
  id: string;
  name: string;
  city: string;
  uf: string;
  active: boolean;
}

const ListNeighbohood: React.FC = () => {
  const [params, setParams] = useState<Params>({});
  const [selectedUF, setSelectedUF] = useState('');
  const [cities, setCities] = useState<{name: string}[]>([]);
  const { data: neighborhoods } = useFetchFinances<INeighborhoodData[]>({ url: '/neighborhood', params });

  const active = {
    'true': 'SIM',
    'false': 'NÂO',
  }

  const handleSelectUf = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const uf = event.target.value;
    const response = await axios.get<IIBGEResponse[]>( `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
   const cities = response.data.map(item => ({name: item.nome}))
   setSelectedUF(uf)
   setCities(cities)
   setParams({
    uf,
    city: ''
   })
  }
  const handleSelectCity = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const city = event.target.value;
    setParams(prevState => ({
      ...prevState,
      city,
      uf: selectedUF
    }))
   
  }

  return (
    <AdmLayout>
      <FiltersContainer>
        <FiltersBotton>
          <FiltersBottonItems>
            <span>Estados: </span>
            <select onChange={handleSelectUf}>
              <option value="">Todos</option>
              {Object.keys(states).map(uf => (
                <option key={uf} value={uf}>{states[uf]}</option>
              ))}
            </select>
            <span>Cidades: </span>
            <select onChange={handleSelectCity}>
              <option value="">Todas</option>
              {cities.map(city => (
                <option key={city.name} value={city.name}>{city.name}</option>
              ))}
            </select>
          </FiltersBottonItems>
          <FiltersBottonItems>
            <Link to="/adm/nova-filial">Novo Bairro</Link>
          </FiltersBottonItems>
        </FiltersBotton>
      </FiltersContainer>
      <Content>
        <SaleTableContainer>
          <SaleHeader>
            <HeaderItem>Nome</HeaderItem>
            <HeaderItem>Cidade</HeaderItem>
            <HeaderItem>Estado</HeaderItem>
            <HeaderItem>Ativo</HeaderItem>
            <HeaderItem />
          </SaleHeader>
          {!neighborhoods ? (
            <LoadingContainer>
              <Loader type="Bars" color={theme.colors.gold} height={100} width={100} />
            </LoadingContainer>
          ) : null}
          {neighborhoods && neighborhoods.map(neighborhood =>
          (
            <SaleBody key={neighborhood.id}>
              <SaleItem>{neighborhood.name}</SaleItem>
              <SaleItem>{neighborhood.city}</SaleItem>
              <SaleItem>{states[neighborhood.uf]}</SaleItem>
              <SaleItem>{active[neighborhood.active.toString()]}</SaleItem>
              <SaleItem>
                <Link to={`/adm/detalhes-filiais/${neighborhood.id}`}>
                  <BsPencil size={15} color={theme.colors.gold} />
                  Editar
                </Link>
              </SaleItem>
            </SaleBody>
          ),
          )}
        </SaleTableContainer>
      </Content>
    </AdmLayout>
  );
};

export default ListNeighbohood;
