import React, { useCallback, useState } from 'react';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { IoMdEye, IoMdSync } from 'react-icons/io';
import { toast } from 'react-toastify';
import api from '../../../../../services/api';
import ModalAddAccount from '../../../../../components/ReactModal/AddAccount';
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
  const [modalAddAccount, setAddAccount] = useState(false);
  const handleRemoveAccout = useCallback(async () => {
    try {
      await api.delete(`/expense/${id}`);
      toast.success('Conta Excluída');
    } catch (err) {
      toast.error(`${err}`);
    }
  }, [id]);

  const toogleAddAccount = useCallback(() => {
    setAddAccount(!modalAddAccount);
  }, [modalAddAccount]);
  return (
    <>
    <Container>
      <button>
        <FaRegEdit />
      </button>
      <button>
        <IoMdEye />
      </button>
      <button>
        <IoMdSync />
      </button>
      <button type="button" onClick={() => handleRemoveAccout()}>
        <FaTrashAlt />
      </button> 
    </Container>
    <ModalAddAccount isOpen={modalAddAccount} setIsOpen={toogleAddAccount} />
    </>
  );
}

export default Actions;