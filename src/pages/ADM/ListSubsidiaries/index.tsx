import React, { useState, useEffect } from 'react';
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

interface ISubsidiary {
  id: string;
  name: string;
  city: string;
  state: string;
}

const ListSubsidiaries: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [subsidiaries, setSubsidiaries] = useState<ISubsidiary[]>([]);

  useEffect(() => {
    const loadSubsidiaries = async () => {
      const response = await api.get('/subsidiary');
      setSubsidiaries(response.data);
      setLoading(false)
    };
    loadSubsidiaries();
  }, []);

  return (
    <AdmLayout>
      <FiltersContainer>
        <FiltersBotton>
          <FiltersBottonItems>
            <Link to="/adm/nova-filial">Nova Filial</Link>
          </FiltersBottonItems>
        </FiltersBotton>
      </FiltersContainer>
      <Content>
        <SaleTableContainer>
          <SaleHeader>
            <HeaderItem />
            <HeaderItem>Nome</HeaderItem>
            <HeaderItem>Cidade</HeaderItem>
            <HeaderItem>Estado</HeaderItem>
          </SaleHeader>
          {loading ? (
             <LoadingContainer>
             <Loader type="Bars" color={theme.colors.gold} height={100} width={100} />
           </LoadingContainer>
          ) : null}
          {subsidiaries.map(subsidiary =>
            (
              <SaleBody key={subsidiary.id}>
                <div />
                <SaleItem>{subsidiary.name}</SaleItem>
                <SaleItem>{subsidiary.city}</SaleItem>
                <SaleItem>{subsidiary.state}</SaleItem>
                <SaleItem>
                  <Link to={`/adm/detalhes-filiais/${subsidiary.id}`}>
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

export default ListSubsidiaries;
