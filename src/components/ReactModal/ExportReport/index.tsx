import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import Modal from '..';
import { useAuth } from '../../../context/AuthContext';
import api from '../../../services/api';
import Button from '../../Button';

import { Container, ContainerWrapper } from './styles';

interface IParams {
  name?: string;
  subsidiaryId?: string;
  status?: string;
  year?: number | string;
  month?: number | string;
}

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  params: IParams
}

const ExportReport: React.FC<ModalProps> = ({ isOpen, setIsOpen, params }) => {
  const { userAuth } = useAuth();
  const { name } = userAuth.office;
  const [loading, setLoading] = useState(false);
  const [linkDownloadReport, setLinkDownloadReport] = useState('');
  
  const handleCloseModal = useCallback(() => {
    setIsOpen();
    setLinkDownloadReport('');
    setLoading(false);
  }, [setIsOpen])


  const createReport = useCallback(async () => {
    setLoading(true);
    try {
      if (name === 'Diretor') {
        const response = await api.get('/sale/export/excel', {
          params
        });
        setLinkDownloadReport(response.data.link_url);
      } else {
        const response = await api.get('/sale/export/excel', {params});
        setLinkDownloadReport(response.data.link_url);
      }
      
      
    } catch (error) {
      if (error.response) {
        toast.error('error na conexão! contate o suporte');
      }
    } finally {
      setLoading(false);
    }
  }, [name, userAuth.subsidiary.state, params]);

  return (
    <Modal isOpen={isOpen} setIsOpen={handleCloseModal}>
      <ContainerWrapper>
          <h3>Relatório</h3>
          <Container>
            <p>Clique no botão para gerar o Relatorio em Excel</p>

            <Button color="#40B236" onClick={createReport}>
              {loading ? 'Carregando...' : 'Gerar Relatório'}
            </Button>
            {linkDownloadReport.length> 0 && !loading && (
              <Button color="#40B236">
              <a
                href={linkDownloadReport}
                target="_blank"
                rel="noopener noreferrer"
              >
                Baixar relatório completo em Excel
              </a>
            </Button>
            )}
          </Container>
        </ContainerWrapper>
    </Modal>
  );
};

export default ExportReport;
