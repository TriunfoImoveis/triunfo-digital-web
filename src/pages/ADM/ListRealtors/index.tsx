import React, { ChangeEvent, useCallback, useMemo } from 'react';
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
import { useFilter } from '../../../context/FilterContext';

interface IRealtorData {
  id: string;
  name: string;
  avatar_url: string;
  vgv: string;
}

const ListRealtors: React.FC = () => {
  const history = useHistory();
  const { city, handleSetCity, name, handleSetName } = useFilter();
  const { data: realtors } = useFindRealtor<IRealtorData[]>({ city });

  const listRealtors = useMemo(() => {
    if (name !== '') {
      return realtors
        ?.map(realtor => ({
          id: realtor.id,
          name: realtor.name,
          avatar_url: realtor.avatar_url,
          vgv: formatPrice(Number(realtor.vgv)),
        }))
        .filter(realtor => realtor.name.toLowerCase().includes(name) === true);
    }
    return realtors?.map(realtor => ({
      id: realtor.id,
      name: realtor.name,
      avatar_url: realtor.avatar_url,
      vgv: formatPrice(Number(realtor.vgv)),
    }));
  }, [realtors, name]);
  const handleSelectCity = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      handleSetCity(event.target.value);
    },
    [handleSetCity],
  );
  const searchRealtorByName = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const name = event.target.value.toLowerCase();
      handleSetName(name);
    },
    [handleSetName],
  );

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
              <span>Cidade: </span>
              <select value={city} onChange={handleSelectCity}>
                <option value="São Luís">São Luís</option>
                <option value="Fortaleza">Fortaleza</option>
                <option value="Teresina">Teresina</option>
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
            <HeaderItem>VGV</HeaderItem>
          </SaleHeader>
          {listRealtors?.map(realtor =>
            !realtors ? (
              <LoadingContainer>
                <Loader type="Bars" color="#c32925" height={100} width={100} />
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
                <SaleItem>{realtor.vgv}</SaleItem>
                <SaleItem>
                  <Link to={`/adm/detalhes-colaborador/${realtor.id}`}>
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
