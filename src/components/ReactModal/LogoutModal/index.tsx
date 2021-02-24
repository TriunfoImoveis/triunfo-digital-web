import React from 'react';
import { AiFillAlert } from 'react-icons/ai';
import { ImExit } from 'react-icons/im';
import { useAuth } from '../../../context/AuthContext';
import Modal from '..';

import {
  ContainerWrapper,
  Container,
  CancelButton,
  LogoutButton,
} from './styles';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const LogoutModal: React.FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  const { signOut } = useAuth();
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <ContainerWrapper>
        <h3>Tem certeza que quer sair ?</h3>
        <Container>
          <CancelButton type="button" onClick={() => setIsOpen()}>
            <AiFillAlert />
            <p>Nãoooooooo</p>
          </CancelButton>
          <LogoutButton type="button" onClick={() => signOut()}>
            <ImExit />
            <p>sair</p>
          </LogoutButton>
        </Container>
      </ContainerWrapper>
    </Modal>
  );
};

export default LogoutModal;
