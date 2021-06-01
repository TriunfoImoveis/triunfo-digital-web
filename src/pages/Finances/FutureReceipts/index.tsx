import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Tabs, Tab as TabBootstrap } from 'react-bootstrap';
import { AiOutlinePlus } from 'react-icons/ai';
import Switch from 'react-switch';

import { Link } from 'react-router-dom';
import api from '../../../services/api';
import { DateBRL } from '../../../utils/format';
import { money } from '../../../utils/masked';
import FinancesLayout from '../../Layouts/FinancesLayout';

import DetailsInstalments from '../../../components/ReactModal/DetailsInstalments';
import {
  Container,
  Background,
  Header,
  Content,
  AccountContainer,
  TitlePane,
  Table,
  BalanceAmount,
  FiltersContainer,
  FiltersBotton,
  FilterButtonGroup,
  FiltersBottonItems,
} from './styles';
import NotFound from '../../../components/Errors/NotFound';
import EntryRevenue from '../../../components/ReactModal/EntryRevenue';
import { filterDay, filterMonth } from '../../../utils/filters';

type FutureReceiptsType = {
  id: string;
  sale_id?: string;
  pay_date?: string;
  due_date?: string;
  description: string;
  value: number;
  valueBRL: string;
  status: string;
  city: string;
  realtors: string;
  sale_type: string;
};
type RevenueType = {
  id: string;
  revenue_type: string;
  due_date: string;
  description: string;
  value: number;
  tax_rate: number;
  invoice_value: number;
  invoiceValueBRL: string;
  valueBRL: string;
  status: string;
  city: string;
  cliente_name: string;
};
const FutureReceipts: React.FC = () => {
  const [typeTab, setTypeTab] = useState('RECEBIDO');
  const [modalDetails, setModalDetails] = useState(false);
  const [modalEntryRevenue, setModalEntryRevenue] = useState(false);
  const [city, setCity] = useState('São Luís');
  const [total, setTotal] = useState('R$ 0,00');
  const [totalRecepient, setTotalRecepient] = useState('R$ 0,00');
  const [totalDespachante, setTotalDespachante] = useState('R$ 0,00');
  const [totalCredit, setTotalCredit] = useState('R$ 0,00');
  const [future, setFuture] = useState<FutureReceiptsType[]>([]);
  const [futureRecepient, setFutureRecepient] = useState<FutureReceiptsType[]>(
    [],
  );
  const [futureDespachante, setFutureDespachante] = useState<RevenueType[]>([]);
  const [futureCredit, setFutureCredit] = useState<RevenueType[]>([]);
  const [selectedInstallment, setSelectedInstalment] = useState(
    {} as FutureReceiptsType,
  );
  const [selectedRevenue, setSelectedRevenue] = useState({} as RevenueType);
  const [month, setMonth] = useState(0);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const loadingFutureReceipts = async () => {
      const response = await api.get(`/installment?city=${city}`);
      const recipientsPay = response.data.filter(
        item => item.status === 'PAGO',
      );

      if (checked) {
        const futureReceipt = recipientsPay.filter(item =>
          filterDay(item.pay_date),
        );
        const dataFormated = futureReceipt.map(item => {
          return {
            id: item.id,
            pay_date: DateBRL(item.pay_date),
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
            sale_type: item.sale.sale_type,
          };
        });
        if (futureReceipt.length > 0) {
          const arrayValues = dataFormated.map(item => item.value);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          const total = arrayValues.reduce(reducer);
          setTotalRecepient(money(total));
        } else {
          setTotalRecepient(money(0));
        }
        setFutureRecepient(dataFormated);
      } else if (month > 0) {
        const futureReceipt = recipientsPay.filter(item =>
          filterMonth(item.pay_date, month),
        );

        const dataFormated = futureReceipt.map(item => {
          return {
            id: item.id,
            pay_date: DateBRL(item.pay_date),
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
            sale_type: item.sale.sale_type,
          };
        });
        if (futureReceipt.length > 0) {
          const arrayValues = dataFormated.map(item => item.value);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          const total = arrayValues.reduce(reducer);
          setTotalRecepient(money(total));
        } else {
          setTotalRecepient(money(0));
        }

        setFutureRecepient(dataFormated);
      } else {
        const dataFormated = recipientsPay.map(item => {
          return {
            id: item.id,
            pay_date: DateBRL(item.pay_date),
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
            sale_type: item.sale.sale_type,
          };
        });
        if (recipientsPay.length > 0) {
          const arrayValues = dataFormated.map(item => item.value);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          const total = arrayValues.reduce(reducer);
          setTotalRecepient(money(total));
        } else {
          setTotalRecepient(money(0));
        }
        setFutureRecepient(dataFormated);
      }
    };
    loadingFutureReceipts();
  }, [city, month, checked]);
  useEffect(() => {
    const loadingFutureReceipts = async () => {
      const response = await api.get(`/installment?city=${city}`);
      if (checked) {
        const futureReceiptsPending = response.data
          .filter(item => item.status.includes('PENDENTE') && item)
          .filter(item => filterDay(item.due_date));
        const futureReceiptsExpired = response.data
          .filter(item => item.status.includes('VENCIDO') && item)
          .filter(item => filterDay(item.due_date));

        const data = [...futureReceiptsPending, ...futureReceiptsExpired];

        const dataFormated = data.map(item => {
          return {
            id: item.id,
            sale_id: item.sale.id,
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
            sale_type: item.sale.sale_type,
          };
        });
        if (data.length > 0) {
          const arrayValues = dataFormated.map(item => item.value);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          const total = arrayValues.reduce(reducer);
          setTotal(money(total));
        } else {
          setTotal(money(0));
        }

        setFuture(dataFormated);
      } else if (month > 0) {
        const futureReceiptsPending = response.data
          .filter(item => item.status.includes('PENDENTE') && item)
          .filter(item => filterMonth(item.due_date, month));
        const futureReceiptsExpired = response.data
          .filter(item => item.status.includes('VENCIDO') && item)
          .filter(item => filterMonth(item.due_date, month));

        const data = [...futureReceiptsPending, ...futureReceiptsExpired];

        const dataFormated = data.map(item => {
          return {
            id: item.id,
            sale_id: item.sale.id,
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
            sale_type: item.sale.sale_type,
          };
        });
        if (data.length > 0) {
          const arrayValues = dataFormated.map(item => item.value);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          const total = arrayValues.reduce(reducer);
          setTotal(money(total));
        } else {
          setTotal(money(0));
        }

        setFuture(dataFormated);
      } else {
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
            sale_id: item.sale.id,
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
            sale_type: item.sale.sale_type,
          };
        });
        if (data.length > 0) {
          const arrayValues = dataFormated.map(item => item.value);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          const total = arrayValues.reduce(reducer);
          setTotal(money(total));
        } else {
          setTotal(money(0));
        }

        setFuture(dataFormated);
      }
    };
    loadingFutureReceipts();
  }, [city, month, checked]);
  useEffect(() => {
    const loadingFutureReceiptsDespachante = async () => {
      const response = await api.get(`/revenue`);
      if (checked) {
        const futureReceiptsPending = response.data
          .filter(item => item.revenue_type.includes('DESPACHANTE') && item)
          .filter(item => item.status.includes('PENDENTE') && item)
          .filter(item => item.subsidiary.city === city && item)
          .filter(item => filterDay(item.due_date));
        const futureReceiptsExpired = response.data
          .filter(item => item.revenue_type.includes('DESPACHANTE') && item)
          .filter(item => item.status.includes('VENCIDO') && item)
          .filter(item => item.subsidiary.city === city && item)
          .filter(item => filterDay(item.due_date));

        const data = [...futureReceiptsPending, ...futureReceiptsExpired];

        const dataFormated = data.map(item => {
          return {
            id: item.id,
            revenue_type: item.revenue_type,
            due_date: DateBRL(item.due_date),
            description: item.description,
            cliente_name: item.client,
            value: Number(item.value_integral),
            valueBRL: money(Number(item.value_integral)),
            tax_rate: item.tax_rate,
            invoice_value: Number(item.invoice_value),
            invoiceValueBRL: money(Number(item.invoice_value)),
            status: item.status,
            city: item.subsidiary.city,
          };
        });
        if (data.length > 0) {
          const arrayValues = dataFormated.map(item => item.value);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          const total = arrayValues.reduce(reducer);
          setTotalDespachante(money(total));
        } else {
          setTotalDespachante(money(0));
        }

        setFutureDespachante(dataFormated);
      } else if (month > 0) {
        const futureReceiptsPending = response.data
          .filter(item => item.revenue_type.includes('DESPACHANTE') && item)
          .filter(item => item.status.includes('PENDENTE') && item)
          .filter(item => item.subsidiary.city === city && item)
          .filter(item => filterMonth(item.due_date, month));
        const futureReceiptsExpired = response.data
          .filter(item => item.revenue_type.includes('DESPACHANTE') && item)
          .filter(item => item.status.includes('VENCIDO') && item)
          .filter(item => item.subsidiary.city === city && item)
          .filter(item => filterMonth(item.due_date, month));

        const data = [...futureReceiptsPending, ...futureReceiptsExpired];

        const dataFormated = data.map(item => {
          return {
            id: item.id,
            revenue_type: item.revenue_type,
            due_date: DateBRL(item.due_date),
            description: item.description,
            cliente_name: item.client,
            value: Number(item.value_integral),
            valueBRL: money(Number(item.value_integral)),
            tax_rate: item.tax_rate,
            invoice_value: Number(item.invoice_value),
            invoiceValueBRL: money(Number(item.invoice_value)),
            status: item.status,
            city: item.subsidiary.city,
          };
        });
        if (data.length > 0) {
          const arrayValues = dataFormated.map(item => item.value);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          const total = arrayValues.reduce(reducer);
          setTotalDespachante(money(total));
        } else {
          setTotalDespachante(money(0));
        }

        setFutureDespachante(dataFormated);
      } else {
        const futureReceiptsPending = response.data
          .filter(item => item.revenue_type.includes('DESPACHANTE') && item)
          .filter(item => item.status.includes('PENDENTE') && item)
          .filter(item => item.subsidiary.city === city && item);
        const futureReceiptsExpired = response.data
          .filter(item => item.revenue_type.includes('DESPACHANTE') && item)
          .filter(item => item.status.includes('VENCIDO') && item)
          .filter(item => item.subsidiary.city === city && item);

        const data = [...futureReceiptsPending, ...futureReceiptsExpired];

        const dataFormated = data.map(item => {
          return {
            id: item.id,
            revenue_type: item.revenue_type,
            due_date: DateBRL(item.due_date),
            description: item.description,
            cliente_name: item.client,
            value: Number(item.value_integral),
            valueBRL: money(Number(item.value_integral)),
            tax_rate: item.tax_rate,
            invoice_value: Number(item.invoice_value),
            invoiceValueBRL: money(Number(item.invoice_value)),
            status: item.status,
            city: item.subsidiary.city,
          };
        });
        if (data.length > 0) {
          const arrayValues = dataFormated.map(item => item.value);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          const total = arrayValues.reduce(reducer);
          setTotalDespachante(money(total));
        } else {
          setTotalDespachante(money(0));
        }

        setFutureDespachante(dataFormated);
      }
    };
    loadingFutureReceiptsDespachante();
  }, [city, month, checked]);
  useEffect(() => {
    const loadingFutureReceiptsCredit = async () => {
      const response = await api.get(`/revenue`);
      if (checked) {
        const futureReceiptsPending = response.data
          .filter(item => item.revenue_type.includes('CREDITO') && item)
          .filter(item => item.status.includes('PENDENTE') && item)
          .filter(item => item.subsidiary.city === city && item)
          .filter(item => filterDay(item.due_date));
        const futureReceiptsExpired = response.data
          .filter(item => item.revenue_type.includes('CREDITO') && item)
          .filter(item => item.status.includes('VENCIDO') && item)
          .filter(item => item.subsidiary.city === city && item)
          .filter(item => filterDay(item.due_date));

        const data = [...futureReceiptsPending, ...futureReceiptsExpired];

        const dataFormated = data.map(item => {
          return {
            id: item.id,
            revenue_type: item.revenue_type,
            due_date: DateBRL(item.due_date),
            description: item.description,
            cliente_name: item.client,
            value: Number(item.value_integral),
            valueBRL: money(Number(item.value_integral)),
            tax_rate: item.tax_rate,
            invoice_value: Number(item.invoice_value),
            invoiceValueBRL: money(Number(item.invoice_value)),
            status: item.status,
            city: item.subsidiary.city,
          };
        });
        if (data.length > 0) {
          const arrayValues = dataFormated.map(item => item.value);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          const total = arrayValues.reduce(reducer);
          setTotalCredit(money(total));
        } else {
          setTotalCredit(money(0));
        }

        setFutureCredit(dataFormated);
      } else if (month > 0) {
        const futureReceiptsPending = response.data
          .filter(item => item.revenue_type.includes('CREDITO') && item)
          .filter(item => item.status.includes('PENDENTE') && item)
          .filter(item => item.subsidiary.city === city && item)
          .filter(item => filterMonth(item.due_date, month));
        const futureReceiptsExpired = response.data
          .filter(item => item.revenue_type.includes('CREDITO') && item)
          .filter(item => item.status.includes('VENCIDO') && item)
          .filter(item => item.subsidiary.city === city && item)
          .filter(item => filterMonth(item.due_date, month));

        const data = [...futureReceiptsPending, ...futureReceiptsExpired];

        const dataFormated = data.map(item => {
          return {
            id: item.id,
            revenue_type: item.revenue_type,
            due_date: DateBRL(item.due_date),
            description: item.description,
            cliente_name: item.client,
            value: Number(item.value_integral),
            valueBRL: money(Number(item.value_integral)),
            tax_rate: item.tax_rate,
            invoice_value: Number(item.invoice_value),
            invoiceValueBRL: money(Number(item.invoice_value)),
            status: item.status,
            city: item.subsidiary.city,
          };
        });
        if (data.length > 0) {
          const arrayValues = dataFormated.map(item => item.value);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          const total = arrayValues.reduce(reducer);
          setTotalCredit(money(total));
        } else {
          setTotalCredit(money(0));
        }

        setFutureCredit(dataFormated);
      } else {
        const futureReceiptsPending = response.data
          .filter(item => item.revenue_type.includes('CREDITO') && item)
          .filter(item => item.status.includes('PENDENTE') && item)
          .filter(item => item.subsidiary.city === city && item);
        const futureReceiptsExpired = response.data
          .filter(item => item.revenue_type.includes('CREDITO') && item)
          .filter(item => item.status.includes('VENCIDO') && item)
          .filter(item => item.subsidiary.city === city && item);

        const data = [...futureReceiptsPending, ...futureReceiptsExpired];

        const dataFormated = data.map(item => {
          return {
            id: item.id,
            revenue_type: item.revenue_type,
            due_date: DateBRL(item.due_date),
            description: item.description,
            cliente_name: item.client,
            value: Number(item.value_integral),
            valueBRL: money(Number(item.value_integral)),
            tax_rate: item.tax_rate,
            invoice_value: Number(item.invoice_value),
            invoiceValueBRL: money(Number(item.invoice_value)),
            status: item.status,
            city: item.subsidiary.city,
          };
        });
        if (data.length > 0) {
          const arrayValues = dataFormated.map(item => item.value);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          const total = arrayValues.reduce(reducer);
          setTotalCredit(money(total));
        } else {
          setTotalCredit(money(0));
        }

        setFutureCredit(dataFormated);
      }
    };
    loadingFutureReceiptsCredit();
  }, [city, month, checked]);
  const handleSetTab = (tabName: string | null) => {
    if (tabName) {
      setTypeTab(tabName);
    }
  };

  const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
    setCity(event.target.value);
  };
  const handleSelectDate = (event: ChangeEvent<HTMLSelectElement>) => {
    setMonth(Number(event.target.value));
  };
  const toogleModalSaleDetails = useCallback(() => {
    setModalDetails(!modalDetails);
  }, [modalDetails]);
  const toogleModalEntryRevenue = useCallback(() => {
    setModalEntryRevenue(!modalEntryRevenue);
  }, [modalEntryRevenue]);

  const handleOpenModal = useCallback(
    (item: FutureReceiptsType) => {
      setSelectedInstalment(item);
      toogleModalSaleDetails();
    },
    [toogleModalSaleDetails],
  );
  const handleOpenModalEntryRevenue = useCallback(
    (item: RevenueType) => {
      setSelectedRevenue(item);
      toogleModalEntryRevenue();
    },
    [toogleModalEntryRevenue],
  );

  const handleChange = () => {
    setChecked(!checked);
  };
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
                  <span>Cidade: </span>
                  <select defaultValue={city} onChange={handleSelectCity}>
                    <option value="São Luís">São Luís</option>
                    <option value="Fortaleza">Fortaleza</option>
                    <option value="Teresina">Teresina</option>
                  </select>
                </FiltersBottonItems>

                <FiltersBottonItems>
                  <span>Mês: </span>
                  <select
                    defaultValue={month}
                    onChange={handleSelectDate}
                    disabled={checked}
                  >
                    <option value={0}>Todas</option>
                    <option value={1}>Janeiro</option>
                    <option value={2}>Fevereiro</option>
                    <option value={3}>Março</option>
                    <option value={4}>Abril</option>
                    <option value={5}>Maio</option>
                    <option value={6}>Junho</option>
                    <option value={7}>Julho</option>
                    <option value={8}>Agosto</option>
                    <option value={9}>Setembro</option>
                    <option value={10}>Outubro</option>
                    <option value={11}>Novembro</option>
                    <option value={12}>Dezembro</option>
                  </select>
                </FiltersBottonItems>
                <FiltersBottonItems>
                  <span>Dia: </span>
                  <Switch onChange={handleChange} checked={checked} />
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
                  <Table cols={6}>
                    <thead>
                      <tr>
                        <th>Filial</th>
                        <th>Vencimento</th>
                        <th>Descrição</th>
                        <th>Valor Bruto</th>
                        <th>Corretor</th>
                        <th>Detalhes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {future.length === 0 ? (
                        <NotFound />
                      ) : (
                        future.map(item => (
                          <>
                            <tr key={item.id}>
                              <td>{item.city}</td>
                              <td>{item.due_date}</td>
                              <td>{item.description}</td>
                              <td>{item.valueBRL}</td>
                              <td>{item.realtors}</td>
                              <td>
                                <Link
                                  to={`/adm/detalhes-vendas/${item.sale_id}`}
                                >
                                  Ver detalhes
                                </Link>
                              </td>
                            </tr>
                          </>
                        ))
                      )}
                    </tbody>
                  </Table>
                  <BalanceAmount>
                    <p>
                      <span>Total</span>
                      <strong>{total}</strong>
                    </p>
                  </BalanceAmount>
                </TabBootstrap>
                <TabBootstrap eventKey="RECEBIDO" title="Vendas | Recebidos">
                  <TitlePane>Entradas Futuras</TitlePane>
                  <Table cols={7}>
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
                      {futureRecepient.length === 0 ? (
                        <NotFound />
                      ) : (
                        futureRecepient.map(item => (
                          <>
                            <tr key={item.id}>
                              <td>{item.city}</td>
                              <td>{item.pay_date}</td>
                              <td>{item.description}</td>
                              <td>{item.valueBRL}</td>
                              <td>{item.realtors}</td>
                              <td className={item.status}>{item.status}</td>
                              <td>
                                <button
                                  type="button"
                                  className="details"
                                  onClick={() => handleOpenModal(item)}
                                >
                                  <AiOutlinePlus color="#C32925" />
                                </button>
                              </td>
                            </tr>
                          </>
                        ))
                      )}
                    </tbody>
                  </Table>
                  <BalanceAmount>
                    <p>
                      <span>Total</span>
                      <strong>{totalRecepient}</strong>
                    </p>
                  </BalanceAmount>
                </TabBootstrap>
                <TabBootstrap eventKey="DESPACHANTE" title="Despachante">
                  <TitlePane>Entradas Futuras</TitlePane>
                  <Table cols={7}>
                    <thead>
                      <tr>
                        <th>Filial</th>
                        <th>Vencimento</th>
                        <th>Descrição</th>
                        <th>Cliente</th>
                        <th>Valor</th>
                        <th>Status</th>
                        <th>Detalhes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {futureDespachante.length === 0 ? (
                        <NotFound />
                      ) : (
                        futureDespachante.map(item => (
                          <>
                            <tr key={item.id}>
                              <td>{item.city}</td>
                              <td>{item.due_date}</td>
                              <td>{item.description}</td>
                              <td>{item.cliente_name || '-------'}</td>
                              <td>{item.valueBRL}</td>
                              <td className={item.status}>{item.status}</td>
                              <td>
                                <button
                                  type="button"
                                  className="details"
                                  onClick={() =>
                                    handleOpenModalEntryRevenue(item)
                                  }
                                >
                                  <AiOutlinePlus color="#C32925" />
                                </button>
                              </td>
                            </tr>
                          </>
                        ))
                      )}
                    </tbody>
                  </Table>
                  <BalanceAmount>
                    <p>
                      <span>Total</span>
                      <strong>{totalDespachante}</strong>
                    </p>
                  </BalanceAmount>
                </TabBootstrap>
                <TabBootstrap eventKey="CREDITO" title="Crédito">
                  <TitlePane>Entradas Futuras</TitlePane>
                  <Table cols={7}>
                    <thead>
                      <tr>
                        <th>Filial</th>
                        <th>Vencimento</th>
                        <th>Descrição</th>
                        <th>Cliente</th>
                        <th>Valor</th>
                        <th>Status</th>
                        <th>Detalhes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {futureCredit.length === 0 ? (
                        <NotFound />
                      ) : (
                        futureCredit.map(item => (
                          <>
                            <tr key={item.id}>
                              <td>{item.city}</td>
                              <td>{item.due_date}</td>
                              <td>{item.description}</td>
                              <td>{item.cliente_name || '-------'}</td>
                              <td>{item.valueBRL}</td>
                              <td className={item.status}>{item.status}</td>
                              <td>
                                <button
                                  type="button"
                                  className="details"
                                  onClick={() =>
                                    handleOpenModalEntryRevenue(item)
                                  }
                                >
                                  <AiOutlinePlus color="#C32925" />
                                </button>
                              </td>
                            </tr>
                          </>
                        ))
                      )}
                    </tbody>
                  </Table>
                  <BalanceAmount>
                    <p>
                      <span>Total</span>
                      <strong>{totalCredit}</strong>
                    </p>
                  </BalanceAmount>
                </TabBootstrap>
              </Tabs>
            </AccountContainer>
          </Content>
        </Container>
      </Background>
      <DetailsInstalments
        isOpen={modalDetails}
        setIsOpen={toogleModalSaleDetails}
        installment={selectedInstallment}
      />
      <EntryRevenue
        isOpen={modalEntryRevenue}
        setIsOpen={toogleModalEntryRevenue}
        revenue={selectedRevenue}
      />
    </FinancesLayout>
  );
};

export default FutureReceipts;
