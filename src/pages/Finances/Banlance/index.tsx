import React, { useState, useCallback, ChangeEvent, useMemo } from 'react';
import Switch from 'react-switch';
import { Form } from '@unform/web';
import { AddEntry } from '../../../assets/images';
import theme from '../../../styles/theme';

import FinancesLayout from '../../Layouts/FinancesLayout';
import ModalAddEntryCredit from '../../../components/ReactModal/AddEntryCredit';
import ModalAddEntryDesp from '../../../components/ReactModal/AddEntryDesp';

import {
  Container,
  Content,
  BalanceContainer,
  Footer,
  ButtonGroup,
  SwitchButton,
  FiltersContainer,
  FiltersBotton,
  FilterButtonGroup,
  FiltersBottonItems,
} from './styles';
import TableBoxFinances from '../../../components/Finances/TableBoxFinances';
import { DateBRL } from '../../../utils/format';
import { money } from '../../../utils/masked';
import TableBoxFinancesAccount from '../../../components/Finances/TableBoxFinancesAccounts';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { useFetchFinances } from '../../../hooks/useFetchFinances';
import { getInstallmentsParams } from '../../../api/get-installments';
import { format, parseISO } from 'date-fns';
import { useFetch } from '../../../hooks/useFetch';

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
type EntryData = {
  bank: string;
  brute_value: number;
  description: string;
  empressBrute: number;
  empressLiquid: number;
  id: string;
  pay_date: string;
  paying_source: string;
  subsidiary: string;
  tax_rate?: number;
  value_note?: number;
};

type Account = {
  id: string;
  due_date: string;
  city: string;
  description: string;
  value: number;
  valueBRL: string;
  user: string;
  bank: string;
};

interface Subsidiary {
  id: string;
  name: string;
}
interface Expense {
  id: string;
  expense_type: 'FIXA' | 'VARIAVEL';
  description: string;
  due_date: string;
  pay_date: string | null;
  value_paid: string | null;
  status: 'PENDENTE' | 'VENCIDO' | 'PAGO' | 'CANCELADO';
  subsidiary: Subsidiary;
  bank_data: {
    id: string;
    name: string;
    account: string;
  } | null;
  group: {
    id: string;
    name: string;
  }
  user: {
    id: string;
    name: string;
  }
}

interface Bank {
  id: string;
  name: string;
  account: string;
}
interface ExpenseData {
  expenses: Expense[];
  totalExpenses: number;
  totalValue: number;
}
interface InstallmentData {
  entry: EntryData[];
  totalInstallments: number;
  totalValueInstallments: number;
}

interface Revenue {
  id: string;
  pay_date: string;
  subsidiary: Subsidiary;
  description: string;
  client: string;
  value_integral: number;
  bank_data: Bank;
  invoice_value?: number;
  tax_rate?: number;
}
interface RevenueData {
  revenues: Revenue[];
  total: number;
  totalValueIntegralRevenues: number;
}

interface revenueParams {
  subsidiary?: string;
  revenue_type: 'DESPACHANTE' | 'CREDITO';
  status?: "PENDENTE" | "VENCIDO" | "PAGO" | "CANCELADO";
  month?: string;
  year?: string;
  dateFrom?: Date;
  dateTo?: Date;
  page?: number;
  perPage?: number;
  sort?: 'ASC' | 'DESC';
}

const Balance: React.FC = () => {
  const [typeTabEntry, setTypeTabEntry] = useState('sales');
  const [typeTabAccount, setTypeTabAccount] = useState('account');
  const [modalCreditEntry, setModalCreditEnrey] = useState(false);
  const [modalDespEntry, setModalDespEnrey] = useState(false);
  const [checked, setChecked] = useState(false);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const formatPorcent = (porcent: number) => {
    return (porcent / 100).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 2 })
  }

  const [paramsInstalments, setParamsInstalments] = useState<getInstallmentsParams>({
    subsidiary: '',
    page: 1,
    perPage: 10,
    sort: 'DESC',
  });
  const [paramsExpense, setParamsExpense] = useState<getInstallmentsParams>({
    subsidiary: '',
    status: 'PAGO',
    page: 1,
    perPage: 10,
    sort: 'DESC',
  });
  const [paramsRevenueDispatcher, setParamsRevenueDispatcher] = useState<revenueParams>({
    revenue_type: 'DESPACHANTE',
    status: 'PAGO',
    page: 1,
    perPage: 10,
    sort: 'DESC',
  });
  const [paramsRevenueCredit, setParamsRevenueCredit] = useState<revenueParams>({
    revenue_type: 'CREDITO',
    status: 'PAGO',
    page: 1,
    perPage: 10,
    sort: 'DESC',
  });

  const {data: subsidiaries} = useFetch<Subsidiary[]>('/subsidiary');

  const { data: installmentsEntry } = useFetchFinances<InstallmentData>({ url: '/installment/entry', params: paramsInstalments, config: { refreshInterval: undefined } });
  const { data: listExpenses } = useFetchFinances<ExpenseData>({ url: '/expense', params: paramsExpense, config: { refreshInterval: undefined } });
  const { data: revenueDispacher } = useFetchFinances<RevenueData>({ url: '/revenue', params: paramsRevenueDispatcher, config: { refreshInterval: undefined } });
  const { data: revenueCredit } = useFetchFinances<RevenueData>({ url: '/revenue', params: paramsRevenueCredit, config: { refreshInterval: undefined } });

  const optionsSubsidiary = useMemo(() => {
    return subsidiaries ? subsidiaries?.map(subsidiary => {
      return {
        value: subsidiary.id,
        label: subsidiary.name
      }
    }) : []
  }, [subsidiaries])
  const salesEntry = useMemo(() => {
    return installmentsEntry?.entry ? installmentsEntry?.entry.map(installment => {
      return {
        bank: installment.bank,
        brute_value: formatPrice(installment.brute_value),
        description: installment.description,
        empressBrute: formatPrice(installment.empressBrute),
        empressLiquid: formatPrice(installment.empressLiquid),
        id: installment.id,
        pay_date: format(parseISO(installment.pay_date), 'dd/MM/yyyy'),
        paying_source: installment.paying_source,
        subsidiary: installment.subsidiary,
        tax_rate: installment.tax_rate ? formatPorcent(installment.tax_rate) : '0,0%',
        value_note: installment.value_note ? formatPrice(installment.value_note) : 'SEM NF',
      }
    }) : [];
  }, [installmentsEntry])

  const expenses = listExpenses?.expenses?.map(item => {
    return {
      id: item.id,
      due_date: DateBRL(item.pay_date ? item.pay_date : item.due_date),
      city: item.subsidiary.name,
      description: item.description,
      value: item.value_paid ? Number(item.value_paid) : 0,
      valueBRL: item.value_paid ? money(Number(item.value_paid)) : '------',
      user: item.user.name,
      bank: item.bank_data ? item.bank_data.account : '-----',
    };
  });

  const dispacherEntry = useMemo(() => {
    return revenueDispacher?.revenues ? revenueDispacher?.revenues.map(revenue => {
      return {
        id: revenue.id,
        due_date: DateBRL(revenue.pay_date),
        city: revenue.subsidiary.name,
        description: revenue.description,
        client: revenue.client,
        brute_value: formatPrice(revenue.value_integral),
        bank: revenue.bank_data ? `${revenue.bank_data.account}` : '-----',
      }
    }) : [];

  }, [revenueDispacher]);

  const entryCredit = useMemo(() => {
    return revenueCredit?.revenues ? revenueCredit?.revenues.map(revenue => {
      return {
        id: revenue.id,
        pay_date: format(parseISO(revenue.pay_date), 'dd/MM/yyyy'),
        city: revenue.subsidiary.name,
        description: revenue.description,
        brute_value: formatPrice(revenue.value_integral),
        value_note: revenue.invoice_value ? formatPrice(revenue.invoice_value) : 'SEM NF',
        tax_rate: revenue.tax_rate ? formatPorcent(revenue.tax_rate) : '0%',
        bank: revenue.bank_data ? `${revenue.bank_data.account}` : '-----',
        client: revenue.client,
      }
    }) : [];
  }, [revenueCredit]) 

  const handleSetTabEntry = (tabName: string | null) => {
    if (tabName) {
      setTypeTabEntry(tabName);
    }
  };
  const handleSetTabAccount = (tabName: string | null) => {
    if (tabName) {
      setTypeTabAccount(tabName);
    }
  };
  const handleChange = () => {
    setChecked(!checked);
  };
  const toogleModalDespEntry = useCallback(() => {
    setModalDespEnrey(!modalDespEntry);
  }, [modalDespEntry]);
  const toogleModalCreditEntry = useCallback(() => {
    setModalCreditEnrey(!modalCreditEntry);
  }, [modalCreditEntry]);

  const handleSelectModalAddEntry = useCallback(() => {
    switch (typeTabEntry) {
      case 'credit': {
        toogleModalCreditEntry();
        break;
      }
      case 'forwardingAgent': {
        toogleModalDespEntry();
        break;
      }

      default:
        break;
    }
  }, [
    typeTabEntry,
    toogleModalDespEntry,
    toogleModalCreditEntry,
  ]);

  const handleSubmit = ({ date_initial, date_final }) => {
    setParamsInstalments(prevState => ({
      ...prevState,
      dateFrom: date_initial,
      dateTo: date_final
    }))
    setParamsExpense(prevState => ({
      ...prevState,
      dateFrom: date_initial,
      dateTo: date_final
    }))
    setParamsRevenueDispatcher(prevState => ({
      ...prevState,
      dateFrom: date_initial,
      dateTo: date_final
    }))
    setParamsRevenueCredit(prevState => ({
      ...prevState,
      dateFrom: date_initial,
      dateTo: date_final
    }))
  };

  const handleSelectCity = (event: ChangeEvent<HTMLSelectElement>) => {
    const subsidiary = event.target.value;
    setParamsInstalments(prevState => ({
      ...prevState,
      subsidiary
    }))
    setParamsExpense(prevState => ({
      ...prevState,
      subsidiary
    }))
    setParamsRevenueDispatcher(prevState => ({
      ...prevState,
      subsidiary
    }))
    setParamsRevenueCredit(prevState => ({
      ...prevState,
      subsidiary
    }))
  };

  function handlePaginateSeleEntry(pageIndex: number) {
    setParamsInstalments(prevState => ({
      ...prevState,
      page: pageIndex
    }))
  }
  function handlePaginateDispacherEntry(pageIndex: number) {
    setParamsRevenueDispatcher(prevState => ({
      ...prevState,
      page: pageIndex
    }))
  }
  function handlePaginateCreditEntry(pageIndex: number) {
    setParamsRevenueCredit(prevState => ({
      ...prevState,
      page: pageIndex
    }))
  }
  function handlePaginateExpense(pageIndex: number) {
    setParamsExpense(prevState => ({
      ...prevState,
      page: pageIndex
    }))
  }

  return (
    <FinancesLayout>
      <Container>
        <FiltersContainer>
          <FiltersBotton>
            <FilterButtonGroup>
              <FiltersBottonItems>
                <select defaultValue={''} onChange={handleSelectCity}>
                  <option value="">Todas</option>
                  {optionsSubsidiary.map(subsidiary => (
                    <option key={subsidiary?.value} value={subsidiary?.value}>{subsidiary?.label}</option>
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
          <SwitchButton>
            <span>Saídas</span>
            <Switch
              onChange={handleChange}
              checked={checked}
              checkedIcon={false}
              uncheckedIcon={false}
              onColor={theme.colors.gold}
              offColor={theme.colors.gold}
            />
            <span>Entradas</span>
          </SwitchButton>
          <BalanceContainer>
            {checked ? (
              <TableBoxFinances
                typeTab={typeTabEntry}
                handleSetTab={handleSetTabEntry}
                title="Entradas"
                salesEntry={salesEntry}
                salesEntryTotal={formatPrice(installmentsEntry?.totalValueInstallments ? installmentsEntry?.totalValueInstallments : 0)}
                dispatcherEntry={dispacherEntry}
                dispatcherEntryTotal={formatPrice(revenueDispacher?.totalValueIntegralRevenues || 0)}
                creditEntry={entryCredit}
                creditEntryTotal={formatPrice(revenueCredit?.totalValueIntegralRevenues || 0)}
                salesTotal={installmentsEntry?.totalInstallments}
                dispatcherTotal={revenueDispacher?.total}
                creditTotal={revenueCredit?.total}
                pageSaleEntry={paramsInstalments?.page}
                pageDispacherEntry={paramsRevenueDispatcher?.page}
                pageCreditEntry={paramsRevenueCredit?.page}
                handlePaginateSeleEntry={handlePaginateSeleEntry}
                handlePaginateDispacherEntry={handlePaginateDispacherEntry}
                handlePaginateCreditEntry={handlePaginateCreditEntry}
              />
            ) : (
              <TableBoxFinancesAccount
                typeTab={typeTabAccount}
                handleSetTab={handleSetTabAccount}
                title="Saídas"
                account={expenses || []}
                page={paramsExpense?.page}
                total={listExpenses?.totalExpenses || 0}
                handlePaginate={handlePaginateExpense}
                accountTotal={new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(listExpenses?.totalValue ? listExpenses?.totalValue : 0)}
              />
            )}
          </BalanceContainer>
        </Content>
        {typeTabEntry !== 'sales' && (
          <Footer>
            <ButtonGroup>
              <button type="button" onClick={handleSelectModalAddEntry}>
                <AddEntry />
                <span>Nova Entrada</span>
              </button>
            </ButtonGroup>
          </Footer>
        )}

      </Container>
      <ModalAddEntryDesp
        isOpen={modalDespEntry}
        setIsOpen={toogleModalDespEntry}
      />
      <ModalAddEntryCredit
        isOpen={modalCreditEntry}
        setIsOpen={toogleModalCreditEntry}
      />
    </FinancesLayout>
  );
};

export default Balance;
