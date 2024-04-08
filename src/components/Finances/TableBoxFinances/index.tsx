import React from 'react';
import { Tabs, Tab as TabBootstrap } from 'react-bootstrap';

import TableEntrySales from '../../Table/TableEntrySales';
import TableEntryFowardAgent from '../../Table/TableEntryFowardAgent';
import TableEntryCredit from '../../Table/TableEntryCredit';



import { TitlePane, BalanceAmount } from './styles';
import { Pagination } from '../../Pagination';

interface SallesData {
  id: string;
  data: string;
  filial: string;
  descricao: string;
  fontePagadora: string;
  valorBruto: string;
  taxaDeImposto: string;
  valorDaNota: string;
  parteBrutaDaEmpresa: string;
  parteLiquidaDaEmpresa: string;
  contaDeEntrada: string;
}

interface DespachanteEntry {
  id: string;
  data: string;
  filial: string;
  descricao: string;
  nomeDoCliente: string;
  valorBruto: string;
  contaDeEntrada: string;
}

interface CreditEntry {
  id: string;
  data: string;
  filial: string;
  descricao: string;
  nomeDoCliente: string;
  valorBruto: string;
  valorDaNota: string;
  taxaDeImposto: string;
  contaDeEntrada: string;
}

type EntryData = {
  bank: string;
  brute_value: string;
  description: string;
  empressBrute: string;
  empressLiquid: string;
  id: string;
  pay_date: string;
  paying_source: string;
  subsidiary: string;
  tax_rate: string;
  value_note: string;
};

type BalanceData = {
  id: string;
  pay_date: string;
  city: string;
  description: string;
  brute_value: string;
  value_note: string;
  tax_rate: string;
  bank: string;
  client: string;
};

type ForwardingAgentData = {
  id: string;
  due_date: string;
  city: string;
  description: string;
  client: string;
  brute_value: string;
  bank: string;
};
type TableBoxFinancesProps = {
  typeTab: string;
  handleSetTab: (tabName: string | null) => void;
  title: string;
  salesEntry?: EntryData[];
  dispatcherEntry?: ForwardingAgentData[];
  creditEntry?: BalanceData[];
  salesEntryTotal?: string;
  dispatcherEntryTotal?: string;
  creditEntryTotal?: string;
  salesTotal?: number;
  dispatcherTotal?: number;
  creditTotal?: number;
  pageSaleEntry?: number;
  pageCreditEntry?: number;
  pageDispacherEntry?: number;
  handlePaginateSeleEntry: (page: number) => void;
  handlePaginateDispacherEntry: (page: number) => void;
  handlePaginateCreditEntry: (page: number) => void;
};

const TableBoxFinances: React.FC<TableBoxFinancesProps> = ({
  typeTab,
  handleSetTab,
  title,
  salesEntry,
  dispatcherEntry,
  dispatcherEntryTotal,
  creditEntry,
  creditEntryTotal,
  salesEntryTotal,
  salesTotal,
  dispatcherTotal,
  creditTotal,
  pageSaleEntry,
  pageDispacherEntry,
  pageCreditEntry,
  handlePaginateCreditEntry,
  handlePaginateDispacherEntry,
  handlePaginateSeleEntry

}) => {
  const collumSalesEntry = [
    { name: 'DATA' },
    { name: 'FILIAL' },
    { name: 'DESCRIÇÃO' },
    { name: 'FONTE PAGADORA' },
    { name: 'VALOR BRUTO' },
    { name: 'TAXA DE IMPOSTO' },
    { name: 'VALOR DA NOTA' },
    { name: 'PARTE BRUTA DA EMPRESA' },
    { name: 'PARTE LÍQUIDA DA EMPRESA' },
    { name: 'CONTA DE ENTRADA' },
  ];
  const collumDespachanteEntry = [
    { name: 'DATA' },
    { name: 'FILIAL' },
    { name: 'DESCRIÇÃO' },
    { name: 'NOME DO CLIENTE' },
    { name: 'VALOR BRUTO' },
    { name: 'CONTA DE ENTRADA' },
  ];
  const collumCreditEntry = [
    { name: 'DATA' },
    { name: 'FILIAL' },
    { name: 'DESCRIÇÃO' },
    { name: 'NOME DO CLIENTE' },
    { name: 'VALOR BRUTO' },
    { name: 'VALOR DA NOTA' },
    { name: 'TAXA DE IMPOSTO' },
    { name: 'CONTA DE ENTRADA' },
  ];

  const rowSallesEntry: SallesData[] = salesEntry ? salesEntry?.map(item => ({
    id: item?.id,
    data: item?.pay_date,
    filial: item?.subsidiary,
    descricao: item?.description,
    fontePagadora: item?.paying_source,
    valorBruto: item?.brute_value,
    taxaDeImposto: item?.tax_rate,
    valorDaNota: item?.value_note,
    parteBrutaDaEmpresa: item?.empressBrute,
    parteLiquidaDaEmpresa: item?.empressLiquid,
    contaDeEntrada: item?.bank,
  })) : [];

  const rowDespachanteEntry: DespachanteEntry[] = dispatcherEntry ? dispatcherEntry?.map(item => ({
    id: item.id,
    data: item.due_date,
    filial: item.city,
    descricao: item.description,
    nomeDoCliente: item.client,
    valorBruto: item.brute_value,
    contaDeEntrada: item.bank,
  })) : [];

  const rowCreditEntry: CreditEntry[] = creditEntry ? creditEntry?.map(item => ({
    id: item.id,
    data: item.pay_date,
    filial: item.city,
    descricao: item.description,
    nomeDoCliente: item.client,
    valorBruto: item.brute_value,
    valorDaNota: item.value_note,
    taxaDeImposto: item.tax_rate,
    contaDeEntrada: item.bank,
  })) : [];
  
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
        <TableEntrySales collums={collumSalesEntry} rows={rowSallesEntry} cols={10} />
        <BalanceAmount>
          <Pagination
            totalCount={salesTotal || 0}
            perPage={8}
            pageIndex={pageSaleEntry || 1}
            onPageChange={handlePaginateSeleEntry}
          />
          <p>
            <span>Saldo Total</span>
            <strong>{salesEntryTotal}</strong>
          </p>
        </BalanceAmount>
      </TabBootstrap>
      <TabBootstrap eventKey="forwardingAgent" title="Despachante">
        <TitlePane>{title}</TitlePane>
        <TableEntryFowardAgent collums={collumDespachanteEntry} rows={rowDespachanteEntry} cols={6} />
        <BalanceAmount>
          <Pagination
            totalCount={dispatcherTotal || 0}
            perPage={8}
            pageIndex={pageDispacherEntry || 1}
            onPageChange={handlePaginateDispacherEntry}
          />
          <p>
            <span>Saldo Total</span>
            <strong>{dispatcherEntryTotal}</strong>
          </p>
        </BalanceAmount>
      </TabBootstrap>
      <TabBootstrap eventKey="credit" title="Crédito">
        <TitlePane>{title}</TitlePane>
        <TableEntryCredit collums={collumCreditEntry} rows={rowCreditEntry} cols={8} />
        <BalanceAmount>
        <Pagination
            totalCount={creditTotal || 0}
            perPage={8}
            pageIndex={pageCreditEntry || 1}
            onPageChange={handlePaginateCreditEntry}
          />
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
