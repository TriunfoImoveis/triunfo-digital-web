import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { BsPencil } from 'react-icons/bs';
import Loader from 'react-loader-spinner';
import AdmLayout from '../../Layouts/Adm';
import { Search } from '../../../assets/images';
import {
  FiltersContainer,
  FiltersTop,
  FiltersBotton,
  FiltersBottonItems,
  Input,
  Content,
  SaleTableContainer,
  HeaderItem,
  SaleHeader,
  SaleBody,
  SaleItem,
  LoadingContainer,
} from './styles';
import { formatPrice } from '../../../utils/format';
import { useFindRealtor } from '../../../hooks/findRealtor';
import theme from '../../../styles/theme';
import { useFetch } from '../../../hooks/useFetch';
import NotFound from '../../../components/Errors/NotFound';
import api from '../../../services/api';
import { valueContainerCSS } from 'react-select/src/components/containers';

interface IRealtorData {
  id: string;
  name: string;
  avatar_url: string;
  vgv: string;
}

interface ISubsidiary {
  id: string;
  city: string;
  state: string;
  name: string;
}

const ListRealtors: React.FC = () => {
  const history = useHistory();
  const [selectedSubsidiary, setSelectedSubsidiary] = useState('');
  const [name, setName] = useState('');
  const [subsidiaries, setSubsidiaries] = useState<ISubsidiary[]>([]);
  const [realtors, setRealtors] = useState<IRealtorData[]>([]);

  const loadSubsidiary = useCallback(async () => {
    const response = await api.get('/subsidiary');
    setSubsidiaries(response.data);
  }, [])

  const loadRealtors = useCallback(async () => {
    const response = await api.get('/users', {
      params: {
        subsidiary: selectedSubsidiary,
        name,
        office: 'Corretor'
      }
    });
    setRealtors(response.data);
  }, [selectedSubsidiary, name])

  useEffect(() => {
    loadSubsidiary();
    loadRealtors();
  }, [loadSubsidiary, loadRealtors])
  
  const optionsSubsidiary = subsidiaries.map(subsidiary => ({
    label: subsidiary.name,
    value: subsidiary.id
  })) || [];

  const listRealtors = realtors.map(realtor =>{
    return {
      id: realtor.id,
      name: realtor.name,
      avatar_url: realtor.avatar_url,
    }
  } )

  const handleSelectSubsidiary = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubsidiary(event.target.value);
  }, []);
  const searchRealtorByName = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value.toLowerCase();
    setName(name);
  }, []);

  const handleNavigateToNewRealtor = useCallback(() => {
    history.push(`/adm/novo-colaborador`);
  }, [history]);
  return (
    <AdmLayout>
      <form>
        <FiltersContainer>
          <FiltersTop>
            <Input>
              <Search />
              <input
                type="text"
                placeholder="Buscar por corretor"
                onChange={searchRealtorByName}
              />
            </Input>
          </FiltersTop>
          <FiltersBotton>
            <FiltersBottonItems>
              <span>Filial: </span>
              <select value={selectedSubsidiary} onChange={handleSelectSubsidiary}>

                {optionsSubsidiary?.map(subsidiary => (
                  <option key={subsidiary.value} value={subsidiary.value}>
                    {subsidiary.label}
                  </option>
                ))}
              </select>
            </FiltersBottonItems>

            <FiltersBottonItems>
              <button
                type="button"
                onClick={() => handleNavigateToNewRealtor()}
              >
                Novo Corretor
              </button>
            </FiltersBottonItems>
          </FiltersBotton>
        </FiltersContainer>
      </form>
      <Content>
        <SaleTableContainer>
          <SaleHeader>
            <HeaderItem />
            <HeaderItem>Nome</HeaderItem>
          </SaleHeader>
          {listRealtors?.length === 0 ? (
            <NotFound />
          ): null}
          {listRealtors?.map(realtor =>
            !realtors ? (
              <LoadingContainer>
                <Loader type="Bars" color={theme.colors.gold} height={100} width={100} />
              </LoadingContainer>
            ) : (
              <SaleBody key={realtor.id}>
                <SaleItem className="avatar">
                  <img
                    src={realtor.avatar_url || 'https://imgur.com/I80W1Q0.png'}
                    alt={realtor.name}
                  />
                </SaleItem>
                <SaleItem>{realtor.name}</SaleItem>
                <SaleItem>
                  <Link to={`/adm/detalhes-colaborador/${realtor.id}`}>
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

export default ListRealtors;
