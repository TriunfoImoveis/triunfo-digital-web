import React, {useCallback, useState} from 'react';
import { GridColDef } from '@material-ui/data-grid';
import Table from '../../../../../components/Table';
import ModalAddEntryAndExits from '../../../../../components/ReactModal/AddEntryAndExits';
import Button from '../../../../../components/Button';
// import { Container } from './styles';

interface Subsidiary {
  id: string;
  name: string;
}

interface Expense {
  id: string;
  expense_type: string;
  description: string;
  due_date: string;
  value: string;
  pay_date: string;
  value_paid: string;
  group: {
    id: string;
    name: string;
  }
  subsidiary: Subsidiary
  bank_data: {
    id: string;
    bank_name: string;
  }
}
interface CashFlowEntryProps {
  saidas: Expense[]
}

const CashFlowExits: React.FC<CashFlowEntryProps> = ({saidas}) => {
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

  const rows = saidas.map(item => ({
    id: item.id,
    sede: item.subsidiary.name,
    tipo: item.group.name,
    descricao: item.description,
    valor: item.value_paid,
    contaDeSaida: item.bank_data.bank_name,
    data: item.pay_date
  }));

  return (
    <>
      <Table columns={columns} rows={rows} />
      <Button onClick={toogleModal}>Adicionar saída</Button>
      <ModalAddEntryAndExits isOpen={modalAddEntryAndExits} setIsOpen={toogleModal} />
    </>
  );
}

export default CashFlowExits;