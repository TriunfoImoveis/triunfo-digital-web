import React from 'react';
import { Tabs, Tab as TabBootstrap } from 'react-bootstrap';

import Table from '../../Table/TableExits';

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
  const columns = [
    { name: 'DATA'},
    { name: 'FILIAL'},
    { name: 'DESCRIÇÃO'},
    { name: 'QUEM PAGOU'},
    { name: 'VALOR'},
    { name: 'CONTA DE SAÍDA'},
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
        <Table collums={columns} rows={rows} cols={6}/>
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
