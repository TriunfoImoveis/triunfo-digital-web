import React, { ChangeEvent, useCallback, useEffect, useState, useMemo } from 'react';
import { Tabs, Tab as TabBootstrap } from 'react-bootstrap';
import { SiOneplus } from 'react-icons/si';
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
import { useFilter } from '../../../context/FilterContext';
import TableFix from '../../../components/Table/TableAccount';
import { toast } from 'react-toastify';
import { useFetchFinances } from '../../../hooks/useFetchFinances'; 

interface Expense {
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
interface AccountData {
  expenses: Expense[];
  totalExpenses: number;
  totalValue: number;
}

interface GroupsResponse {
  id: string;
  name: string;
}

interface Options {
  label: string;
  value: string;
}
type ExpenseStatus = "PENDENTE" | "VENCIDO" | "PAGO" | "CANCELADO";
type ExpenseType = "FIXA" | "VARIAVEL";
interface ParamsExpense {
  subsidiary?: string;
  expense_type?: ExpenseType;
  status?: ExpenseStatus | ExpenseStatus[];
  month?: string;
  year?: string;
  dateFrom?: Date;
  dateTo?: Date;
  group?: string;
  page?: number;
  perPage?: number;
  sort?: 'ASC' | 'DESC';
}

const Account: React.FC = () => {
  const [typeTab, setTypeTab] = useState('fix');
  const [optionsGroup, setOptionsGroup] = useState<Options[]>([]);
  const [optionsSubsidiary, setOptionsSubsidiary] = useState<Options[]>([]);
  const [selectedsEntry, setSelectedsEntry] = useState<String[]>([]);

  const [paramsExpenseFixed, setParamsExpenseFixed] = useState<ParamsExpense>({
    sort: 'ASC',
    subsidiary: '',
    expense_type: 'FIXA',
    status: 'PAGO'
  });
  const [paramsExpenseVariable, setParamsExpenseVariable] = useState<ParamsExpense>({
    sort: 'ASC',
    subsidiary: '',
    expense_type: 'VARIAVEL',
    status: 'PAGO'
  });
  const { data: expenseFixed } = useFetchFinances<AccountData>({ url: '/expense', params: paramsExpenseFixed, config: { refreshInterval: undefined } });
  const { data: expenseVariable } = useFetchFinances<AccountData>({ url: '/expense', params: paramsExpenseVariable, config: { refreshInterval: undefined } });
  const {
    group,
    subsidiary,
  } = useFilter();

  const [modalAddAccount, setAddAccount] = useState(false);

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
      value: item.id
    }));
    setOptionsSubsidiary(options);
  }, []);

  useEffect(() => {
    loadGroupsAccount();
    loadSubsidiary();
  }, [loadGroupsAccount, loadSubsidiary]);

  const handleSubmit = ({ date_initial, date_final }) => {
    setParamsExpenseFixed(prevState => ({ ...prevState, dateFrom: date_initial, dateTo: date_final }));
    setParamsExpenseVariable(prevState => ({ ...prevState, dateFrom: date_initial, dateTo: date_final }));
  };

  const handleSetTab = (tabName: string | null) => {
    if (tabName) {
      setTypeTab(tabName);
    }
  };

  const handleSelectSubsidiary = (event: ChangeEvent<HTMLSelectElement>) => {
    const subsidiary = event.target.value;
    setParamsExpenseFixed(prevState => ({ ...prevState, subsidiary }));
    setParamsExpenseVariable(prevState => ({ ...prevState, subsidiary }));
  };

  const handleSelectGroup = (event: ChangeEvent<HTMLSelectElement>) => {
    const group = event.target.value;
    setParamsExpenseFixed(prevState => ({ ...prevState, group }));
    setParamsExpenseVariable(prevState => ({ ...prevState, group }));
  };

  const handleSelected = (event: ChangeEvent<HTMLInputElement>, id: string) => {
    if (event.target.checked) {
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
    { name: '' },
    { name: 'Filial' },
    { name: 'Descrição' },
    { name: 'Vencimento' },
    { name: 'Grupo' },
    { name: 'Valor' },
    { name: 'Status' },
    { name: 'Ações' },
  ]

  const accoutFixed = useMemo(() => {
    return expenseFixed?.expenses ? expenseFixed?.expenses.map(item => ({
      id: item.id,
      expense_type: item.expense_type,
      due_date: DateBRL(item.due_date),
      description: item.description,
      value: Number(item.value),
      valueBRL: money(Number(item.value)),
      status: item.status,
      city: item.subsidiary.name,
      group: item.group.name,
    })) : []
  }, [expenseFixed])
  const accoutVariable = useMemo(() => {
    return expenseVariable?.expenses ? expenseVariable?.expenses.map(item => ({
      id: item.id,
      expense_type: item.expense_type,
      due_date: DateBRL(item.due_date),
      description: item.description,
      value: Number(item.value),
      valueBRL: money(Number(item.value)),
      status: item.status,
      city: item.subsidiary.name,
      group: item.group.name,
    })) : []
  }, [expenseVariable])

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
                  <TableFix cols={8} collums={collumAccount} rows={accoutFixed} handleSelected={handleSelected} />
                  <BalanceAmount>
                    <p>
                      <span>Total</span>
                      <strong>{new Intl
                        .NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                        .format(expenseFixed?.totalValue ? expenseFixed?.totalValue : 0)}
                      </strong>
                    </p>
                  </BalanceAmount>
                </TabBootstrap>
                <TabBootstrap eventKey="variable" title="Contas Variáveis">
                  <TitlePane>Contas Variáveis</TitlePane>
                  <TableFix cols={8} collums={collumAccount} rows={accoutVariable} handleSelected={handleSelected} />
                  <BalanceAmount>
                    <p>
                      <span>Total</span>
                      <strong>{new Intl
                        .NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
                        .format(expenseVariable?.totalValue ? expenseVariable?.totalValue : 0)}
                      </strong>
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
