import React from 'react';
import { Tabs, Tab as TabBootstrap } from 'react-bootstrap';
import { GridColDef } from '@material-ui/data-grid';

import Table from '../../Table';

import { TitlePane, BalanceAmount } from './styles';

type Account = {
  id: string;
  due_date: string;
  city: string;
  description: string;
  value: number;
  valueBRL: string;
  user: string;
  bank: string;
};
type TableBoxFinancesAccountProps = {
  typeTab: string;
  handleSetTab: (tabName: string | null) => void;
  title: string;
  account: Account[];
  accountTotal: string;
};

const TableBoxFinancesAccount: React.FC<TableBoxFinancesAccountProps> = ({
  typeTab,
  handleSetTab,
  title,
  account,
  accountTotal,
}) => {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', disableColumnMenu: true, hide: true, align: 'center', headerAlign: 'center' },
    { field: 'data', headerName: 'DATA', width: 150, disableColumnMenu: true, align: 'center', headerAlign: 'center' },
    { field: 'filial', headerName: 'FILIAL', width: 150, sortable: false, disableColumnMenu: true, align: 'center', headerAlign: 'center' },
    { field: 'descricao', headerName: 'DESCRIÇÃO', width: 250, disableColumnMenu: true, align: 'center', headerAlign: 'center', sortable: false },
    { field: 'quemPagou', headerName: 'QUEM PAGOU', width: 150, disableColumnMenu: true, align: 'center', headerAlign: 'center', sortable: false },
    { field: 'valor', headerName: 'VALOR', width: 150, disableColumnMenu: true, align: 'center', headerAlign: 'center', sortable: false },
    { field: 'contaDeSaida', headerName: 'CONTA DE SAÍDA', width: 150, sortable: false, disableColumnMenu: true, align: 'center', headerAlign: 'center' },
  ];

  const rows = account.map(item => ({
    id: item.id,
    data: item.due_date,
    filial: item.city,
    descricao: item.description,
    quemPagou: item.user,
    valor: item.valueBRL,
    contaDeSaida: item.bank
  }))
  return (
    <Tabs
      id="tab-container"
      className="tab-container"
      activeKey={typeTab}
      onSelect={tab => handleSetTab(tab)}
      variant="tabs"
    >
      <TabBootstrap eventKey="account" title="Despesas">
        <TitlePane>{title}</TitlePane>
        <Table columns={columns} rows={rows} />
        <BalanceAmount>
          <p>
            <span>Saldo Total</span>
            <strong>{accountTotal}</strong>
          </p>
        </BalanceAmount>
      </TabBootstrap>
    </Tabs>
  );
};

export default TableBoxFinancesAccount;
