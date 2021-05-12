import React from 'react';
import { Tabs, Tab as TabBootstrap } from 'react-bootstrap';

import { TitlePane, Table, BalanceAmount } from './styles';

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
        <Table cols={6}>
          <thead>
            <tr>
              <th>Data</th>
              <th>Filial</th>
              <th>Descrição</th>
              <th>Quem pagou</th>
              <th>Valor</th>
              <th>Conta de Saída</th>
            </tr>
          </thead>
          <tbody>
            {account.map(account => (
              <tr key={account.id}>
                <td>{account.due_date}</td>
                <td>{account.city}</td>
                <td>{account.description}</td>
                <td>{account.user}</td>
                <td>{account.value}</td>
                <td>{account.bank}</td>
              </tr>
            ))}
          </tbody>
        </Table>
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
