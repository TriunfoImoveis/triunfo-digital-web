import React, { useState, useCallback, ChangeEvent } from 'react';
import ModalAddEntryAndExits from '../../../../../components/ReactModal/AddEntryAndExits';
import Button from '../../../../../components/Button';
import { DateBRL } from '../../../../../utils/format';
import Table from '../../../../../components/Table/TableCashFlowEntry';
import api from '../../../../../services/api';
import { toast } from 'react-toastify';

 
// import { Container } from './styles';

interface Despesa {
  id: string;
  conta: {
    account: string;
    bank_name: string;
  };
  escritorio: {
    name: string;
  }
  descricao: string;
  tipo_despesa: 'ENTRADA' | 'SAIDA';
  valor: string;
  data_pagamento: string;
  grupo: {
    id: string;
    name: string;
  }
}

interface CashFlowEntryProps {
  entradas: Despesa[]
}
const CashFlowEntry: React.FC<CashFlowEntryProps> = ({entradas}) => {
  const [modalAddEntryAndExits, setModalAddEntryAndExits] = useState(false);
  const [selectedsEntry, setSelectedsEntry] = useState<String[]>([]);

  const toogleModal = useCallback(() => {
    setModalAddEntryAndExits(!modalAddEntryAndExits);
  }, [modalAddEntryAndExits]);

  const handleSelected = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    if(event.target.checked) {
      setSelectedsEntry(prevState => [...prevState, id])
    } else {
      const arr = selectedsEntry;
      const index = arr.indexOf(id);
      arr.splice(index, 1);
      setSelectedsEntry(arr);
    }
  };

  const handleRemoveAllIds = async () => {
    try {
      await api.delete(`/despesa?ids=${selectedsEntry.toString()}`);
      setSelectedsEntry([]);
      toast.success('Exclusão feita com sucesso');
    } catch {
      toast.error('Não foi possivel remover os itens');
    }
  }

  const collums = [
    {name: 'Filial'},
    {name: 'Data'},
    {name: 'Grupo'},
    {name: 'Descrição'},
    {name: 'Valor'},
    {name: 'Conta de Entrada'},
    {name: 'Ações'},
  ]

  const rows = entradas.map(item => ({
    id: item.id,
    sede: item.escritorio.name,
    tipo: item.tipo_despesa,
    descricao: item.descricao,
    valor: item.valor,
    contaDeSaida: `${item.conta.account}`,
    data: DateBRL(item.data_pagamento),
    grupo: item.grupo.name
  }));
  
  return (
    <>
      <Table cols={8} collums={collums} rows={rows} handleSelected={handleSelected} />
      {selectedsEntry.length > 0 && <Button onClick={handleRemoveAllIds}>Excluir todos</Button>}
      <Button onClick={toogleModal}>Adicionar entrada</Button>
      <ModalAddEntryAndExits isOpen={modalAddEntryAndExits} setIsOpen={toogleModal} />
    </>
  );
}

export default CashFlowEntry;