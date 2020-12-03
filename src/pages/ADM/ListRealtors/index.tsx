import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
import api from '../../../services/api';
import { formatPrice } from '../../../utils/format';

interface IRealtorData {
  id: string;
  name: string;
  avatar_url: string;
  vgv: string;
}

const ListRealtors: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [city, setCity] = useState<string>('São Luís');
  const [realtors, setRealtors] = useState<IRealtorData[]>([]);
  const token = localStorage.getItem('@TriunfoDigital:token');

  useEffect(() => {
    const loadRealtors = async () => {
      setLoading(true);
      const year = new Date().getFullYear();
      const response = await api.get('/ranking', {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: {
          city,
          year,
        },
      });
      const listRealtors = response.data;
      const realtorsFormatted = listRealtors.map(realtor => ({
        id: realtor.id,
        name: realtor.name,
        avatar_url: realtor.avatar_url,
        vgv: formatPrice(realtor.vgv),
      }));
      setRealtors(realtorsFormatted);
      setLoading(false);
    };
    loadRealtors();
  }, [city, token]);
  const handleSelectCity = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setCity(event.target.value);
    },
    [],
  );
  const searchRealtorByName = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.value === '') {
        setLoading(true);
        const response = await api.get('/users', {
          params: {
            city,
            office: 'Corretor',
          },
        });
        setRealtors(response.data);
        setLoading(false);
      } else {
        setLoading(true);
        const response = await api.get('/users', {
          params: {
            city,
            name: event.target.value,
            office: 'Corretor',
          },
        });
        setRealtors(response.data);
        setLoading(false);
      }
    },
    [city],
  );
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
              <span>Cidade: </span>
              <select value={city} onChange={handleSelectCity}>
                <option value="São Luís">São Luís</option>
                <option value="Fortaleza">Fortaleza</option>
                <option value="Teresina">Teresina</option>
              </select>
            </FiltersBottonItems>

            <FiltersBottonItems>
              <button type="button">Novo Corretor</button>
            </FiltersBottonItems>
          </FiltersBotton>
        </FiltersContainer>
      </form>
      <Content>
        <SaleTableContainer>
          <SaleHeader>
            <HeaderItem />
            <HeaderItem>Nome</HeaderItem>
            <HeaderItem>VGV</HeaderItem>
          </SaleHeader>
          {realtors.map(realtor =>
            loading ? (
              <LoadingContainer>
                <Loader type="Bars" color="#c32925" height={100} width={100} />
              </LoadingContainer>
            ) : (
              <SaleBody key={realtor.id}>
                <SaleItem>
                  <img
                    src={realtor.avatar_url || 'https://imgur.com/I80W1Q0.png'}
                    alt={realtor.name}
                  />
                </SaleItem>
                <SaleItem>{realtor.name}</SaleItem>
                <SaleItem>{realtor.vgv}</SaleItem>
                <SaleItem>
                  <Link to="#top">
                    <BsPencil size={15} color="#c32925" />
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
