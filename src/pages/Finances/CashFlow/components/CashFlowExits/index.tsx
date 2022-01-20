import React from 'react';
import Table from '../../../../../components/Table/TableCashFlowExits';

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
  const columns = [
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
      <Table cols={8} collums={columns} rows={rows} />
    </>
  );
}

export default CashFlowExits;