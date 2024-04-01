import React, { ChangeEvent, useState } from 'react';
import { Tabs, Tab as TabBootstrap } from 'react-bootstrap';

import { Form } from '@unform/web';
import FinancesLayout from '../../Layouts/FinancesLayout';

import {
  Container,
  Background,
  Header,
  Content,
  AccountContainer,
  TitlePane,
  BalanceAmount,
  FiltersContainer,
  FiltersBotton,
  FilterButtonGroup,
  FiltersBottonItems,
  LoadingContainer,
} from './styles';
import theme from '../../../styles/theme';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { getInstallmentsParams } from '../../../api/get-installments';
import TableInstallmentPending from './TableInstallmentPending';
import TableInstallmentsPay from './TableInstallmentsPay';
import { Pagination } from '../../../components/Pagination';
import Loader from 'react-loader-spinner';
import { TableFowardAgent } from './TableFowardAgent';
import { useFetchFinances } from '../../../hooks/useFetchFinances';

interface SubsidiaryData {
  id: string;
  name: string;
}

interface RevenueParams {
  subsidiary?: string;
  revenue_type: 'DESPACHANTE' | 'CREDITO';
  status?: string;
  month?: string;
  year?: string;
  dateFrom?: Date;
  dateTo?: Date;
  page?: number;
  perPage?: number;
}

interface FowardAgent {
  id: string;
  revenue_type: 'DESPACHANTE' | 'CREDITO';
  description: string;
  due_date: string;
  value_integral: number;
  client: string;
  subsidiary: {
    id: string;
    name: string;
  };
  status: string;
}

interface RevenueData {
  revenues: FowardAgent[];
  total: number;
  totalValueIntegralRevenues: number;
}
const FutureReceipts: React.FC = () => {
  const [typeTab, setTypeTab] = useState('RECEBIDO');
  const [paramsInstallmentsPay, setParamsInstallmentsPay] = useState<getInstallmentsParams>({
    subsidiary: '',
    status: 'PAGO',
    page: 1,
    perPage: 8
  })
  const [paramsInstallmentsPending, setParamsInstallmentsPending] = useState<getInstallmentsParams>({
    status: 'PENDENTE,VENCIDO',
    page: 1,
    perPage: 8
  })
  const [paramsRevenueForwardingAgent, setParamsRevenueForwardingAgent] = useState<RevenueParams>({
    revenue_type: 'DESPACHANTE',
    status: 'PENDENTE,VENCIDO',
    page: 1,
    perPage: 8
  })
  const [paramsRevenueCorresponding, setParamsRevenueCorresponding] = useState<RevenueParams>({
    revenue_type: 'CREDITO',
    status: 'PENDENTE,VENCIDO',
    page: 1,
    perPage: 8
  })

  const { data: futureReceipts } = useFetchFinances({ url: '/installment', params: paramsInstallmentsPay, config: { refreshInterval: 0 } })
  const { data: future } = useFetchFinances({ url: '/installment', params: paramsInstallmentsPending, config: { refreshInterval: 0 } })
  const { data: revenueForwardingAgent } = useFetchFinances<RevenueData>({ url: '/revenue', params: paramsRevenueForwardingAgent, config: { refreshInterval: 0 } })
  const { data: revenueCorresponding } = useFetchFinances<RevenueData>({ url: '/revenue', params: paramsRevenueCorresponding, config: { refreshInterval: 0 } })
  const { data: subsidiaries } = useFetchFinances<SubsidiaryData[]>({ url: '/subsidiary', config: { refreshInterval: 0 } })

  const handleSetTab = (tabName: string | null) => {
    if (tabName) {
      setTypeTab(tabName);
    }
  };

  const handleSubmit = ({ date_initial, date_final }) => {
    setParamsInstallmentsPay(prevState => ({
      ...prevState,
      dateFrom: date_initial,
      dateTo: date_final
    }))
    setParamsInstallmentsPending(prevState => ({
      ...prevState,
      dateFrom: date_initial,
      dateTo: date_final
    }))
    setParamsRevenueCorresponding(prevState => ({
      ...prevState,
      dateFrom: date_initial,
      dateTo: date_final
    }))
    setParamsRevenueForwardingAgent(prevState => ({
      ...prevState,
      dateFrom: date_initial,
      dateTo: date_final
    }))
  };

  const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value = '' } = event.target
    setParamsInstallmentsPay(prevState => ({
      ...prevState,
      subsidiary: value
    }))
    setParamsInstallmentsPending(prevState => ({
      ...prevState,
      subsidiary: value
    }))
    setParamsRevenueCorresponding(prevState => ({
      ...prevState,
      subsidiary: value
    }))
    setParamsRevenueForwardingAgent(prevState => ({
      ...prevState,
      subsidiary: value
    }))
  };
  
  function handlePaginateInstallmentPay(pageIndex: number) {
    setParamsInstallmentsPay(prevState => ({
      ...prevState,
      page: pageIndex
    }))
  }
  function handlePaginateInstallmentPending(pageIndex: number) {
    setParamsInstallmentsPending(prevState => ({
      ...prevState,
      page: pageIndex
    }))
  }
  function handlePaginateRevenueForwardingAgent(pageIndex: number) {
    setParamsRevenueForwardingAgent(prevState => ({
      ...prevState,
      page: pageIndex
    }))
  }
  function handlePaginateRevenueCorresponding(pageIndex: number) {
    setParamsRevenueForwardingAgent(prevState => ({
      ...prevState,
      page: pageIndex
    }))
  }
  return (
    <FinancesLayout>
      <Background>
        <Container>
          <Header>
            <h1>Recebimentos</h1>
          </Header>
          <FiltersContainer>
            <FiltersBotton>
              <FilterButtonGroup>
                <FiltersBottonItems>
                  <select defaultValue={''} onChange={handleSelectCity}>
                    <option value="">Todas as Filiais</option>
                    {subsidiaries?.map(subsidiary => (
                      <option value={subsidiary.id}>{subsidiary.name}</option>
                    ))}
                  </select>
                </FiltersBottonItems>
                <FiltersBottonItems>
                  <Form onSubmit={handleSubmit}>
                    <Input name="date_initial" mask="date" type="date" />
                    <Input name="date_final" mask="date" type="date" />
                    <Button type="submit">Filtrar</Button>
                  </Form>
                </FiltersBottonItems>
              </FilterButtonGroup>
            </FiltersBotton>
          </FiltersContainer>
          <Content>
            <AccountContainer>
              <Tabs
                id="tab-container"
                className="tab-container"
                activeKey={typeTab}
                onSelect={tab => handleSetTab(tab)}
                variant="tabs"
              >
                <TabBootstrap eventKey="RECEBER" title="Vendas | A receber">
                  <TitlePane>Entradas Futuras</TitlePane>
                  {!future && (
                    <LoadingContainer>
                      <Loader type='Bars' color={theme.colors.primary} height={50} width={50} />
                    </LoadingContainer>
                  )}
                  {future && (
                    <>
                      <TableInstallmentPending
                        installments={future?.installments || []}
                      />
                      <BalanceAmount>
                        <Pagination
                          totalCount={future?.totalInstallments || 0}
                          perPage={paramsInstallmentsPending.perPage || 8}
                          pageIndex={paramsInstallmentsPending.page || 1}
                          onPageChange={handlePaginateInstallmentPending}
                        />
                        <p>
                          <span>Total</span>
                          <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(future?.amountInstallmentRecived || 0)}</strong>
                        </p>
                      </BalanceAmount>
                    </>
                  )}
                </TabBootstrap>
                <TabBootstrap eventKey="RECEBIDO" title="Vendas | Recebidos">
                  <TitlePane>Entradas</TitlePane>
                  {!futureReceipts && (
                    <LoadingContainer>
                      <Loader type='Bars' color={theme.colors.primary} height={50} width={50} />
                    </LoadingContainer>
                  )}
                  {futureReceipts && (
                    <>
                      <TableInstallmentsPay
                        installments={futureReceipts?.installments || []}
                      />
                      <BalanceAmount>
                        <Pagination
                          totalCount={futureReceipts?.totalInstallments || 0}
                          perPage={paramsInstallmentsPay.perPage || 8}
                          pageIndex={paramsInstallmentsPay.page || 1}
                          onPageChange={handlePaginateInstallmentPay}
                        />
                        <p>
                          <span>Total</span>
                          <strong>{new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(futureReceipts?.amountInstallmentPay || 0)}</strong>
                        </p>
                      </BalanceAmount>
                    </>

                  )}
                </TabBootstrap>
                <TabBootstrap eventKey="DESPACHANTE" title="Despachante">
                  <TitlePane>Entradas Futuras</TitlePane>
                  {!revenueForwardingAgent?.revenues && (
                    <LoadingContainer>
                      <Loader type='Bars' color={theme.colors.primary} height={50} width={50} />
                    </LoadingContainer>
                  )}
                  {revenueForwardingAgent?.revenues && (
                    <>
                      <TableFowardAgent revenues={revenueForwardingAgent?.revenues || []} />
                      <BalanceAmount>

                        <Pagination
                          totalCount={revenueForwardingAgent?.total || 0}
                          perPage={paramsRevenueForwardingAgent.perPage || 8}
                          pageIndex={paramsRevenueForwardingAgent.page || 1}
                          onPageChange={handlePaginateRevenueForwardingAgent}
                        />
                        <p>
                          <span>Total</span>
                          <strong>{
                            new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                              .format(revenueForwardingAgent?.totalValueIntegralRevenues)}
                          </strong>
                        </p>
                      </BalanceAmount>
                    </>
                  )}
                </TabBootstrap>
                <TabBootstrap eventKey="CREDITO" title="Crédito">
                  <TitlePane>Entradas Futuras</TitlePane>
                  {!revenueCorresponding && (
                    <LoadingContainer>
                      <Loader type='Bars' color={theme.colors.primary} height={50} width={50} />
                    </LoadingContainer>
                  )}
                  {revenueCorresponding && (
                    <>
                      <TableFowardAgent revenues={revenueCorresponding?.revenues || []} />
                      <BalanceAmount>
                        <Pagination
                          totalCount={revenueCorresponding?.total || 0}
                          perPage={paramsRevenueCorresponding.perPage || 8}
                          pageIndex={paramsRevenueCorresponding.page || 1}
                          onPageChange={handlePaginateRevenueCorresponding}
                        />
                        <p>
                          <span>Total</span>
                          <strong>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(revenueCorresponding?.totalValueIntegralRevenues || 0)}</strong>
                        </p>
                      </BalanceAmount>
                    </>
                  )}


                </TabBootstrap>
              </Tabs>
            </AccountContainer>
          </Content>
        </Container>
      </Background>
    </FinancesLayout>
  );
};

export default FutureReceipts;
