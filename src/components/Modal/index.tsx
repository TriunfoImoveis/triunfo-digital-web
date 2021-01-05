import React from 'react';

import { AiOutlineClose } from 'react-icons/ai';
import {
  ModalContainer,
  ModalBody,
  ModalHeader,
  ModalWrapper,
  Title,
} from './styles';

interface ModalProps {
  title: string;
  onClose(): void;
  value?: string;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, value, children }) => {
  return (
    <ModalContainer>
      <ModalWrapper>
        <ModalHeader>
          <Title>{title}</Title>
          {value && <span className="value">{`Valor total: ${value}`}</span>}
          <button type="button" onClick={onClose}>
            <AiOutlineClose size={20} color="#000" />
          </button>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalWrapper>
    </ModalContainer>
  );
};

export default Modal;
