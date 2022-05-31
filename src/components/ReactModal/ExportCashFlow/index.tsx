import React, { useState, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';
import Modal from '..';
import api from '../../../services/api';
import Button from '../../Button';
import * as Yup from 'yup';

import { Container, ContainerWrapper } from './styles';
import { addDays, format } from 'date-fns';
import { Form } from '@unform/web';
import Input from '../../Input';
import { FormHandles } from '@unform/core';

interface FormData {
  startDate: string,
  endDate: string
}
interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const ExportCashFlow: React.FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  const [loading, setLoading] = useState(false);
  const [linkDownloadReport, setLinkDownloadReport] = useState();
  const [generetedReport, setGeneretedReport] = useState(false);
  const formRef = useRef<FormHandles>(null);


  const START_DATE = format(new Date(), 'yyyy-MM-dd');
  const END_DATE = format(addDays(new Date(), 1), 'yyyy-MM-dd');

  const initialData = {
    startDate: START_DATE,
    endDate: END_DATE,
  }

  const createReport = useCallback(async (data: FormData) => {
    setLoading(true);
    formRef.current?.setErrors({});
    try {

      const schema = Yup.object({
        startDate: Yup.string().required('Data Obrigatória'),
        endDate: Yup.string().required('Data Obrigatória'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });
      const response = await api.get('/despesa/export/excel', {
        params: {
          start_date: data.startDate,
          end_date: data.endDate
        }
      });
      setLinkDownloadReport(response.data.link_url);
      setGeneretedReport(true);
    } catch (error) {
      if (error.response) {
        toast.error('error na conexão! contate o suporte');
      }
      setGeneretedReport(false);
    } finally {
      setLoading(false);
    }
  }, []);

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
        <>
          {!generetedReport ? (
            <ContainerWrapper>
              <h3>Relatório</h3>
              <Container>
                <Form 
                  ref={formRef} 
                  onSubmit={createReport} 
                  initialData={initialData}
                >
                  <Input name='startDate' type='date' label='Data Inicial' />
                  <Input name='endDate' type='date' label='Data Final' />

                  <Button type='submit' color="#40B236" colorsText="#FFF">Gerar o relatório</Button>
                </Form>
              </Container>
            </ContainerWrapper>
          ) : (
            <ContainerWrapper>
              <Container>
                <p>Relatório gerado com sucesso, clique no botão para baixar!</p>

                <Button color="#40B236" colorsText="#FFF">
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
        </>
      )}
    </Modal>
  );
};

export default ExportCashFlow;
