import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { BsPencil } from 'react-icons/bs';
import Loader from 'react-loader-spinner';
import { toast } from 'react-toastify';
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
import { FoneMask } from '../../../utils/masked';

interface ISubsidiary {
  id: string;
  city: string;
}

interface IBuilder {
  id: string;
  name: string;
  phone: string;
  city: string;
}
const ListBuilders: React.FC = () => {
  const token = localStorage.getItem('@TriunfoDigital:token');
  const [loading, setLoading] = useState(false);
  const [subsidiaries, setSubsidiaries] = useState<ISubsidiary[]>([]);
  const [selectedSubsidiary, setSelectedSubsidiary] = useState<ISubsidiary>(
    {} as ISubsidiary,
  );
  const [builders, setBuilders] = useState<IBuilder[]>([]);

  useEffect(() => {
    const loadSubsidiaries = async () => {
      const response = await api.get('/subsidiary');
      setSubsidiaries(response.data);
    };
    const loadBuilders = async () => {
      const response = await api.get('/builder', {
        params: {
          city: selectedSubsidiary.city,
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
  }, [selectedSubsidiary]);

  const handleSelectedSubsidiary = useCallback(
    async (event: ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      try {
        const response = await api.get(`/subsidiary/${value}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        setSelectedSubsidiary(response.data);
      } catch (error) {
        toast.error('Error ao connectar ao servidor, Contate o suporte');
      }
    },
    [token],
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
            name: event.target.value,
          },
        });
        setBuilders(response.data);
        setLoading(false);
      }
    },
    [],
  );

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
            <span>Cidade: </span>
            <select onChange={handleSelectedSubsidiary} defaultValue="0">
              <option value="0" disabled>
                Todas
              </option>
              {subsidiaries.map(subsidary => (
                <option key={subsidary.id} value={subsidary.id}>
                  {subsidary.city}
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
                <Loader type="Bars" color="#c32925" height={100} width={100} />
              </LoadingContainer>
            ) : (
              <SaleBody key={builder.id}>
                <div />
                <SaleItem>{builder.name}</SaleItem>
                <SaleItem>{builder.phone}</SaleItem>
                <SaleItem>{builder.city}</SaleItem>
                <SaleItem>
                  <Link to={`/adm/detalhes-construtora/${builder.id}`}>
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

export default ListBuilders;
