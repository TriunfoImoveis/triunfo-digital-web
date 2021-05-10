import React from 'react';
import { Tabs, Tab as TabBootstrap } from 'react-bootstrap';

import { TitlePane, Table, BalanceAmount } from './styles';

type TableBoxFinancesProps = {
  typeTab: string;
  handleSetTab: (tabName: string | null) => void;
  title: string;
};

const TableBoxFinances: React.FC<TableBoxFinancesProps> = ({
  typeTab,
  handleSetTab,
  title,
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
            <tr>
              <td>29/11/2021</td>
              <td>São Luis</td>
              <td>Ilha Prime</td>
              <td>---</td>
              <td>R$ 10.000,00</td>
              <td>---</td>
              <td>---</td>
              <td>578769-6</td>
            </tr>
            <tr>
              <td>29/11/2021</td>
              <td>São Luis</td>
              <td>Ilha Prime</td>
              <td>---</td>
              <td>R$ 10.000,00</td>
              <td>---</td>
              <td>---</td>
              <td>578769-6</td>
            </tr>
            <tr>
              <td>29/11/2021</td>
              <td>São Luis</td>
              <td>Ilha Prime</td>
              <td>---</td>
              <td>R$ 10.000,00</td>
              <td>---</td>
              <td>---</td>
              <td>578769-6</td>
            </tr>
            <tr>
              <td>29/11/2021</td>
              <td>São Luis</td>
              <td>Ilha Prime</td>
              <td>---</td>
              <td>R$ 10.000,00</td>
              <td>---</td>
              <td>---</td>
              <td>578769-6</td>
            </tr>
            <tr>
              <td>29/11/2021</td>
              <td>São Luis</td>
              <td>Ilha Prime</td>
              <td>---</td>
              <td>R$ 10.000,00</td>
              <td>---</td>
              <td>---</td>
              <td>578769-6</td>
            </tr>
            <tr>
              <td>29/11/2021</td>
              <td>São Luis</td>
              <td>Ilha Prime</td>
              <td>---</td>
              <td>R$ 10.000,00</td>
              <td>---</td>
              <td>---</td>
              <td>578769-6</td>
            </tr>
            <tr>
              <td>29/11/2021</td>
              <td>São Luis</td>
              <td>Ilha Prime</td>
              <td>---</td>
              <td>R$ 10.000,00</td>
              <td>---</td>
              <td>---</td>
              <td>578769-6</td>
            </tr>
            <tr>
              <td>29/11/2021</td>
              <td>São Luis</td>
              <td>Ilha Prime</td>
              <td>---</td>
              <td>R$ 10.000,00</td>
              <td>---</td>
              <td>---</td>
              <td>578769-6</td>
            </tr>
            <tr>
              <td>29/11/2021</td>
              <td>São Luis</td>
              <td>Ilha Prime</td>
              <td>---</td>
              <td>R$ 10.000,00</td>
              <td>---</td>
              <td>---</td>
              <td>578769-6</td>
            </tr>
            <tr>
              <td>29/11/2021</td>
              <td>São Luis</td>
              <td>Ilha Prime</td>
              <td>---</td>
              <td>R$ 10.000,00</td>
              <td>---</td>
              <td>---</td>
              <td>578769-6</td>
            </tr>
            <tr>
              <td>29/11/2021</td>
              <td>São Luis</td>
              <td>Ilha Prime</td>
              <td>---</td>
              <td>R$ 10.000,00</td>
              <td>---</td>
              <td>---</td>
              <td>578769-6</td>
            </tr>
          </tbody>
        </Table>
        <BalanceAmount>
          <p>
            <span>Saldo Total</span>
            <strong>R$ 50.000,00</strong>
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
            <tr>
              <td>29/11/2021</td>
              <td>São Luis</td>
              <td>Ilha Prime</td>
              <td>---</td>
              <td>R$ 10.000,00</td>
              <td>578769-6</td>
            </tr>
          </tbody>
        </Table>
        <BalanceAmount>
          <p>
            <span>Saldo Total</span>
            <strong>R$ 50.000,00</strong>
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
            <tr>
              <td>29/11/2021</td>
              <td>São Luis</td>
              <td>Ilha Prime</td>
              <td>---</td>
              <td>R$ 10.000,00</td>
              <td>---</td>
              <td>---</td>
              <td>578769-6</td>
            </tr>
            <tr>
              <td>29/11/2021</td>
              <td>São Luis</td>
              <td>Ilha Prime</td>
              <td>---</td>
              <td>R$ 10.000,00</td>
              <td>---</td>
              <td>---</td>
              <td>578769-6</td>
            </tr>
            <tr>
              <td>29/11/2021</td>
              <td>São Luis</td>
              <td>Ilha Prime</td>
              <td>---</td>
              <td>R$ 10.000,00</td>
              <td>---</td>
              <td>---</td>
              <td>578769-6</td>
            </tr>
            <tr>
              <td>29/11/2021</td>
              <td>São Luis</td>
              <td>Ilha Prime</td>
              <td>---</td>
              <td>R$ 10.000,00</td>
              <td>---</td>
              <td>---</td>
              <td>578769-6</td>
            </tr>
            <tr>
              <td>29/11/2021</td>
              <td>São Luis</td>
              <td>Ilha Prime</td>
              <td>---</td>
              <td>R$ 10.000,00</td>
              <td>---</td>
              <td>---</td>
              <td>578769-6</td>
            </tr>
            <tr>
              <td>29/11/2021</td>
              <td>São Luis</td>
              <td>Ilha Prime</td>
              <td>---</td>
              <td>R$ 10.000,00</td>
              <td>---</td>
              <td>---</td>
              <td>578769-6</td>
            </tr>
            <tr>
              <td>29/11/2021</td>
              <td>São Luis</td>
              <td>Ilha Prime</td>
              <td>---</td>
              <td>R$ 10.000,00</td>
              <td>---</td>
              <td>---</td>
              <td>578769-6</td>
            </tr>
            <tr>
              <td>29/11/2021</td>
              <td>São Luis</td>
              <td>Ilha Prime</td>
              <td>---</td>
              <td>R$ 10.000,00</td>
              <td>---</td>
              <td>---</td>
              <td>578769-6</td>
            </tr>
            <tr>
              <td>29/11/2021</td>
              <td>São Luis</td>
              <td>Ilha Prime</td>
              <td>---</td>
              <td>R$ 10.000,00</td>
              <td>---</td>
              <td>---</td>
              <td>578769-6</td>
            </tr>
            <tr>
              <td>29/11/2021</td>
              <td>São Luis</td>
              <td>Ilha Prime</td>
              <td>---</td>
              <td>R$ 10.000,00</td>
              <td>---</td>
              <td>---</td>
              <td>578769-6</td>
            </tr>
            <tr>
              <td>29/11/2021</td>
              <td>São Luis</td>
              <td>Ilha Prime</td>
              <td>---</td>
              <td>R$ 10.000,00</td>
              <td>---</td>
              <td>---</td>
              <td>578769-6</td>
            </tr>
          </tbody>
        </Table>
        <BalanceAmount>
          <p>
            <span>Saldo Total</span>
            <strong>R$ 50.000,00</strong>
          </p>
        </BalanceAmount>
      </TabBootstrap>
    </Tabs>
  );
};

export default TableBoxFinances;
