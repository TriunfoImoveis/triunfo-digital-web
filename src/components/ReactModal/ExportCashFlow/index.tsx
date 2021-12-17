import React, { useEffect, useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import Modal from '..';
import api from '../../../services/api';
import Button from '../../Button';

import { Container, ContainerWrapper } from './styles';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const ExportCashFlow: React.FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  const [loading, setLoading] = useState(false);
  const [linkDownloadReport, setLinkDownloadReport] = useState();


  const createReport = useCallback(async () => {
    setLoading(true);
    try {
        const response = await api.get('/despesa/export/excel');
        setLinkDownloadReport(response.data.link_url);
    } catch (error) {
      if (error.response) {
        toast.error('error na conexão! contate o suporte');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    createReport();
  }, [createReport]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      {loading ? (
        <ContainerWrapper>
          <h3>Gerando Relatório</h3>
          <Container>
            <p>Carregando..............</p>
          </Container>
        </ContainerWrapper>
      ) : (
        <ContainerWrapper>
          <h3>Relatório</h3>
          <Container>
            <p>Relatório gerado com sucesso, clique no botão para baixar!</p>

            <Button color="#40B236">
              <a
                href={linkDownloadReport}
                target="_blank"
                rel="noopener noreferrer"
              >
                Baixar relatório completo em Excel
              </a>
            </Button>
          </Container>
        </ContainerWrapper>
      )}
    </Modal>
  );
};

export default ExportCashFlow;
