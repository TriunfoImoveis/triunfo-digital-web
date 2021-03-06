import React from 'react';
import { Tabs, Tab as TabBootstrap } from 'react-bootstrap';

import { TitlePane, Table, BalanceAmount, ContentWrapper } from './styles';

type EntryData = {
  id: string;
  pay_date: string;
  city: string;
  description: string;
  paying_source: string;
  brute_value: string;
  brute_valueBRL: string;
  tax_rate: string;
  value_note: string;
  empressBrute: string;
  empressLiquidBRL: string;
  empressLiquid: string;
  bank: string;
};

type BalanceData = {
  id: string;
  due_date: string;
  city: string;
  description: string;
  client: string;
  realtors: string;
  brute_value: string;
  brute_valueBRL: string;
  value_note: string;
  tax_rate: string;
  bank: string;
};

type ForwardingAgentData = {
  id: string;
  due_date: string;
  city: string;
  description: string;
  client: string;
  liquid_value: string;
  liquid_valueBRL: string;
  bank: string;
};
type TableBoxFinancesProps = {
  typeTab: string;
  handleSetTab: (tabName: string | null) => void;
  title: string;
  salesEntry: EntryData[];
  dispatcherEntry: ForwardingAgentData[];
  creditEntry: BalanceData[];
  salesEntryTotal: string;
  dispatcherEntryTotal: string;
  creditEntryTotal: string;
};

const TableBoxFinances: React.FC<TableBoxFinancesProps> = ({
  typeTab,
  handleSetTab,
  title,
  salesEntry,
  salesEntryTotal,
  dispatcherEntry,
  dispatcherEntryTotal,
  creditEntry,
  creditEntryTotal,
}) => {
  return (
    <Tabs
      id="tab-container"
      className="tab-container"
      activeKey={typeTab}
      onSelect={tab => handleSetTab(tab)}
      variant="tabs"
    >
      <TabBootstrap eventKey="sales" title="Vendas">
        <TitlePane>{title}</TitlePane>
        <ContentWrapper>
          <Table cols={10}>
            <thead>
              <tr>
                <th>Data</th>
                <th>Filial</th>
                <th>Descrição</th>
                <th>Fonte Pagadora</th>
                <th>Valor Bruto</th>
                <th>Taxa de imposto</th>
                <th>Valor da nota</th>
                <th>Parte Bruta da Empresa</th>
                <th>Parte Líquida da Empresa</th>
                <th>Conta de entrada</th>
              </tr>
            </thead>
            <tbody>
              {salesEntry.map(sale => (
                <tr key={sale.id}>
                  <td>{sale.pay_date}</td>
                  <td>{sale.city}</td>
                  <td>{sale.description}</td>
                  <td>{sale.paying_source}</td>
                  <td>{sale.brute_valueBRL}</td>
                  <td>{sale.tax_rate}</td>
                  <td>{sale.value_note}</td>
                  <td>{sale.empressBrute}</td>
                  <td>{sale.empressLiquidBRL}</td>
                  <td>{sale.bank}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </ContentWrapper>
        <BalanceAmount>
          <p>
            <span>Saldo Total</span>
            <strong>{salesEntryTotal}</strong>
          </p>
        </BalanceAmount>
      </TabBootstrap>
      <TabBootstrap eventKey="forwardingAgent" title="Despachante">
        <TitlePane>{title}</TitlePane>
        <Table cols={6}>
          <thead>
            <tr>
              <th>Data</th>
              <th>Filial</th>
              <th>Descrição</th>
              <th>Nome do Cliente</th>
              <th>Valor bruto</th>
              <th>Conta de entrada</th>
            </tr>
          </thead>
          <tbody>
            {dispatcherEntry.map(entry => (
              <tr key={entry.id}>
                <td>{entry.due_date}</td>
                <td>{entry.city}</td>
                <td>{entry.description}</td>
                <td>{entry.client}</td>
                <td>{entry.liquid_valueBRL}</td>
                <td>{entry.bank}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <BalanceAmount>
          <p>
            <span>Saldo Total</span>
            <strong>{dispatcherEntryTotal}</strong>
          </p>
        </BalanceAmount>
      </TabBootstrap>
      <TabBootstrap eventKey="credit" title="Crédito">
        <TitlePane>{title}</TitlePane>
        <Table cols={8}>
          <thead>
            <tr>
              <th>Data</th>
              <th>Filial</th>
              <th>Descrição</th>
              <th>Nome do Cliente</th>
              <th>Valor bruto</th>
              <th>Valor da nota</th>
              <th>Taxa de imposto</th>
              <th>Conta de entrada</th>
            </tr>
          </thead>
          <tbody>
            {creditEntry.map(credit => (
              <tr key={credit.id}>
                <td>{credit.due_date}</td>
                <td>{credit.city}</td>
                <td>{credit.description}</td>
                <td>{credit.client}</td>
                <td>{credit.brute_valueBRL}</td>
                <td>{credit.value_note}</td>
                <td>{credit.tax_rate}</td>
                <td>{credit.bank}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <BalanceAmount>
          <p>
            <span>Saldo Total</span>
            <strong>{creditEntryTotal}</strong>
          </p>
        </BalanceAmount>
      </TabBootstrap>
    </Tabs>
  );
};

export default TableBoxFinances;
