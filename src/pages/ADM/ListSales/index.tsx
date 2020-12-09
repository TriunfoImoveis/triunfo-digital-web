import React, { ChangeEvent, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import Loader from 'react-loader-spinner';
import AdmLayout from '../../Layouts/Adm';
import { Search, Filter } from '../../../assets/images';
import {
  FiltersContainer,
  FiltersTop,
  FiltersBotton,
  FiltersBottonItems,
  Input,
  FilterDiv,
  Content,
  SaleTableContainer,
  HeaderItem,
  SaleHeader,
  SaleBody,
  SaleItem,
  LoadingContainer,
} from './styles';
import api from '../../../services/api';
import { formatPrice, DateBRL } from '../../../utils/format';

interface ISale {
  id: string;
  realty_ammount: string;
  sale_date: string;
  sale_has_sellers: {
    name: string;
    avatar_url: string;
  }[];
}

interface ISaleData {
  id: string;
  name: string;
  vgv: string;
  dateSale: string;
  sallers: {
    name: string;
    avatar_url: string;
  };
}

const ListSales: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [city, setCity] = useState<string>('São Luís');
  const [status, setStatus] = useState<string>('PENDENTE');
  const [sales, setSales] = useState<ISaleData[]>([]);

  useEffect(() => {
    const loadSales = async () => {
      setLoading(true);
      const response = await api.get('/sale', {
        params: {
          city,
          status,
        },
      });
      const listSales: ISale[] = response.data;
      const salesFormatted: ISaleData[] = listSales.map(s => ({
        id: s.id,
        name: 'Teste',
        vgv: formatPrice(Number(s.realty_ammount)),
        dateSale: DateBRL(s.sale_date),
        sallers: {
          name: s.sale_has_sellers[0].name,
          avatar_url: s.sale_has_sellers[0].avatar_url,
        },
      }));
      setSales(salesFormatted);
      setLoading(false);
    };
    loadSales();
  }, [city, status]);

  const handleSelectCity = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setCity(event.target.value);
    },
    [],
  );
  const handleSelectedStatus = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setStatus(event.target.value);
    },
    [],
  );

  const searchRealtorByName = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const response = await api.get('/sale', {
        params: {
          city,
          status,
          name: event.target.value,
        },
      });
      const listSales: ISale[] = response.data;
      const salesFormatted: ISaleData[] = listSales.map(s => ({
        id: s.id,
        name: 'Teste',
        vgv: formatPrice(Number(s.realty_ammount)),
        dateSale: DateBRL(s.sale_date),
        sallers: {
          name: s.sale_has_sellers[0].name,
          avatar_url: s.sale_has_sellers[0].avatar_url,
        },
      }));
      setSales(salesFormatted);
    },
    [city, status],
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
            <FilterDiv>
              <Filter />
              <select>
                <option selected disabled>
                  Filtar por
                </option>
                <option>Construtora</option>
              </select>
            </FilterDiv>
            <FilterDiv>
              <select>
                <option>Dimensão</option>
              </select>
            </FilterDiv>
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
              <span>Vendas: </span>
              <select value={status} onChange={handleSelectedStatus}>
                <option value="PENDENTE">PENDENTE</option>
                <option value="PAGO TOTAL">PAGO</option>
                <option value="EM PARTE">EM PARTE</option>
              </select>
            </FiltersBottonItems>

            <FiltersBottonItems>
              <button type="button">Adicionar ao relatório</button>
            </FiltersBottonItems>
          </FiltersBotton>
        </FiltersContainer>
      </form>
      <Content>
        {loading ? (
          <LoadingContainer>
            <Loader type="Bars" color="#c32925" height={100} width={100} />
          </LoadingContainer>
        ) : (
          <SaleTableContainer>
            <SaleHeader>
              <HeaderItem />
              <HeaderItem>Nome</HeaderItem>
              <HeaderItem>Valor</HeaderItem>
            </SaleHeader>
            {sales.map(sale => (
              <SaleBody key={sale.id}>
                <SaleItem className="avatar">
                  <img
                    src={
                      sale.sallers.avatar_url || 'https://imgur.com/I80W1Q0.png'
                    }
                    alt={sale.sallers.name}
                  />
                </SaleItem>
                <SaleItem>{sale.sallers.name}</SaleItem>
                <SaleItem>{sale.vgv}</SaleItem>
                <SaleItem>{sale.dateSale}</SaleItem>
                <SaleItem>
                  <Link to={`/adm/detalhes-vendas/${sale.id}`}>
                    <FaPlus size={15} color="#c32925" />
                    Detalhes
                  </Link>
                </SaleItem>
              </SaleBody>
            ))}
          </SaleTableContainer>
        )}
      </Content>
    </AdmLayout>
  );
};

export default ListSales;
