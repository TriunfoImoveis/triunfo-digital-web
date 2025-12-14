import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import Button from '../../../components/Button';
import UpdateOrigins from '../../../components/ReactModal/UpdateOrigin';

interface IOriginsData {
  id: string;
  name: string;
  active: boolean;
  isOriginClient: boolean;
  isOriginChannel: boolean;
}

const ListOrigins: React.FC = () => {
  const [url, setURL] = useState('/origin-sale');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { data: orgins } = useFetchFinances<IOriginsData[]>({ url });

  const handleSetFilterActive = (value: string) => {
    if (value === 'all') {
      setURL('/origin-sale/all');
    }
    if (value === 'active') {
      setURL('/origin-sale');
    }
  };

  const [selectedOrigin, setSelectedOrigin] = useState<IOriginsData | null>(
    null,
  );

  const openModalWithOrigin = (origin: IOriginsData) => {
    setSelectedOrigin(origin);
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
    setSelectedOrigin(null);
  };

  return (
    <AdmLayout>
      <FiltersContainer>
        <FiltersBotton>
          <FiltersBottonItems>
            <span>Origens: </span>
            <select
              onChange={e => handleSetFilterActive(e.target.value)}
              defaultValue="active"
            >
              <option value="all">Todos</option>
              <option value="active">Ativas</option>
            </select>
          </FiltersBottonItems>
          <FiltersBottonItems>
            <Link to="/adm/config/nova-origem">Nova Origem</Link>
          </FiltersBottonItems>
        </FiltersBotton>
      </FiltersContainer>
      <Content>
        <SaleTableContainer>
          <SaleHeader>
            <HeaderItem></HeaderItem>
            <HeaderItem>Nome</HeaderItem>
            <HeaderItem>Orgem Cliente</HeaderItem>
            <HeaderItem>Origem Canal</HeaderItem>
            <HeaderItem />
          </SaleHeader>
          {!orgins ? (
            <LoadingContainer>
              <Loader
                type="Bars"
                color={theme.colors.gold}
                height={100}
                width={100}
              />
            </LoadingContainer>
          ) : (
            orgins &&
            orgins.map(origin => (
              <SaleBody key={origin.id}>
                <HeaderItem></HeaderItem>
                <SaleItem>{origin.name}</SaleItem>
                <SaleItem>{origin.isOriginClient ? 'SIM' : 'NÃO'}</SaleItem>
                <SaleItem>{origin.isOriginChannel ? 'SIM' : 'NÃO'}</SaleItem>
                <SaleItem>
                  <Button onClick={() => openModalWithOrigin(origin)}>
                    Editar
                  </Button>
                </SaleItem>
              </SaleBody>
            ))
          )}
        </SaleTableContainer>
        {selectedOrigin && (
          <UpdateOrigins
            isOpen={isOpenModal}
            setIsOpen={closeModal}
            originData={selectedOrigin}
          />
        )}
      </Content>
    </AdmLayout>
  );
};

export default ListOrigins;
