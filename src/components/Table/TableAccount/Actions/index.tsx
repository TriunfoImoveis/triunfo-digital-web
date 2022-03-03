import React, { useCallback, useState } from 'react';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { IoMdSync } from 'react-icons/io';
import { toast } from 'react-toastify';
import api from '../../../../services/api';
import ModalPaymentAccount from '../../../ReactModal/PaymentAccount';
import ModalEditAccount from '../../../ReactModal/EditAccount';

import { Container } from './styles';

type Account = {
  id: string;
  expense_type: string;
  due_date: string;
  description: string;
  value: number;
  valueBRL: string;
  status: string;
  city: string;
  group: string;
};

interface ActionsProps {
  item: Account; 
}


const Actions: React.FC<ActionsProps> = ({ item }) => {
  const {id} = item;
  const [modalPaymentAccount, setPaymentAccount] = useState(false);
  const [modalEditAccount, setEditAccount] = useState(false);

  const handleRemoveAccout = useCallback(async () => {
    try {
      await api.delete(`/expense?ids=${id}`);
      toast.success('Conta Excluída');
    } catch (err) {
      toast.error(`${err}`);
    }
  }, [id]);

  const tooglePaymentAccount = useCallback(() => {
    setPaymentAccount(prevState => !prevState);
  }, []);

  const toogleEditAccount = useCallback(() => {
    setEditAccount(prevState => !prevState);
  }, []);

  return (
    <>
    <Container>
      <button type="button" onClick={() => tooglePaymentAccount()}>
        <FaRegEdit />
      </button>
      {/* <button>
        <IoMdEye />
      </button> */}
      <button type="button" onClick={() => toogleEditAccount()}>
        <IoMdSync />
      </button>
      <button type="button" onClick={() => handleRemoveAccout()}>
        <FaTrashAlt />
      </button> 
    </Container>
    <ModalPaymentAccount 
      isOpen={modalPaymentAccount} 
      setIsOpen={tooglePaymentAccount} 
      accountId={id} 
    />
    <ModalEditAccount 
      isOpen={modalEditAccount} 
      setIsOpen={toogleEditAccount} 
      accountId={id} 
    />
    </>
  );
}

export default Actions;