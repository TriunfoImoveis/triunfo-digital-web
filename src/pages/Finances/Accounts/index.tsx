import React, { ChangeEvent, useCallback, useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Tab as TabBootstrap } from 'react-bootstrap';
import { SiOneplus } from 'react-icons/si';
import Switch from 'react-switch';
import { Form } from '@unform/web';
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
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import {
  filterMonth,
  filterTimeSlot,
  filterYear,
} from '../../../utils/filters';
import { useFilter } from '../../../context/FilterContext';
import { useFetch } from '../../../hooks/useFetch';
import Actions from './components/Actions'


interface AccountData {
  id: string;
  expense_type: string;
  description: string;
  due_date: string;
  value: string;
  pay_date: string | null;
  value_paid: string | null
  status: string;
  group: GroupsResponse;
  subsidiary: {
    id: string;
    name: string;
    city: string;
  }
  bank_data: {
    id: string;
    bank_name: string;
    account: string;
  }
  user: {
    id: string;
    name: string;
  }
}

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

interface GroupsResponse {
  id: string; 
  name: string;
}

interface Options {
  label: string;
  value: string;
}

const Account: React.FC = () => {
  const [typeTab, setTypeTab] = useState('fix');
  const [totalFixed, setTotalFixed] = useState('R$ 0,00');
  const [totalVariable, setTotalVariable] = useState('R$ 0,00');
  const [isTimeSlot, setIsTimeSlot] = useState(false);
  const [dateInitial, setDateInitial] = useState('');
  const [dateFinal, setDateFinal] = useState('');
  const [optionsGroup, setOptionsGroup] = useState<Options[]>([]);
  const { data: account } = useFetch<AccountData[]>('/expense');
  const {
    city, 
    handleSetCity, 
    handleSetMonth, 
    month, 
    year,
    handleSetYear,
    group,
    handleSetGroup
  } = useFilter();

  const loadGroupsAccount = useCallback(async () => {
    const response = await api.get<GroupsResponse[]>('/expense/groups');
    const options = response.data.map(item => ({ 
      label: item.name,
      value: item.id
    }));
    setOptionsGroup(options);
  }, []);

  const accountFixed = useCallback((account: AccountData[]): AccountProps[] => {
    const responseAccount = account
        .filter(item => {
          if (item.subsidiary.city === city) {
            return item;
          } else if (city === '') {
            return item
          }
          // eslint-disable-next-line
          return;
        })
        .filter(item => item.expense_type.includes('FIXA') && item)
        .filter(item => item.pay_date === null && item)
        .filter(item => {
          if (group === '') {
            // eslint-disable-next-line
            return item;
          }
          return item.group.id === group && item;
        });
      if (isTimeSlot && dateInitial.length !== 0) {
        const account = responseAccount.filter(item =>
          filterTimeSlot(item.due_date, dateInitial, dateFinal),
        );

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

        return dataFormated;
      } else if (month > 0) {
        const account = responseAccount
          .filter(item => filterMonth(item.due_date, month))
          .filter(item => filterYear(item.due_date, year));

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

        return dataFormated;
      } else {
        const account = responseAccount.filter(item =>
          filterYear(item.due_date, year),
        );

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
            city: item.subsidiary.name,
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

        return dataFormated;
      }
  }, [city, month, year, dateInitial, dateFinal, isTimeSlot, group]);

  const accountVariable = useCallback((account: AccountData[]): AccountProps[] => {
    const responseAccount = account
        .filter(item => {
          if (item.subsidiary.city === city) {
            return item;
          } else if (city === '') {
            return item
          }
          // eslint-disable-next-line
          return;
        })
        .filter(item => item.expense_type.includes('VARIAVEL') && item)
        .filter(item => item.pay_date === null && item)
        .filter(item => {
          if (group === '') {
            return item;
          }
          return item.group.id === group && item;
        });
      if (isTimeSlot && dateInitial.length !== 0) {
        const variable = responseAccount.filter(item =>
          filterTimeSlot(item.due_date, dateInitial, dateFinal),
        );

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
            city: item.subsidiary.name,
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

       return dataFormated;
      } else if (month > 0) {
        const variable = responseAccount
          .filter(item => filterMonth(item.due_date, month))
          .filter(item => filterYear(item.due_date, year));

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
            city: item.subsidiary.name,
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

        return dataFormated;
      } else {
        const variable = responseAccount.filter(item =>
          filterYear(item.due_date, year),
        );

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
            city: item.subsidiary.name,
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

        return dataFormated;
      }
  }, [city, month, year, dateInitial, dateFinal, isTimeSlot, group]);

  const listFixedExpense = useMemo(() => {
    if (!account) {
      return [];
    }

    return accountFixed(account);
  }, [account, accountFixed]);

  const listVariableExpense = useMemo(() => {
    if (!account) {
      return [];
    }

    return accountVariable(account);
  }, [account, accountVariable]);


  
  useEffect(() => {
    loadGroupsAccount();
  }, [loadGroupsAccount]);

  const toogleIsTimeSlot = useCallback(() => {
    setIsTimeSlot(!isTimeSlot);
  }, [isTimeSlot]);

  const handleSubmit = ({ date_initial, date_final }) => {
    setDateInitial(date_initial);
    setDateFinal(date_final);
  };

  const handleSetTab = (tabName: string | null) => {
    if (tabName) {
      setTypeTab(tabName);
    }
  };

  const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
    handleSetCity(event.target.value);
  };
  const handleSelectYear = (event: ChangeEvent<HTMLSelectElement>) => {
    handleSetYear(Number(event.target.value));
  };
  const handleSelectDate = (event: ChangeEvent<HTMLSelectElement>) => {
    handleSetMonth(Number(event.target.value));
  };

  const handleSelectGroup = (event: ChangeEvent<HTMLSelectElement>) => {
    handleSetGroup(event.target.value);
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
                    <option value="">Todas</option>
                    <option value="São Luís">São Luís</option>
                    <option value="Fortaleza">Fortaleza</option>
                    <option value="Teresina">Teresina</option>
                  </select>
                </FiltersBottonItems>
                {!isTimeSlot ? (
                  <>
                    <FiltersBottonItems>
                      <span>Ano: </span>
                      <select
                        disabled={isTimeSlot}
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
                        disabled={isTimeSlot}
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
                  </>
                ) : (
                  <FiltersBottonItems>
                    <Form onSubmit={handleSubmit}>
                      <Input name="date_initial" mask="date" type="date" />
                      <Input name="date_final" mask="date" type="date" />
                      <Button type="submit">Filtrar</Button>
                    </Form>
                  </FiltersBottonItems>
                )}
                <FiltersBottonItems>
                  <span>intervalo de tempo: </span>
                  <Switch onChange={toogleIsTimeSlot} checked={isTimeSlot} />
                </FiltersBottonItems>
              </FilterButtonGroup>
            </FiltersBotton>
          </FiltersContainer>
          <FiltersContainer>
            <FiltersBotton>
            <FiltersBottonItems>
                <span>Grupo: </span>
                <select
                  onChange={handleSelectGroup}
                  defaultValue={group}
                >
                  <option value="">Todos</option>
                  {optionsGroup.map(option => (
                    <option value={option.value}>{option.label}</option>
                  ))}

                </select>
              </FiltersBottonItems>
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
                <TabBootstrap eventKey="fix" title="Contas Fixas">
                  <TitlePane>Contas Fixas</TitlePane>
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
                      {listFixedExpense.length === 0 ? (
                        <NotFound />
                      ) : (
                        <>
                          {listFixedExpense.map(item => (
                            <tr key={item.id}>
                              <td>{item.city}</td>
                              <td>{item.description}</td>
                              <td>{item.due_date}</td>
                              <td>{item.group}</td>
                              <td>{item.valueBRL}</td>
                              <td className={item.status}>{item.status}</td>
                              <td>
                                <Actions item={item} />
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
                      {listVariableExpense.length === 0 ? (
                        <NotFound />
                      ): 
                      (
                        <>
                          {listVariableExpense.map(item => (
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
                        </>
                      )}
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
