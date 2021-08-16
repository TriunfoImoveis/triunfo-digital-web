import React from 'react';
import { Tabs, Tab as TabBootstrap } from 'react-bootstrap';
import { GridColDef } from '@material-ui/data-grid';

import Table from '../../Table';

import { TitlePane, BalanceAmount } from './styles';

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
  const collumSalesEntry: GridColDef[] = [
    { field: 'id', headerName: 'ID', disableColumnMenu: true, hide: true, align: 'center', headerAlign: 'center' },
    { field: 'data', headerName: 'DATA', width: 150, disableColumnMenu: true, align: 'center', headerAlign: 'center' },
    { field: 'filial', headerName: 'FILIAL', width: 150, disableColumnMenu: true, align: 'center', headerAlign: 'center', sortable: false },
    { field: 'descricao', headerName: 'DESCRIÇÃO', width: 300, disableColumnMenu: true, align: 'center', headerAlign: 'center', sortable: false },
    { field: 'fontePagadora', headerName: 'FONTE PAGADORA', width: 300, disableColumnMenu: true, align: 'center', headerAlign: 'center', sortable: false },
    { field: 'valorBruto', headerName: 'VALOR BRUTO', width: 150, disableColumnMenu: true, align: 'center', headerAlign: 'center', sortable: false },
    { field: 'taxaDeImposto', headerName: 'TAXA DE IMPOSTO', width: 200, disableColumnMenu: true, align: 'center', headerAlign: 'center', sortable: false },
    { field: 'valorDaNota', headerName: 'VALOR DA NOTA', width: 150, disableColumnMenu: true, align: 'center', headerAlign: 'center', sortable: false },
    { field: 'parteBrutaDaEmpresa', headerName: 'PARTE BRUTA DA EMPRESA', width: 250, disableColumnMenu: true, align: 'center', headerAlign: 'center', sortable: false },
    { field: 'parteLiquidaDaEmpresa', headerName: 'PARTE LÍQUIDA DA EMPRESA', width: 250, disableColumnMenu: true, align: 'center', headerAlign: 'center', sortable: false },
    { field: 'contaDeEntrada', headerName: 'CONTA DE ENTRADA', width: 250, disableColumnMenu: true, align: 'center', headerAlign: 'center', sortable: false },
  ];
  const collumDespachanteEntry: GridColDef[] = [
    { field: 'id', headerName: 'ID', disableColumnMenu: true, hide: true, align: 'center', headerAlign: 'center' },
    { field: 'data', headerName: 'DATA', width: 150, disableColumnMenu: true, align: 'center', headerAlign: 'center' },
    { field: 'filial', headerName: 'FILIAL', width: 150, disableColumnMenu: true, align: 'center', headerAlign: 'center', sortable: false },
    { field: 'descricao', headerName: 'DESCRIÇÃO', width: 300, disableColumnMenu: true, align: 'center', headerAlign: 'center', sortable: false },
    { field: 'nomeDoCliente', headerName: 'NOME DO CLIENTE', width: 300, disableColumnMenu: true, align: 'center', headerAlign: 'center', sortable: false },
    { field: 'valorBruto', headerName: 'VALOR BRUTO', width: 150, disableColumnMenu: true, align: 'center', headerAlign: 'center', sortable: false },
    { field: 'contaDeEntrada', headerName: 'CONTA DE ENTRADA', width: 250, disableColumnMenu: true, align: 'center', headerAlign: 'center', sortable: false },
  ];
  const collumCreditEntry: GridColDef[] = [
    { field: 'id', headerName: 'ID', disableColumnMenu: true, hide: true, align: 'center', headerAlign: 'center' },
    { field: 'data', headerName: 'DATA', width: 150, disableColumnMenu: true, align: 'center', headerAlign: 'center' },
    { field: 'filial', headerName: 'FILIAL', width: 150, disableColumnMenu: true, align: 'center', headerAlign: 'center', sortable: false },
    { field: 'descricao', headerName: 'DESCRIÇÃO', width: 300, disableColumnMenu: true, align: 'center', headerAlign: 'center', sortable: false },
    { field: 'nomeDoCliente', headerName: 'NOME DO CLIENTE', width: 300, disableColumnMenu: true, align: 'center', headerAlign: 'center', sortable: false },
    { field: 'valorBruto', headerName: 'VALOR BRUTO', width: 150, disableColumnMenu: true, align: 'center', headerAlign: 'center', sortable: false },
    { field: 'valorDaNota', headerName: 'VALOR DA NOTA', width: 150, disableColumnMenu: true, align: 'center', headerAlign: 'center', sortable: false },
    { field: 'taxaDeImposto', headerName: 'TAXA DE IMPOSTO', width: 200, disableColumnMenu: true, align: 'center', headerAlign: 'center', sortable: false },
    { field: 'contaDeEntrada', headerName: 'CONTA DE ENTRADA', width: 250, disableColumnMenu: true, align: 'center', headerAlign: 'center', sortable: false },
  ];

  const rowSallesEntry = salesEntry.map(item => ({
    id: item.id,
    data: item.pay_date,
    filial: item.city,
    descricao: item.description,
    fontePagadora: item.paying_source,
    valorBruto: item.brute_valueBRL,
    taxaDeImposto: item.tax_rate,
    valorDaNota: item.value_note,
    parteBrutaDaEmpresa: item.empressBrute,
    parteLiquidaDaEmpresa: item.empressLiquidBRL,
    contaDeEntrada: item.bank,
  }));
  const rowDespachanteEntry = dispatcherEntry.map(item => ({
    id: item.id,
    data: item.due_date,
    filial: item.city,
    descricao: item.description,
    nomeDoCliente: item.client,
    valorBruto: item.liquid_valueBRL,
    contaDeEntrada: item.bank,
  }));
  const rowCreditEntry = creditEntry.map(item => ({
    id: item.id,
    data: item.due_date,
    filial: item.city,
    descricao: item.description,
    nomeDoCliente: item.client,
    valorBruto: item.brute_valueBRL,
    valorDaNota: item.value_note,
    taxaDeImposto: item.tax_rate,
    contaDeEntrada: item.bank,
  }));
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
        <Table columns={collumSalesEntry} rows={rowSallesEntry} rowsPerPageOptions={10} />
        <BalanceAmount>
          <p>
            <span>Saldo Total</span>
            <strong>{salesEntryTotal}</strong>
          </p>
        </BalanceAmount>
      </TabBootstrap>
      <TabBootstrap eventKey="forwardingAgent" title="Despachante">
        <TitlePane>{title}</TitlePane>
        <Table columns={collumDespachanteEntry} rows={rowDespachanteEntry} rowsPerPageOptions={10} />
        <BalanceAmount>
          <p>
            <span>Saldo Total</span>
            <strong>{dispatcherEntryTotal}</strong>
          </p>
        </BalanceAmount>
      </TabBootstrap>
      <TabBootstrap eventKey="credit" title="Crédito">
        <TitlePane>{title}</TitlePane>
        <Table columns={collumCreditEntry} rows={rowCreditEntry} rowsPerPageOptions={10} />
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
