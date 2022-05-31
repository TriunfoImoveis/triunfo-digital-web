import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import Modal from '..';
import api from '../../../services/api';
import Button from '../../Button';

import { Container, ContainerWrapper, ButtonGroup } from './styles';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  idPlot: string;
}

const ValidInstallment: React.FC<ModalProps> = ({
  isOpen,
  idPlot,
  setIsOpen,
}) => {
  const handlePayPlot = useCallback(async () => {
    if (!idPlot) {
      toast.error('Nao foi possivel validar a parcela');
      return;
    }
    try {
      await api.patch(`/installment/paid/${idPlot}`);
      toast.success('status do pagamento atualizado');
      window.location.reload();
    } catch (error) {
      if (error.response) {
        toast.error(`ERROR! ${error.response.message}`);
      } else if (error.response) {
        toast.error(`Erro interno do servidor contate o suporte`);
      } else {
        toast.error('Não foi possível confirmar o pagamento');
      }
    }
  }, [idPlot]);
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ContainerWrapper>
        <h3>Validação da Parcela</h3>
        <Container>
          <strong>ATENÇÃO!!</strong>
          <p>Você confirma que recebeu o pagamento da parcela!</p>
          <p>Você esta realizando um operação inreverssível, tem certeza?</p>
          <ButtonGroup>
            <Button color="#40B236" onClick={handlePayPlot}  colorsText='#FFF'>
              Sim
            </Button>
            <Button onClick={setIsOpen}  colorsText='#FFF'>Não</Button>
          </ButtonGroup>
        </Container>
      </ContainerWrapper>
    </Modal>
  );
};

export default ValidInstallment;
