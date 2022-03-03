import React, { useCallback, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { IoMdSync } from 'react-icons/io';
import { toast } from 'react-toastify';
import api from '../../../../services/api';
import ModalEditAccount from '../../../ReactModal/EditAccountExit';

import { Container } from './styles';

type Exit = {
  id: string;
  sede: string;
  grupo: string;
  descricao: string;
  valor: string;
  valorPago: string;
  contaDeSaida: string;
  data: string;
};

interface ActionsProps {
  item: Exit; 
}


const Actions: React.FC<ActionsProps> = ({ item }) => {
  const {id} = item;
  const [modalEditAccount, setEditAccount] = useState(false);

  const handleRemoveAccout = useCallback(async () => {
    try {
      await api.delete(`/expense?ids=${id}`);
      toast.success('Conta Excluída');
    } catch (err) {
      toast.error(`${err}`);
    }
  }, [id]);

  const toogleEditAccount = useCallback(() => {
    setEditAccount(prevState => !prevState);
  }, []);

  return (
    <>
    <Container>
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
    <ModalEditAccount 
      isOpen={modalEditAccount} 
      setIsOpen={toogleEditAccount} 
      accountId={id} 
    />
    </>
  );
}

export default Actions;