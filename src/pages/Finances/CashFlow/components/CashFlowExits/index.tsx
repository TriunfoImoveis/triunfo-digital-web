import React, { ChangeEvent, useState } from 'react';
import { toast } from 'react-toastify';
import Button from '../../../../../components/Button';
import Table from '../../../../../components/Table/TableCashFlowExits';
import api from '../../../../../services/api';

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
    account: string;
  }
}
interface CashFlowEntryProps {
  saidas: Expense[]
}

const CashFlowExits: React.FC<CashFlowEntryProps> = ({saidas}) => {
  const [selectedsEntry, setSelectedsEntry] = useState<String[]>([]);
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
      await api.delete(`/expense?ids=${selectedsEntry.toString()}`);
      setSelectedsEntry([]);
      toast.success('Exclusão feita com sucesso');
    } catch {
      toast.error('Não foi possivel remover os itens');
    }
  }

  const columns = [
    { name: '' },
    { name: 'Sede' },
    { name: 'Data'},
    { name: 'Grupo'},
    { name: 'Descrição'},
    { name: 'Valor'},
    { name: 'Valor pago'},
    { name: 'Conta de Saída'},
    {name: 'Ações'}
  ];

  const rows = saidas.map(item => ({
    id: item.id,
    sede: item.subsidiary.name,
    grupo: item.group.name,
    descricao: item.description,
    valorPago: item.value_paid,
    valor: item.value,
    contaDeSaida: item.bank_data.account,
    data: item.pay_date
  }));

  return (
    <>
      <Table cols={9} collums={columns} rows={rows} handleSelected={handleSelected} />
      {selectedsEntry.length > 0 && <Button onClick={handleRemoveAllIds}>Excluir todos</Button>}
    </>
  );
}

export default CashFlowExits;