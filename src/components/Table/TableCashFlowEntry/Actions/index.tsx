import React, { useCallback } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../../../../services/api';

import { Container } from './styles';

type Entry = {
  id: string;
  sede: string;
  tipo: 'ENTRADA' | 'SAIDA';
  descricao: string;
  valor: string;
  contaDeSaida: string;
  data: string;
};

interface ActionsProps {
  item: Entry; 
}


const Actions: React.FC<ActionsProps> = ({ item }) => {
  const {id} = item;
  const handleRemoveAccout = useCallback(async () => {
    try {
      await api.delete(`/despesa/${id}`);
      toast.success('Entrada excluida');
    } catch (err) {
      toast.error(`${err}`);
    }
  }, [id]);

  return (
    <>
    <Container>
      <button type="button" onClick={() => handleRemoveAccout()}>
        <FaTrashAlt />
      </button> 
    </Container>
    </>
  );
}

export default Actions;