import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { BsPencil } from 'react-icons/bs';
import Loader from 'react-loader-spinner';
import AdmLayout from '../../Layouts/Adm';
import { Search } from '../../../assets/images';
import theme from '../../../styles/theme';
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
import { FoneMask } from '../../../utils/masked';
import { states } from '../../../utils/loadOptions';
import { unicItensArray } from '../../../utils/format';

interface ISubsidiary {
  id: string;
  city: string;
  state: string;
}

interface IBuilder {
  id: string;
  name: string;
  phone: string;
  city: string;
}
const ListBuilders: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [subsidiaries, setSubsidiaries] = useState<ISubsidiary[]>([]);
  const [selectedUf, setSelectedUf] = useState<string>('MA');
  const [selectedSubsidiary] = useState<ISubsidiary>({} as ISubsidiary);
  const [builders, setBuilders] = useState<IBuilder[]>([]);

  useEffect(() => {
    const loadSubsidiaries = async () => {
      const response = await api.get('/subsidiary');
      setSubsidiaries(response.data);
    };
    const loadBuilders = async () => {
      const response = await api.get('/builder', {
        params: {
          uf: selectedUf,
        },
      });
      const builders = response.data.map(builder => ({
        id: builder.id,
        name: builder.name,
        phone: FoneMask(builder.phone),
        city: builder.city,
      }));
      setBuilders(builders);
    };

    loadSubsidiaries();
    loadBuilders();
  }, [selectedUf]);

  const handleSelectUf = useCallback(
    async (event: ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      setSelectedUf(value);
    },
    [],
  );

  const searchBuilderByName = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.value === '') {
        setLoading(true);
        const response = await api.get('/builder');
        setBuilders(response.data);
        setLoading(false);
      } else {
        setLoading(true);
        const response = await api.get('/builder', {
          params: {
            uf: selectedSubsidiary.state,
          },
        });
        setBuilders(response.data);
        setLoading(false);
      }
    },
    [selectedSubsidiary.state],
  );

  const optionsStates = unicItensArray(subsidiaries.map(subsidiary => subsidiary.state)).map(item => ({
    label: states[item],
    value: item
  }))

  return (
    <AdmLayout>
      <FiltersContainer>
        <FiltersTop>
          <Input>
            <Search />
            <input
              type="text"
              placeholder="Buscar por construtoras"
              onChange={searchBuilderByName}
            />
          </Input>
        </FiltersTop>
        <FiltersBotton>
          <FiltersBottonItems>
            <span>Estado: </span>
            <select onChange={handleSelectUf}>
              {optionsStates.map(states => (
                <option key={states.value} value={states.value}>
                  {states.label}
                </option>
              ))}
            </select>
          </FiltersBottonItems>

          <FiltersBottonItems>
            <Link to="/adm/nova-construtora">Nova Construtora</Link>
          </FiltersBottonItems>
        </FiltersBotton>
      </FiltersContainer>
      <Content>
        <SaleTableContainer>
          <SaleHeader>
            <HeaderItem />
            <HeaderItem>Nome</HeaderItem>
            <HeaderItem>Telefone</HeaderItem>
            <HeaderItem>Cidade</HeaderItem>
          </SaleHeader>
          {builders.map(builder =>
            loading ? (
              <LoadingContainer>
                <Loader type="Bars" color={theme.colors.gold} height={100} width={100} />
              </LoadingContainer>
            ) : (
              <SaleBody key={builder.id}>
                <div />
                <SaleItem>{builder.name}</SaleItem>
                <SaleItem>{builder.phone}</SaleItem>
                <SaleItem>{builder.city}</SaleItem>
                <SaleItem>
                  <Link to={`/adm/detalhes-construtora/${builder.id}`}>
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

export default ListBuilders;
