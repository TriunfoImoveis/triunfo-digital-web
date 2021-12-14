import React, { useState, useCallback } from 'react';
import ModalAddEntryAndExits from '../../../../../components/ReactModal/AddEntryAndExits';
import Button from '../../../../../components/Button';
import { DateBRL } from '../../../../../utils/format';
import Table from '../../../../../components/Table/TableCashFlowEntry';

 
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
  const toogleModal = useCallback(() => {
    setModalAddEntryAndExits(!modalAddEntryAndExits);
  }, [modalAddEntryAndExits]);


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
      <Table cols={7} collums={collums} rows={rows}  />
      <Button onClick={toogleModal}>Adicionar entrada</Button>
      <ModalAddEntryAndExits isOpen={modalAddEntryAndExits} setIsOpen={toogleModal} />
    </>
  );
}

export default CashFlowEntry;