import React, { useState, useCallback } from 'react';
import { GridColDef } from '@material-ui/data-grid';
import Table from '../../../../../components/Table';
import ModalAddEntryAndExits from '../../../../../components/ReactModal/AddEntryAndExits';
import Button from '../../../../../components/Button';
import { DateBRL } from '../../../../../utils/format';
 
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
}

interface CashFlowEntryProps {
  entradas: Despesa[]
}
const CashFlowEntry: React.FC<CashFlowEntryProps> = ({entradas}) => {
  const [modalAddEntryAndExits, setModalAddEntryAndExits] = useState(false);
  const toogleModal = useCallback(() => {
    setModalAddEntryAndExits(!modalAddEntryAndExits);
  }, [modalAddEntryAndExits]);


  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 10, sortable: false, hide: true, disableColumnMenu: true, align: 'center', headerAlign: 'center' },
    { field: 'sede', headerName: 'SEDE', width: 150, sortable: false, disableColumnMenu: true, align: 'center', headerAlign: 'center' },
    { field: 'data', headerName: 'DATA', width: 100, sortable: true, disableColumnMenu: true, align: 'center', headerAlign: 'center' },
    { field: 'tipo', headerName: 'TIPO', width: 100, disableColumnMenu: true, align: 'center', headerAlign: 'center', sortable: false },
    { field: 'descricao', headerName: 'DESCRIÇÃO', width: 300, disableColumnMenu: true, align: 'center', headerAlign: 'center', sortable: false },
    { field: 'valor', headerName: 'VALOR', width: 230, disableColumnMenu: true, align: 'center', headerAlign: 'center', sortable: true },
    { field: 'contaDeSaida', headerName: 'CONTA DE SAÍDA', width: 200, sortable: false, disableColumnMenu: true, align: 'center', headerAlign: 'center' },
  ];

  const rows = entradas.map(item => ({
    id: item.id,
    sede: item.escritorio.name,
    tipo: item.tipo_despesa,
    descricao: item.descricao,
    valor: item.valor,
    contaDeSaida: `${item.conta.bank_name} - ${item.conta.account}`,
    data: DateBRL(item.data_pagamento)
  }));
  
  return (
    <>
      <Table columns={columns} rows={rows} />
      <Button onClick={toogleModal}>Adicionar entrada</Button>
      <ModalAddEntryAndExits isOpen={modalAddEntryAndExits} setIsOpen={toogleModal} />
    </>
  );
}

export default CashFlowEntry;