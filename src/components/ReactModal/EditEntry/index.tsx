import React from 'react';
import Modal from '..';
import FormEditEntry from '../../Form/EditEntry';

import {Header} from './styles';
type Entry = {
  id: string;
  sede: string;
  tipo: 'ENTRADA' | 'SAIDA';
  descricao: string;
  valor: string;
  contaDeSaida: string;
  data: string;
};

interface ModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  entry: Entry;
}

const EditEntry: React.FC<ModalProps> = ({ isOpen, setIsOpen, entry }) => {
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Header>
        <h2>ATUALIZAR ENTRADA</h2>
      </Header>
      <FormEditEntry entry={entry} />
    </Modal>
  );
};

export default EditEntry;
