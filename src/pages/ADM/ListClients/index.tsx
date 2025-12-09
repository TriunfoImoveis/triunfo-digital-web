import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BsPencil } from 'react-icons/bs';
import Loader from 'react-loader-spinner';
import AdmLayout from '../../Layouts/Adm';
import theme from '../../../styles/theme';
import {
  FiltersContainer,
  Content,
  SaleTableContainer,
  HeaderItem,
  SaleHeader,
  SaleBody,
  SaleItem,
  LoadingContainer,
  FiltersTop,
  IconLink,
} from './styles';
import api from '../../../services/api';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { InputControlled } from '../../../components/FormControls';
import Button from '../../../components/Button';

import { FaSearch } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import { CPFMask, cnpj } from '../../../utils/masked';

interface IClient {
  id: string;
  name: string;
  cpf?: string | null;
  cnpj?: string | null;
  phone?: string | null;
  email?: string | null;
}

const ListClients: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState<IClient[]>([]);
  const [document, setDocument] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = useCallback(async () => {
    const cleanDocument = document.replace(/\D/g, '');

    if (!cleanDocument) {
      toast.info('Informe um CPF ou CNPJ para buscar');
      return;
    }

    if (cleanDocument.length !== 11 && cleanDocument.length !== 14) {
      toast.error('Documento deve ter 11 (CPF) ou 14 (CNPJ) digitos');
      return;
    }

    const params =
      cleanDocument.length === 11
        ? { cpf: cleanDocument }
        : { cnpj: cleanDocument };

    try {
      setHasSearched(true);
      setLoading(true);
      const response = await api.get('/client', {
        params,
      });

      const data = response.data;
      const result = Array.isArray(data) ? data : [data];
      setClients(result.filter(Boolean));
    } catch (error) {
      const err = error as AxiosError;
      if (err?.response) {
        toast.error(err.response.data.message);
      }
      setClients([]);
    } finally {
      setLoading(false);
    }
  }, [document]);

  return (
    <AdmLayout>
      <FiltersContainer>
        <FiltersTop>
          <InputControlled
            name="document"
            mask="document"
            placeholder="Informe o CPF ou CNPJ"
            icon={FaSearch}
            value={document}
            onChange={value => setDocument(value)}
          />
          <Button
            style={{
              width: '4.4rem',
              height: '4.4rem',
              padding: 0,
              marginTop: 0,
            }}
            aria-label="Pesquisar"
            onClick={handleSearch}
          >
            <FaSearch size={16} />
          </Button>
          <IconLink
            to="/adm/config/novo-cliente"
            aria-label="Novo Cliente"
            title="Novo Cliente"
          >
            <FiPlus size={16} />
          </IconLink>
        </FiltersTop>
      </FiltersContainer>
      <Content>
        {hasSearched && (
          <SaleTableContainer>
            <SaleHeader>
              <HeaderItem>Nome</HeaderItem>
              <HeaderItem>CPF / CNPJ</HeaderItem>
              <HeaderItem>Telefone</HeaderItem>
              <HeaderItem>Email</HeaderItem>
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
            ) : clients.length > 0 ? (
              clients.map(client => (
                <SaleBody key={client.id}>
                  <SaleItem>{client.name}</SaleItem>
                  <SaleItem>
                    {client.cpf
                      ? CPFMask(client.cpf)
                      : client.cnpj
                      ? cnpj(client.cnpj)
                      : '--'}
                  </SaleItem>
                  <SaleItem>{client.phone || '--'}</SaleItem>
                  <SaleItem>{client.email || '--'}</SaleItem>
                  <SaleItem>
                    <Link to={`/adm/clientes/${client.id}`}>
                      <BsPencil size={15} color={theme.colors.gold} />
                      Editar
                    </Link>
                  </SaleItem>
                </SaleBody>
              ))
            ) : (
              <SaleBody className="empty">
                <SaleItem>Nenhum cliente encontrado</SaleItem>
              </SaleBody>
            )}
          </SaleTableContainer>
        )}
      </Content>
    </AdmLayout>
  );
};

export default ListClients;
