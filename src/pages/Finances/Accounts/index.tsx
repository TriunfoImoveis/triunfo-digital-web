import React, { ChangeEvent, useCallback, useEffect, useState, useMemo } from 'react';
import { Tabs, Tab as TabBootstrap } from 'react-bootstrap';
import { SiOneplus } from 'react-icons/si';
import Switch from 'react-switch';
import { Form } from '@unform/web';

import FinancesLayout from '../../Layouts/FinancesLayout';
import ModalAddAccount from '../../../components/ReactModal/AddAccount';

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
import TableFix from '../../../components/Table/TableAccount';
import { toast } from 'react-toastify';


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
  const [optionsSubsidiary, setOptionsSubsidiary] = useState<Options[]>([]);
  const [selectedsEntry, setSelectedsEntry] = useState<String[]>([]);
  const { data: account } = useFetch<AccountData[]>('/expense');
  const {
    handleSetMonth, 
    month, 
    year,
    handleSetYear,
    group,
    handleSetGroup,
    subsidiary,
    handleSetSubsidiary
  } = useFilter();

  const [modalAddAccount, setAddAccount] = useState(false);

  const orderByAsc = useCallback(function (a: AccountData, b: AccountData) {
    let data1 = new Date(a.due_date);
    let data2 = new Date(b.due_date);
    return data1 > data2 ? 0 : -1;
  }, []);
  const toogleAddAccount = useCallback(() => {
    setAddAccount(prevState => !prevState);
  }, []);

  const loadGroupsAccount = useCallback(async () => {
    const response = await api.get<GroupsResponse[]>('/expense/groups');
    const options = response.data.map(item => ({ 
      label: item.name,
      value: item.id
    }));
    setOptionsGroup(options);
  }, []);

  const loadSubsidiary = useCallback(async () => {
    const response = await api.get('/subsidiary');
    const options = response.data.map(item => ({ 
      label: item.name,
      value: item.name
    }));
    setOptionsSubsidiary(options);
  }, []);

  const accountFixed = useCallback((account: AccountData[]): AccountProps[] => {
    const responseAccount = account
        .filter(item => {
          if (item.subsidiary.name === subsidiary) {
            return item;
          } else if (subsidiary === '') {
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
  }, [subsidiary, month, year, dateInitial, dateFinal, isTimeSlot, group]);

  const accountVariable = useCallback((account: AccountData[]): AccountProps[] => {
    const responseAccount = account
        .filter(item => {
          if (item.subsidiary.name === subsidiary) {
            return item;
          } else if (subsidiary === '') {
            return item
          }
          // eslint-disable-next-line
          return;
        })
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
  }, [subsidiary, month, year, dateInitial, dateFinal, isTimeSlot, group]);

  const listFixedExpense = useMemo(() => {
    if (!account) {
      return [];
    }

    return accountFixed(account.sort(orderByAsc));
  }, [account, accountFixed, orderByAsc]);

  const listVariableExpense = useMemo(() => {
    if (!account) {
      return [];
    }
    const variableAccount = account.filter(item => item.expense_type.includes('VARIAVEL') && item);
    return accountVariable(variableAccount.sort(orderByAsc));
  }, [account, accountVariable, orderByAsc]);


  
  useEffect(() => {
    loadGroupsAccount();
    loadSubsidiary();
  }, [loadGroupsAccount, loadSubsidiary]);

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

  const handleSelectSubsidiary= (event: ChangeEvent<HTMLSelectElement>) => {
    handleSetSubsidiary(event.target.value);
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

  const handleSelected = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    if(event.target.checked) {
      setSelectedsEntry(prevState => [...prevState, id])
    } else {
      const arr = selectedsEntry;
      const index = arr.indexOf(id);
      arr.splice(index, 1);
      setSelectedsEntry(arr);
    }
  };

  const handleRemoveAllIds = async () => {
    try {
      await api.delete(`/expense?ids=${selectedsEntry.toString()}`);
      setSelectedsEntry([]);
      toast.success('Exclusão feita com sucesso');
    } catch {
      toast.error('Não foi possivel remover os itens');
    }
  }

  const collumAccount = [
    {name: ''},
    {name: 'Filial'},
    {name: 'Descrição'},
    {name: 'Vencimento'},
    {name: 'Grupo'},
    {name: 'Valor'},
    {name: 'Status'},
    {name: 'Ações'},
  ]

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
                  <select defaultValue={subsidiary} onChange={handleSelectSubsidiary}>
                    <option value="">Todas</option>
                    {optionsSubsidiary.map(item => (
                      <option value={item.value}>{item.label}</option>
                    ))}
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
                  <TableFix cols={8} collums={collumAccount} rows={listFixedExpense} handleSelected={handleSelected}/>
                  <BalanceAmount>
                    <p>
                      <span>Total</span>
                      <strong>{totalFixed}</strong>
                    </p>
                  </BalanceAmount>
                </TabBootstrap>
                <TabBootstrap eventKey="variable" title="Contas Variáveis">
                  <TitlePane>Contas Variáveis</TitlePane>
                  <TableFix cols={8} collums={collumAccount} rows={listVariableExpense} handleSelected={handleSelected}/>
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
              <button type="button" onClick={() => toogleAddAccount()}>
                <SiOneplus />
                <span>Adiconar nova conta</span>
              </button> 
            </ButtonGroup>
            {selectedsEntry.length > 0 && <Button onClick={handleRemoveAllIds}>Excluir</Button>}
          </Footer>
        </Container>
      </Background>
      <ModalAddAccount isOpen={modalAddAccount} setIsOpen={toogleAddAccount} />
    </FinancesLayout>
  );
};

export default Account;
