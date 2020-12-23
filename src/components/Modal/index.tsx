import React from 'react';

import { AiOutlineClose } from 'react-icons/ai';
import { BsCheckBox } from 'react-icons/bs';
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
  onSubmit(): void;
}

const Modal: React.FC<ModalProps> = ({
  onSubmit,
  title,
  onClose,
  children,
}) => {
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
          <button type="button" onClick={onSubmit}>
            <BsCheckBox size={25} />
            Salvar
          </button>
        </ModalFooter>
      </ModalWrapper>
    </ModalContainer>
  );
};

export default Modal;
