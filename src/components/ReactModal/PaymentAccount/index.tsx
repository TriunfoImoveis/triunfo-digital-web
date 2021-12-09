import React from 'react';
import Modal from '..';
import FormConfirmAccount from '../../ConfirmAccount';
import { Header } from './styles'

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  accountId: string;
}

const PaymentAccount: React.FC<ModalProps> = ({ isOpen, setIsOpen, accountId }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Header>
        <h2>DAR BAIXA</h2>
      </Header>
      <FormConfirmAccount accountId={accountId} />
    </Modal>
  );
};

export default PaymentAccount;
