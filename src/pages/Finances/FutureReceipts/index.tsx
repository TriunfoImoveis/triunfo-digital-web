import React, { useEffect, useState } from 'react';
import { Tabs, Tab as TabBootstrap } from 'react-bootstrap';
import { AiOutlinePlus } from 'react-icons/ai';

import api from '../../../services/api';
import { DateBRL } from '../../../utils/format';
import { money } from '../../../utils/masked';
import AdmLayout from '../../Layouts/Adm';

import {
  Container,
  Background,
  Header,
  Content,
  AccountContainer,
  TitlePane,
  Table,
  BalanceAmount,
} from './styles';

type FutureReceiptsType = {
  id: string;
  due_date: string;
  description: string;
  value: number;
  valueBRL: string;
  status: string;
  city: string;
  realtors: string;
};
const FutureReceipts: React.FC = () => {
  const [typeTab, setTypeTab] = useState('fix');
  const [city, setCity] = useState('São Luís');
  const [total, setTotal] = useState('R$ 0,00');
  const [future, setFuture] = useState<FutureReceiptsType[]>([]);

  useEffect(() => {
    const loadingFutureReceipts = async () => {
      const response = await api.get(`/installment?city=${city}`);
      const futureReceiptsPending = response.data.filter(
        item => item.status.includes('PENDENTE') && item,
      );
      const futureReceiptsExpired = response.data.filter(
        item => item.status.includes('VENCIDO') && item,
      );

      const data = [...futureReceiptsPending, ...futureReceiptsExpired];

      const dataFormated = data.map(item => {
        return {
          id: item.id,
          due_date: DateBRL(item.due_date),
          description: `${item.installment_number}° Parcela, ${
            item.sale.realty.enterprise
          }, ${money(Number(item.sale.realty_ammount))}`,
          value: Number(item.value),
          valueBRL: money(Number(item.value)),
          status: item.status,
          city: item.sale.realty.city,
          realtors: item.sale.sale_has_sellers
            .map(realtor => realtor.name)
            .toString(),
        };
      });
      if (data.length > 0) {
        const arrayValues = dataFormated.map(item => item.value);
        const reducer = (accumulator, currentValue) =>
          accumulator + currentValue;
        const total = arrayValues.reduce(reducer);
        setTotal(money(total));
      }

      setFuture(dataFormated);
    };
    loadingFutureReceipts();
  }, [city]);
  const handleSetTab = (tabName: string | null) => {
    if (tabName) {
      setTypeTab(tabName);
    }
  };
  return (
    <AdmLayout>
      <Background>
        <Container>
          <Header>
            <h1>Recebimentos Futuros</h1>
          </Header>
          <Content>
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
                        <th>Vencimento</th>
                        <th>Descrição</th>
                        <th>Valor Bruto</th>
                        <th>Corretor</th>
                        <th>Status</th>
                        <th>Detalhes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {future.map(item => (
                        <tr key={item.id}>
                          <td>{item.city}</td>
                          <td>{item.due_date}</td>
                          <td>{item.description}</td>
                          <td>{item.valueBRL}</td>
                          <td>{item.realtors}</td>
                          <td className={item.status}>{item.status}</td>
                          <td>
                            <button type="button" className="details">
                              <AiOutlinePlus color="#C32925" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <BalanceAmount>
                    <p>
                      <span>Total</span>
                      <strong>{total}</strong>
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
          </Content>
        </Container>
      </Background>
    </AdmLayout>
  );
};

export default FutureReceipts;
