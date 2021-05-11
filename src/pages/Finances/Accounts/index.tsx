import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Tab as TabBootstrap } from 'react-bootstrap';
import { SiOneplus } from 'react-icons/si';
import Switch from 'react-switch';
import { getMonth, getYear, isToday, parseISO } from 'date-fns';
import NotFound from '../../../components/Errors/NotFound';

import FinancesLayout from '../../Layouts/FinancesLayout';
import {
  Container,
  Header,
  Background,
  Content,
  Footer,
  ButtonGroup,
  FiltersContainer,
  FilterButtonGroup,
  FiltersBottonItems,
  FiltersBotton,
  AccountContainer,
  BalanceAmount,
  Table,
  TitlePane,
} from './styles';
import api from '../../../services/api';
import { DateBRL } from '../../../utils/format';
import { money } from '../../../utils/masked';

type AccountProps = {
  id: string;
  expense_type: string;
  due_date: string;
  description: string;
  value: number;
  valueBRL: string;
  status: string;
  city: string;
  group: string;
};

const Account: React.FC = () => {
  const [typeTab, setTypeTab] = useState('fix');
  const [city, setCity] = useState('São Luís');
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(2021);
  const [checked, setChecked] = useState(true);
  const [totalFixed, setTotalFixed] = useState('R$ 0,00');
  const [totalVariable, setTotalVariable] = useState('R$ 0,00');
  const [accountDataFixed, setAccountDataFixed] = useState<AccountProps[]>([]);
  const [accountDataVariable, setAccountDataVariable] = useState<
    AccountProps[]
  >([]);

  useEffect(() => {
    const loadingAccountFixed = async () => {
      const response = await api.get(`/expense`);
      if (checked) {
        const account = response.data
          .filter(item => item.subsidiary.city === city && item)
          .filter(item => item.expense_type.includes('FIXA') && item)
          .filter(item => item.pay_date === null && item)
          .filter(item => {
            const parsedDate = parseISO(item.due_date);
            const today = isToday(parsedDate);
            if (!today) {
              // eslint-disable-next-line
              return;
            }
            return item;
          });

        const data = account;
        const dataFormated = data.map(item => {
          return {
            id: item.id,
            expense_type: item.expense_type,
            due_date: DateBRL(item.due_date),
            description: item.description,
            value: Number(item.value),
            valueBRL: money(Number(item.value)),
            status: item.status,
            city: item.subsidiary.city,
            group: item.group.name,
          };
        });
        if (data.length > 0) {
          const arrayValues = dataFormated.map(item => item.value);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          const total = arrayValues.reduce(reducer);
          setTotalFixed(money(total));
        } else {
          setTotalFixed(money(0));
        }

        setAccountDataFixed(dataFormated);
      } else if (month > 0) {
        const account = response.data
          .filter(item => item.subsidiary.city === city && item)
          .filter(item => item.expense_type.includes('FIXA') && item)
          .filter(item => item.pay_date === null && item)
          .filter(item => {
            const parsedDate = parseISO(item.due_date);
            const monthDateSale = getMonth(parsedDate) + 1;
            if (!(monthDateSale === month)) {
              // eslint-disable-next-line
              return;
            }
            return item;
          })
          .filter(item => {
            const parsedDate = parseISO(item.due_date);
            const newYear = getYear(parsedDate);
            if (!(newYear === year)) {
              // eslint-disable-next-line
              return;
            }
            return item;
          });

        const data = account;

        const dataFormated = data.map(item => {
          return {
            id: item.id,
            expense_type: item.expense_type,
            due_date: DateBRL(item.due_date),
            description: item.description,
            value: Number(item.value),
            valueBRL: money(Number(item.value)),
            status: item.status,
            city: item.subsidiary.city,
            group: item.group.name,
          };
        });
        if (data.length > 0) {
          const arrayValues = dataFormated.map(item => item.value);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          const total = arrayValues.reduce(reducer);
          setTotalFixed(money(total));
        } else {
          setTotalFixed(money(0));
        }

        setAccountDataFixed(dataFormated);
      } else {
        const account = response.data
          .filter(item => item.subsidiary.city === city && item)
          .filter(item => item.expense_type.includes('FIXA') && item)
          .filter(item => item.pay_date === null && item)
          .filter(item => {
            const parsedDate = parseISO(item.due_date);
            const newYear = getYear(parsedDate);
            if (!(newYear === year)) {
              // eslint-disable-next-line
            return;
            }
            return item;
          });

        const data = account;

        const dataFormated = data.map(item => {
          return {
            id: item.id,
            expense_type: item.expense_type,
            due_date: DateBRL(item.due_date),
            description: item.description,
            value: Number(item.value),
            valueBRL: money(Number(item.value)),
            status: item.status,
            city: item.subsidiary.city,
            group: item.group.name,
          };
        });
        if (data.length > 0) {
          const arrayValues = dataFormated.map(item => item.value);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          const total = arrayValues.reduce(reducer);
          setTotalFixed(money(total));
        } else {
          setTotalFixed(money(0));
        }

        setAccountDataFixed(dataFormated);
      }
    };
    loadingAccountFixed();
  }, [city, month, checked, year]);
  useEffect(() => {
    const loadingAccountVariable = async () => {
      const response = await api.get(`/expense`);
      if (checked) {
        const variable = response.data
          .filter(item => item.subsidiary.city === city && item)
          .filter(item => item.expense_type.includes('VARIAVEL') && item)
          .filter(item => item.pay_date === null && item)
          .filter(item => {
            const parsedDate = parseISO(item.due_date);
            const today = isToday(parsedDate);
            if (!today) {
              // eslint-disable-next-line
              return;
            }
            return item;
          });

        const data = variable;
        const dataFormated = data.map(item => {
          return {
            id: item.id,
            expense_type: item.expense_type,
            due_date: DateBRL(item.due_date),
            description: item.description,
            value: Number(item.value),
            valueBRL: money(Number(item.value)),
            status: item.status,
            city: item.subsidiary.city,
            group: item.group.name,
          };
        });
        if (data.length > 0) {
          const arrayValues = dataFormated.map(item => item.value);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          const total = arrayValues.reduce(reducer);
          setTotalVariable(money(total));
        } else {
          setTotalVariable(money(0));
        }

        setAccountDataVariable(dataFormated);
      } else if (month > 0) {
        const variable = response.data
          .filter(item => item.subsidiary.city === city && item)
          .filter(item => item.expense_type.includes('VARIAVEL') && item)
          .filter(item => item.pay_date === null && item)
          .filter(item => {
            const parsedDate = parseISO(item.due_date);
            const monthDateSale = getMonth(parsedDate) + 1;
            if (!(monthDateSale === month)) {
              // eslint-disable-next-line
              return;
            }
            return item;
          })
          .filter(item => {
            const parsedDate = parseISO(item.due_date);
            const newYear = getYear(parsedDate);
            if (!(newYear === year)) {
              // eslint-disable-next-line
              return;
            }
            return item;
          });

        const data = variable;

        const dataFormated = data.map(item => {
          return {
            id: item.id,
            expense_type: item.expense_type,
            due_date: DateBRL(item.due_date),
            description: item.description,
            value: Number(item.value),
            valueBRL: money(Number(item.value)),
            status: item.status,
            city: item.subsidiary.city,
            group: item.group.name,
          };
        });
        if (data.length > 0) {
          const arrayValues = dataFormated.map(item => item.value);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          const total = arrayValues.reduce(reducer);
          setTotalFixed(money(total));
        } else {
          setTotalFixed(money(0));
        }

        setAccountDataVariable(dataFormated);
      } else {
        const variable = response.data
          .filter(item => item.subsidiary.city === city && item)
          .filter(item => item.expense_type.includes('VARIAVEL') && item)
          .filter(item => item.pay_date === null && item)
          .filter(item => {
            const parsedDate = parseISO(item.due_date);
            const newYear = getYear(parsedDate);
            if (!(newYear === year)) {
              // eslint-disable-next-line
            return;
            }
            return item;
          });

        const data = variable;

        const dataFormated = data.map(item => {
          return {
            id: item.id,
            expense_type: item.expense_type,
            due_date: DateBRL(item.due_date),
            description: item.description,
            value: Number(item.value),
            valueBRL: money(Number(item.value)),
            status: item.status,
            city: item.subsidiary.city,
            group: item.group.name,
          };
        });
        if (data.length > 0) {
          const arrayValues = dataFormated.map(item => item.value);
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          const total = arrayValues.reduce(reducer);
          setTotalVariable(money(total));
        } else {
          setTotalVariable(money(0));
        }

        setAccountDataVariable(dataFormated);
      }
    };
    loadingAccountVariable();
  }, [city, month, checked, year]);

  const handleSetTab = (tabName: string | null) => {
    if (tabName) {
      setTypeTab(tabName);
    }
  };

  const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
    setCity(event.target.value);
  };
  const handleSelectYear = (event: ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(event.target.value));
  };
  const handleSelectDate = (event: ChangeEvent<HTMLSelectElement>) => {
    setMonth(Number(event.target.value));
  };

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <FinancesLayout>
      <Background>
        <Container>
          <Header>
            <h1>Contas</h1>
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
                  <span>Ano: </span>
                  <select
                    disabled={checked}
                    defaultValue={year}
                    onChange={handleSelectYear}
                  >
                    <option value={2021}>2021</option>
                    <option value={2022}>2022</option>
                    <option value={2023}>2023</option>
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
                <TabBootstrap eventKey="fix" title="Contas Fiquísas">
                  <TitlePane>Contas Fiquísas</TitlePane>
                  <Table cols={7}>
                    <thead>
                      <tr>
                        <th>Filial</th>
                        <th>Descrição</th>
                        <th>Vencimento</th>
                        <th>Grupo</th>
                        <th>Valor</th>
                        <th>Status</th>
                        <th>Detalhes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accountDataFixed.length === 0 ? (
                        <NotFound />
                      ) : (
                        <>
                          {accountDataFixed.map(item => (
                            <tr key={item.id}>
                              <td>{item.city}</td>
                              <td>{item.description}</td>
                              <td>{item.due_date}</td>
                              <td>{item.group}</td>
                              <td>{item.valueBRL}</td>
                              <td className={item.status}>{item.status}</td>
                              <td>
                                <a
                                  href={`/financeiro/detalhes-conta/${item.id}`}
                                >
                                  mais detalhes
                                </a>
                              </td>
                            </tr>
                          ))}
                        </>
                      )}
                    </tbody>
                  </Table>
                  <BalanceAmount>
                    <p>
                      <span>Total</span>
                      <strong>{totalFixed}</strong>
                    </p>
                  </BalanceAmount>
                </TabBootstrap>
                <TabBootstrap eventKey="variable" title="Contas Variáveis">
                  <TitlePane>Contas Variáveis</TitlePane>
                  <Table cols={7}>
                    <thead>
                      <tr>
                        <th>Filial</th>
                        <th>Descrição</th>
                        <th>Vencimento</th>
                        <th>Grupo</th>
                        <th>Valor</th>
                        <th>Status</th>
                        <th>Detalhes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {accountDataVariable.map(item => (
                        <tr key={item.id}>
                          <td>{item.city}</td>
                          <td>{item.description}</td>
                          <td>{item.due_date}</td>
                          <td>{item.group}</td>
                          <td>{item.valueBRL}</td>
                          <td className={item.status}>{item.status}</td>
                          <td>
                            <a href={`/financeiro/detalhes-conta/${item.id}`}>
                              mais detalhes
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  <BalanceAmount>
                    <p>
                      <span>Total</span>
                      <strong>{totalVariable}</strong>
                    </p>
                  </BalanceAmount>
                </TabBootstrap>
              </Tabs>
            </AccountContainer>
          </Content>
          <Footer>
            <ButtonGroup>
              <Link to="/financeiro/adicionanovaconta">
                <SiOneplus />
                <span>Adiconar nova conta</span>
              </Link>
            </ButtonGroup>
          </Footer>
        </Container>
      </Background>
    </FinancesLayout>
  );
};

export default Account;
