import React, { useState, useCallback } from 'react';
import { GridColDef } from '@material-ui/data-grid';
import Table from '../../../../../components/Table';
import ModalAddEntryAndExits from '../../../../../components/ReactModal/AddEntryAndExits';
import Button from '../../../../../components/Button';

// import { Container } from './styles';

const CashFlowEntry: React.FC = () => {
  const [modalAddEntryAndExits, setModalAddEntryAndExits] = useState(false);
  const toogleModal = useCallback(() => {
    setModalAddEntryAndExits(!modalAddEntryAndExits);
  }, [modalAddEntryAndExits]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 10, sortable: false, hide: true, disableColumnMenu: true, align: 'center', headerAlign: 'center' },
    { field: 'sede', headerName: 'SEDE', width: 150, sortable: false, disableColumnMenu: true, align: 'center', headerAlign: 'center' },
    { field: 'tipo', headerName: 'TIPO', width: 100, disableColumnMenu: true, align: 'center', headerAlign: 'center', sortable: false },
    { field: 'descricao', headerName: 'DESCRIÇÃO', width: 400, disableColumnMenu: true, align: 'center', headerAlign: 'center', sortable: false },
    { field: 'valor', headerName: 'VALOR', width: 230, disableColumnMenu: true, align: 'center', headerAlign: 'center', sortable: true },
    { field: 'contaDeSaida', headerName: 'CONTA DE SAÍDA', width: 200, sortable: false, disableColumnMenu: true, align: 'center', headerAlign: 'center' },
  ];

  const rows = [
    {
      id: Math.random(),
      sede: 'São Luís',
      tipo: 'FIXA',
      descricao: 'CAEMA',
      valor: 'R$ 80,00',
    },
    {
      id: Math.random(),
      sede: 'São Luís',
      tipo: 'FIXA',
      descricao: 'CAEMA',
      valor: 'R$ 100,00',
    },
    {
      id: Math.random(),
      sede: 'São Luís',
      tipo: 'FIXA',
      descricao: 'CAEMA',
      valor: 'R$ 100,00',
    },
    {
      id: Math.random(),
      sede: 'São Luís',
      tipo: 'FIXA',
      descricao: 'CAEMA',
      valor: 'R$ 100,00',
    },
    {
      id: Math.random(),
      sede: 'São Luís',
      tipo: 'FIXA',
      descricao: 'CAEMA',
      valor: 'R$ 120,00',
    },
    {
      id: Math.random(),
      sede: 'São Luís',
      tipo: 'FIXA',
      descricao: 'CAEMA',
      valor: 'R$ 50,00',
    },
];
  return (
    <>
      <Table columns={columns} rows={rows} />
      <Button onClick={toogleModal}>Adicionar entrada</Button>
      <ModalAddEntryAndExits isOpen={modalAddEntryAndExits} setIsOpen={toogleModal} />
    </>
  );
}

export default CashFlowEntry;