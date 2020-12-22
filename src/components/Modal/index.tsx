import React from 'react';

import { AiOutlineClose } from 'react-icons/ai';
import {
  ModalContainer,
  ModalBody,
  ModalHeader,
  ModalWrapper,
  Title,
  ModalFooter,
} from './styles';

interface ModalProps {
  title: string;
  onClose(): void;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
  return (
    <ModalContainer>
      <ModalWrapper>
        <ModalHeader>
          <Title>{title}</Title>
          <button type="button" onClick={onClose}>
            <AiOutlineClose size={20} color="#000" />
          </button>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <button type="button">Salvar</button>
        </ModalFooter>
      </ModalWrapper>
    </ModalContainer>
  );
};

export default Modal;
