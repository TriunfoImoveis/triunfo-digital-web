import React from 'react';
import Modal from '..';
import FormEditAccount from '../../EditExit';

import {Header} from './styles';
interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  accountId: string;
}

const EditAccountExit: React.FC<ModalProps> = ({ isOpen, setIsOpen, accountId }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Header>
        <h2>ATUALIZAR CONTA</h2>
      </Header>
      <FormEditAccount accountId={accountId} />
    </Modal>
  );
};

export default EditAccountExit;
