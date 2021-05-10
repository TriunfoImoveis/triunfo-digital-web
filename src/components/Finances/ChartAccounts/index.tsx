import React from 'react';
import { Tabs, Tab as TabBootstrap } from 'react-bootstrap';

import { AccountContainer, BalanceAmount, Table, TitlePane } from './styles';

type ChartAccountsProps = {
  typeTab: string;
  handleSetTab: (tabName: string | null) => void;
};
const ChartAccounts: React.FC<ChartAccountsProps> = ({
  typeTab,
  handleSetTab,
}) => {
  return (
    <AccountContainer>
      <Tabs
        id="tab-container"
        className="tab-container"
        activeKey={typeTab}
        onSelect={tab => handleSetTab(tab)}
        variant="tabs"
      >
        <TabBootstrap eventKey="fix" title="Contas Fixas">
          <TitlePane>Contas Fixas</TitlePane>
          <Table cols={6}>
            <thead>
              <tr>
                <th>Filial</th>
                <th>Descrição</th>
                <th>Vencimento</th>
                <th>Conta de saída</th>
                <th>Valor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>São Luís</td>
                <td>Energia</td>
                <td>10/03/2021</td>
                <td>84548-8</td>
                <td>R$ 1.400.00</td>
                <td className="PAGO">PAGO</td>
              </tr>
              <tr>
                <td>Fortaleza</td>
                <td>Energia</td>
                <td>10/03/2021</td>
                <td>84548-8</td>
                <td>R$ 1.400.00</td>
                <td className="PAGO">PAGO</td>
              </tr>
              <tr>
                <td>Teresina</td>
                <td>Energia</td>
                <td>10/03/2021</td>
                <td>84548-8</td>
                <td>R$ 1.400.00</td>
                <td className="PAGO">PAGO</td>
              </tr>
              <tr>
                <td>São Luís</td>
                <td>Energia</td>
                <td>10/03/2021</td>
                <td>84548-8</td>
                <td>R$ 1.400.00</td>
                <td className="PAGO">PAGO</td>
              </tr>
              <tr>
                <td>Fortaleza</td>
                <td>Energia</td>
                <td>10/03/2021</td>
                <td>84548-8</td>
                <td>R$ 1.400.00</td>
                <td className="PAGO">PAGO</td>
              </tr>
              <tr>
                <td>Teresina</td>
                <td>Energia</td>
                <td>10/03/2021</td>
                <td>84548-8</td>
                <td>R$ 1.400.00</td>
                <td className="PAGO">PAGO</td>
              </tr>
              <tr>
                <td>São Luís</td>
                <td>Energia</td>
                <td>10/03/2021</td>
                <td>84548-8</td>
                <td>R$ 1.400.00</td>
                <td className="PAGO">PAGO</td>
              </tr>
              <tr>
                <td>Fortaleza</td>
                <td>Energia</td>
                <td>10/03/2021</td>
                <td>84548-8</td>
                <td>R$ 1.400.00</td>
                <td className="PAGO">PAGO</td>
              </tr>
              <tr>
                <td>Teresina</td>
                <td>Energia</td>
                <td>10/03/2021</td>
                <td>84548-8</td>
                <td>R$ 1.400.00</td>
                <td className="PAGO">PAGO</td>
              </tr>
            </tbody>
          </Table>
          <BalanceAmount>
            <p>
              <span>Total</span>
              <strong>R$ 50.000,00</strong>
            </p>
          </BalanceAmount>
        </TabBootstrap>
        <TabBootstrap eventKey="variable" title="Contas Variáveis">
          <TitlePane>Contas Variáveis</TitlePane>
          <Table cols={6}>
            <thead>
              <tr>
                <th>Filial</th>
                <th>Descrição</th>
                <th>Vencimento</th>
                <th>Conta de saída</th>
                <th>Valor</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>São Luís</td>
                <td>Energia</td>
                <td>10/03/2021</td>
                <td>84548-8</td>
                <td>R$ 1.400.00</td>
                <td className="PAGO">PAGO</td>
              </tr>
              <tr>
                <td>Fortaleza</td>
                <td>Energia</td>
                <td>10/03/2021</td>
                <td>84548-8</td>
                <td>R$ 1.400.00</td>
                <td className="PAGO">PAGO</td>
              </tr>
              <tr>
                <td>Teresina</td>
                <td>Energia</td>
                <td>10/03/2021</td>
                <td>84548-8</td>
                <td>R$ 1.400.00</td>
                <td className="PAGO">PAGO</td>
              </tr>
              <tr>
                <td>São Luís</td>
                <td>Energia</td>
                <td>10/03/2021</td>
                <td>84548-8</td>
                <td>R$ 1.400.00</td>
                <td className="PAGO">PAGO</td>
              </tr>
              <tr>
                <td>Fortaleza</td>
                <td>Energia</td>
                <td>10/03/2021</td>
                <td>84548-8</td>
                <td>R$ 1.400.00</td>
                <td className="PAGO">PAGO</td>
              </tr>
              <tr>
                <td>Teresina</td>
                <td>Energia</td>
                <td>10/03/2021</td>
                <td>84548-8</td>
                <td>R$ 1.400.00</td>
                <td className="PAGO">PAGO</td>
              </tr>
              <tr>
                <td>São Luís</td>
                <td>Energia</td>
                <td>10/03/2021</td>
                <td>84548-8</td>
                <td>R$ 1.400.00</td>
                <td className="PAGO">PAGO</td>
              </tr>
              <tr>
                <td>Fortaleza</td>
                <td>Energia</td>
                <td>10/03/2021</td>
                <td>84548-8</td>
                <td>R$ 1.400.00</td>
                <td className="PAGO">PAGO</td>
              </tr>
              <tr>
                <td>Teresina</td>
                <td>Energia</td>
                <td>10/03/2021</td>
                <td>84548-8</td>
                <td>R$ 1.400.00</td>
                <td className="PAGO">PAGO</td>
              </tr>
            </tbody>
          </Table>
          <BalanceAmount>
            <p>
              <span>Total</span>
              <strong>R$ 50.000,00</strong>
            </p>
          </BalanceAmount>
        </TabBootstrap>
      </Tabs>
    </AccountContainer>
  );
};

export default ChartAccounts;
