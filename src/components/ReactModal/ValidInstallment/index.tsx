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

const ValidInstallment: React.FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ContainerWrapper>
        <h3>Validação da Parcela</h3>
        <Container>
          <strong>ATENÇÃO!!</strong>
          <p>Você esta realizando um operação inreverssível, tem certeza?</p>
          <ButtonGroup>
            <Button color="#40B236">Sim</Button>
            <Button onClick={setIsOpen}>Não</Button>
          </ButtonGroup>
        </Container>
      </ContainerWrapper>
    </Modal>
  );
};

export default ValidInstallment;
