import React, { useState, useEffect, useCallback } from 'react';
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
import api from '../../../services/api';
import {AxiosError} from 'axios';
import { toast } from 'react-toastify';

interface IProfession {
  id: string;
  name: string;
  normalized_name: string;
}

const ListProfession: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [professions, setProfessions] = useState<IProfession[]>([]);

  const loadProfessions = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get('/professions');
      setProfessions(response.data);
    } catch (error) {
       const err = error as AxiosError;
      if (err?.response) {
        toast.error(err.response.data.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfessions();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AdmLayout>
      <FiltersContainer>
        <FiltersBotton>
          <FiltersBottonItems>
            <Link to="/adm/config/nova-profissao">Nova Profissao</Link>
          </FiltersBottonItems>
        </FiltersBotton>
      </FiltersContainer>
      <Content>
        <SaleTableContainer>
          <SaleHeader>
            <HeaderItem />
            <HeaderItem />
            <HeaderItem>Nome</HeaderItem>
            <HeaderItem />
          </SaleHeader>

          {loading ? (
            <LoadingContainer>
                <Loader
                  type="Bars"
                  color={theme.colors.gold}
                  height={100}
                  width={100}
                />
              </LoadingContainer>
          ) : professions.map(profession =>
             <SaleBody key={profession.id}>
                <div />
                <div />
                <SaleItem>{profession.name}</SaleItem>
                <SaleItem>
                  <Link to={`/adm/profissoes/${profession.id}`}>
                    <BsPencil size={15} color={theme.colors.gold} />
                    Editar
                  </Link>
                </SaleItem>
              </SaleBody>
          )}
        </SaleTableContainer>
      </Content>
    </AdmLayout>
  );
};

export default ListProfession;
