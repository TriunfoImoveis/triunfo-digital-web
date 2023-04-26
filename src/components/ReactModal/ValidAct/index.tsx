import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import Modal from '..';
import api from '../../../services/api';
import Button from '../../Button';

import { Container, ContainerWrapper, ButtonGroup } from './styles';
import axios from 'axios';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  idSale: string;
}

const ValidAct: React.FC<ModalProps> = ({ isOpen, idSale, setIsOpen }) => {
  const handlePaySignal = useCallback(async () => {
    if (!idSale) {
      toast.error('Nao foi possivel validar a parcela');
      return;
    }
    try {
      await api.patch(`/sale/valid-signal/${idSale}`);
      toast.success('status do pagamento atualizado');
      window.location.reload();
    } catch (error) {
      if (axios?.isAxiosError(error)) {
        if (error?.response) {
          toast.error(`ERROR! ${error?.response?.data?.message}`);
        } else if (error.response) {
          toast.error(`Erro interno do servidor contate o suporte`);
        } 
      } else {
        toast.error('Não foi possível confirmar o pagamento');
      }
    }
  }, [idSale]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ContainerWrapper>
        <h3>Validação Ato</h3>
        <Container>
          <strong>ATENÇÃO!!</strong>
          <p>Você esta realizando um operação inreverssível, tem certeza?</p>
          <ButtonGroup>
            <Button color="#40B236" onClick={handlePaySignal} colorsText="#FFF">
              Sim
            </Button>
            <Button onClick={setIsOpen} colorsText="#FFF">Não</Button>
          </ButtonGroup>
        </Container>
      </ContainerWrapper>
    </Modal>
  );
};

export default ValidAct;
