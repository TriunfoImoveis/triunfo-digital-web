import React from 'react';
import Modal from '..';
import FormAddAccount from '../../Form/AddAccount';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const AddAccount: React.FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <FormAddAccount />
    </Modal>
  );
};

export default AddAccount;
